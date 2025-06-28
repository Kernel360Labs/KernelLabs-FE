import { useNavigate, useParams } from "react-router-dom";
import RentalPlaceList from "../components/RentalPlaceList";
import { usePlaces } from "../hooks/usePlaces";

const RentalPage = () => {
  const navigate = useNavigate();
  const { places, loading, error, refetch } = usePlaces();

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
        <RentalPlaceList
          places={places}
          onSelect={(id) => navigate(`/rental/${id}`)}
        />
      </div>
    </div>
  );
};

export default RentalPage;
