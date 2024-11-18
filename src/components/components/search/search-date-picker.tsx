import { SetStateAction } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { SearchDatePickerProps } from "@/utils/types/search";

const SearchDatePicker: React.FC<SearchDatePickerProps> = ({
  date,
  setDate,
  className,
}) => {
  const disablePastDates = (current: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return current && current < today;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"ghost"}
          className={cn(
            "w-full h-[40px] justify-start text-left  bg-bg_primary_white px-2 py-1 shadow-none font-medium",
            !date && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-3 text-black size-[1.1rem]" />

          {date ? (
            format(date, "dd/MM/yyyy", { locale: vi })
          ) : (
            <span className="text-normal font-normal ">
              Vui lòng chọn ngày !
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full min-w-full p-0 bg-bg_primary_white text-black">
        <Calendar
          disabled={disablePastDates}
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          locale={vi}
          lang="vi"
          className="min-w-full w-full bg-bg_primary_white"
        />
      </PopoverContent>
    </Popover>
  );
};
export default SearchDatePicker;
