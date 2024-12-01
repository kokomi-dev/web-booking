import React from "react";
import { vi } from "date-fns/locale";

import { Calendar } from "@/components/ui/calendar";
import { SearchDatePickerDouSMProps } from "@/utils/types/search";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ButtonEnd from "../button-end";

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
        className="w-auto h-[95vh] overflow-y-auto p-0 bg-white text-black z-[50] flex flex-col items-center justify-start gap-y-4 px-2 "
        side="bottom"
      >
        <SheetHeader className="w-full text-start p-2">
          <SheetTitle className="text-normal+ font-semibold w-full flex items-start justify-start mt-2 text-start">
            Chọn ngày đến và đi
          </SheetTitle>
          <SheetDescription aria-describedby={undefined}></SheetDescription>
        </SheetHeader>
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={(date) => {
            setDate(date);
          }}
          numberOfMonths={2}
          locale={vi}
          className="text-normal mt-5 h-auto overflow-y-scroll font-normal bg-white flex items-center justify-center"
        />
        <SheetFooter>
          <ButtonEnd
            onClick={() => {
              setOpen(false);
            }}
          />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default SearchDatePickerDouSM;
