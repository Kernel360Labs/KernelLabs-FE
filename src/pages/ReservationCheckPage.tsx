import { useState } from "react";
import { placeService } from "../services/placeService";
import { useReservationStore } from "../stores/placeStore";

const ReservationCheckPage = () => {
  const [reservationId, setReservationId] = useState("");
  const [password, setPassword] = useState("");
  const {
    reserving: loading,
    reservationError: error,
    reservationResult: result,
    setReserving,
    setReservationError,
    setReservationResult,
  } = useReservationStore();

  const handleCheck = async () => {
    setReserving(true);
    setReservationError(null);
    setReservationResult(null);
    try {
      const res = await placeService.checkReservation(reservationId, password);
      setReservationResult(res);
    } catch (e: any) {
      setReservationError(
        e?.response?.data?.message ||
          e.message ||
          "예약 내역을 찾을 수 없습니다."
      );
    } finally {
      setReserving(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: 420,
        margin: "3rem auto",
        padding: 32,
        background: "#fff",
        borderRadius: 16,
        boxShadow: "0 4px 24px rgba(58,99,81,0.08)",
      }}
    >
      <h2
        style={{
          fontWeight: 800,
          fontSize: "1.5rem",
          marginBottom: 18,
          color: "#3A6351",
        }}
      >
        예약 확인
      </h2>
      <div style={{ marginBottom: 18, color: "#666" }}>
        예약번호와 예약 시 입력한 4자리 비밀번호를 입력하세요.
      </div>
      <input
        type="text"
        inputMode="numeric"
        maxLength={8}
        pattern="[0-9]*"
        value={reservationId}
        onChange={(e) => {
          if (/^\d{0,8}$/.test(e.target.value))
            setReservationId(e.target.value);
        }}
        style={{
          fontSize: "1.1rem",
          padding: "0.6rem 1.1rem",
          borderRadius: 8,
          border: "1.5px solid #3A6351",
          marginBottom: 12,
          width: 160,
          textAlign: "center",
          letterSpacing: "0.1em",
        }}
        placeholder="예약번호"
      />
      <input
        type="password"
        inputMode="numeric"
        maxLength={4}
        pattern="[0-9]*"
        value={password}
        onChange={(e) => {
          if (/^\d{0,4}$/.test(e.target.value)) setPassword(e.target.value);
        }}
        style={{
          fontSize: "1.1rem",
          padding: "0.6rem 1.1rem",
          borderRadius: 8,
          border: "1.5px solid #3A6351",
          marginBottom: 18,
          width: 160,
          textAlign: "center",
          letterSpacing: "0.3em",
          marginLeft: 12,
        }}
        placeholder="비밀번호"
      />
      <button
        onClick={handleCheck}
        disabled={
          reservationId.length === 0 || password.length !== 4 || loading
        }
        style={{
          padding: "0.7rem 1.5rem",
          borderRadius: 8,
          border: "none",
          background:
            reservationId.length > 0 && password.length === 4 && !loading
              ? "#3A6351"
              : "#e0e0e0",
          color: "#fff",
          fontWeight: 700,
          fontSize: "1.05rem",
          cursor:
            reservationId.length > 0 && password.length === 4 && !loading
              ? "pointer"
              : "not-allowed",
          marginLeft: 12,
        }}
      >
        {loading ? "조회 중..." : "예약 확인"}
      </button>
      {error && <div style={{ color: "#e74c3c", marginTop: 16 }}>{error}</div>}
      {result && (
        <div
          style={{
            marginTop: 28,
            color: "#222",
            background: "#f8faf8",
            borderRadius: 10,
            padding: 18,
          }}
        >
          <div style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: 8 }}>
            예약 정보
          </div>
          <div>장소: {result.data.placeName}</div>
          <div>날짜: {result.data.reservationDate}</div>
          <div>
            시간: {result.data.startTime} ~ {result.data.endTime}
          </div>
          <div>예약번호: {result.data.reservationId}</div>
        </div>
      )}
    </div>
  );
};

export default ReservationCheckPage;
