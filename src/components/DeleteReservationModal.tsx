const DeleteReservationModal = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  error,
  password,
  onPasswordChange,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  error: string | null;
  password: string;
  onPasswordChange: (value: string) => void;
}) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.25)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          padding: 32,
          minWidth: 320,
          boxShadow: "0 4px 24px rgba(0,0,0,0.13)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h3
          style={{
            fontWeight: 700,
            fontSize: "1.2rem",
            marginBottom: 18,
            color: "#e74c3c",
          }}
        >
          정말 삭제하시겠습니까?
        </h3>

        <div style={{ marginBottom: 24, textAlign: "center", color: "#666" }}>
          예약을 취소하려면 비밀번호를 입력해주세요.
        </div>

        <input
          type="password"
          inputMode="numeric"
          maxLength={4}
          pattern="[0-9]*"
          value={password}
          onChange={(e) => {
            if (/^\d{0,4}$/.test(e.target.value))
              onPasswordChange(e.target.value);
          }}
          style={{
            fontSize: "1.3rem",
            padding: "0.7rem 1.2rem",
            borderRadius: 8,
            border: "1.5px solid #e74c3c",
            marginBottom: 18,
            width: 160,
            textAlign: "center",
            letterSpacing: "0.3em",
          }}
          placeholder="4자리 숫자"
        />

        {error && (
          <div style={{ color: "#e74c3c", marginBottom: 10 }}>{error}</div>
        )}

        <div style={{ display: "flex", gap: 12 }}>
          <button
            onClick={onClose}
            style={{
              padding: "0.7rem 1.5rem",
              borderRadius: 8,
              border: "none",
              background: "#eee",
              color: "#333",
              fontWeight: 600,
              fontSize: "1.05rem",
              cursor: "pointer",
            }}
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            disabled={password.length !== 4 || loading}
            style={{
              padding: "0.7rem 1.5rem",
              borderRadius: 8,
              border: "none",
              background:
                password.length === 4 && !loading ? "#e74c3c" : "#e0e0e0",
              color: "#fff",
              fontWeight: 700,
              fontSize: "1.05rem",
              cursor:
                password.length === 4 && !loading ? "pointer" : "not-allowed",
            }}
          >
            {loading ? "삭제 중..." : "삭제"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteReservationModal;
