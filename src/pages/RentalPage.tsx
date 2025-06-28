import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RentalPlaceList from "../components/RentalPlaceList";
import { usePlaces } from "../hooks/usePlaces";

const RentalPage = () => {
  const navigate = useNavigate();
  const { places, loading, error, refetch } = usePlaces();

  // 페이지네이션 상태
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const totalPages = Math.ceil(places.length / pageSize);
  const pagedPlaces = places.slice((page - 1) * pageSize, page * pageSize);

  // 반응형 minHeight 계산
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 카드 높이 고정: 한 줄 3개, 두 줄(6개) 기준으로 minHeight 설정 (카드 높이+gap 고려)
  const cardHeight = 270; // 카드+패딩+마진 대략값(px)
  const gridGap = 32; // gap 값
  let minHeight = cardHeight * 2 + gridGap; // 기본 2줄(6개)
  if (windowWidth < 800) {
    minHeight = cardHeight + gridGap; // 1줄(3개)
  }

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <div style={{ fontSize: "1.2rem", color: "#666" }}>
          장소 목록을 불러오는 중...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <div
          style={{ fontSize: "1.2rem", color: "#e74c3c", marginBottom: "1rem" }}
        >
          오류가 발생했습니다: {error}
        </div>
        <button
          onClick={() => refetch()}
          style={{
            padding: "0.8rem 1.5rem",
            borderRadius: 8,
            border: "none",
            background: "#3A6351",
            color: "#fff",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 48,
      }}
    >
      <div
        style={{
          maxWidth: 560,
          width: "100%",
          margin: "2rem auto",
          padding: 24,
        }}
      >
        <h2 style={{ fontWeight: 800, fontSize: "2rem", marginBottom: 18 }}>
          대여 가능한 장소 선택
        </h2>
        <div style={{ color: "#666", fontSize: "1.08rem", marginBottom: 10 }}>
          카페, 서점, 사무실의 일부 공간을 워케이션 장소로 대여 가능하며, <br />
          날짜도 지정할 수 있습니다.
        </div>
      </div>
      <div style={{ maxWidth: 900, width: "100%", margin: "0 auto" }}>
        <div style={{ minHeight, width: "100%" }}>
          <RentalPlaceList
            places={pagedPlaces}
            onSelect={(id) => navigate(`/rental/${id}`)}
          />
        </div>
        {/* 페이지네이션 UI */}
        {totalPages > 1 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 12,
              marginTop: 32,
            }}
          >
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              style={{
                background: "none",
                border: "none",
                color: "#3A6351",
                fontWeight: 700,
                fontSize: "1.2rem",
                cursor: page === 1 ? "not-allowed" : "pointer",
                opacity: page === 1 ? 0.5 : 1,
              }}
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setPage(i + 1)}
                style={{
                  background: page === i + 1 ? "#3A6351" : "none",
                  color: page === i + 1 ? "#fff" : "#3A6351",
                  border: "none",
                  borderRadius: 6,
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  width: 32,
                  height: 32,
                  cursor: "pointer",
                  margin: "0 2px",
                  transition: "background 0.2s",
                }}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              style={{
                background: "none",
                border: "none",
                color: "#3A6351",
                fontWeight: 700,
                fontSize: "1.2rem",
                cursor: page === totalPages ? "not-allowed" : "pointer",
                opacity: page === totalPages ? 0.5 : 1,
              }}
            >
              &gt;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RentalPage;
