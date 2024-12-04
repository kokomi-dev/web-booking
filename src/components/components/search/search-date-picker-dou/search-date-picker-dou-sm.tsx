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
        className="w-auto h-full overflow-y-scroll p-1 bg-white text-black z-[50] flex flex-col items-center justify-start "
        side="bottom"
      >
        <SheetHeader className="w-full text-start p-2">
          <SheetTitle className="text-normal+ font-semibold w-full flex items-center justify-start mt-2 ">
            Chọn ngày đến và đi
          </SheetTitle>
          <SheetDescription aria-describedby={undefined}></SheetDescription>
        </SheetHeader>
        <div className="w-full pb-4 flex-1 overflow-y-scroll">
          <Calendar
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={(date) => {
              setDate(date);
            }}
            numberOfMonths={2}
            locale={vi}
            className="text-normal w-full my-5 h-auto font-normal bg-white flex items-center justify-center"
          />
        </div>
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
