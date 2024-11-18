import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { SearchDatePickerDouProps } from "@/utils/types/search";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

const SearchDatePickerDou: React.FC<SearchDatePickerDouProps> = ({
  className,
  date,
  setDate,
}) => (
  <Popover>
    <PopoverTrigger asChild>
      <Button
        id="date"
        variant="ghost"
        className={cn(
          "w-full h-[40px] bg-bg_primary_white px-2 py-1 font-medium",
          !date && "bg-bg_primary_white w-full",
          className
        )}
      >
        {date?.from ? (
          date.to ? (
            <span className="w-full h-full flex items-center justify-start gap-x-1 text-small">
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
      className="w-auto p-0 bg-bg_primary_white text-black z-[15]"
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
        className="text-normal font-normal bg-bg_primary_white "
      />
    </PopoverContent>
  </Popover>
);
export default SearchDatePickerDou;
