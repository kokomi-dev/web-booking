import React, { useState } from "react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";

import { SearchDatePickerDouLGProps } from "@/utils/types/search";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const SearchDatePickerDouLG: React.FC<SearchDatePickerDouLGProps> = ({
  date,
  setDate,
  className,
}) => {
  const [open, setOpen] = useState(false);
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);

  const handleDayHover = (date: Date | null) => {
    setHoveredDate(date);
  };
  // { from?: Date; to?: Date }
  const handleDaySelect = (range: any) => {
    if (range?.from && range?.to) {
      setDate({ from: range.from, to: range.to });
      setOpen(false);
    } else {
      setDate({ ...date, ...range });
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger>
        <Button
          id="date"
          variant="ghost"
          onClick={(e) => {
            e.preventDefault();
            setOpen(!open);
          }}
          className={cn(
            "hidden w-full h-[40px] bg-white px-2 py-1 text-small font-medium",
            !date && "bg-white w-full",
            className,
            "md:flex"
          )}
        >
          {date?.from ? (
            date.to ? (
              <span className="w-full h-full flex items-center justify-start gap-x-1 text-small font-medium">
                <CalendarIcon className="mr-3 text-black size-[1.1rem]" />
                {format(date.from, "dd/MM/yyyy", { locale: vi })} -{" "}
                {format(date.to, "dd/MM/yyyy", { locale: vi })}
              </span>
            ) : (
              <span className="w-full h-full flex items-center justify-start gap-x-1 text-small font-medium">
                <CalendarIcon className="mr-1 text-black size-[1.1rem]" />
                {format(date.from, "dd/MM/yyyy", { locale: vi })}
              </span>
            )
          ) : (
            <div className="w-full flex items-center justify-start gap-x-1">
              <CalendarIcon className="mr-1 text-black size-[1.1rem]" />
              <span className="w-full h-full text-start">
                Chọn ngày đi và trả phòng
              </span>
            </div>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        onMouseLeave={() => {
          setHoveredDate(null);
        }}
        className="w-full p-4 bg-white text-black z-[15]"
        align="start"
      >
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={handleDaySelect}
          onDayMouseEnter={handleDayHover}
          numberOfMonths={2}
          locale={vi}
          className="w-full flex items-center justify-between bg-white text-normal font-normal"
          modifiers={{
            inRange: (day) =>
              date?.from &&
              hoveredDate &&
              day > date.from &&
              day <= hoveredDate,
          }}
          modifiersClassNames={{
            inRange: "bg-blue-100",
          }}
        />
      </PopoverContent>
    </Popover>
  );
};

export default SearchDatePickerDouLG;
