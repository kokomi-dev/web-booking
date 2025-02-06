"use client";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { useState } from "react";

import { SearchDatePickerDouProps } from "@/types/search";
import SearchDatePickerDouLG from "./search-date-picker-dou/search-date-picker-dou-lg";
import SearchDatePickerDouSM from "./search-date-picker-dou/search-date-picker-dou-sm";
import { cn } from "@/utils/constants";
import { Button } from "@/components/ui/button";

const SearchDatePickerDou: React.FC<SearchDatePickerDouProps> = ({
  className,
  date,
  setDate,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <section className="flex flex-col w-full">
      <Button
        id="date"
        variant="ghost"
        className={cn(
          "flex w-full h-[44px] bg-white px-2 py-1 text-normal font-light",
          !date && "bg-white w-full",
          className,
          "md:hidden lg:hidden xl:hidden"
        )}
        onClick={(e) => {
          e.preventDefault();
          setOpen(!open);
        }}
      >
        {date?.from ? (
          date.to ? (
            <span className="w-full h-full flex items-center justify-start gap-x-1 text-normal font-light">
              <CalendarIcon className="size-[1.2rem] text-black_sub mr-1" />
              {format(date.from, "dd/MM/yyyy", { locale: vi })} -{" "}
              {format(date.to, " dd/MM/yyyy", { locale: vi })}
            </span>
          ) : (
            format(date.from, "dd/MM/yyyy", { locale: vi })
          )
        ) : (
          <div className="w-full flex items-center justify-start gap-x-1">
            <CalendarIcon className=" text-black size-[1.1rem] mr-1" />
            <span className="w-full h-full flex items-center justify-start">
              Chọn ngày đi và trả phòng
            </span>
          </div>
        )}
      </Button>
      <SearchDatePickerDouLG
        date={date}
        setDate={setDate}
        className={className}
      />
      <SearchDatePickerDouSM
        open={open}
        setOpen={setOpen}
        date={date}
        setDate={setDate}
        className={className}
      />
    </section>
  );
};
export default SearchDatePickerDou;
