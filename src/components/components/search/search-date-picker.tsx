"use client";
import { SearchDatePickerProps } from "@/utils/types/search";
import { Fragment, useState } from "react";
import SearchDatePickerLG from "./search-date-picker/search-date-picker-lg";
import SearchDatePickerSM from "./search-date-picker/search-date-picker-sm";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

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
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col w-full">
      <Button
        // variant={"ghost"}
        className={cn(
          "flex items-center justify-start gap-x-1 w-full h-[40px]  text-left bg-white px-2 py-1 shadow-none font-medium",
          !date && "text-muted-foreground",
          className,
          "lg:hidden xl:hidden"
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
      <SearchDatePickerLG
        date={date}
        setDate={setDate}
        className={className}
        disablePastDates={disablePastDates}
      />
      <SearchDatePickerSM
        open={open}
        setOpen={setOpen}
        date={date}
        setDate={setDate}
        className={className}
        disablePastDates={disablePastDates}
      />
    </div>
  );
};
export default SearchDatePicker;
