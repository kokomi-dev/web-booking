"use client";
import * as React from "react";
import banner from "../../assets/images/banner.jpg";
import Image from "next/image";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
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
  EnvelopeClosedIcon,
  FaceIcon,
  GearIcon,
  PersonIcon,
  RocketIcon,
} from "@radix-ui/react-icons";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

const Search = () => {
  const citys = [
    {
      value: "Hà Nội",
      label: "Hà Nội",
    },
    {
      value: "Nha Trang",
      label: "Nha Trang",
    },
    {
      value: "Hạ Long",
      label: "Hạ Long",
    },
    {
      value: "Việt Trì",
      label: "Việt Trì",
    },
    {
      value: "Đà Nẵng",
      label: "Đà Nẵng",
    },
  ];

  function Input() {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("");

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between font-[400] bg-transparent text-black"
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
  }

  function DatePicker({ className }: React.HTMLAttributes<HTMLDivElement>) {
    const [date, setDate] = React.useState<DateRange | undefined>({
      from: new Date(),
      to: addDays(new Date(), 2),
    });
    return (
      <div className={cn("w-full grid gap-2 ", className)}>
        <Popover>
          <PopoverTrigger className="w-full h-full" asChild>
            <Button
              id="date"
              className={cn(
                "min-w-full justify-start text-left font-normal bg-transparent text-black shadow-none",
                !date && "bg-transparent w-full"
              )}
            >
              <CalendarIcon className="mr-3 text-black_sub h-[1.1rem] w-[1.1rem]" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "dd/M")} - {format(date.to, "dd/M")}
                  </>
                ) : (
                  format(date.from, "dd/M/y")
                )
              ) : (
                <span>Chọn ngày đi và trả phòng</span>
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
            />
          </PopoverContent>
        </Popover>
      </div>
    );
  }
  return (
    <div className=" w-full h-full relative">
      <Image
        src={banner}
        alt="img__banner"
        className="z-[5] max-h-[100vh] h-full object-cover brightness-75"
      />
      <div className="w-full h-full absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[10] flex flex-col items-start justify-center text-white px-10 ">
        <div className="w-[50%]">
          <p className=" text-wrap text-[2.5rem] font-[900]">
            Một trải nghiệm tuyệt vời cho một chuyến đi đặc biệt
          </p>
          <p className="text-[1.5rem]">
            Khám phá những khung cảnh thơ mộng tại Việt Nam
          </p>
        </div>
        <Button className="text-[1.1rem] bg-red-400 mt-3">
          Tìm nơi ở cho bạn
        </Button>
        <div className="w-full h-[60px] mt-20 bg-red-400 flex items-center justify-between gap-5 px-1">
          <div className="w-[30%] h-[90%] px-3 flex justify-center items-center   rounded-sm bg-white">
            <IoBedOutline className="text-[1.5rem]  text-black_sub mr-2" />
            {/* <Input
              type="text"
              placeholder="Bạn muốn đi đâu?"
              className="outline-none border-none text-black"
            /> */}
            <Input />
          </div>
          <div className="w-[30%] h-[90%] px-3 flex  items-center justify-between   rounded-sm bg-white">
            <DatePicker />
          </div>
          <div className="w-[30%] h-[90%] px-3 flex  items-center justify-start   rounded-sm bg-white">
            <IoPersonOutline className="text-[1.5rem]  text-black_sub mr-2" />
            <span className="text-black">2 người lớn - 0 trẻ em - 1 phòng</span>
          </div>
          <div className="w-[10%] h-[90%] rounded-sm ">
            <Button variant="default" className="w-full h-full  text-[1.2rem]">
              Tìm
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
