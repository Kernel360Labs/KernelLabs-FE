const ReservationCheckForm = ({
  reservationId,
  password,
  onReservationIdChange,
  onPasswordChange,
  onCheck,
  loading,
}: {
  reservationId: string;
  password: string;
  onReservationIdChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onCheck: () => void;
  loading: boolean;
}) => (
  <>
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
          onReservationIdChange(e.target.value);
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
        if (/^\d{0,4}$/.test(e.target.value)) onPasswordChange(e.target.value);
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
      onClick={onCheck}
      disabled={reservationId.length === 0 || password.length !== 4 || loading}
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
  </>
);

export default ReservationCheckForm;
