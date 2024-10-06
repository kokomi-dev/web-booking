"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { CalendarIcon } from "@radix-ui/react-icons";
import { addDays, format } from "date-fns";
import { vi } from "date-fns/locale";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IoBedOutline, IoPersonOutline } from "react-icons/io5";

import { convertToSlug } from "@/constants";
import { getListProvinces } from "@/api/api-tour";

const AddressTravel = ({
  value,
  setValue,
}: {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [open, setOpen] = useState(true);
  const [valueSearch, setValueSearch] = useState("");
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchProvinces = async () => {
      const { data } = await getListProvinces();
      if (data) {
        const filteredData = data.filter((item: any) => {
          return (
            item.name.toLowerCase().includes(valueSearch.toLowerCase()) ||
            item.name_en.toLowerCase().includes(valueSearch.toLowerCase())
          );
        });
        setData(filteredData);
      }
    };

    if (valueSearch) {
      fetchProvinces();
    } else {
      setData([]);
    }
  }, [valueSearch]);
  return (
    <div className="w-full relative">
      <Input
        type="text"
        placeholder="Bạn muốn đi đâu"
        className={cn(
          "w-full text-normal shadow-none justify-between font-medium  bg-transparent text-black border-none outline-none placeholder-black transition-all duration-300",
          "lg:text-normal",
          !open && "placeholder-black_sub"
        )}
        value={valueSearch}
        onChange={(e: any) => {
          setValueSearch(e.target.value); // Update search value
        }}
        onFocus={() => {
          setOpen(false);
        }}
        onBlur={() => {
          setOpen(true);
        }}
      />
      <div
        hidden={open}
        className="w-full max-h-[300px] absolute left-0 right-0 top-0 translate-y-[50px] bg-white shadow-2xl  text-black overflow-y-auto"
      >
        {!valueSearch ? (
          ""
        ) : data && data.length > 0 ? (
          data.map((item, index) => (
            <div
              key={index}
              className="px-4 py-2 border-b last:border-none transition-all duration-300 hover:bg-bg_black_sub hover:cursor-pointer"
              onMouseDown={() => {
                setValue(item.name_en);
                setValueSearch(item.name);
              }}
            >
              <span className="text-small font-normal">{item.name}</span>
            </div>
          ))
        ) : (
          <div className="p-2 text-small font-normal">
            {valueSearch ? (
              <span>Nhập chính xác tên tỉnh thành !</span>
            ) : (
              <span></span>
            )}
          </div>
        )}
      </div>
    </div>
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
            "min-w-full justify-start text-left text-normal font-[500]  bg-transparent text-black shadow-none",
            !date && "bg-bg_primary_white w-full",
            "lg:text-normal"
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
        className="w-auto p-0 bg-bg_primary_white text-black z-[15]"
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
          className="text-normal font-[500]"
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
      <PopoverTrigger asChild className="w-full h-auto">
        <Button className="bg-transparent text-black font-[400] shadow-none w-full  ">
          <span className="w-full h-full overflow-hidden font-medium text-normal">
            {numberAdults} người lớn - {numberChildren} trẻ em - {numberRoom}{" "}
            phòng
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full bg-bg_black_sub text-black z-[10]">
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
  currentValue: string | null;
  variant?: string;
}
const Search: React.FC<SearchProps> = ({
  className,
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
  const pathname = usePathname();
  const router = useRouter();

  const page = pathname.split("/")[1];
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
      const slugSearch = convertToSlug(value);
      router.replace(
        `/${page}/searchresult?address=${slugSearch}&filter=suggest`
      );
    }
  };
  return (
    <form
      className={cn(
        "w-full h-full  flex items-center justify-center py-4",
        className,
        pathname.includes("combos") && "hidden",
        pathname.includes("contact") && "hidden",
        pathname.includes("booking") && "hidden",
        pathname.includes("pay") && "hidden"
      )}
    >
      <div
        className={cn(
          "w-full h-full  flex flex-col items-start justify-start z-[10] gap-2",
          "md:gap-4",
          "lg:gap-6",
          variant === "search" && " ",
          " "
        )}
      >
        {/* search slogan */}
        {page === "attractions" && !variant && (
          <div className={cn("hidden", "lg:block  lg:text-white")}>
            <div className="w-full">
              <h1
                className={cn(
                  "w-full hidden",
                  "lg:block lg:text-largest font-bold"
                )}
              >
                Một trải nghiệm tuyệt vời cho một chuyến đi đặc biệt
              </h1>
              <h2 className={cn("hidden", "lg:text-large font-light lg:block")}>
                Khám phá những khung cảnh thơ mộng tại Việt Nam
              </h2>
            </div>
          </div>
        )}
        {page === "hotels" && (
          <div className={cn("hidden", "lg:block  lg:text-white")}>
            <div className="w-full">
              <h1 className="text-wrap text-largest font-extrabold">
                Một nơi nghỉ ngơi xứng đáng cho một chỗ du lịch tuyệt vời
              </h1>
              <h2 className="text-large font-light">
                Những khách sạn hàng đầu tại Việt Nam
              </h2>
            </div>
          </div>
        )}
        {/* search container */}
        <div
          className={cn(
            "w-full bg-bg_primary_yellow flex flex-col items-center justify-start gap-1 p-1 rounded-lg ",
            variant === "search" &&
              "w-[100%] bg-bg_primary_yellow  py-1 text-white",
            " lg:flex lg:h-[65px] lg:items-center lg:justify-between lg:px-1 lg:gap-2 lg:flex-row"
          )}
        >
          <div
            className={cn(
              "w-[100%] h-auto px-1  flex justify-center items-center  rounded-lg bg-bg_primary_white relative",
              "lg:w-[45%] h-[100%] lg:px-3"
            )}
          >
            <IoBedOutline className="text-large text-black_sub mr-2" />
            <AddressTravel value={value} setValue={setValue} />
            {error && (
              <div className="absolute bottom-[-75%] shadow-xl rounded-md px-3 left-0 right-0 bg-red-700 py-2 text-white text-small">
                Chọn nơi bạn muốn đến!
              </div>
            )}
          </div>
          {(page === "attractions" || variant === "search") && (
            <div
              className={cn(
                "w-[100%] h-[100%] px-1 flex items-center justify-between rounded-lg bg-bg_primary_white",
                "lg:w-[45%] lg:h-[100%] lg:px-3 "
              )}
            >
              <CalendarIcon className="mr-3 text-black_main h-[1.3rem] w-[1.3rem]" />
              <DatePicker date={date} setDate={setDate} />
            </div>
          )}
          {page === "hotels" && (
            <div
              className={cn(
                "w-[100%] h-[100%] px-1 flex items-center justify-between rounded-lg bg-bg_primary_white",
                "lg:w-[45%] lg:h-[99%] lg:px-3 "
              )}
            >
              <IoPersonOutline className="text-large font-medium text-black_sub mr-2" />
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
          <div className={cn("w-[100%] rounded-lg", "lg:w-[14%] h-[100%]")}>
            <Button
              type="submit"
              variant="default"
              className={cn(
                "w-full h-full text-normal font-medium bg-bg_primary_main text-white",
                "lg:text-large font-bold",
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
