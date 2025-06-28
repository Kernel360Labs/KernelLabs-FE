import { useState } from "react";
import { useReservationStore } from "../stores/placeStore";
import { placeService } from "../services/placeService";

const ReservationCheckPage = () => {
  const [password, setPassword] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheck = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      // 실제 API 엔드포인트에 맞게 수정 필요
      const res = await placeService.checkReservation(password);
      setResult(res.data);
    } catch (e: any) {
      setError(
        e?.response?.data?.message ||
          e.message ||
          "예약 내역을 찾을 수 없습니다."
      );
    } finally {
      setLoading(false);
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
        예약 시 입력한 4자리 비밀번호를 입력하세요.
      </div>
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
          fontSize: "1.3rem",
          padding: "0.7rem 1.2rem",
          borderRadius: 8,
          border: "1.5px solid #3A6351",
          marginBottom: 18,
          width: 160,
          textAlign: "center",
          letterSpacing: "0.3em",
        }}
        placeholder="4자리 숫자"
      />
      <button
        onClick={handleCheck}
        disabled={password.length !== 4 || loading}
        style={{
          padding: "0.7rem 1.5rem",
          borderRadius: 8,
          border: "none",
          background: password.length === 4 && !loading ? "#3A6351" : "#e0e0e0",
          color: "#fff",
          fontWeight: 700,
          fontSize: "1.05rem",
          cursor: password.length === 4 && !loading ? "pointer" : "not-allowed",
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
          <div>장소: {result.placeName}</div>
          <div>날짜: {result.reservationDate}</div>
          <div>
            시간: {result.startTime} ~ {result.endTime}
          </div>
          <div>예약번호: {result.reservationId}</div>
        </div>
      )}
    </div>
  );
};

export default ReservationCheckPage;
