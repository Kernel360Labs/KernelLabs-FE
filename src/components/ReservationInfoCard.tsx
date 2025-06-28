type ReservationData = {
  placeName: string;
  reservationDate: string;
  startTime: string;
  endTime: string;
  reservationId: string | number;
};

const ReservationInfoCard = ({
  reservationData,
  onEdit,
  onDelete,
}: {
  reservationData: ReservationData;
  onEdit: () => void;
  onDelete: () => void;
}) => (
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
          <div style={{ fontSize: "0.9rem", color: "#666", marginBottom: 2 }}>
            장소
          </div>
          <div style={{ fontWeight: 600, color: "#222" }}>
            {reservationData.placeName}
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
          <div style={{ fontSize: "0.9rem", color: "#666", marginBottom: 2 }}>
            날짜
          </div>
          <div style={{ fontWeight: 600, color: "#222" }}>
            {reservationData.reservationDate}
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
          <div style={{ fontSize: "0.9rem", color: "#666", marginBottom: 2 }}>
            시간
          </div>
          <div style={{ fontWeight: 600, color: "#222" }}>
            {reservationData.startTime.slice(0, 5)} ~{" "}
            {reservationData.endTime.slice(0, 5)}
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
          <div style={{ fontSize: "0.9rem", color: "#666", marginBottom: 2 }}>
            예약번호
          </div>
          <div style={{ fontWeight: 600, color: "#222" }}>
            {reservationData.reservationId}
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
        onClick={onEdit}
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
        onClick={onDelete}
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
);

export default ReservationInfoCard;
