import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import type { CSSProperties } from "react";

const images = [
  "https://storage.googleapis.com/udcode/workLocation/anise_image.jpg",
  "https://storage.googleapis.com/udcode/workLocation/cafenine_image.jpg",
  "https://storage.googleapis.com/udcode/workLocation/%E1%84%80%E1%85%AE%E1%84%80%E1%85%A8%E1%84%86%E1%85%B5%E1%86%AF%E1%84%85%E1%85%B5.jpg",
  "https://storage.googleapis.com/udcode/workLocation/modern29_image.jpg",
];

const arrowStyle: CSSProperties = {
  zIndex: 2,
  width: 48,
  height: 48,
  background: "#f5f6f2",
  borderRadius: "50%",
  boxShadow: "0 2px 12px #0001",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "none",
  color: "#8a93c5",
  fontSize: 38,
  cursor: "pointer",
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
};

function NextArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      style={{ ...arrowStyle, right: -32 }}
      onClick={onClick}
      aria-label="다음"
    >
      <span style={{ fontWeight: 700 }}>{">"}</span>
    </button>
  );
}
function PrevArrow(props: any) {
  const { onClick } = props;
  return (
    <button
      style={{ ...arrowStyle, left: -32 }}
      onClick={onClick}
      aria-label="이전"
    >
      <span style={{ fontWeight: 700 }}>{"<"}</span>
    </button>
  );
}

const CoverflowCarousel = () => {
  const settings = {
    centerMode: true,
    centerPadding: "32vw",
    slidesToShow: 3,
    arrows: true,
    infinite: true,
    speed: 500,
    focusOnSelect: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          centerPadding: "12vw",
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div
      style={{
        background: "#f5f6f2",
        padding: "48px 0 32px 0",
        width: "100vw",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: 1400, margin: "0 auto", position: "relative" }}>
        <Slider {...settings}>
          {images.map((src, idx) => (
            <div key={idx}>
              <div
                style={{
                  width: "28vw",
                  maxWidth: 420,
                  height: 350,
                  margin: "0 12px",
                  borderRadius: 32,
                  overflow: "hidden",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.13)",
                  background: "#fff",
                  transition: "box-shadow 0.3s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={src}
                  alt={`slide-${idx}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CoverflowCarousel;
