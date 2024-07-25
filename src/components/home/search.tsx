"use client";
import React, { useEffect, useMemo, useState } from "react";
import banner from "../../assets/images/banner.jpg";
import Image from "next/image";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
import { vi } from "date-fns/locale";

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
import { Label } from "@/components/ui/label";

const Search = () => {
  // state
  const [value, setValue] = React.useState<string>("");
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 2),
  });
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [numberAdults, setNumberAdults] = useState<number>(2);
  const [numberChildren, setNumberChildren] = useState<number>(1);
  const [numberRoom, setNumberRoom] = useState<number>(1);
  const [error, setError] = useState(false);
  useEffect(() => {
    if (value) {
      setError(false);
    }
  }, [value]);
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
  function AdressTravel() {
    const [open, setOpen] = React.useState(false);

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            role="combobox"
            aria-expanded={open}
            className="w-full shadow-none justify-between font-[500] text-[1.2rem] bg-transparent text-black"
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

  const DatePicker = ({ className }: any) => {
    return (
      <div className={cn("w-full grid gap-2", className)}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              className={cn(
                "min-w-full justify-start text-left text-[1.2rem] font-[500]  bg-transparent text-black shadow-none",
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
  // const SelectNumberPerson = () => {
  //   return (
  //     <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
  //       <PopoverTrigger asChild>
  //         <Button className="bg-transparent text-black font-[400] shadow-none w-full">
  //           <span className="w-full overflow-hidden">
  //             {numberAdults} người lớn - {numberChildren} trẻ em - {numberRoom}{" "}
  //             phòng
  //           </span>
  //         </Button>
  //       </PopoverTrigger>
  //       <PopoverContent className="w-full bg-red-400 text-white z-[10]">
  //         <div className="grid gap-4">
  //           <div className="grid gap-2">
  //             <div className="grid grid-cols-3 items-center gap-4">
  //               <Label htmlFor="adults">Người lớn:</Label>
  //               <Input
  //                 type="number"
  //                 id="adults"
  //                 value={numberAdults}
  //                 min="1"
  //                 max="100"
  //                 className="col-span-2 h-8 outline-none bg-white text-black"
  //                 onChange={(e) => setNumberAdults(Number(e.target.value))}
  //                 onMouseDown={(e) => e.stopPropagation()}
  //               />
  //             </div>
  //             <div className="grid grid-cols-3 items-center gap-4">
  //               <Label htmlFor="children">Trẻ em:</Label>
  //               <Input
  //                 type="number"
  //                 id="children"
  //                 min="0"
  //                 defaultValue={numberChildren}
  //                 className="col-span-2 h-8 outline-none bg-white text-black"
  //                 onChange={(e) => setNumberChildren(Number(e.target.value))}
  //                 onMouseDown={(e) => e.stopPropagation()}
  //               />
  //             </div>
  //             <div className="grid grid-cols-3 items-center gap-4">
  //               <Label htmlFor="numberRoom">Phòng:</Label>
  //               <Input
  //                 min="0"
  //                 type="number"
  //                 id="numberRoom"
  //                 defaultValue={numberRoom}
  //                 className="col-span-2 h-8 outline-none bg-white text-black"
  //                 onChange={(e) => setNumberRoom(Number(e.target.value))}
  //                 onMouseDown={(e) => e.stopPropagation()}
  //               />
  //             </div>
  //           </div>
  //         </div>
  //       </PopoverContent>
  //     </Popover>
  //   );
  // };

  // handle submit search travel
  const handleSeacrh = () => {
    if (!value || value === "") {
      setError(true);
    }
  };

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
        <div className="w-full h-[80px] mt-20 bg-red-400 flex items-center justify-between gap-5 px-1">
          <div className="w-[45%] h-[90%] px-3 flex justify-center items-center rounded-sm bg-white relative">
            <IoBedOutline className="text-[1.5rem]  text-black_sub mr-2" />
            <AdressTravel />
            {error && (
              <div className="absolute bottom-[-75%] shadow-xl rounded-md px-3 left-0 right-0 bg-red-700 py-2">
                Chọn nơi bạn muốn đến!
              </div>
            )}
          </div>
          <div className="w-[45%] h-[90%] px-3 flex  items-center justify-between rounded-sm bg-white">
            <CalendarIcon className="mr-3 text-black_sub h-[1.3rem] w-[1.3rem]" />
            <DatePicker />
          </div>
          {/* <div className="w-[30%] h-[90%] px-3 flex  items-center justify-center rounded-sm bg-white">
            <IoPersonOutline className="text-[1.35rem]  text-black_sub mr-2" />
            <SelectNumberPerson />
          </div> */}
          <div className="w-[10%] h-[90%] rounded-sm ">
            <Button
              variant="default"
              className="w-full h-full  text-[1.2rem]"
              onClick={handleSeacrh}
            >
              Tìm
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
