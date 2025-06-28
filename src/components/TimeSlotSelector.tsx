type Slot = {
  time: string;
  status: string;
};

const TimeSlotSelector = ({
  slots,
  selectedTime,
  onSelect,
  maxSelect = 3,
}: {
  slots: Slot[];
  selectedTime: string[];
  onSelect: (slots: string[]) => void;
  maxSelect?: number;
}) => {
  const handleClick = (slot: string, status: string) => {
    if (status === "UNAVAILABLE") return;
    const idx = selectedTime.indexOf(slot);
    let next: string[];
    if (idx > -1) {
      next = selectedTime.filter((s) => s !== slot);
    } else {
      if (selectedTime.length >= maxSelect) return;
      next = [...selectedTime, slot].sort();
    }
    // 연속성 체크
    if (next.length > 1) {
      const indices = next.map((s) => parseInt(s)).sort((a, b) => a - b);
      for (let i = 1; i < indices.length; i++) {
        if (indices[i] !== indices[i - 1] + 1) return;
      }
    }
    onSelect(next);
  };

  const getSlotStyle = (slot: Slot) => {
    const isSelected = selectedTime.includes(slot.time);
    const isMyReservation = slot.status === "MY_RESERVATION";

    if (isSelected) {
      return {
        padding: "0.55rem 0.9rem",
        borderRadius: 8,
        border: "2.5px solid #3A6351",
        background: "#3A6351",
        color: "#fff",
        fontWeight: 700,
        fontSize: "1.01rem",
        cursor: "pointer",
        marginBottom: 8,
        minWidth: 80,
        transition: "background 0.18s, color 0.18s, border 0.18s",
        opacity: 1,
      };
    }

    if (slot.status === "UNAVAILABLE") {
      return {
        padding: "0.55rem 0.9rem",
        borderRadius: 8,
        border: "1.5px solid #e0e0e0",
        background: "#f2f2f2",
        color: "#bbb",
        fontWeight: 700,
        fontSize: "1.01rem",
        cursor: "not-allowed",
        marginBottom: 8,
        minWidth: 80,
        transition: "background 0.18s, color 0.18s, border 0.18s",
        opacity: 0.55,
      };
    }

    if (isMyReservation) {
      return {
        padding: "0.55rem 0.9rem",
        borderRadius: 8,
        border: "1.5px solid #FFA500",
        background: "#fff",
        color: "#FFA500",
        fontWeight: 700,
        fontSize: "1.01rem",
        cursor: "pointer",
        marginBottom: 8,
        minWidth: 80,
        transition: "background 0.18s, color 0.18s, border 0.18s",
        opacity: 1,
      };
    }

    return {
      padding: "0.55rem 0.9rem",
      borderRadius: 8,
      border: "1.5px solid #e0e0e0",
      background: "#fff",
      color: "#222",
      fontWeight: 700,
      fontSize: "1.01rem",
      cursor: "pointer",
      marginBottom: 8,
      minWidth: 80,
      transition: "background 0.18s, color 0.18s, border 0.18s",
      opacity: 1,
    };
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        gap: 18,
        justifyContent: "center",
      }}
    >
      {slots.map((slot) => (
        <button
          key={slot.time}
          onClick={() => handleClick(slot.time, slot.status)}
          disabled={slot.status === "UNAVAILABLE"}
          style={getSlotStyle(slot)}
          title={
            slot.status === "MY_RESERVATION"
              ? "내 예약"
              : slot.status === "UNAVAILABLE"
              ? "다른 사람 예약"
              : "예약 가능"
          }
        >
          {slot.time}
          {slot.status === "MY_RESERVATION" && (
            <span style={{ fontSize: "0.8em", marginLeft: 4 }}>✓</span>
          )}
        </button>
      ))}
    </div>
  );
};

export default TimeSlotSelector;
