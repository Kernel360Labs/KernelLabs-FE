import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../App.css";

const RentalCalendar = ({
  value,
  onChange,
}: {
  value: Date;
  onChange: (date: Date) => void;
}) => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "24px 0",
    }}
  >
    <Calendar
      value={value}
      onChange={onChange as any}
      minDate={new Date()}
      calendarType="gregory"
      locale="ko-KR"
    />
  </div>
);

export default RentalCalendar;
