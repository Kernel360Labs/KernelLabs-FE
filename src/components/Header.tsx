import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const mainColor = "#3A6351"; // 딥그린
const accentColor = "#4A90E2"; // 포인트 블루

// Responsive CSS injection
const injectHeaderResponsiveStyle = () => {
  if (document.getElementById("header-responsive-style")) return;
  const style = document.createElement("style");
  style.id = "header-responsive-style";
  style.innerHTML = `
    @media (max-width: 700px) {
      .header-inner {
        flex-direction: column !important;
        align-items: flex-start !important;
        padding: 1rem 1rem 0.5rem 1rem !important;
      }
      .header-logo {
        font-size: 1.2rem !important;
      }
      .header-logo-img {
        height: 32px !important;
        margin-right: 8px !important;
      }
      .header-nav {
        gap: 18px !important;
        margin-top: 0.5rem !important;
      }
    }
  `;
  document.head.appendChild(style);
};

const Header = () => {
  const navigate = useNavigate();
  useEffect(() => {
    injectHeaderResponsiveStyle();
  }, []);
  return (
    <header
      style={{
        width: "100%",
        background: "#fff",
        boxShadow: "0 2px 16px rgba(58,99,81,0.07)",
        display: "flex",
        justifyContent: "center",
        boxSizing: "border-box",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div
        className="header-inner"
        style={{
          width: "100%",
          maxWidth: 1200,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.5rem 2.5rem 1.5rem 2.5rem",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <img
            src="/image/symbol.png"
            alt="의성 로고"
            className="header-logo-img"
            style={{ height: 44, marginRight: 14 }}
          />
          <span
            className="header-logo"
            style={{
              fontWeight: 800,
              fontSize: "1.7rem",
              color: mainColor,
              letterSpacing: "-1px",
              fontFamily: "Pretendard, sans-serif",
            }}
          >
            의성 갈래?
          </span>
        </div>
        <div
          className="header-nav"
          style={{ display: "flex", alignItems: "center", gap: 32 }}
        >
          <span
            style={{
              color: mainColor,
              fontWeight: 600,
              fontSize: "1.1rem",
              cursor: "pointer",
              marginRight: 8,
              transition: "color 0.2s",
            }}
            onClick={() => navigate("/about")}
            onMouseOver={(e) => (e.currentTarget.style.color = accentColor)}
            onMouseOut={(e) => (e.currentTarget.style.color = mainColor)}
          >
            지금 의성 (의성 이주 정책)
          </span>
          <nav style={{ display: "inline" }}>
            <span
              style={{
                color: mainColor,
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "1.1rem",
                transition: "color 0.2s",
                cursor: "pointer",
              }}
              onClick={() => navigate("/rental")}
              onMouseOver={(e) => (e.currentTarget.style.color = accentColor)}
              onMouseOut={(e) => (e.currentTarget.style.color = mainColor)}
            >
              일할 장소 찾기
            </span>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
