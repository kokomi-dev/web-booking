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

import { getListProvinces } from "@/api/api-attractions";
import { ChevronDown, Dot, MapPinned, User } from "lucide-react";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cx } from "class-variance-authority";

// interface
interface NumberPersonType {
  className?: string;
  isBooking?: boolean;
  handlePopoverChange?: (open: boolean) => void;
  error: boolean;
  setError: (error: boolean) => void;
  numberAdults: number;
  numberChildren: number;
  numberRoom: number;
  numberRoomDouble?: number;
  setNumberRoomDouble?: (value: number) => void;
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
  error,
  className,
}: {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  error: boolean;
  className?: string;
}) => {
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
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cx(
            "w-full h-[40px] justify-start text-left font-normal bg-bg_primary_white px-2 py-1 shadow-none mt-2",
            className
          )}
        >
          <MapPinned className="size-5 text-black_main " />
          <span className="ml-2 text-small font-medium">
            {value === "" || value === null ? "Chọn nơi bạn muốn đến" : value}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-full min-w-full p-0 bg-bg_primary_white text-black"
      >
        <Input
          type="text"
          placeholder="Nhập tên tỉnh thành !"
          className={cn(
            "w-full text-small font-normal shadow-none justify-between   bg-transparent text-black border-none outline-none placeholder-black transition-all duration-300",
            "lg:text-small "
          )}
          value={valueSearch}
          onChange={(e: any) => {
            setValueSearch(e.target.value);
          }}
        />
        <div className="w-full max-h-[300px]  h-full overflow-y-auto bg-white rounded-8">
          {data && data.length > 0 ? (
            data.map((item, index) => (
              <div
                key={index}
                className=" px-4 py-3  border-b-1 last:border-none transition-all duration-300 hover:bg-bg_black_sub hover:cursor-pointer"
                onMouseDown={() => {
                  setValue(item.name);
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
        {error && (
          <div className="absolute bottom-[-75%] shadow-xl rounded-md px-3 left-0 right-0 bg-red-700 py-2 text-white text-small">
            Chọn nơi bạn muốn đến!
          </div>
        )}
      </PopoverContent>
    </Popover>
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
            "w-full h-[40px] justify-start text-left font-normal bg-bg_primary_white px-2 py-1 shadow-none ",
            !date && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-3 text-black size-[1.1rem]" />

          {date ? (
            format(date, "dd/MM/yyyy", { locale: vi })
          ) : (
            <span className="text-normal font-normal ">
              Vui lòng chọn ngày !
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full min-w-full p-0 bg-bg_primary_white text-black">
        <Calendar
          disabled={disablePastDates}
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          locale={vi}
          lang="vi"
          className="min-w-full w-full bg-bg_primary_white"
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
  <Popover>
    <PopoverTrigger asChild>
      <Button
        id="date"
        variant="ghost"
        className={cn(
          "w-full h-[40px] bg-bg_primary_white px-2 py-1",
          !date && "bg-bg_primary_white w-full",
          className
        )}
      >
        {date?.from ? (
          date.to ? (
            <span className="w-full h-full flex items-center justify-start gap-x-1 text-small">
              <CalendarIcon className="mr-3 text-black size-[1.1rem]" />
              {format(date.from, "dd/MM/yyyy", { locale: vi })} -{" "}
              {format(date.to, " dd/MM/yyyy", { locale: vi })}
            </span>
          ) : (
            format(date.from, "dd/MM/yyyy", { locale: vi })
          )
        ) : (
          <span className="w-full h-full">Chọn ngày đi và trả phòng</span>
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
        className="text-normal font-normal bg-bg_primary_white "
      />
    </PopoverContent>
  </Popover>
);

// choose number person
export const SelectNumberPerson = ({
  className,
  error,
  numberAdults,
  numberChildren,
  numberRoom,
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
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "w-full h-[40px] bg-bg_primary_white px-2 py-1",
            "hover:cursor-pointer ",
            error && "border-[2px] border-error_color",
            className
          )}
        >
          <User className="size-5 font-medium text-black mr-2 " />
          <span className="w-full h-full flex items-center justify-start gap-x-1 ">
            <span className="w-full flex items-center justify-start gap-x-1 text-small font-medium whitespace-nowrap">
              {numberAdults} người lớn <Dot /> {numberChildren} trẻ em <Dot />{" "}
              {numberRoom} phòng
            </span>
          </span>
          <ChevronDown className="size-5 " />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          "w-auto  bg-bg_primary_white text-black z-[15] p-2 shadow-2xl ",
          error && "border-1 border-error_color"
        )}
        align="center"
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
              Phòng:
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
      router.push(`/${page}/searchresult?address=${value}&filter=suggest`);
    }
  };
  if (page === "home") {
    return (
      <div>
        <Tabs
          defaultValue="attractions"
          className="w-full bg-bg_primary_white rounded-8"
        >
          <TabsList className="grid w-full grid-cols-2 ">
            <TabsTrigger value="attractions">Địa điểm tham quan</TabsTrigger>
            <TabsTrigger value="hotels">Nơi lưu trú</TabsTrigger>
          </TabsList>
          <TabsContent
            value="attractions"
            className="border-t-1  border-blue_main_sub"
          >
            <Card
              className={cx(
                "overflow-hidden border-none h-[200px]  ",
                "lg:h-[120px]"
              )}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between font-medium text-normal text-black_main -my-2 md:-my-0 ">
                  <span className="hidden md:block">
                    Tìm kiếm điểm tham quan của bạn
                  </span>
                  <Link
                    href="/attractions"
                    className="text-blue_main_sub underline text-small font-normal"
                  >
                    Đến trang gợi ý của chúng tôi
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent
                className={cx(
                  "space-y-2 space-x-2 flex flex-col justify-start  bg-yellow_main px-6 ",
                  "md:flex-row md:items-center md:justify-start"
                )}
              >
                <AddressTravel
                  value={value}
                  setValue={setValue}
                  error={error}
                  className="!z-[10]"
                />
                <DatePickerDou
                  date={dateDou}
                  setDate={setDateDou}
                  className="mt-2 !z-[10] !ml-0 md:!ml-2"
                />
                <Button
                  type="submit"
                  variant="default"
                  className={cn(
                    "w-full !ml-0  h-[40px] text-normal font-medium bg-bg_primary_blue_sub text-white",
                    "md:!ml-2",
                    "lg:text-medium lg:font-semibold lg:max-w-[140px] ",
                    "hover:bg-bg_primary_active"
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    if (!value) {
                      setError(true);
                    } else {
                      router.push(
                        `/attractions/searchresult?address=${value}&filter=suggest`
                      );
                    }
                  }}
                >
                  Tìm
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent
            value="hotels"
            className="border-t-1  border-yellow_main"
          >
            <Card
              className={cx(
                "overflow-hidden border-none h-[246px] ",
                "lg:h-[120px]"
              )}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between font-medium text-normal text-black_main -my-2 md:-my-0">
                  <span className="hidden md:block">
                    Tìm kiếm nơi lưu trú hợp lí cho chuyến đi
                  </span>
                  <Link
                    href="/hotels"
                    className="text-blue_main_sub underline text-small font-normal"
                  >
                    Đến trang gợi ý của chúng tôi
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent
                className={cx(
                  "space-y-2 space-x-2 flex flex-col justify-start  bg-yellow_main px-6",
                  "lg:flex-row lg:items-center lg:justify-start"
                )}
              >
                <AddressTravel
                  value={value}
                  setValue={setValue}
                  error={error}
                  className="!z-[10]"
                />
                <DatePickerDou
                  date={dateDou}
                  setDate={setDateDou}
                  className="mt-2 !z-[10] !ml-0 md:!ml-2"
                />
                <SelectNumberPerson
                  className="z-[5] !ml-0 md:!ml-2"
                  error={error}
                  setError={setError}
                  numberAdults={numberAdults}
                  setNumberAdults={setNumberAdults}
                  numberChildren={numberChildren}
                  setNumberChildren={setNumberChildren}
                  numberRoom={numberRoom}
                  setNumberRoom={setNumberRoom}
                />
                <Button
                  type="submit"
                  variant="default"
                  className={cn(
                    "w-full  h-[40px] !ml-0  text-normal font-medium bg-bg_primary_blue_sub text-white",
                    "md:!ml-2",
                    "lg:text-medium lg:font-semibold lg:max-w-[140px] ",
                    "hover:bg-bg_primary_active"
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    if (!numberAdults || !numberChildren || !numberRoom) {
                      setError(true);
                    } else {
                      router.push(
                        `/hotels/searchresult?address=${value}&filter=suggest`
                      );
                    }
                  }}
                >
                  Tìm
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
  }
  return (
    <form
      className={cn(
        "w-full h-full  flex items-center justify-center py-4",
        className,
        pathname.includes("combos") && "hidden",
        pathname.includes("contact") && "hidden",
        pathname.includes("booking") && "hidden",
        pathname.includes("pay") && "hidden",
        pathname.includes("sign-in") && "hidden",
        pathname.includes("sign-up") && "hidden",

        pathname.includes("account") && "hidden"
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
            variant === "search" && "lg:grid lg:grid-flow-row ",
            " lg:flex  lg:items-center lg:justify-between lg:px-1 lg:gap-2 lg:flex-row"
          )}
        >
          {page === "attractions" ||
            (variant === "search" && (
              <AddressTravel value={value} setValue={setValue} error={error} />
            ))}
          {(page === "attractions" || variant === "search") && (
            <DatePicker date={date} setDate={setDate} />
          )}
          {page === "hotels" && (
            <Fragment>
              <DatePickerDou date={dateDou} setDate={setDateDou} />
              <SelectNumberPerson
                className="z-[50]"
                error={error}
                setError={setError}
                numberAdults={numberAdults}
                setNumberAdults={setNumberAdults}
                numberChildren={numberChildren}
                setNumberChildren={setNumberChildren}
                numberRoom={numberRoom}
                setNumberRoom={setNumberRoom}
              />
            </Fragment>
          )}
          <Button
            type="submit"
            variant="default"
            className={cn(
              "w-full  h-full  text-normal font-medium bg-bg_primary_blue_sub text-white",
              "lg:text-medium lg:font-semibold lg:max-w-[140px] ",
              "hover:bg-bg_primary_active"
            )}
            onClick={handleSearch}
          >
            Tìm
          </Button>
        </div>
      </div>
    </form>
  );
};
export default Search;
