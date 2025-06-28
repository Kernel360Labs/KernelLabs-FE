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
            background: "linear-gradient(135deg, #f8faf8 0%, #f0f4f0 100%)",
            borderRadius: 16,
            padding: 24,
            border: "1px solid #e8f0e8",
            boxShadow: "0 2px 12px rgba(58,99,81,0.06)",
          }}
        >
          <div
            style={{
              fontWeight: 800,
              fontSize: "1.2rem",
              marginBottom: 20,
              color: "#3A6351",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span role="img" aria-label="check">
              ✅
            </span>
            예약 정보
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 24,
                  height: 24,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.2rem",
                }}
              >
                📍
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{ fontSize: "0.9rem", color: "#666", marginBottom: 2 }}
                >
                  장소
                </div>
                <div style={{ fontWeight: 600, color: "#222" }}>
                  {result.data.placeName}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 24,
                  height: 24,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.2rem",
                }}
              >
                📅
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{ fontSize: "0.9rem", color: "#666", marginBottom: 2 }}
                >
                  날짜
                </div>
                <div style={{ fontWeight: 600, color: "#222" }}>
                  {result.data.reservationDate}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 24,
                  height: 24,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.2rem",
                }}
              >
                ⏰
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{ fontSize: "0.9rem", color: "#666", marginBottom: 2 }}
                >
                  시간
                </div>
                <div style={{ fontWeight: 600, color: "#222" }}>
                  {result.data.startTime.slice(0, 5)} ~{" "}
                  {result.data.endTime.slice(0, 5)}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 24,
                  height: 24,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.2rem",
                }}
              >
                🔢
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{ fontSize: "0.9rem", color: "#666", marginBottom: 2 }}
                >
                  예약번호
                </div>
                <div style={{ fontWeight: 600, color: "#222" }}>
                  {result.data.reservationId}
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              marginTop: 24,
              paddingTop: 20,
              borderTop: "1px solid #e0e8e0",
              display: "flex",
              gap: 12,
              justifyContent: "center",
            }}
          >
            <button
              onClick={() => {
                // TODO: 예약 수정 로직 구현
                alert("예약 수정 기능은 준비 중입니다.");
              }}
              style={{
                padding: "0.7rem 1.2rem",
                borderRadius: 8,
                border: "1.5px solid #3A6351",
                background: "#fff",
                color: "#3A6351",
                fontWeight: 600,
                fontSize: "0.95rem",
                cursor: "pointer",
                transition: "all 0.2s",
                minWidth: 80,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#3A6351";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#fff";
                e.currentTarget.style.color = "#3A6351";
              }}
            >
              수정
            </button>
            <button
              onClick={() => {
                if (window.confirm("정말로 이 예약을 취소하시겠습니까?")) {
                  // TODO: 예약 삭제 로직 구현
                  alert("예약 취소 기능은 준비 중입니다.");
                }
              }}
              style={{
                padding: "0.7rem 1.2rem",
                borderRadius: 8,
                border: "1.5px solid #e74c3c",
                background: "#fff",
                color: "#e74c3c",
                fontWeight: 600,
                fontSize: "0.95rem",
                cursor: "pointer",
                transition: "all 0.2s",
                minWidth: 80,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#e74c3c";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#fff";
                e.currentTarget.style.color = "#e74c3c";
              }}
            >
              삭제
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationCheckPage;
