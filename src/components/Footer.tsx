import { useEffect } from "react";
const mainColor = "#3A6351";
const accentColor = "#4A90E2";

const injectFooterResponsiveStyle = () => {
  if (document.getElementById("footer-responsive-style")) return;
  const style = document.createElement("style");
  style.id = "footer-responsive-style";
  style.innerHTML = `
    @media (max-width: 700px) {
      .footer-inner {
        flex-direction: column !important;
        align-items: flex-start !important;
        padding: 1rem 1rem 0.5rem 1rem !important;
        font-size: 0.98rem !important;
        gap: 0.5rem !important;
      }
      .footer-links {
        gap: 14px !important;
        margin-top: 0.5rem !important;
      }
    }
  `;
  document.head.appendChild(style);
};

const Footer = () => {
  useEffect(() => {
    injectFooterResponsiveStyle();
  }, []);
  return (
    <footer
      style={{
        width: "100%",
        background: "#fff",
        boxShadow: "0 -2px 16px rgba(58,99,81,0.07)",
        display: "flex",
        justifyContent: "center",
        boxSizing: "border-box",
      }}
    >
      <div
        className="footer-inner"
        style={{
          width: "100%",
          maxWidth: 1200,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          fontSize: "1rem",
          color: mainColor,
          padding: "1.5rem 2.5rem 1.5rem 2.5rem",
          boxSizing: "border-box",
        }}
      >
        <div style={{ fontWeight: 600, letterSpacing: "-1px" }}>
          copyright @커널랩스
        </div>
        <div
          className="footer-links"
          style={{ display: "flex", gap: 24, alignItems: "center" }}
        >
          <a
            href="https://github.com/Kernel360Labs/KernelLabs-BE"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: mainColor,
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "1.05rem",
              transition: "color 0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = accentColor)}
            onMouseOut={(e) => (e.currentTarget.style.color = mainColor)}
          >
            BE Github
          </a>
          <span style={{ color: "#b2d8a6", fontSize: 18 }}>|</span>
          <a
            href="https://github.com/Kernel360Labs/KernelLabs-FE"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: mainColor,
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "1.05rem",
              transition: "color 0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = accentColor)}
            onMouseOut={(e) => (e.currentTarget.style.color = mainColor)}
          >
            FE Github
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
