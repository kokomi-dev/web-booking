"use client";
import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

import { SearchDatePickerProps } from "@/types/search";
import SearchDatePickerLG from "./search-date-picker/search-date-picker-lg";
import SearchDatePickerSM from "./search-date-picker/search-date-picker-sm";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/constants";

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
          "flex items-center justify-start gap-x-1 w-full h-[44px]  text-left bg-white hover:!bg-white focus:!bg-white  px-2 py-1 shadow-none text-base font-light",
          className,
          "md:hidden lg:hidden text-black"
        )}
        variant="outline"
        onClick={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
      >
        <CalendarIcon className="size-[1.2rem] text-black_sub mr-1" />

        {date ? (
          <span className="text-sm md:text-base font-light">
            {format(date, "dd/MM/yyyy", { locale: vi })}
          </span>
        ) : (
          <span className="text-base font-light">Vui lòng chọn ngày !</span>
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
