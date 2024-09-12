"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../ui/button";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
import { vi } from "date-fns/locale";
import { Label } from "@radix-ui/react-label";
import { Input } from "../../ui/input";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IoBedOutline, IoPersonOutline } from "react-icons/io5";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

const citys = [
  { value: "Hà Nội", codeProvinces: "29", label: "Hà Nội" },
  { value: "Khánh Hòa", codeProvinces: "79", label: "Khánh Hòa" },
  { value: "Hạ Long", codeProvinces: "14", label: "Hạ Long" },
  { value: "Việt Trì", codeProvinces: "19", label: "Việt Trì" },
  { value: "Đà Nẵng", codeProvinces: "43", label: "Đà Nẵng" },
];

const AddressTravel = ({
  value,
  setValue,
}: {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full shadow-none justify-between font-[500] text-[1.1rem] bg-transparent text-black",
            "lg:text-[1.2rem]"
          )}
        >
          {value
            ? citys.find((city) => city.value === value)?.label
            : "Bạn muốn đi đâu"}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 bg-red-400 text-white z-[15]">
        <Command>
          <CommandInput placeholder="" className="h-9 text-white" />
          <CommandList>
            <CommandEmpty>Không tìm thấy thành phố</CommandEmpty>
            <CommandGroup>
              {citys.map((city) => (
                <CommandItem
                  key={city.value}
                  value={city.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                  className="text-white"
                >
                  {city.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === city.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

const DatePicker = ({
  date,
  setDate,
}: {
  date: DateRange | undefined;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
}) => (
  <div className={cn("w-full grid gap-2 outline-none")}>
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id="date"
          className={cn(
            "min-w-full justify-start text-left text-[1.05rem] font-[500]  bg-transparent text-black shadow-none",
            !date && "bg-transparent w-full",
            "lg:text-[1.2rem]"
          )}
        >
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, "dd/MM/yyyy", { locale: vi })} -{" "}
                {format(date.to, " dd/MM/yyyy", { locale: vi })}
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

const SelectNumberPerson = ({
  numberAdults,
  setNumberAdults,
  numberChildren,
  setNumberChildren,
  numberRoom,
  setNumberRoom,
}: {
  numberAdults: number;
  setNumberAdults: React.Dispatch<React.SetStateAction<number>>;
  numberChildren: number;
  setNumberChildren: React.Dispatch<React.SetStateAction<number>>;
  numberRoom: number;
  setNumberRoom: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
        <Button className="bg-transparent text-black font-[400] shadow-none w-full ">
          <span className="w-full overflow-hidden font-medium text-[1.2rem]">
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
                value={numberChildren}
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
                value={numberRoom}
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

interface SearchProps {
  className?: string;
  page: string;
  currentValue: string | null;
  variant?: string;
}
const Search: React.FC<SearchProps> = ({
  className,
  page,
  currentValue,
  variant,
}) => {
  const [value, setValue] = useState<string>(currentValue || "");
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 2),
  });
  const [numberAdults, setNumberAdults] = useState<number>(2);
  const [numberChildren, setNumberChildren] = useState<number>(1);
  const [numberRoom, setNumberRoom] = useState<number>(1);
  const [error, setError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (value) {
      setError(false);
    }
  }, [value]);

  const handleSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!value) {
      setError(true);
    } else {
      router.push(`${page}/searchresult?address=${value}`);
    }
  };

  return (
    <form className={cn("w-full h-full relative", className)}>
      <div
        className={cn(
          "w-full px-2 absolute top-[80%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[10]  flex-col items-start justify-center text-white",
          variant === "search" && "relative top-[0%] translate-y-[0%]",
          "lg:absolute lg:top-[50%] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[-50%] lg:px-36 "
        )}
      >
        {page === "attractions" && !variant && (
          <div className={cn("hidden", "lg:block lg:mb-5")}>
            <div className="w-[50%]">
              <p
                className={cn(
                  "w-[50%] hidden",
                  "lg:block lg:text-[2rem] font-bold"
                )}
              >
                Một trải nghiệm tuyệt vời cho một chuyến đi đặc biệt
              </p>
              <p className={cn("hidden", "lg:text-[1.5rem] lg:block")}>
                Khám phá những khung cảnh thơ mộng tại Việt Nam
              </p>
            </div>
          </div>
        )}
        {page === "hotels" && (
          <div className={cn("hidden", "lg:block lg:mb-5")}>
            <div className="w-[50%]">
              <p className="text-wrap text-[2.5rem] font-[900]">
                Một nơi nghỉ ngơi xứng đáng cho một chỗ du lịch tuyệt vời
              </p>
              <p className="text-[1.5rem]">
                Những khách sạn hàng đầu tại Việt Nam
              </p>
            </div>
          </div>
        )}
        {/* search */}
        <div
          className={cn(
            "w-full bg-bg_primary_yellow flex flex-col items-center justify-start gap-1 px-1 rounded-lg",
            variant === "search" && "w-[99%] bg-neutral-300  py-1",
            "lg:flex lg:h-[95px] lg:items-center lg:justify-between lg:px-1 lg:gap-2 lg:flex-row"
          )}
        >
          <div
            className={cn(
              "w-[99%] h-auto px-1  flex justify-center items-center  rounded-lg bg-white relative",
              "lg:w-[45%] h-[88%] lg:px-3"
            )}
          >
            <IoBedOutline className="text-[1.5rem] text-black_sub mr-2" />
            <AddressTravel value={value} setValue={setValue} />
            {error && (
              <div className="absolute bottom-[-75%] shadow-xl rounded-md px-3 left-0 right-0 bg-red-700 py-2">
                Chọn nơi bạn muốn đến!
              </div>
            )}
          </div>
          {(page === "attractions" || variant === "search") && (
            <div
              className={cn(
                "w-[99%] h-[88%] px-1 flex items-center justify-between rounded-lg bg-bg_primary_white",
                "lg:w-[45%] lg:h-[88%] lg:px-3 "
              )}
            >
              <CalendarIcon className="mr-3 text-black_sub h-[1.3rem] w-[1.3rem]" />
              <DatePicker date={date} setDate={setDate} />
            </div>
          )}
          {page === "hotels" && (
            <div
              className={cn(
                "w-[99%] h-[88%] px-1 flex items-center justify-between rounded-lg bg-bg_primary_white",
                "lg:w-[45%] lg:h-[88%] lg:px-3 "
              )}
            >
              <IoPersonOutline className="text-[1.35rem] text-black_sub mr-2" />
              <SelectNumberPerson
                numberAdults={numberAdults}
                setNumberAdults={setNumberAdults}
                numberChildren={numberChildren}
                setNumberChildren={setNumberChildren}
                numberRoom={numberRoom}
                setNumberRoom={setNumberRoom}
              />
            </div>
          )}
          <div className={cn("w-[99%]  rounded-lg mb-1", "lg:w-[14%] h-[88%]")}>
            <Button
              type="submit"
              variant="default"
              className={cn(
                "w-full h-full text-[1.1rem] font-medium bg-bg_primary_main",
                "lg:text-[1.2rem]",
                "hover:bg-bg_primary_active"
              )}
              onClick={handleSearch}
            >
              Tìm
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Search;
