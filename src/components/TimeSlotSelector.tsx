type Slot = {
  time: string;
  status: string;
};

const TimeSlotSelector = ({
  slots,
  selectedTime,
  onSelect,
  maxSelect = 3,
  selectedDate,
}: {
  slots: Slot[];
  selectedTime: string[];
  onSelect: (slots: string[]) => void;
  maxSelect?: number;
  selectedDate?: Date;
}) => {
  const handleClick = (slot: string, status: string) => {
    if (status === "UNAVAILABLE") return;

    // 오늘 날짜인 경우에만 현재 시간 체크
    if (selectedDate) {
      const today = new Date();
      const isToday = selectedDate.toDateString() === today.toDateString();

      if (isToday) {
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        const slotHour = parseInt(slot.split(":")[0]);
        const slotMinute = parseInt(slot.split(":")[1]);

        // 현재 시간보다 이전인 경우 클릭 불가
        if (
          slotHour < currentHour ||
          (slotHour === currentHour && slotMinute <= currentMinute)
        ) {
          return;
        }
      }
    }

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

    // 오늘 날짜인 경우에만 현재 시간 체크
    let isPastTime = false;
    if (selectedDate) {
      const today = new Date();
      const isToday = selectedDate.toDateString() === today.toDateString();

      if (isToday) {
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        const slotHour = parseInt(slot.time.split(":")[0]);
        const slotMinute = parseInt(slot.time.split(":")[1]);
        isPastTime =
          slotHour < currentHour ||
          (slotHour === currentHour && slotMinute <= currentMinute);
      }
    }

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

    if (slot.status === "UNAVAILABLE" || isPastTime) {
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
      {slots.map((slot) => {
        // 오늘 날짜인 경우에만 현재 시간 체크
        let isPastTime = false;
        if (selectedDate) {
          const today = new Date();
          const isToday = selectedDate.toDateString() === today.toDateString();

          if (isToday) {
            const now = new Date();
            const currentHour = now.getHours();
            const currentMinute = now.getMinutes();
            const slotHour = parseInt(slot.time.split(":")[0]);
            const slotMinute = parseInt(slot.time.split(":")[1]);
            isPastTime =
              slotHour < currentHour ||
              (slotHour === currentHour && slotMinute <= currentMinute);
          }
        }

        const isDisabled = slot.status === "UNAVAILABLE" || isPastTime;

        return (
          <button
            key={slot.time}
            onClick={() => handleClick(slot.time, slot.status)}
            disabled={isDisabled}
            style={getSlotStyle(slot)}
            title={
              isPastTime
                ? "지난 시간"
                : slot.status === "MY_RESERVATION"
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
        );
      })}
    </div>
  );
};

export default TimeSlotSelector;
