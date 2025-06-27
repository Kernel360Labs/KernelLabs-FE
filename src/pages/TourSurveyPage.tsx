// TourSurveyPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const mainColor = "#3A6351";
const bgColor = "#F5F7FA";
const travelFont = `'Gowun Batang', 'Nanum Pen Script', 'Arial Rounded MT Bold', 'Arial', sans-serif`;

const TourSurveyPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    startDate: "",
    duration: "",
    time: "",
    vibe: "",
    interests: "",
    transportation: "",
    companion: "",
    budget: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const apiUrl = `http://34.53.50.247/vacations`;

    // companion과 budget이 빈 문자열일 경우 null로 변환
    const requestData = {
      startDate: formData.startDate,
      duration: formData.duration,
      time: formData.time,
      vibe: formData.vibe,
      interests: formData.interests,
      transportation: formData.transportation,
      companion: formData.companion,
      budget: formData.budget
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData)  // routeRequest 객체로 한 번 더 감싸지 않음
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "필수 항목을 모두 입력해주세요.");
      }

      const responseData = await response.json();
      const routeJsonString = responseData.data.route.replace("```json\n", "").replace("\n```", ""); // Extract pure JSON string
      const routePlan = JSON.parse(routeJsonString); // Parse the JSON string

      navigate("/tour-result", { state: { routePlan } }); // Pass the parsed plan to the result page
    } catch (err) {
      console.error("API call failed:", err);
      if (err instanceof Error) {
        setError(err.message || "경로를 불러오는 데 실패했습니다. 다시 시도해주세요.");
      } else {
        setError("경로를 불러오는 데 실패했습니다. 다시 시도해주세요.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 120px)",
        background: bgColor,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1rem",
        fontFamily: travelFont,
      }}
    >
      <h1
        style={{
          color: mainColor,
          fontWeight: 800,
          fontSize: "2rem",
          marginBottom: "2rem",
        }}
      >
        당신의 의성 여행 스타일은?
      </h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "100%",
          maxWidth: "500px",
          padding: "2rem",
          borderRadius: "15px",
          backgroundColor: "#fff",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        }}
      >
        {/* Input fields for RouteRequest */}
        {Object.keys(formData).map((key) => (
          <div key={key} style={{ display: "flex", flexDirection: "column" }}>
            <label
              htmlFor={key}
              style={{
                marginBottom: "0.5rem",
                fontWeight: "bold",
                color: mainColor,
              }}
            >
              {
                {
                  startDate: "출발 날짜",
                  duration: "여행 기간",
                  time: "시작 가능 시간",
                  vibe: "선호하는 분위기",
                  interests: "관심 활동 (콤마로 구분)",
                  transportation: "주요 이동 수단",
                  companion: "동반자 (선택 사항)",
                  budget: "예상 경비 (선택 사항)",
                }[key]
              }
              :
            </label>
            <input
              type={key === "startDate" ? "date" : "text"}
              id={key}
              name={key}
              value={formData[key as keyof typeof formData]}
              onChange={handleChange}
              placeholder={
                {
                  startDate: "예: 2025년 07월 01일",
                  duration: "예: 2박 3일",
                  time: "예: 첫날 18시부터, 다음날은 종일",
                  vibe: "예: 조용하고 한적한, 활기찬",
                  interests: "예: 역사 탐방, 자연 휴식, 미식",
                  transportation: "예: 자차, 도보, 대중교통",
                  companion: "예: 혼자, 친구와, 가족과",
                  budget: "예: 저렴, 보통, 여유",
                }[key]
              }
              style={{
                padding: "0.8rem",
                borderRadius: "8px",
                border: `1px solid ${mainColor}`,
                fontSize: "1rem",
              }}
              // Make companion and budget optional if they are nullable in backend
              required={key !== "companion" && key !== "budget"}
            />
          </div>
        ))}

        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: "1.5rem",
            padding: "1rem 2rem",
            borderRadius: "10px",
            border: "none",
            backgroundColor: mainColor,
            color: "#fff",
            fontSize: "1.2rem",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
        >
          {loading ? "경로 생성 중..." : "여행 경로 추천받기"}
        </button>
        {error && (
          <p style={{ color: "red", marginTop: "1rem", textAlign: "center" }}>
            {error}
          </p>
        )}
        {loading && (
          <div style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999
          }}>
            <div style={{
              background: "#fff",
              padding: "3rem 5rem",
              borderRadius: "32px",
              boxShadow: "0 4px 32px rgba(0,0,0,0.15)",
              fontSize: "2.5rem",
              color: mainColor,
              fontWeight: "bold"
            }}>
              경로 생성 중...
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default TourSurveyPage;