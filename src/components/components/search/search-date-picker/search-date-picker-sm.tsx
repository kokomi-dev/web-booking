"use state";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { SearchDatePickerSMProps } from "@/utils/types/search";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import React, { useState } from "react";
import { ButtonEnd } from "../search";

const SearchDatePickerSM: React.FC<SearchDatePickerSMProps> = ({
  open,
  setOpen,
  date,
  setDate,
  className,
  disablePastDates,
}) => {
  return (
    <Sheet
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(false);
      }}
    >
      <SheetContent
        side="bottom"
        className=" z-[50] p-0 bg-white text-black flex flex-col items-center justify-center px-4"
      >
        <SheetTitle aria-describedby={undefined}></SheetTitle>
        <SheetDescription aria-describedby={undefined}></SheetDescription>
        <Calendar
          disabled={disablePastDates}
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus={true}
          locale={vi}
          lang="vi"
          className="w-auto h-[70vh] bg-white flex text-normal  items-center justify-center "
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

export default SearchDatePickerSM;
