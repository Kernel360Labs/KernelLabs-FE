import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { usePlaces } from "../hooks/usePlaces";
import RentalMapPlaceholder from "../components/RentalMapPlaceholder";
import RentalCalendar from "../components/RentalCalendar";
import RentalTimeSelector from "../components/RentalTimeSelector";

const timeSlots = [
  { label: "오전", slots: ["11:00"] },
  {
    label: "오후",
    slots: [
      "12:00",
      "1:00",
      "2:00",
      "3:00",
      "4:00",
      "5:00",
      "6:00",
      "7:00",
      "8:00",
    ],
  },
];

const RentalDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { places, loading, error, refetch } = usePlaces();
  const [date, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState<string[]>([]);
  const [reserved, setReserved] = useState(false);

  const place = places.find((p) => String(p.id) === id);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <div style={{ fontSize: "1.2rem", color: "#666" }}>로딩 중...</div>
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

  if (!place) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        장소를 찾을 수 없습니다.
      </div>
    );
  }

  const handleReserve = () => {
    if (!selectedTime.length) return;
    setReserved(true);
    alert("예약이 완료되었습니다! (메일 전송은 추후 구현)");
  };

  return (
    <div style={{ maxWidth: 700, margin: "2rem auto", padding: 24 }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: 18,
          background: "none",
          border: "none",
          color: "#3A6351",
          fontWeight: 600,
          fontSize: "1.1rem",
          cursor: "pointer",
        }}
      >
        ← 목록으로
      </button>
      <h2 style={{ fontWeight: 700, fontSize: "1.5rem", marginBottom: 8 }}>
        {place.name}
      </h2>
      <div style={{ color: "#888", marginBottom: 18 }}>{place.address}</div>
      <RentalMapPlaceholder address={place.address} />
      <div style={{ fontWeight: 600, fontSize: "1.1rem", marginBottom: 16 }}>
        <span role="img" aria-label="calendar">
          📅
        </span>{" "}
        날짜와 시간을 선택해 주세요
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
        }}
      >
        <RentalCalendar value={date} onChange={setDate} />
        <RentalTimeSelector
          selectedTime={selectedTime}
          onSelect={setSelectedTime}
          timeSlots={timeSlots}
        />
        <button
          onClick={handleReserve}
          disabled={!selectedTime.length}
          style={{
            marginTop: 18,
            padding: "0.9rem 2.2rem",
            borderRadius: 10,
            border: "none",
            background: selectedTime.length
              ? reserved
                ? "#aaa"
                : "#3A6351"
              : "#e0e0e0",
            color: "#fff",
            fontWeight: 700,
            fontSize: "1.15rem",
            cursor:
              selectedTime.length && !reserved ? "pointer" : "not-allowed",
            transition: "background 0.2s",
          }}
        >
          {reserved ? "예약 완료" : selectedTime.length ? "예약 완료" : "예약"}
        </button>
      </div>
    </div>
  );
};

export default RentalDetailPage;
