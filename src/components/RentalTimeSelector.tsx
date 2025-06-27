type TimeSlotGroup = { label: string; slots: string[] };

const RentalTimeSelector = ({
  selectedTime,
  onSelect,
  timeSlots,
}: {
  selectedTime: string[];
  onSelect: (slots: string[]) => void;
  timeSlots: TimeSlotGroup[];
}) => {
  // 모든 슬롯을 평탄화하여 인덱스 기반 연속성 체크
  const allSlots = timeSlots.flatMap((g) => g.slots);

  const handleClick = (slot: string) => {
    const idx = selectedTime.indexOf(slot);
    let next: string[];
    if (idx > -1) {
      // 이미 선택된 경우 해제
      next = selectedTime.filter((s) => s !== slot);
    } else {
      // 새로 선택
      if (selectedTime.length >= 3) return; // 최대 3개
      next = [...selectedTime, slot].sort(
        (a, b) => allSlots.indexOf(a) - allSlots.indexOf(b)
      );
    }
    // 연속성 체크
    if (next.length > 1) {
      const indices = next
        .map((s) => allSlots.indexOf(s))
        .sort((a, b) => a - b);
      for (let i = 1; i < indices.length; i++) {
        if (indices[i] !== indices[i - 1] + 1) return; // 불연속이면 무시
      }
    }
    onSelect(next);
  };

  return (
    <div style={{ width: "100%", maxWidth: 420, marginTop: 16 }}>
      {timeSlots.map((group) => (
        <div key={group.label} style={{ marginBottom: 12 }}>
          <div style={{ color: "#888", marginBottom: 6 }}>{group.label}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {group.slots.map((slot) => (
              <button
                key={slot}
                onClick={() => handleClick(slot)}
                style={{
                  padding: "0.7rem 1.2rem",
                  borderRadius: 8,
                  border: selectedTime.includes(slot)
                    ? "2px solid #3A6351"
                    : "1.5px solid #e0e0e0",
                  background: selectedTime.includes(slot) ? "#3A6351" : "#fff",
                  color: selectedTime.includes(slot) ? "#fff" : "#333",
                  fontWeight: 600,
                  fontSize: "1.05rem",
                  cursor: "pointer",
                  opacity: slot === "11:00" && group.label === "오전" ? 0.5 : 1,
                  pointerEvents:
                    slot === "11:00" && group.label === "오전"
                      ? "none"
                      : "auto",
                  marginBottom: 6,
                }}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RentalTimeSelector;
