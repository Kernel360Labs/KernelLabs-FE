const ReservationSuccessModal = ({
  isOpen,
  reservationId,
  onClose,
}: {
  isOpen: boolean;
  reservationId: string;
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
        <h3
          style={{
            fontWeight: 700,
            fontSize: "1.2rem",
            marginBottom: 18,
          }}
        >
          예약이 완료되었습니다.
        </h3>
        <div
          style={{
            color: "#3A6351",
            fontWeight: 700,
            fontSize: "1.13rem",
            marginBottom: 10,
          }}
        >
          예약 번호는 [ {reservationId} ] 입니다.
          <br />
          <span
            style={{
              fontWeight: 500,
              fontSize: "1.01rem",
              color: "#444",
            }}
          >
            예약 조회/변경/취소 시 필요하오니 꼭 기억해주세요.
          </span>
        </div>
        <div
          style={{
            color: "#3A6351",
            fontWeight: 600,
            fontSize: "1.08rem",
            marginBottom: 18,
          }}
        >
          [예약 확인] 페이지에서 확인해주세요
        </div>
        <button
          onClick={onClose}
          style={{
            padding: "0.7rem 1.5rem",
            borderRadius: 8,
            border: "none",
            background: "#3A6351",
            color: "#fff",
            fontWeight: 700,
            fontSize: "1.05rem",
            cursor: "pointer",
          }}
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default ReservationSuccessModal;
