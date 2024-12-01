import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

import { SearchDatePickerLGProps } from "@/utils/types/search";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
            "hidden button-lg items-center justify-start gap-x-1 w-full h-[40px]  text-left bg-white px-2 py-1 shadow-none font-medium",
            !date && "text-muted-foreground",
            className,
            "md:flex"
          )}
          onClick={(e) => {
            e.preventDefault();
            setOpen2(!open2);
          }}
        >
          <CalendarIcon className="mr-1 text-black size-[1.1rem]" />

          {date ? (
            format(date, "dd/MM/yyyy", { locale: vi })
          ) : (
            <span className="text-small font-medium ">
              Vui lòng chọn ngày !
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-auto flex items-center justify-center z-[10]  p-0 bg-bwhite text-black"
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
          className="w-full  flex items-center justify-center !bg-white"
        />
      </PopoverContent>
    </Popover>
  );
};

export default SearchDatePickerLG;
