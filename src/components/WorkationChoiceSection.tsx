import React, { useState } from "react";

const choices = [
  {
    text: "의성에서 특별한 업무 환경을 찾고 싶어요! 💻",
    img: "https://storage.googleapis.com/udcode/workLocation/%E1%84%90%E1%85%A1%E1%86%B8%E1%84%85%E1%85%B5%E1%84%86%E1%85%A1%E1%84%8B%E1%85%B3%E1%86%AF.jpg"
  },
  {
    text: "의성에서 일과 휴식을 동시에 누리고 싶어요! 🏖️",
    img: "https://storage.googleapis.com/udcode/workLocation/anise_image.jpg"
  }
  ,
  {
    text: "의성에서 나만의 워케이션 스팟을 찾고 싶어요!📍",
    img: "https://storage.googleapis.com/udcode/workLocation/%E1%84%8F%E1%85%A1%E1%84%91%E1%85%A6%E1%84%82%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%AB.jpg"
  }
];

const WorkationChoiceSection = () => {
  const [selected, setSelected] = useState(0);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 1100,
        margin: "48px auto 0 auto",
        borderRadius: 48,
        overflow: "hidden",
        position: "relative",
        minHeight: 380,
        boxShadow: "0 6px 32px #0002"
      }}
    >
      {/* 배경 이미지 */}
      <img
        src={choices[selected].img}
        alt="배경"
        style={{
          width: "100%",
          height: 380,
          objectFit: "cover",
          display: "block",
          filter: "brightness(0.55)",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1
        }}
      />
      {/* overlay 효과 */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: 380,
          background: "rgba(0,0,0,0.18)",
          zIndex: 2
        }}
      />
      {/* 텍스트 선택지 */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          width: "100%",
          height: 380,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 28
        }}
      >
        
        {choices.map((c, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            style={{
              width: 600,
              maxWidth: "90vw",
              fontWeight: 700,
              fontSize: "1.25rem",
              color: selected === i ? "#fff" : "#eee",
              background: selected === i ? "rgba(0,0,0,0.32)" : "rgba(0,0,0,0.12)",
              border: selected === i ? "2.5px solid #fff" : "2.5px solid #fff3",
              borderRadius: 40,
              padding: "18px 0",
              margin: "0 0 0 0",
              outline: "none",
              cursor: "pointer",
              transition: "all 0.18s",
              boxShadow: selected === i ? "0 2px 12px #0002" : "none",
              backdropFilter: "blur(2px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {c.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WorkationChoiceSection; 