import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import RentalPlaceList from "../components/RentalPlaceList";
import RentalMapPlaceholder from "../components/RentalMapPlaceholder";
import RentalCalendar from "../components/RentalCalendar";
import RentalTimeSelector from "../components/RentalTimeSelector";

const dummyPlaces = [
  {
    id: 1,
    name: "의성 워케이션 센터",
    address: "경북 의성군 의성읍 중앙로 123",
  },
  { id: 2, name: "의성 카페 24시", address: "경북 의성군 봉양면 봉양로 45" },
  {
    id: 3,
    name: "의성 코워킹 스페이스",
    address: "경북 의성군 단촌면 단촌로 77",
  },
];

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

function RentalDetail({ place }: { place: (typeof dummyPlaces)[0] }) {
  const [date, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState<string[]>([]);
  const [reserved, setReserved] = useState(false);

  const handleReserve = () => {
    if (!selectedTime.length) return;
    setReserved(true);
    alert("예약이 완료되었습니다! (메일 전송은 추후 구현)");
  };

  return (
    <div style={{ maxWidth: 700, margin: "2rem auto", padding: 24 }}>
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
}

const RentalPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  if (id) {
    const place = dummyPlaces.find((p) => String(p.id) === id);
    if (!place) return <div>장소를 찾을 수 없습니다.</div>;
    return <RentalDetail place={place} />;
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
      <div style={{ maxWidth: 560, width: "100%", margin: "0 auto" }}>
        <RentalPlaceList
          places={dummyPlaces}
          onSelect={(id) => navigate(`/rental/${id}`)}
        />
      </div>
    </div>
  );
};

export default RentalPage;
