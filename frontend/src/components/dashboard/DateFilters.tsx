import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import type { DateFiltersProps } from "../../types/dashboard";

const DateFilters = ({
  startDate,
  endDate,
  onDateChange,
}: DateFiltersProps) => {
  const handleDateChange = (
    date: Date | null,
    type: "startDate" | "endDate"
  ) => {
    if (date) {
      const offset = date.getTimezoneOffset();
      const localDate = new Date(date.getTime() - offset * 60 * 1000);
      const dateString = localDate.toISOString().split("T")[0];
      onDateChange(type, dateString);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        <label className="text-xs text-zinc-500">Start Date</label>
        <div className="w-full">
          <DatePicker
            selected={startDate ? new Date(startDate) : null}
            onChange={(date: Date | null) =>
              handleDateChange(date, "startDate")
            }
            className="w-full bg-zinc-900 p-2 rounded border border-zinc-800 text-sm focus:outline-none focus:border-blue-500"
            dateFormat="yyyy-MM-dd"
            placeholderText="Select start date"
          />
        </div>

        <label className="text-xs text-zinc-500">End Date</label>
        <div className="w-full">
          <DatePicker
            selected={endDate ? new Date(endDate) : null}
            onChange={(date: Date | null) => handleDateChange(date, "endDate")}
            className="w-full bg-zinc-900 p-2 rounded border border-zinc-800 text-sm focus:outline-none focus:border-blue-500"
            dateFormat="yyyy-MM-dd"
            placeholderText="Select end date"
          />
        </div>
      </div>
    </div>
  );
};

export default DateFilters;
