"use client";
import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

import { SearchDatePickerProps } from "@/utils/types/search";
import SearchDatePickerLG from "./search-date-picker/search-date-picker-lg";
import SearchDatePickerSM from "./search-date-picker/search-date-picker-sm";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SearchDatePicker: React.FC<SearchDatePickerProps> = ({
  date,
  setDate,
  className,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <section className="flex flex-col w-full">
      <Button
        className={cn(
          "flex items-center justify-start gap-x-1 w-full h-[40px]  text-left bg-white px-2 py-1 shadow-none font-medium",
          !date && "text-muted-foreground",
          className,
          "md:hidden lg:hidden"
        )}
        onClick={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
      >
        <CalendarIcon className="mr-1 text-black size-[1.1rem]" />

        {date ? (
          format(date, "dd/MM/yyyy", { locale: vi })
        ) : (
          <span className="text-small font-medium ">Vui lòng chọn ngày !</span>
        )}
      </Button>
      <SearchDatePickerSM
        open={open}
        setOpen={setOpen}
        date={date}
        setDate={setDate}
        className={className}
      />
      <SearchDatePickerLG date={date} setDate={setDate} className={className} />
    </section>
  );
};
export default SearchDatePicker;
