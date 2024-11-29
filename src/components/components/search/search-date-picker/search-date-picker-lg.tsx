import { SearchDatePickerLGProps } from "@/utils/types/search";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import React from "react";

const SearchDatePickerLG: React.FC<SearchDatePickerLGProps> = ({
  date,
  setDate,
  className,
  disablePastDates,
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"ghost"}
          className={cn(
            "hidden w-full h-[40px] justify-start text-left  bg-white px-2 py-1 shadow-none font-medium",
            !date && "text-muted-foreground",
            className,
            "lg:flex xl:flex"
          )}
        >
          <CalendarIcon className="mr-3 text-black size-[1.1rem]" />

          {date ? (
            format(date, "dd/MM/yyyy", { locale: vi })
          ) : (
            <span className="text-small font-medium ">
              Vui lòng chọn ngày !
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full z-[10] min-w-full p-0 bg-bwhite text-black">
        <Calendar
          disabled={disablePastDates}
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          locale={vi}
          lang="vi"
          className="min-w-full w-full bg-white"
        />
      </PopoverContent>
    </Popover>
  );
};

export default SearchDatePickerLG;
