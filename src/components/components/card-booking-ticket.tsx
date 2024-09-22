"use client";
import React, { useState } from "react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import {
  AiOutlineInfoCircle,
  AiOutlineCheckCircle,
  AiOutlineClockCircle,
} from "react-icons/ai";
import { Button } from "../ui/button";
import { formatPrice } from "./item-component";
import { cn } from "@/lib/utils";
import FormInput from "./form-input";
interface CardBookingTicketProps {
  duration: number;
  price: [number, number];
  date: Date | undefined;
  hour: string;
  slug: string;
}
const CardBookingTicket: React.FC<CardBookingTicketProps> = ({
  duration,
  price,
  date,
  hour,
  slug,
}) => {
  const router = useRouter();

  const [adult, setAdult] = useState<any>(0);
  const [children, setChildren] = useState<any>(0);

  const handleBooking = () => {
    if (!date) {
      return toast.error("Chọn ngày đặt lịch");
    }
    if (!hour) {
      return toast.error("Chọn giờ đặt lịch");
    }
    router.replace(
      "/attractions/booking/" +
        slug +
        "?date=" +
        format(date, "dd/MM/yyyy", { locale: vi }) +
        "&hour=" +
        hour +
        "&adult=" +
        adult +
        "&children=" +
        children
    );
  };
  return (
    <div
      className={cn(
        "flex flex-col items-start justify-start gap-4 border-[0.5px] border-[#999] rounded-xl p-3"
      )}
    >
      <h5 className="flex items-center justify-start gap-1">
        <AiOutlineClockCircle className="text-[1.25rem]" />{" "}
        <span>{duration} ngày</span>
      </h5>
      <ol className="w-full">
        <li className="flex items-center font-normal justify-start gap-1  ">
          Ngày bắt đầu:
          <span className="underline italic">
            {date ? (
              format(date, "dd/MM/yyyy", { locale: vi })
            ) : (
              <span className="underline italic">Chưa chọn ngày bắt đầu</span>
            )}
          </span>
        </li>
        <li className="font-normal">
          Giờ khởi hành :
          <span className="underline italic">
            {hour ? hour : "Chưa chọn giờ khởi hành"}
          </span>
        </li>
      </ol>
      <ol className="w-full">
        <li className="flex items-center text-[0.95rem] text-black_sub justify-start gap-1">
          <AiOutlineCheckCircle className="text-[1.3rem]" /> Đầy đủ các dịch vụ
          đi kèm
        </li>
        <li className="flex items-center text-[0.95rem] text-black_sub justify-start gap-1">
          <AiOutlineInfoCircle className="text-[1.4rem]" /> Hủy lịch sau 4h khi
          đặt hoặc tối đa trước 2 ngày tour diễn ra
        </li>
      </ol>
      <ol className="w-full">
        <li className="font-medium">
          Giá người lớn:{" "}
          <span className="underline">{formatPrice(price[0])}</span> vnđ
        </li>
        <li className="font-medium">
          Giá trẻ em (7 tuổi trở lên):{" "}
          <span className="underline">{formatPrice(price[1])}</span> vnđ
        </li>
      </ol>
      <div className="w-full">
        <FormInput
          type="number"
          title="Chọn người lớn"
          value={adult}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setAdult(e.target.value);
          }}
        />
        <FormInput
          type="number"
          title="Chọn trẻ em"
          value={children}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setChildren(e.target.value);
          }}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-y-0 md:gap-x-4">
        <Button
          className="bg-bg_primary_blue_sub text-white"
          onClick={handleBooking}
        >
          Đặt ngay
        </Button>
        <Button>Liên hệ</Button>
      </div>
    </div>
  );
};

export default CardBookingTicket;
