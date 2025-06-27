// TourResultPage.jsx
import { useLocation, useNavigate } from "react-router-dom";

interface Place {
  name: string;
  address: string;
  activity: string;
  estimated_cost: string;
  estimated_time: string;
}

interface DayPlan {
  day: number;
  description: string;
  places: Place[];
}

interface RoutePlan {
  plan: DayPlan[];
}

const mainColor = "#3A6351";
const accentColor = "#4A90E2";
const bgColor = "#F5F7FA";
const travelFont = `'Gowun Batang', 'Nanum Pen Script', 'Arial Rounded MT Bold', 'Arial', sans-serif`;

const TourResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { routePlan } = location.state as { routePlan: RoutePlan } || {};

  if (!routePlan || !routePlan.plan) {
    // Handle cases where data is missing (e.g., direct access or refresh)
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
        <h1 style={{ color: mainColor, marginBottom: "1rem" }}>
          경로 정보를 찾을 수 없습니다.
        </h1>
        <button
          onClick={() => navigate("/tour-survey")}
          style={{
            padding: "1rem 2rem",
            borderRadius: "10px",
            border: "none",
            backgroundColor: accentColor,
            color: "#fff",
            fontSize: "1.2rem",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
        >
          다시 추천받기
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "calc(100vh - 120px)",
        background: bgColor,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "3rem 1rem",
        fontFamily: travelFont,
      }}
    >
      <h1
        style={{
          color: mainColor,
          fontWeight: 800,
          fontSize: "2.5rem",
          marginBottom: "2rem",
          textAlign: "center",
        }}
      >
        <span style={{ color: accentColor }}>의성</span>에서의{" "}
        <span style={{ color: accentColor }}>환상적인</span> 여정!
      </h1>

      <div
        style={{
          width: "100%",
          maxWidth: "900px",
          display: "flex",
          flexDirection: "column",
          gap: "2.5rem",
        }}
      >
        {routePlan.plan.map((dayPlan) => (
          <div
            key={dayPlan.day}
            style={{
              backgroundColor: "#fff",
              borderRadius: "18px",
              boxShadow: "0 6px 24px rgba(0,0,0,0.08)",
              padding: "2.5rem",
              borderLeft: `8px solid ${mainColor}`,
            }}
          >
            <h2
              style={{
                color: mainColor,
                fontSize: "1.8rem",
                marginBottom: "1rem",
                fontWeight: "bold",
              }}
            >
              Day {dayPlan.day}. {dayPlan.description}
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.8rem",
              }}
            >
              {dayPlan.places.map((place, index) => (
                <div
                  key={index}
                  style={{
                    padding: "1.2rem",
                    borderRadius: "12px",
                    backgroundColor: bgColor,
                    border: `1px solid ${mainColor}20`,
                  }}
                >
                  <h3
                    style={{
                      color: accentColor,
                      fontSize: "1.4rem",
                      marginBottom: "0.5rem",
                      fontWeight: "bold",
                    }}
                  >
                    {place.name}
                  </h3>
                  <p
                    style={{
                      color: "#666",
                      marginBottom: "0.3rem",
                      fontSize: "0.95rem",
                    }}
                  >
                    **주소:** {place.address}
                  </p>
                  <p
                    style={{
                      color: "#555",
                      marginBottom: "0.3rem",
                      lineHeight: "1.5",
                    }}
                  >
                    **활동:** {place.activity}
                  </p>
                  <p
                    style={{
                      color: "#666",
                      marginBottom: "0.3rem",
                      fontSize: "0.95rem",
                    }}
                  >
                    **예상 비용:** {place.estimated_cost}
                  </p>
                  <p
                    style={{
                      color: "#666",
                      fontSize: "0.95rem",
                    }}
                  >
                    **예상 소요 시간:** {place.estimated_time}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate("/tour-survey")}
        style={{
          marginTop: "3rem",
          padding: "1rem 2.5rem",
          borderRadius: "12px",
          border: "none",
          backgroundColor: mainColor,
          color: "#fff",
          fontSize: "1.3rem",
          fontWeight: "bold",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        }}
      >
        새로운 경로 추천받기
      </button>
    </div>
  );
};

export default TourResultPage;