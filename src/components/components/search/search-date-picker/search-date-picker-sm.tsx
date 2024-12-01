"use client";
import { vi } from "date-fns/locale";

import { Calendar } from "@/components/ui/calendar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { SearchDatePickerSMProps } from "@/utils/types/search";
import ButtonEnd from "../button-end";

const SearchDatePickerSM: React.FC<SearchDatePickerSMProps> = ({
  open,
  setOpen,
  date,
  setDate,
  className,
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
        className="flex flex-col items-center justify-start h-[65vh] w-full z-[50] md:hidden md:invisible  bg-white text-black  mt-4 p-1"
      >
        <SheetHeader className="text-start  w-full p-2">
          <SheetTitle className="text-normal+ font-semibold text-start w-full flex items-start justify-start">
            Chọn ngày
          </SheetTitle>
          <SheetDescription aria-describedby={undefined}></SheetDescription>
        </SheetHeader>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          onDayClick={() => {
            setOpen(false);
          }}
          initialFocus={true}
          locale={vi}
          lang="vi"
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

export default SearchDatePickerSM;
