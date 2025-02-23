"use client";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

import { Label } from "@/components/ui/label";
import { useAuthenticatedStore } from "@/store/authencation-store";
import { CardBookingTicketProps } from "@/types/attraction.type";
import { cn } from "@/utils/constants";
import Link from "next/link";
import {
  AiOutlineCheckCircle,
  AiOutlineClockCircle,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import { formatPrice } from "../../components/item-component";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";

const CardBookingTicket: React.FC<CardBookingTicketProps> = ({
  duration,
  price,
  date,
  hour,
  slug,
  name,
  numberOfTickets,
}) => {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthenticatedStore();

  const [numberTicketsAdult, setNumberTicketsAdult] = useState(1);
  const [numberTicketsChildren, setNumberTicketsChildren] = useState(0);

  const handleIncrease = (setter: (value: number) => void, value: number) => {
    setter(value + 1);
  };

  const handleDecrease = (setter: (value: number) => void, value: number) => {
    setter(value - 1);
  };
  const handleBookedTickets = () => {
    if (!date) {
      return toast.error("Chọn ngày đặt lịch");
    }
    if (!hour) {
      return toast.error("Chọn giờ đặt lịch");
    }
    if (numberTicketsAdult === 0) {
      return toast.error("Vui lòng chọn ít nhất 1 vé");
    }
    router.replace(
      "/attractions/booking/" +
        slug +
        "?date=" +
        format(date, "dd/MM/yyyy", { locale: vi }) +
        "&hour=" +
        hour +
        "&adult=" +
        numberTicketsAdult +
        "&children=" +
        numberTicketsChildren
    );
  };

  return (
    <div
      className={cn(
        "posing-vertical-4 border-[2px] border-blue_main_sub rounded-xl p-3 relative "
      )}
    >
      {!isAuthenticated && !user && (
        <div className="absolute w-full top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.15)] rounded-8 flex items-center justify-center ">
          <Link
            href="/sign-in"
            className="w-full text-center z-10 shadow-xl bg-bg_primary_active text-white p-2 rounded-8 text-small mx-8 hover:bg-bg_primary_main"
          >
            Đăng nhập để tiếp tục
          </Link>
        </div>
      )}
      <h5 className="flex items-center justify-start gap-1">
        <AiOutlineClockCircle className="text-[1.25rem]" />{" "}
        <span>{duration} ngày</span>
      </h5>
      <h3 className="font-semibold text-[1.2rem]">{name}</h3>
      <ol className="w-full posing-vertical-4">
        <li className="gap-x-2  lg:gap-x-3 flex items-center justify-start  text-black font-normal">
          <AiOutlineCheckCircle className="text-[1.2rem]  flex-shrink-0" />
          <span className="text-small font-light lg:font-normal">
            Các dịch vụ đi kèm
          </span>
        </li>
        <li className="gap-x-2  lg:gap-x-3 flex justify-start items-center   text-black font-normal">
          <AiOutlineInfoCircle className="text-[1.2rem]  flex-shrink-0" />
          <span className="text-small font-light lg:font-normal">
            Đảm bảo quyền lợi của bạn
          </span>
        </li>
      </ol>
      <ol className="w-full">
        <li className="text-small font-medium text-black_main ">
          Giá người lớn:{" "}
          <span className="underline text-normal text-blue_main font-medium">
            {formatPrice(price[0])} VNĐ
          </span>
        </li>
        <li className="text-black_main text-small font-medium">
          Giá trẻ em (7 =&gt; 14 tuổi):{" "}
          <span className="underline text-normal text-blue_main font-medium">
            {formatPrice(price[1])} VNĐ
          </span>
        </li>
      </ol>
      <div>
        {numberOfTickets.adult == "0" && (
          <span className="text-red-500 text-small font-medium">
            Hết vé người lớn!
          </span>
        )}
        {numberOfTickets.children == "0" && (
          <span className="text-red-500 text-small font-medium">
            Hết vé trẻ em!
          </span>
        )}
      </div>
      <section className="space-y-3 text-small">
        <h4 className="text-normal font-bold">Số lượng vé</h4>
        <div className="flex items-center justify-between gap-x-4">
          <Label
            className="text-small flex-shrink-0 w-[180px] font-medium"
            htmlFor="adults"
          >
            Người lớn(tuổi 16-60)
          </Label>
          <div className=" flex items-center border-0.5 border-black_sub justify-center rounded-[4px] ">
            <Button
              disabled={numberTicketsAdult === 1}
              type="button"
              onClick={() =>
                handleDecrease(setNumberTicketsAdult, numberTicketsAdult)
              }
              className={cn(
                "bg-white text-black shadow-none border-none p-0 px-2 hover:bg-bg_black_sub",
                numberTicketsAdult === 1 && "pointer-events-none"
              )}
            >
              <span
                className={cn(
                  "!text-large text-blue_main_sub font-normal p-1 ",
                  numberTicketsAdult === 1 &&
                    "opacity-40 hover:cursor-none !text-large hover:bg-transparent text-black_main pointer-events-none"
                )}
              >
                -
              </span>
            </Button>
            <Input
              type="number"
              id="adults"
              min="1"
              value={numberTicketsAdult}
              className="h-8 outline-none bg-white text-normal  max-w-[60px] text-black text-center shadow-none border-none"
              onChange={(e) =>
                setNumberTicketsAdult(Math.max(1, Number(e.target.value)))
              }
              onMouseDown={(e) => e.stopPropagation()}
            />
            <Button
              type="button"
              onClick={() =>
                handleIncrease(setNumberTicketsAdult, numberTicketsAdult)
              }
              className="bg-white hover:bg-bg_black_sub text-black px-2 text-largest shadow-none border-none "
            >
              <span className="text-large text-blue_main_sub font-light">
                +
              </span>
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center gap-x-4">
          <Label
            className="text-small flex-shrink-0 w-[180px] font-medium"
            htmlFor="adults"
          >
            Trẻ nhỏ(tuổi 10-15)
          </Label>
          <div className=" flex items-center border-0.5 border-black_sub justify-center rounded-[4px] ">
            <Button
              disabled={numberTicketsChildren === 0}
              type="button"
              onClick={() =>
                handleDecrease(setNumberTicketsChildren, numberTicketsChildren)
              }
              className={cn(
                "bg-white text-black shadow-none border-none p-0 px-2 hover:bg-bg_black_sub",
                numberTicketsChildren === 0 && "pointer-events-none"
              )}
            >
              <span
                className={cn(
                  "!text-large text-blue_main_sub font-normal p-1 ",
                  numberTicketsChildren === 0 &&
                    "opacity-40 hover:cursor-none !text-large hover:bg-transparent text-black_sub pointer-events-none"
                )}
              >
                -
              </span>
            </Button>
            <Input
              type="number"
              id="adults"
              min="1"
              value={numberTicketsChildren}
              className="h-8 outline-none bg-white text-normal  max-w-[60px] text-black text-center shadow-none border-none"
              onChange={(e) =>
                setNumberTicketsChildren(Math.max(1, Number(e.target.value)))
              }
              onMouseDown={(e) => e.stopPropagation()}
            />
            <Button
              type="button"
              onClick={() =>
                handleIncrease(setNumberTicketsChildren, numberTicketsChildren)
              }
              className="bg-white hover:bg-bg_black_sub text-black px-2 text-largest shadow-none border-none "
            >
              <span className="text-large text-blue_main_sub font-light">
                +
              </span>
            </Button>
          </div>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-y-0 md:gap-x-4">
          <Button
            type="button"
            className="w-full bg-bg_primary_blue_sub hover:bg-bg_primary_active"
            onClick={handleBookedTickets}
          >
            <span className="text-white text-small font-normal">Đặt ngay</span>
          </Button>
          <Button
            onClick={() => {
              router.push("/contact");
            }}
            type="button"
            className="w-full text-small font-normal bg-bg_primary_white hover:bg-bg_primary_hover"
          >
            Liên hệ
          </Button>
        </div>
      </section>
    </div>
  );
};

export default CardBookingTicket;
