type TimeSlotGroup = { label: string; slots: string[] };

const RentalTimeSelector = ({
  selectedTime,
  onSelect,
  timeSlots,
}: {
  selectedTime: string | null;
  onSelect: (slot: string) => void;
  timeSlots: TimeSlotGroup[];
}) => (
  <div style={{ width: "100%", maxWidth: 420, marginTop: 16 }}>
    {timeSlots.map((group) => (
      <div key={group.label} style={{ marginBottom: 12 }}>
        <div style={{ color: "#888", marginBottom: 6 }}>{group.label}</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {group.slots.map((slot) => (
            <button
              key={slot}
              onClick={() => onSelect(slot === selectedTime ? "" : slot)}
              style={{
                padding: "0.7rem 1.2rem",
                borderRadius: 8,
                border:
                  selectedTime === slot
                    ? "2px solid #3A6351"
                    : "1.5px solid #e0e0e0",
                background: selectedTime === slot ? "#3A6351" : "#fff",
                color: selectedTime === slot ? "#fff" : "#333",
                fontWeight: 600,
                fontSize: "1.05rem",
                cursor: "pointer",
                opacity: slot === "11:00" && group.label === "오전" ? 0.5 : 1,
                pointerEvents:
                  slot === "11:00" && group.label === "오전" ? "none" : "auto",
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

export default RentalTimeSelector;
