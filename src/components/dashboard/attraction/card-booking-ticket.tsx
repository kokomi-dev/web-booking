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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoadingBookingCardAttraction } from "@/components/components/loading";
import { formatPrice } from "@/components/components/item-component";

const CardBookingTicket: React.FC<CardBookingTicketProps> = ({
  isLoading,
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

  // State for ticket counts
  const [tickets, setTickets] = useState({
    adult: 1,
    children: 0,
  });

  // State for overbooking
  const [isOverTickets, setIsOverTickets] = useState({
    adult: false,
    children: false,
  });

  // Check if tickets exceed available count
  const checkOverTickets = (type: "adult" | "children", value: number) => {
    setIsOverTickets((prev) => ({
      ...prev,
      [type]: value >= (numberOfTickets?.[type] || 0),
    }));
  };

  // Handle ticket increase
  const handleIncrease = (type: "adult" | "children") => {
    setTickets((prev) => {
      const newValue = prev[type] + 1;
      checkOverTickets(type, newValue);
      return { ...prev, [type]: newValue };
    });
  };

  // Handle ticket decrease
  const handleDecrease = (type: "adult" | "children") => {
    setTickets((prev) => {
      const newValue = Math.max(0, prev[type] - 1);
      checkOverTickets(type, newValue);
      return { ...prev, [type]: newValue };
    });
  };

  // Validate booking conditions
  const validateBooking = () => {
    if (!date) return "Vui lòng chọn ngày đặt lịch";
    if (!hour) return "Vui lòng chọn giờ đặt lịch";
    if (tickets.adult === 0) return "Vui lòng chọn ít nhất 1 vé người lớn";
    return null;
  };

  // Handle booking tickets
  const handleBookedTickets = () => {
    const error = validateBooking();
    if (error) {
      toast.error(error);
      return;
    }

    if (!date) {
      toast.error("Ngày không hợp lệ");
      return;
    }

    router.replace(
      `/attractions/booking/${slug}?date=${format(date, "dd/MM/yyyy", {
        locale: vi,
      })}&hour=${hour}&adult=${tickets.adult}&children=${tickets.children}`
    );
  };

  if (isLoading) {
    return <LoadingBookingCardAttraction />;
  }

  return (
    <div className="list-spacing border-[2px] border-blue_sub rounded-xl p-3 relative">
      {/* Authentication Check */}
      {!isAuthenticated && !user && (
        <div className="absolute w-full top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.15)] rounded-8 flex items-center justify-center">
          <Link
            href="/sign-in"
            className="w-full text-center z-10 shadow-xl bg-blue_active text-white p-2 rounded-8 text-sm mx-8 hover:bg-blue"
          >
            Đăng nhập để tiếp tục
          </Link>
        </div>
      )}

      {/* Duration and Name */}
      <h5 className="flex items-center justify-start gap-1">
        <AiOutlineClockCircle className="text-[1.25rem]" />
        <span>{duration} ngày</span>
      </h5>
      <h3 className="font-semibold text-[1.2rem]">{name}</h3>

      {/* Features */}
      <ol className="w-full list-spacing">
        <li className="gap-x-2 lg:gap-x-3 flex items-center justify-start text-black font-normal">
          <AiOutlineCheckCircle className="text-[1.2rem] flex-shrink-0" />
          <span className="text-sm font-normal">Các dịch vụ đi kèm</span>
        </li>
        <li className="gap-x-2 lg:gap-x-3 flex justify-start items-center text-black font-normal">
          <AiOutlineInfoCircle className="text-[1.2rem] flex-shrink-0" />
          <span className="text-sm font-normal">Đảm bảo quyền lợi của bạn</span>
        </li>
      </ol>

      {/* Pricing */}
      <ol className="w-full">
        <li className="text-sm font-medium text-black">
          Giá người lớn:{" "}
          <span className="underline text-base text-blue font-medium">
            {formatPrice(price[0])} VNĐ
          </span>
        </li>
        <li className="text-black text-sm font-medium">
          Giá trẻ em (7 =&gt; 14 tuổi):{" "}
          <span className="underline text-base text-blue font-medium">
            {formatPrice(price[1])} VNĐ
          </span>
        </li>
      </ol>

      {/* Ticket Availability */}
      <div className="w-full h-auto">
        {numberOfTickets?.adult === 0 && (
          <span className="text-red-500 text-sm font-medium">
            Hết vé người lớn!
          </span>
        )}
        {numberOfTickets?.children === 0 && (
          <span className="text-red-500 text-sm font-medium">
            Hết vé trẻ em!
          </span>
        )}
      </div>

      {/* Ticket Selection */}
      <section className="space-y-3 text-sm">
        <h4 className="text-base font-bold">Số lượng vé</h4>
        {isOverTickets.adult && (
          <span className="text-red-600">Đã đặt hết vé người lớn</span>
        )}
        {isOverTickets.children && (
          <span className="text-red-600">Đã đặt hết vé trẻ em</span>
        )}

        {/* Adult Tickets */}
        <div className="flex items-center justify-between gap-x-4">
          <Label className="text-sm flex-shrink-0 w-[180px] font-medium">
            Người lớn (tuổi 16-60)
          </Label>
          <div className="flex items-center border-0.5 border-black_sub justify-center rounded-[4px]">
            <Button
              disabled={tickets.adult === 1}
              onClick={() => handleDecrease("adult")}
              className="bg-white text-black shadow-none border-none p-0 px-4 hover:bg-black_sub select-none text-lg font-semibold"
            >
              -
            </Button>
            <span className="text-base text-center w-[30px] select-none">
              {tickets.adult}
            </span>
            <Button
              disabled={tickets.adult >= (numberOfTickets?.adult || 0)}
              onClick={() => handleIncrease("adult")}
              className="bg-white text-black shadow-none border-none p-0 px-4 hover:bg-black_sub select-none text-lg font-semibold"
            >
              +
            </Button>
          </div>
        </div>

        {/* Children Tickets */}
        <div className="flex items-center justify-between gap-x-4">
          <Label className="text-sm flex-shrink-0 w-[180px] font-medium">
            Trẻ nhỏ (tuổi 10-15)
          </Label>
          <div className="flex items-center border-0.5 border-black_sub justify-center rounded-[4px]">
            <Button
              disabled={tickets.children === 0}
              onClick={() => handleDecrease("children")}
              className="bg-white text-black shadow-none border-none p-0 px-4 hover:bg-black_sub select-none  text-lg font-semibold"
            >
              -
            </Button>
            <span className="text-base text-center w-[30px] select-none">
              {tickets.children}
            </span>
            <Button
              disabled={tickets.children >= (numberOfTickets?.children || 0)}
              onClick={() => handleIncrease("children")}
              className="bg-white text-black shadow-none border-none p-0 px-4 hover:bg-black_sub select-none  text-lg font-semibold"
            >
              +
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-y-0 md:gap-x-4">
          <Button
            onClick={handleBookedTickets}
            className="w-full bg-blue_sub hover:bg-blue_active"
          >
            <span className="text-white text-sm font-normal">Đặt ngay</span>
          </Button>
          <Button
            onClick={() => router.push("/contact")}
            className="w-full text-sm font-normal text-black_sub bg-white hover:bg-blue_hover"
          >
            Liên hệ
          </Button>
        </div>
      </section>
    </div>
  );
};

export default CardBookingTicket;
