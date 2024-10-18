"use client";
import React, { Fragment, SetStateAction, useEffect, useState } from "react";
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
import { getListProvinces } from "@/api/api-attractions";
import { ChevronDown, Dot } from "lucide-react";
import { FaRegCalendarCheck } from "react-icons/fa";

// interface
interface NumberPersonType {
  className?: string;
  isBooking?: boolean;
  popoverOpen: boolean;
  setPopoverOpen: (open: boolean) => void;
  handlePopoverChange?: (open: boolean) => void;
  error: boolean;
  setError: (error: boolean) => void;
  numberAdults: number;
  numberChildren: number;
  numberRoom: number;
  numberRoomDouble: number;
  setNumberRoomDouble: (value: number) => void;
  setNumberAdults: (value: number) => void;
  setNumberChildren: (value: number) => void;
  setNumberRoom: (value: number) => void;
}
interface SearchProps {
  className?: string;
  currentValue: string | null;
  variant?: string;
}

interface IDatePickerDou {
  className?: string;
  date: DateRange | undefined;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
}
interface IDatePicker {
  date: Date | undefined;
  setDate: React.Dispatch<SetStateAction<Date | undefined>>;
  className?: string;
}
interface IDataProvince {
  full_name: string;
  full_name_en: string;
  id: string;
  latitude: string;
  longitude: string;
  name: string;
  name_en: string;
}
// address
export const AddressTravel = ({
  value,
  setValue,
}: {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [open, setOpen] = useState(true);
  const [valueSearch, setValueSearch] = useState("");
  const [data, setData] = useState<IDataProvince[]>([]);

  useEffect(() => {
    const fetchProvinces = async () => {
      const { data, error } = await getListProvinces();
      if (data && error === 0) {
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
    }
  }, [valueSearch]);

  return (
    <div className="w-full relative">
      <Input
        type="text"
        placeholder="Bạn muốn đi đâu"
        className={cn(
          "w-full text-normal shadow-none justify-between font-normal  bg-transparent text-black border-none outline-none placeholder-black transition-all duration-300",
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
        className="w-full max-h-[300px] rounded-8 absolute left-0 right-0 top-0 translate-y-[50px] bg-white shadow-2xl  text-black overflow-y-auto"
      >
        {!valueSearch ? (
          ""
        ) : data && data.length > 0 ? (
          data.map((item, index) => (
            <div
              key={index}
              className="px-4 py-3  border-b-1 last:border-none transition-all duration-300 hover:bg-bg_black_sub hover:cursor-pointer"
              onMouseDown={() => {
                setValue(item.name_en);
                setValueSearch(item.name);
              }}
            >
              <span className="text-small font-medium">{item.name}</span>
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
// date picker
export const DatePicker: React.FC<IDatePicker> = ({
  date,
  setDate,
  className,
}) => {
  const disablePastDates = (current: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return current && current < today;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"ghost"}
          className={cn(
            "w-full justify-start text-left font-normal bg-transparent shadow-none px-0",
            !date && "text-muted-foreground",
            className
          )}
        >
          {date ? (
            format(date, "dd/MM/yyyy", { locale: vi })
          ) : (
            <span className="flex items-center justify-start gap-x-2 ">
              Vui lòng chọn ngày !
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full min-w-full p-0 bg-bg_black_sub text-black">
        <Calendar
          disabled={disablePastDates}
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          locale={vi}
          lang="vi"
          className="w-full"
        />
      </PopoverContent>
    </Popover>
  );
};
// date picker dou
export const DatePickerDou: React.FC<IDatePickerDou> = ({
  className,
  date,
  setDate,
}) => (
  <div className={cn("w-full grid gap-2 outline-none")}>
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id="date"
          className={cn(
            "min-w-full justify-start text-left text-normal font-normal  bg-transparent text-black shadow-none  pl-0 ",
            !date && "bg-bg_primary_white w-full py-2",
            className
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

// choose number person
export const SelectNumberPerson = ({
  className,
  isBooking,
  popoverOpen,
  handlePopoverChange,
  error,
  numberAdults,
  numberChildren,
  numberRoom,
  numberRoomDouble,
  setNumberRoomDouble,
  setNumberAdults,
  setNumberChildren,
  setNumberRoom,
}: NumberPersonType) => {
  const handleIncrease = (setter: (value: number) => void, value: number) => {
    setter(value + 1);
  };

  const handleDecrease = (setter: (value: number) => void, value: number) => {
    if (value > 1) {
      setter(value - 1);
    }
  };

  return (
    <Popover open={popoverOpen} onOpenChange={handlePopoverChange}>
      <PopoverTrigger asChild>
        <div
          className={cn(
            "w-full h-full  text-black shadow-none  font-medium flex items-center justify-between gap-2 outline-none transition-all duration-200 select-none p-2",
            "lg:gap-4",
            "hover:cursor-pointer ",
            error && "border-[3px] border-error_color",
            className
          )}
        >
          <div className="w-full h-auto flex items-center justify-start gap-x-1  ">
            <div className="w-full text-small font-normal ">
              {numberAdults} <span> lớn</span>
            </div>
            <Dot className="text-[1.2rem]" />
            <div className="w-full text-small font-normal">
              {numberChildren} <span>trẻ em</span>
            </div>
            <Dot className="text-[1.2rem]" />
            <div className="w-full text-small font-normal">
              {numberRoom} <span> đơn</span>
            </div>
            {isBooking && (
              <div className="w-full  text-normal font-normal">
                {numberRoomDouble} <span>phòng đôi</span>
              </div>
            )}
          </div>
          <ChevronDown className="size-4" />
        </div>
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          "w-full bg-bg_black_sub text-black_main z-[10] shadow-2xl ",
          error && "border-1 border-error_color"
        )}
      >
        <div className="grid gap-2">
          {/* Người lớn */}
          <div className="grid grid-cols-3 items-center gap-4">
            <Label className="text-small" htmlFor="adults">
              Người lớn:
            </Label>
            <div className="col-span-2 flex items-center ">
              <Button
                onClick={() => handleDecrease(setNumberAdults, numberAdults)}
                className="bg-white hover:bg-bg_black_sub text-black px-4 text-medium "
              >
                -
              </Button>
              <Input
                type="number"
                id="adults"
                min="1"
                value={numberAdults}
                className="h-8 outline-none bg-white  max-w-[60px] text-black text-center"
                onChange={(e) =>
                  setNumberAdults(Math.max(1, Number(e.target.value)))
                }
                onMouseDown={(e) => e.stopPropagation()}
              />
              <Button
                onClick={() => handleIncrease(setNumberAdults, numberAdults)}
                className="bg-white hover:bg-bg_black_sub text-black px-4 text-medium "
              >
                +
              </Button>
            </div>
          </div>
          {/* Trẻ em */}
          <div className="grid grid-cols-3 items-center gap-4">
            <Label className="text-small" htmlFor="children">
              Trẻ em:
            </Label>
            <div className="col-span-2 flex items-center">
              <Button
                onClick={() =>
                  handleDecrease(setNumberChildren, numberChildren)
                }
                className="shadow-none bg-white hover:bg-bg_black_sub text-black px-4 text-medium "
              >
                -
              </Button>
              <Input
                type="number"
                id="children"
                min="0"
                value={numberChildren}
                className="h-8 outline-none bg-white  max-w-[60px] text-black text-center"
                onChange={(e) =>
                  setNumberChildren(Math.max(0, Number(e.target.value)))
                }
                onMouseDown={(e) => e.stopPropagation()}
              />
              <Button
                onClick={() =>
                  handleIncrease(setNumberChildren, numberChildren)
                }
                className="shadow-none bg-white hover:bg-bg_black_sub text-black px-4 text-medium "
              >
                +
              </Button>
            </div>
          </div>
          {/* Phòng đơn */}
          <div className="grid grid-cols-3 items-center gap-4">
            <Label className="text-small" htmlFor="numberRoom">
              Phòng đơn:
            </Label>
            <div className="col-span-2 flex items-center">
              <Button
                onClick={() => handleDecrease(setNumberRoom, numberRoom)}
                className="bg-white hover:bg-bg_black_sub text-black px-4 text-medium "
              >
                -
              </Button>
              <Input
                type="number"
                id="numberRoom"
                min="1"
                value={numberRoom}
                className="h-8 outline-none bg-white  max-w-[60px] text-black text-center"
                onChange={(e) =>
                  setNumberRoom(Math.max(1, Number(e.target.value)))
                }
                onMouseDown={(e) => e.stopPropagation()}
              />
              <Button
                onClick={() => handleIncrease(setNumberRoom, numberRoom)}
                className="bg-white hover:bg-bg_black_sub text-black px-4 text-medium "
              >
                +
              </Button>
            </div>
          </div>
          {/* phòng đôi */}
          {isBooking && (
            <div className="grid grid-cols-3 items-center gap-4">
              <Label className="text-small" htmlFor="numberRoomDouble">
                Phòng đôi:
              </Label>
              <div className="col-span-2 flex items-center">
                <Button
                  onClick={() =>
                    handleDecrease(setNumberRoomDouble, numberRoomDouble)
                  }
                  className="bg-white hover:bg-bg_black_sub text-black px-4 text-medium "
                >
                  -
                </Button>
                <Input
                  type="number"
                  id="numberRoomDouble"
                  min="1"
                  value={numberRoomDouble}
                  className="h-8 outline-none bg-white  max-w-[60px] text-black text-center"
                  onChange={(e) =>
                    setNumberRoomDouble(Math.max(1, Number(e.target.value)))
                  }
                  onMouseDown={(e) => e.stopPropagation()}
                />
                <Button
                  onClick={() =>
                    handleIncrease(setNumberRoomDouble, numberRoomDouble)
                  }
                  className="bg-white hover:bg-bg_black_sub text-black px-4 text-medium "
                >
                  +
                </Button>
              </div>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

const Search: React.FC<SearchProps> = ({
  className,
  currentValue,
  variant,
}) => {
  const [value, setValue] = useState<string>(currentValue || "");
  const [dateDou, setDateDou] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 2),
  });
  const [date, setDate] = useState<any>();
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [numberAdults, setNumberAdults] = useState<number>(2);
  const [numberChildren, setNumberChildren] = useState<number>(1);
  const [numberRoom, setNumberRoom] = useState<number>(1);
  const [numberRoomDouble, setNumberRoomDouble] = useState<number>(1);

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
      router.push(`/${page}/searchresult?address=${slugSearch}&filter=suggest`);
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
          "w-full h-full  grid z-[10] gap-2",
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
            "w-full bg-bg_primary_yellow flex flex-col items-center justify-between gap-y-1 p-1 rounded-lg ",
            variant === "search" &&
              "w-[100%] bg-bg_primary_yellow  py-1 text-white",
            " lg:flex lg:h-[65px] lg:items-center lg:justify-between lg:px-1 lg:gap-2 lg:flex-row"
          )}
        >
          <div
            className={cn(
              "w-[100%] h-auto px-1 flex justify-center items-center  rounded-lg bg-bg_primary_white relative p-1",
              "lg:w-[45%] h-[100%] lg:px-3"
            )}
          >
            <IoBedOutline className="text-large text-black_sub " />
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
                "w-[100%] h-[100%] px-1 flex items-center justify-between rounded-lg bg-bg_primary_white p-1",
                "lg:w-[45%] lg:h-[100%] lg:px-3 "
              )}
            >
              <FaRegCalendarCheck className="text-normal font-normal size-5 mr-2" />
              <DatePicker date={date} setDate={setDate} />
            </div>
          )}
          {page === "hotels" && (
            <Fragment>
              <div
                className={cn(
                  "w-[100%] h-[100%] px-1 flex items-center justify-between rounded-lg bg-bg_primary_white p-1",
                  "lg:w-[45%] lg:h-[100%] lg:px-3 "
                )}
              >
                <CalendarIcon className="mr-3 text-black_main h-[1.3rem] w-[1.3rem]" />
                <DatePickerDou date={dateDou} setDate={setDateDou} />
              </div>
              <div
                className={cn(
                  "w-[100%] h-[100%] p-1 flex items-center justify-between rounded-lg bg-bg_primary_white",
                  "lg:w-[45%] lg:h-[99%] lg:px-3 "
                )}
              >
                <IoPersonOutline className="text-large font-medium text-black_sub " />
                <SelectNumberPerson
                  popoverOpen={popoverOpen}
                  setPopoverOpen={setPopoverOpen}
                  error={error}
                  setError={setError}
                  numberAdults={numberAdults}
                  setNumberAdults={setNumberAdults}
                  numberChildren={numberChildren}
                  setNumberChildren={setNumberChildren}
                  numberRoom={numberRoom}
                  setNumberRoom={setNumberRoom}
                  numberRoomDouble={numberRoomDouble}
                  setNumberRoomDouble={setNumberRoomDouble}
                />
              </div>
            </Fragment>
          )}
          <div className={cn("w-[100%] rounded-lg", "lg:w-[14%] h-[100%]")}>
            <Button
              type="submit"
              variant="default"
              className={cn(
                "w-full h-full text-normal font-medium bg-bg_primary_main text-white",
                "lg:text-large font-semibold",
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
