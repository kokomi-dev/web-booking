"use client";

import { vi } from "date-fns/locale";
import { IoPersonOutline } from "react-icons/io5";
import { format } from "date-fns";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { DateRange, SelectRangeEventHandler } from "react-day-picker";
import { Label } from "./components/ui/label";
import { Input } from "./components/ui/input";
import { useAuthenticatedStore } from "./store/authencation-store";
import { Fragment } from "react";
// date picker
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
          className="w-auto p-0 bg-bg_black_sub text-black z-[15]"
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
  className: string;
  popoverOpen: boolean;
  setPopoverOpen: React.Dispatch<React.SetStateAction<boolean>>;
  error: boolean;
  setError: React.Dispatch<React.SetStateAction<boolean>>;

  numberAdults: number;
  numberChildren: number;
  numberRoom: number;
  numberRoomDouble: number;
  setNumberAdults: React.Dispatch<React.SetStateAction<number>>;
  setNumberChildren: React.Dispatch<React.SetStateAction<number>>;
  setNumberRoom: React.Dispatch<React.SetStateAction<number>>;
  setNumberRoomDouble: React.Dispatch<React.SetStateAction<number>>;
  handlePopoverChange: (open: boolean) => void;
};

const SelectNumberPerson = ({
  className,
  popoverOpen,
  setPopoverOpen,
  handlePopoverChange,
  error,
  setError,
  numberAdults,
  numberChildren,
  numberRoom,
  numberRoomDouble,
  setNumberRoomDouble,
  setNumberAdults,
  setNumberChildren,
  setNumberRoom,
}: NumberPersonType) => {
  return (
    <Popover open={popoverOpen} onOpenChange={handlePopoverChange}>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            "w-full bg-bg_primary_blue_sub text-white shadow-none py-6  font-medium  flex items-center justify-start gap-2 outline-none",
            "lg:gap-4",
            error && "border-[3px] border-error_color"
          )}
        >
          <IoPersonOutline className="text-large" />
          <div
            className={cn(
              "w-full flex items-center justify-between gap-1 overflow-hidden font-medium",
              "lg:gap-2"
            )}
          >
            <div className="w-full bg-white text-black text-small font-semibold p-2 rounded-8">
              {numberAdults} <span> người lớn </span>
            </div>
            <div className="w-full bg-white text-black text-small font-semibold p-2 rounded-8">
              {numberChildren} <span> trẻ em </span>
            </div>{" "}
            <div className="w-full bg-white text-black text-small font-semibold p-2 rounded-8">
              {numberRoom} <span> phòng đơn</span>
            </div>
            <div className="w-full bg-white text-black text-small font-semibold p-2 rounded-8">
              {numberRoomDouble} <span> phòng đôi</span>
            </div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          "w-full bg-bg_black_sub text-black_main z-[10]",
          error && "border-1 border-error_color"
        )}
      >
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="adults">Người lớn:</Label>
              <Input
                type="number"
                id="adults"
                min="0"
                value={numberAdults}
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
              <Label htmlFor="numberRoom">Phòng đơn:</Label>
              <Input
                type="number"
                id="numberRoom"
                min="0"
                value={numberRoom}
                className="col-span-2 h-8 outline-none bg-white text-black"
                onChange={(e) => setNumberRoom(Number(e.target.value))}
                onMouseDown={(e) => e.stopPropagation()}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="numberRoomDouble">Phòng đôi:</Label>
              <Input
                type="number"
                id="numberRoomDouble"
                min="0"
                value={numberRoomDouble}
                disabled={numberAdults <= 3}
                className="col-span-2 h-8 outline-none bg-white text-black"
                onChange={(e) => setNumberRoomDouble(Number(e.target.value))}
                onMouseDown={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SelectNumberPerson;

// convert rating
const ratingConvert = (rating: number) => {
  if (rating >= 5) {
    return <span className="font-bold text-smallest ">Rất tuyệt vời</span>;
  }
  if (rating >= 4.5) {
    return <span className="font-bold text-smallest ">Tuyệt</span>;
  }
  if (rating >= 4) {
    return <span className="font-bold text-smallest ">Tốt</span>;
  }

  if (rating > 3) {
    return <span className="font-bold text-smallest ">Chưa tốt</span>;
  }
};

// navigations
export const NAVIGATIONS: { title: string; url: string; icon: string }[] = [
  {
    title: "Địa điểm du lịch",
    url: "/attractions",
    icon: "M13.5 3a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM15 3a3 3 0 1 0-6 0 3 3 0 0 0 6 0zm6 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm1.5 0a3 3 0 1 0-6 0 3 3 0 0 0 6 0zM6 7.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm1.5 0a3 3 0 1 0-6 0 3 3 0 0 0 6 0zM21 15a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm1.5 0a3 3 0 1 0-6 0 3 3 0 0 0 6 0zm-9-3.75a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm1.5 0a3 3 0 1 0-6 0 3 3 0 0 0 6 0zM6 15a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm1.5 0a3 3 0 1 0-6 0 3 3 0 0 0 6 0zm10.066 1.277a7.5 7.5 0 0 1-3.077 2.05.75.75 0 0 0 .498 1.415 9 9 0 0 0 3.693-2.46.75.75 0 1 0-1.114-1.005zm1.798-6.466c.177.922.183 1.869.015 2.792a.75.75 0 1 0 1.476.268c.2-1.106.194-2.24-.019-3.344a.75.75 0 1 0-1.472.284zm-5.337-5.784a7.5 7.5 0 0 1 3.54 2.196.75.75 0 0 0 1.113-1.004 9.002 9.002 0 0 0-4.247-2.636.75.75 0 1 0-.406 1.444zM6.434 6.223a7.5 7.5 0 0 1 3.539-2.196.75.75 0 1 0-.406-1.444A9.001 9.001 0 0 0 5.32 5.219a.75.75 0 0 0 1.114 1.004zM4.636 12.69a7.602 7.602 0 0 1 0-2.878.75.75 0 1 0-1.472-.284 9.102 9.102 0 0 0 0 3.446.75.75 0 0 0 1.472-.284zm4.876 5.639a7.517 7.517 0 0 1-3.035-2.005.75.75 0 0 0-1.106 1.014 9.017 9.017 0 0 0 3.641 2.405.75.75 0 1 0 .5-1.414zM7.31 21.872A1.5 1.5 0 0 0 8.672 24h6.656a1.5 1.5 0 0 0 1.362-2.128l-3.314-8.217c-.361-.785-1.252-1.114-2.005-.767a1.5 1.5 0 0 0-.733.734l-3.343 8.283zm1.377.595l3.328-8.25-.015.033 3.313 8.217.015.033H8.672z",
  },
  {
    title: "Khách sạn & Nhà nghỉ",
    url: "/hotels",
    icon: "M2.75 12h18.5c.69 0 1.25.56 1.25 1.25V18l.75-.75H.75l.75.75v-4.75c0-.69.56-1.25 1.25-1.25m0-1.5A2.75 2.75 0 0 0 0 13.25V18c0 .414.336.75.75.75h22.5A.75.75 0 0 0 24 18v-4.75a2.75 2.75 0 0 0-2.75-2.75zM0 18v3a.75.75 0 0 0 1.5 0v-3A.75.75 0 0 0 0 18m22.5 0v3a.75.75 0 0 0 1.5 0v-3a.75.75 0 0 0-1.5 0m-.75-6.75V4.5a2.25 2.25 0 0 0-2.25-2.25h-15A2.25 2.25 0 0 0 2.25 4.5v6.75a.75.75 0 0 0 1.5 0V4.5a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 0 1.5 0m-13.25-3h7a.25.25 0 0 1 .25.25v2.75l.75-.75h-9l.75.75V8.5a.25.25 0 0 1 .25-.25m0-1.5A1.75 1.75 0 0 0 6.75 8.5v2.75c0 .414.336.75.75.75h9a.75.75 0 0 0 .75-.75V8.5a1.75 1.75 0 0 0-1.75-1.75z",
  },
  {
    title: "Gói dịch vụ",
    url: "/combos",
    icon: "M13.5 3a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM15 3a3 3 0 1 0-6 0 3 3 0 0 0 6 0zm6 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm1.5 0a3 3 0 1 0-6 0 3 3 0 0 0 6 0zM6 7.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm1.5 0a3 3 0 1 0-6 0 3 3 0 0 0 6 0zM21 15a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm1.5 0a3 3 0 1 0-6 0 3 3 0 0 0 6 0zm-9-3.75a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm1.5 0a3 3 0 1 0-6 0 3 3 0 0 0 6 0zM6 15a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm1.5 0a3 3 0 1 0-6 0 3 3 0 0 0 6 0zm10.066 1.277a7.5 7.5 0 0 1-3.077 2.05.75.75 0 0 0 .498 1.415 9 9 0 0 0 3.693-2.46.75.75 0 1 0-1.114-1.005zm1.798-6.466c.177.922.183 1.869.015 2.792a.75.75 0 1 0 1.476.268c.2-1.106.194-2.24-.019-3.344a.75.75 0 1 0-1.472.284zm-5.337-5.784a7.5 7.5 0 0 1 3.54 2.196.75.75 0 0 0 1.113-1.004 9.002 9.002 0 0 0-4.247-2.636.75.75 0 1 0-.406 1.444zM6.434 6.223a7.5 7.5 0 0 1 3.539-2.196.75.75 0 1 0-.406-1.444A9.001 9.001 0 0 0 5.32 5.219a.75.75 0 0 0 1.114 1.004zM4.636 12.69a7.602 7.602 0 0 1 0-2.878.75.75 0 1 0-1.472-.284 9.102 9.102 0 0 0 0 3.446.75.75 0 0 0 1.472-.284zm4.876 5.639a7.517 7.517 0 0 1-3.035-2.005.75.75 0 0 0-1.106 1.014 9.017 9.017 0 0 0 3.641 2.405.75.75 0 1 0 .5-1.414zM7.31 21.872A1.5 1.5 0 0 0 8.672 24h6.656a1.5 1.5 0 0 0 1.362-2.128l-3.314-8.217c-.361-.785-1.252-1.114-2.005-.767a1.5 1.5 0 0 0-.733.734l-3.343 8.283zm1.377.595l3.328-8.25-.015.033 3.313 8.217.015.033H8.672z",
  },
  {
    title: "Liên hệ tư vấn",
    url: "/contact",
    icon: "M9.75 9a2.25 2.25 0 1 1 3 2.122 2.25 2.25 0 0 0-1.5 2.122v1.006a.75.75 0 0 0 1.5 0v-1.006c0-.318.2-.602.5-.708A3.75 3.75 0 1 0 8.25 9a.75.75 0 1 0 1.5 0zM12 16.5a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25.75.75 0 0 0 0 1.5.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5zM22.5 12c0 5.799-4.701 10.5-10.5 10.5S1.5 17.799 1.5 12 6.201 1.5 12 1.5 22.5 6.201 22.5 12zm1.5 0c0-6.627-5.373-12-12-12S0 5.373 0 12s5.373 12 12 12 12-5.373 12-12z",
  },
];
// validate email
function isValidEmail(email: string) {
  // Biểu thức chính quy để kiểm tra email
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Sử dụng phương thức test() để kiểm tra
  return regex.test(email);
}
// convert to slug
export const convertToSlug = (text: string) => {
  text = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  text = text.toLowerCase();
  text = text.replace(/[^a-z0-9\s-]/g, "");
  text = text.trim().replace(/\s+/g, "-");
  return text;
};
const scrollToView = (classe: string, cssActive: string) => {
  const itemDiversity = document.querySelectorAll(`${classe}`);
  const scroll = new IntersectionObserver((entry) => {
    entry.forEach((e) => {
      const { target } = e;
      target.classList.toggle(`${cssActive}`, e.isIntersecting);
    });
  }, {});
  itemDiversity.forEach((item) => {
    scroll.observe(item);
  });
};

//
// hidden search in route
export const HIDDEN_SEARCH = ["booking", "pay"];
//
//
export const ADDRESS_TRENDING = [
  {
    name: "Đà nẵng",
    img: "https://q-xx.bstatic.com/xdata/images/city/533x300/688844.jpg?k=02892d4252c5e4272ca29db5faf12104004f81d13ff9db724371de0c526e1e15&o=",
    slug: "da-nang",
  },
  {
    name: "Hội an",
    img: "https://q-xx.bstatic.com/xdata/images/city/533x300/688872.jpg?k=d0eb773fecb09bba40b98866ca0efd153ad51091f128ef93d1298e4d2c48df8d&o=",
    slug: "hoi-an",
  },
  {
    name: "nha trang",
    img: "https://q-xx.bstatic.com/xdata/images/city/533x300/688907.jpg?k=8a219233969467d9f7ff828918cce2a53b4db6f1da1039d27222441ffb97c409&o=",
    slug: "nha-trang",
  },
  {
    name: "Huê",
    img: "https://q-xx.bstatic.com/xdata/images/city/533x300/688888.jpg?k=e66838f3f1a5e26b31a01fa5284cff8ebfb9d186203bf516f72ce8b476d8dcc4&o=",
    slug: "hue",
  },
  {
    name: "Hà nội",
    img: "https://q-xx.bstatic.com/xdata/images/city/533x300/688861.jpg?k=69489591c3adcc2571361d7b6be1b284f4ad5573b4544767d4ce1426ef33af30&o=",
    slug: "ha-noi",
  },
  {
    name: "TP.Hồ Chí Minh ",
    img: "https://q-xx.bstatic.com/xdata/images/city/533x300/688895.jpg?k=cbd714092f2cdd284db903badf316a7cf6b5ac73fd08b6cafee6e58c16f7d6b5&o=",
    slug: "tp-ho-chi-minh",
  },
];
//
//
// type
export interface AttractionData {
  _id: string;
  slug: string;
  name: string;
  description: string;
  location: {
    province: object;
    district: object;
    detail: string;
  };
  rating: number;
  duration: number;
  images: string[];
  schedule: string[];
  included: string[];
  price: [number, number];
  city: string;
}
export type HotelData = {
  _id: string;
  slug: string;
  name: string;
  details: string;
  location: string;
  rating: number;
  images: string[];
  city: string;
  type: number;
  highlights: [string];
  price: [number, number];
  sales: number;
};
//
export {
  DatePicker,
  SelectNumberPerson,
  ratingConvert,
  isValidEmail,
  scrollToView,
};
