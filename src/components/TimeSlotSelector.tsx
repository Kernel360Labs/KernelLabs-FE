type Slot = { time: string; available: boolean };

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
  const handleClick = (slot: string, available: boolean) => {
    if (!available) return;
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
          onClick={() => handleClick(slot.time, slot.available)}
          disabled={!slot.available}
          style={{
            padding: "0.55rem 0.9rem",
            borderRadius: 8,
            border: selectedTime.includes(slot.time)
              ? "2.5px solid #3A6351"
              : "1.5px solid #e0e0e0",
            background: selectedTime.includes(slot.time)
              ? "#3A6351"
              : slot.available
              ? "#fff"
              : "#f2f2f2",
            color: selectedTime.includes(slot.time)
              ? "#fff"
              : slot.available
              ? "#222"
              : "#bbb",
            fontWeight: 700,
            fontSize: "1.01rem",
            cursor: slot.available ? "pointer" : "not-allowed",
            marginBottom: 8,
            minWidth: 80,
            transition: "background 0.18s, color 0.18s, border 0.18s",
            opacity: slot.available ? 1 : 0.55,
          }}
        >
          {slot.time}
        </button>
      ))}
    </div>
  );
};

export default TimeSlotSelector;
