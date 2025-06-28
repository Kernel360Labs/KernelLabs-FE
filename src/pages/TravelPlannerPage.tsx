import { useNavigate } from "react-router-dom";

const TravelPlannerPage = () => {
  const navigate = useNavigate();
  const mainColor = "#3A6351";
  const accentColor = "#4A90E2";

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "4rem 2rem",
          background: "linear-gradient(135deg, #f8faf8 0%, #e8f4f8 100%)",
        }}
      >
        <h1
          className="main-title"
          style={{
            color: mainColor,
            fontWeight: 800,
            fontSize: "2.3rem",
            marginBottom: 10,
            letterSpacing: "-1px",
            textAlign: "center",
          }}
        >
          의성에서 어떤 여행을 즐기고 싶나요?
        </h1>
        <p
          style={{
            color: "#888",
            fontSize: "1.1rem",
            marginBottom: 40,
            textAlign: "center",
          }}
        >
          워케이션과 관광, 원하는 스타일을 선택해보세요.
        </p>
        <div
          className="main-cards"
          style={{
            display: "flex",
            gap: 48,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <div
            className="main-card"
            onClick={() => navigate("/workation-survey")}
            style={{
              background: `linear-gradient(rgba(58,99,81,0.38), rgba(58,99,81,0.38)), url('/image/workation.png') center/cover no-repeat`,
              borderRadius: 28,
              boxShadow: "0 6px 24px rgba(58,99,81,0.10)",
              minWidth: 300,
              minHeight: 220,
              maxWidth: 400,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontWeight: 800,
              fontSize: "1.7rem",
              color: "#fff",
              textShadow: "0 2px 8px rgba(0,0,0,0.18)",
              transition: "box-shadow 0.2s, border 0.2s, color 0.2s",
              border: `2px solid transparent`,
              marginBottom: 16,
              position: "relative",
              overflow: "hidden",
              userSelect: "none",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.boxShadow = `0 12px 32px rgba(74,144,226,0.18)`;
              e.currentTarget.style.border = `2px solid ${accentColor}`;
              e.currentTarget.style.color = "#fff";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.boxShadow = `0 6px 24px rgba(58,99,81,0.10)`;
              e.currentTarget.style.border = `2px solid transparent`;
              e.currentTarget.style.color = "#fff";
            }}
          >
            워케이션
          </div>
          <div
            className="main-card"
            onClick={() => navigate("/tour-survey")}
            style={{
              background: `linear-gradient(rgba(58,99,81,0.38), rgba(58,99,81,0.38)), url('/image/vacation.jpg') center/cover no-repeat`,
              borderRadius: 28,
              boxShadow: "0 6px 24px rgba(58,99,81,0.10)",
              minWidth: 300,
              minHeight: 220,
              maxWidth: 400,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              fontWeight: 800,
              fontSize: "1.7rem",
              color: "#fff",
              textShadow: "0 2px 8px rgba(0,0,0,0.18)",
              transition: "box-shadow 0.2s, border 0.2s, color 0.2s",
              border: `2px solid transparent`,
              marginBottom: 16,
              position: "relative",
              overflow: "hidden",
              userSelect: "none",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.boxShadow = `0 12px 32px rgba(74,144,226,0.18)`;
              e.currentTarget.style.border = `2px solid ${accentColor}`;
              e.currentTarget.style.color = "#fff";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.boxShadow = `0 6px 24px rgba(58,99,81,0.10)`;
              e.currentTarget.style.border = `2px solid transparent`;
              e.currentTarget.style.color = "#fff";
            }}
          >
            관광
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelPlannerPage;
