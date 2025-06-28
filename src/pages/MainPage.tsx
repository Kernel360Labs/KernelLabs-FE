import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import CoverflowCarousel from "../components/CoverflowCarousel";
import WorkationChoiceSection from "../components/WorkationChoiceSection";

const mainColor = "#3A6351";
const accentColor = "#4A90E2";
const bgColor = "#F5F7FA";
// const travelFont = `'Gowun Batang', 'Nanum Pen Script', 'Arial Rounded MT Bold', 'Arial', sans-serif`;

const injectMainResponsiveStyle = () => {
  if (document.getElementById("mainpage-responsive-style")) return;
  const style = document.createElement("style");
  style.id = "mainpage-responsive-style";
  style.innerHTML = `
    @media (max-width: 700px) {
      .main-cards {
        flex-direction: column !important;
        gap: 20px !important;
      }
      .main-card {
        min-width: 90vw !important;
        max-width: 98vw !important;
        min-height: 140px !important;
        font-size: 1.1rem !important;
        padding: 1.2rem 0.5rem !important;
      }
      .main-title {
        font-size: 1.3rem !important;
      }
    }
  `;
  document.head.appendChild(style);
};

const MainPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    injectMainResponsiveStyle();
  }, []);
  return (
    <div
      style={{
        minHeight: "calc(100vh - 120px)",
        background: bgColor,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 1rem",
      }}
    >
      <div style={{ textAlign: "center", margin: "48px 0 32px 0" }}>
        <div style={{
          fontWeight: 700,
          fontSize: "2.5rem",
          color: "#222",
          marginBottom: 8,
          letterSpacing: "-1px"
        }}>
          Where you at?
        </div>
        <div style={{
          fontWeight: 900,
          fontSize: "4.2rem",
          color: "#111",
          display: "inline-block",
          position: "relative",
          lineHeight: 1.1
        }}>
          Uiseong Workation
          <span style={{
            color: "#f7a600",
            fontSize: "2.2rem",
            fontWeight: 700,
            position: "absolute",
            right: -60,
            top: 18,
            pointerEvents: "none",
            userSelect: "none"
          }}>
            <svg width="60" height="40" viewBox="0 0 60 40" fill="none">
              <g stroke="#f7a600" strokeWidth="3" strokeLinecap="round">
                <path d="M10 30 L20 10"/>
                <path d="M20 35 L25 20"/>
                <path d="M30 38 L32 28"/>
                <path d="M40 35 L38 20"/>
                <path d="M50 30 L45 10"/>
                <circle cx="20" cy="10" r="2" fill="#f7a600"/>
                <circle cx="45" cy="10" r="2" fill="#f7a600"/>
              </g>
            </svg>
          </span>
        </div>
        <div style={{ fontWeight: 900, fontSize: "3rem", color: "#111", marginTop: 40, marginBottom: 24 }}>
          일과 쉼, 그 사이 의성
        </div>
        <div style={{ color: "#555", fontSize: "1.6rem", marginBottom: 8, lineHeight: 1.6, fontWeight: 400 }}>
          자연에서 잘 일하고 잘 쉬는 법,<br />
          의성갈래와 함께하세요!
        </div>
      </div>
      <CoverflowCarousel />
      {/* 워케이션 선택 섹션: 배경 이미지 + pill형 텍스트 */}
      <WorkationChoiceSection />
      {/* 3개의 bar 섹션 */}
    
      <h1
        className="main-title"
        style={{
          color: mainColor,
          fontWeight: 800,
          fontSize: "2.3rem",
          marginBottom: 10,
          letterSpacing: "-1px",
          // fontFamily: travelFont,
        }}
      >
        의성에서 어떤 여행을 즐기고 싶나요?
      </h1>
      <p
        style={{
          color: "#888",
          fontSize: "1.1rem",
          marginBottom: 40,
          // fontFamily: travelFont,
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
            // fontFamily: travelFont,
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
            // fontFamily: travelFont,
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
      <div
        style={{
          marginTop: 60,
          color: "#666",
          fontSize: "1.08rem",
          maxWidth: 500,
          textAlign: "center",
          // fontFamily: travelFont,
        }}
      ></div>
    </div>
  );
};

export default MainPage;
