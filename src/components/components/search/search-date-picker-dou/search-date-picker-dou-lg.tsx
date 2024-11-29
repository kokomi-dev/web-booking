import { SearchDatePickerDouLGProps } from "@/utils/types/search";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import React from "react";

const SearchDatePickerDouLG: React.FC<SearchDatePickerDouLGProps> = ({
  date,
  setDate,
  className,
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id="date"
          variant="ghost"
          className={cn(
            "hidden w-full h-[40px] bg-white px-2 py-1 text-small font-medium",
            !date && "bg-white w-full",
            className,
            "lg:flex xl:flex"
          )}
        >
          {date?.from ? (
            date.to ? (
              <span className="w-full h-full flex items-center justify-start gap-x-1 text-small font-medium">
                <CalendarIcon className="mr-3 text-black size-[1.1rem]" />
                {format(date.from, "dd/MM/yyyy", { locale: vi })} -{" "}
                {format(date.to, " dd/MM/yyyy", { locale: vi })}
              </span>
            ) : (
              format(date.from, "dd/MM/yyyy", { locale: vi })
            )
          ) : (
            <span className="w-full h-full">Chọn ngày đi và trả phòng</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto p-0 bg-white text-black z-[15]"
        align="center"
      >
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
          locale={vi}
          className="text-normal font-normal bg-white "
        />
      </PopoverContent>
    </Popover>
  );
};

export default SearchDatePickerDouLG;
