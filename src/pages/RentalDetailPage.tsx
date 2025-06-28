import { useParams, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { usePlaceDetail } from "../hooks/usePlaces";
import RentalCalendar from "../components/RentalCalendar";
import { useReservationStore } from "../stores/placeStore";
import { placeService } from "../services/placeService";
import PlaceImage from "../components/PlaceImage";
import PlaceInfo from "../components/PlaceInfo";
import TimeSlotSelector from "../components/TimeSlotSelector";
import ReservationModal from "../components/ReservationModal";
import ReservationSuccessModal from "../components/ReservationSuccessModal";
import KakaoMap from "../components/KakaoMap";

const RentalDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState<string[]>([]);
  const [reserved] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const {
    reserving,
    reservationError,
    reservationResult,
    setReserving,
    setReservationError,
    setReservationResult,
    resetReservation,
  } = useReservationStore();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const queryClient = useQueryClient();

  // 날짜를 YYYY-MM-DD로 변환
  const selectedDateStr = date.toISOString().slice(0, 10);
  const { place, loading, error, refetch } = usePlaceDetail(
    id,
    selectedDateStr
  );

  // 시간 슬롯 계산 (API에서 제공하는 timeSlots 사용)
  const timeSlots = useMemo(() => {
    if (!place) return [];
    if (place.timeSlots && place.timeSlots.length > 0) {
      return [
        {
          label: `${place.openTime.slice(0, 5)} ~ ${place.closeTime.slice(
            0,
            5
          )}`,
          slots: place.timeSlots,
        },
      ];
    }
    return [];
  }, [place]);

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

  // 예약 API 호출
  const handleReserveRequest = async () => {
    if (!place || !selectedTime.length || password.length !== 4) return;
    setReserving(true);
    setReservationError(null);
    try {
      const res = await placeService.reserve({
        placeId: place.id,
        password,
        reservationDate: date.toISOString().slice(0, 10),
        timeSlots: selectedTime.sort(),
      });
      setReservationResult(res);
      setShowModal(false);
      setShowSuccessModal(true);
      setPassword("");
      setSelectedTime([]);
      await refetch();
      queryClient.invalidateQueries({
        queryKey: ["placeDetail", id, selectedDateStr],
      });
    } catch (e: any) {
      setReservationError(
        e?.response?.data?.message || e.message || "예약에 실패했습니다."
      );
    } finally {
      setReserving(false);
    }
  };

  // 예약 버튼 클릭 시 모달 오픈
  const handleReserve = () => {
    setShowModal(true);
    resetReservation();
  };

  // 모달 닫기
  const closeModal = () => {
    setShowModal(false);
    setPassword("");
    resetReservation();
  };

  return (
    <div
      style={{
        maxWidth: 700,
        margin: "2rem auto",
        padding: 0,
        background: "#fff",
        borderRadius: 18,
        boxShadow: "0 4px 24px rgba(58,99,81,0.08)",
      }}
    >
      <PlaceImage thumbnailUrl={place.thumbnailUrl} name={place.name} />
      <div style={{ padding: 24 }}>
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
        <PlaceInfo
          name={place.name}
          description={place.description || ""}
          openTime={place.openTime}
          closeTime={place.closeTime}
          unitPrice={place.unitPrice || 0}
        />
        <KakaoMap address={place.address} />
        <div
          style={{
            fontWeight: 600,
            fontSize: "1.1rem",
            margin: "18px 0 16px 0",
          }}
        >
          <span role="img" aria-label="calendar">
            📅
          </span>{" "}
          날짜와 시간을 선택해 주세요
        </div>
        {/* 달력/시간 flex row: 완벽히 세로 중앙 정렬, 높이 통일, 가운데 정렬 */}
        <div
          style={{
            display: "flex",
            flexDirection: window.innerWidth < 700 ? "column" : "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 32,
            width: "100%",
            margin: "0 auto",
            maxWidth: 900,
            minHeight: 340,
          }}
        >
          <div
            style={{
              width: 360,
              minWidth: 260,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: 320,
            }}
          >
            <div style={{ width: "100%" }}>
              <RentalCalendar value={date} onChange={setDate} />
            </div>
          </div>
          {/* 시간 선택: open~close 기준 1시간 단위 버튼 */}
          {timeSlots.length > 0 && (
            <div
              style={{
                width: 360,
                minWidth: 180,
                maxWidth: 420,
                marginTop: window.innerWidth < 700 ? 16 : 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 320,
              }}
            >
              <TimeSlotSelector
                slots={timeSlots[0].slots}
                selectedTime={selectedTime}
                onSelect={setSelectedTime}
                maxSelect={3}
                selectedDate={date}
              />
            </div>
          )}
        </div>
        {/* 예약 버튼 */}
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 32 }}
        >
          <button
            onClick={handleReserve}
            disabled={!selectedTime.length}
            style={{
              width: 260,
              maxWidth: "90vw",
              padding: "1.1rem 0",
              borderRadius: 10,
              border: "none",
              background: selectedTime.length
                ? reserved
                  ? "#aaa"
                  : "#3A6351"
                : "#e0e0e0",
              color: "#fff",
              fontWeight: 700,
              fontSize: "1.18rem",
              cursor: selectedTime.length ? "pointer" : "not-allowed",
              transition: "background 0.2s",
              boxShadow: "0 2px 8px rgba(58,99,81,0.08)",
            }}
          >
            예약
          </button>
        </div>

        <ReservationModal
          isOpen={showModal}
          onClose={closeModal}
          onSubmit={handleReserveRequest}
          reserving={reserving}
          error={reservationError}
          password={password}
          onPasswordChange={setPassword}
        />

        <ReservationSuccessModal
          isOpen={showSuccessModal}
          reservationId={String(reservationResult?.data.reservationId || "")}
          onClose={() => {
            setShowSuccessModal(false);
            resetReservation();
          }}
        />
      </div>
    </div>
  );
};

export default RentalDetailPage;
