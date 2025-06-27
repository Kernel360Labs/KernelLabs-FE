import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TOUR_RECOMMEND_URL } from "../api";

const mainColor = "#3A6351";
const bgColor = "#F5F7FA";
const travelFont = `'Gowun Batang', 'Nanum Pen Script', 'Arial Rounded MT Bold', 'Arial', sans-serif`;

const questions = [
  {
    key: "startDate",
    label: "출발 날짜를 선택하세요.",
    type: "date",
    required: true
  },
  {
    key: "duration",
    label: "여행 기간을 입력하세요.",
    type: "text",
    placeholder: "예: 2박 3일",
    required: true
  },
  {
    key: "time",
    label: "시작 가능 시간을 입력하세요.",
    type: "text",
    placeholder: "예: 첫날 18시부터, 다음날은 종일",
    required: true
  },
  {
    key: "vibe",
    label: "선호하는 분위기를 입력하세요.",
    type: "text",
    placeholder: "예: 조용하고 한적한, 활기찬",
    required: true
  },
  {
    key: "interests",
    label: "관심 활동을 입력하세요.",
    type: "text",
    placeholder: "예: 역사 탐방, 자연 휴식, 미식",
    required: true
  },
  {
    key: "transportation",
    label: "주요 이동 수단을 입력하세요.",
    type: "text",
    placeholder: "예: 자차, 도보, 대중교통",
    required: true
  },
  {
    key: "companion",
    label: "동반자를 입력하세요.",
    type: "text",
    placeholder: "예: 혼자, 친구와, 가족과",
    required: false
  },
  {
    key: "budget",
    label: "예상 경비를 입력하세요.",
    type: "text",
    placeholder: "예: 저렴, 보통, 여유",
    required: false
  }
];

const TourSurveyPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Record<string, string>>({
    startDate: "",
    duration: "",
    time: "",
    vibe: "",
    interests: "",
    transportation: "",
    companion: "",
    budget: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const totalSteps = questions.length;

  const currentQuestion = questions[step];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [currentQuestion.key]: e.target.value }));
  };

  const handleNext = () => {
    if (currentQuestion.required && !formData[currentQuestion.key]) return;
    setStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setStep((prev) => prev - 1);
  };

  const handleStepperSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step < totalSteps - 1) {
      handleNext();
      return;
    }

    setLoading(true);
    setError(null);

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
      const response = await fetch(TOUR_RECOMMEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "필수 항목을 모두 입력해주세요.");
      }

      const responseData = await response.json();
      const routeJsonString = responseData.data.route.replace("```json\n", "").replace("\n```", "");
      const routePlan = JSON.parse(routeJsonString);

      navigate("/tour-result", { state: { routePlan } });
    } catch (err) {
      console.error("API call failed:", err);
      setError(
        err instanceof Error
          ? err.message || "경로를 불러오는 데 실패했습니다. 다시 시도해주세요."
          : "경로를 불러오는 데 실패했습니다. 다시 시도해주세요."
      );
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
        fontFamily: travelFont
      }}
    >
      <h1 style={{ color: mainColor, fontWeight: 800, fontSize: "2rem", marginBottom: "1rem" }}>
        질문에 답해주세요{" "}
        <span style={{ color: "#4A90E2", fontSize: "1.2rem" }}>
          ({step + 1}/{totalSteps})
        </span>
      </h1>
      <div style={{ color: "#888", marginBottom: "2rem", fontSize: "1.1rem" }}>
        당신에게 딱 맞는 워케이션 장소를 찾아드립니다.
      </div>
      <form
        onSubmit={handleStepperSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          width: "100%",
          maxWidth: "500px",
          padding: "2rem",
          borderRadius: "15px",
          backgroundColor: "#fff",
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)"
        }}
      >
        <div style={{ fontWeight: 700, fontSize: "1.4rem", marginBottom: "1.5rem", textAlign: "center" }}>
          {currentQuestion.label}
        </div>

        {currentQuestion.type === "text" && (
          <input
            type="text"
            name={currentQuestion.key}
            value={formData[currentQuestion.key] || ""}
            onChange={handleInputChange}
            placeholder={currentQuestion.placeholder || ""}
            style={{
              padding: "0.8rem",
              borderRadius: "8px",
              border: `1px solid ${mainColor}`,
              fontSize: "1rem"
            }}
            required={currentQuestion.required}
          />
        )}

        {currentQuestion.type === "date" && (
          <input
            type="date"
            name={currentQuestion.key}
            value={formData[currentQuestion.key] || ""}
            onChange={handleInputChange}
            style={{
              padding: "0.8rem",
              borderRadius: "8px",
              border: `1px solid ${mainColor}`,
              fontSize: "1rem"
            }}
            required={currentQuestion.required}
          />
        )}

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem" }}>
          <button
            type="button"
            onClick={handlePrev}
            disabled={step === 0}
            style={{
              padding: "0.8rem 2rem",
              borderRadius: "8px",
              border: "none",
              background: step === 0 ? "#eee" : "#f0f0f0",
              color: step === 0 ? "#bbb" : mainColor,
              fontWeight: "bold",
              fontSize: "1.1rem",
              cursor: step === 0 ? "not-allowed" : "pointer"
            }}
          >
            ← 이전
          </button>

          {step < totalSteps - 1 ? (
            <button
              type="submit"
              disabled={currentQuestion.required && !formData[currentQuestion.key]}
              style={{
                padding: "0.8rem 2rem",
                borderRadius: "8px",
                border: "none",
                background: mainColor,
                color: "#fff",
                fontWeight: "bold",
                fontSize: "1.1rem",
                cursor: currentQuestion.required && !formData[currentQuestion.key] ? "not-allowed" : "pointer"
              }}
            >
              다음 →
            </button>
          ) : (
            <button
              type="submit"
              disabled={currentQuestion.required && !formData[currentQuestion.key]}
              style={{
                padding: "0.8rem 2rem",
                borderRadius: "8px",
                border: "none",
                background: mainColor,
                color: "#fff",
                fontWeight: "bold",
                fontSize: "1.1rem",
                cursor: currentQuestion.required && !formData[currentQuestion.key] ? "not-allowed" : "pointer"
              }}
            >
              제출
            </button>
          )}
        </div>

        {error && <p style={{ color: "red", marginTop: "1rem", textAlign: "center" }}>{error}</p>}

        {loading && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0,0,0,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 9999
            }}
          >
            <div
              style={{
                background: "#fff",
                padding: "3rem 5rem",
                borderRadius: "32px",
                boxShadow: "0 4px 32px rgba(0,0,0,0.15)",
                fontSize: "2.5rem",
                color: mainColor,
                fontWeight: "bold"
              }}
            >
              경로 생성 중...
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default TourSurveyPage;
