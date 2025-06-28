const DeleteSuccessModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
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
        <div
          style={{
            width: 60,
            height: 60,
            background: "#4CAF50",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 20,
            fontSize: "2rem",
          }}
        >
          ✓
        </div>

        <h3
          style={{
            fontWeight: 700,
            fontSize: "1.2rem",
            marginBottom: 12,
            color: "#222",
          }}
        >
          삭제되었습니다
        </h3>

        <div
          style={{
            color: "#666",
            textAlign: "center",
            marginBottom: 24,
            lineHeight: 1.5,
          }}
        >
          예약이 성공적으로 취소되었습니다.
        </div>

        <button
          onClick={onClose}
          style={{
            padding: "0.7rem 1.5rem",
            borderRadius: 8,
            border: "none",
            background: "#4CAF50",
            color: "#fff",
            fontWeight: 700,
            fontSize: "1.05rem",
            cursor: "pointer",
            minWidth: 100,
          }}
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default DeleteSuccessModal;
