import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

import { SearchDatePickerLGProps } from "@/types/search";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/constants";

const SearchDatePickerLG: React.FC<SearchDatePickerLGProps> = ({
  date,
  setDate,
  className,
}) => {
  const [open2, setOpen2] = useState(false);
  return (
    <Popover
      open={open2}
      onOpenChange={() => {
        setOpen2(false);
      }}
    >
      <PopoverTrigger asChild>
        <Button
          className={cn(
            "hidden button-lg items-center justify-start gap-x-1 w-full h-[44px]  text-left bg-white px-2 py-1 shadow-none text-normal font-light",
            className,
            "md:flex"
          )}
          onClick={(e) => {
            e.preventDefault();
            setOpen2(!open2);
          }}
        >
          <CalendarIcon className="size-[1.2rem] text-black_sub mr-1" />

          {date ? (
            <span className="text-normal font-light">
              {format(date, "dd/MM/yyyy", { locale: vi })}
            </span>
          ) : (
            <span className="text-normal font-light ">
              Vui lòng chọn ngày !
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-full flex flex-col items-center justify-center z-[10]  p-0  text-black"
      >
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          onDayClick={() => {
            setOpen2(false);
          }}
          initialFocus
          locale={vi}
          lang="vi"
          className="w-full  bg-white"
        />
      </PopoverContent>
    </Popover>
  );
};

export default SearchDatePickerLG;
