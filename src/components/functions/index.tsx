import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { vi } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { DateRange, SelectRangeEventHandler } from "react-day-picker";
import { addDays, format } from "date-fns";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { IoPersonOutline } from "react-icons/io5";
const DatePicker = ({
  className,
  date,
  setDate,
}: {
  className: any;
  date: DateRange;
  setDate: SelectRangeEventHandler | undefined;
}) => {
  return (
    <div className={cn("w-full grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            className={cn(
              "min-w-full justify-start text-left text-[1rem] font-[500]  bg-transparent text-white shadow-none",
              !date && "bg-transparent w-full"
            )}
          >
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "dd/MM/yyyy", { locale: vi })} -{" "}
                  {format(date.to, "dd/MM/yyyy", { locale: vi })}
                </>
              ) : (
                format(date.from, "dd/MM/yyyy", { locale: vi })
              )
            ) : (
              <span className="">Chọn ngày đi và trả phòng</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0 bg-red-400 text-white z-[15]"
          align="center"
        >
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            locale={vi}
            className="text-[1.2rem] font-[500]"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

type NumberPersonType = {
  className: any;
  popoverOpen: boolean;
  setPopoverOpen: React.Dispatch<React.SetStateAction<boolean>>;
  numberAdults: number;
  numberChildren: number;
  numberRoom: number;
  setNumberAdults: React.Dispatch<React.SetStateAction<number>>;
  setNumberChildren: React.Dispatch<React.SetStateAction<number>>;
  setNumberRoom: React.Dispatch<React.SetStateAction<number>>;
};
const SelectNumberPerson = ({
  className,
  popoverOpen,
  setPopoverOpen,
  numberAdults,
  numberChildren,
  numberRoom,
  setNumberAdults,
  setNumberChildren,
  setNumberRoom,
}: NumberPersonType) => {
  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            "w-full shadow-none text-black font-medium text-[1rem] flex items-center justify-start  outline-none",
            className
          )}
        >
          <IoPersonOutline className="text-[1.2rem]" />
          <span className="w-full overflow-hidden font-medium ">
            {numberAdults} người lớn - {numberChildren} trẻ em - {numberRoom}{" "}
            phòng
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full bg-red-400 text-white z-[10]">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="adults">Người lớn:</Label>
              <Input
                type="number"
                id="adults"
                value={numberAdults}
                min="1"
                max="100"
                className="col-span-2 h-8 outline-none bg-white text-black"
                onChange={(e) => setNumberAdults(Number(e.target.value))}
                onMouseDown={(e) => e.stopPropagation()}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="children">Trẻ em:</Label>
              <Input
                type="number"
                id="children"
                min="0"
                defaultValue={numberChildren}
                className="col-span-2 h-8 outline-none bg-white text-black"
                onChange={(e) => setNumberChildren(Number(e.target.value))}
                onMouseDown={(e) => e.stopPropagation()}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="numberRoom">Phòng:</Label>
              <Input
                min="0"
                type="number"
                id="numberRoom"
                defaultValue={numberRoom}
                className="col-span-2 h-8 outline-none bg-white text-black"
                onChange={(e) => setNumberRoom(Number(e.target.value))}
                onMouseDown={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export { DatePicker, SelectNumberPerson };
