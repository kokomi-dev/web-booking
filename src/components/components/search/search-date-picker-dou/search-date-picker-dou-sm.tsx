import { SearchDatePickerDouSMProps } from "@/utils/types/search";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ButtonEnd } from "../search";

const SearchDatePickerDouSM: React.FC<SearchDatePickerDouSMProps> = ({
  open,
  setOpen,
  date,
  setDate,
  className,
}) => {
  return (
    <Sheet
      open={open}
      onOpenChange={() => {
        setOpen(false);
      }}
    >
      <SheetTrigger aria-describedby={undefined}></SheetTrigger>
      <SheetContent
        className="w-auto p-0 bg-white text-black z-[50] flex flex-col items-center justify-start gap-y-4 px-4 "
        side="bottom"
      >
        {" "}
        <SheetTitle aria-describedby={undefined}></SheetTitle>
        <SheetDescription aria-describedby={undefined}></SheetDescription>
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
          locale={vi}
          className="text-normal min-h-[95vh] h-full font-normal bg-white flex items-center justify-center"
        />
        <ButtonEnd
          onClick={() => {
            setOpen(false);
          }}
        />
      </SheetContent>
    </Sheet>
  );
};

export default SearchDatePickerDouSM;
