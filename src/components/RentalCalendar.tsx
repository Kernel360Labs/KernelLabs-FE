import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const RentalCalendar = ({
  value,
  onChange,
}: {
  value: Date;
  onChange: (date: Date) => void;
}) => (
  <Calendar
    value={value}
    onChange={onChange as any}
    minDate={new Date()}
    calendarType="gregory"
    locale="ko-KR"
  />
);

export default RentalCalendar;
