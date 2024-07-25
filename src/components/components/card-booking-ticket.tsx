import React from "react";
import {
  AiOutlineInfoCircle,
  AiOutlineCheckCircle,
  AiOutlineClockCircle,
} from "react-icons/ai";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { formatPrice } from "./item-component";
const CardBookingTicket = ({
  duration,
  price,
  date,
  hour,
}: {
  duration: number;
  price: [number, number];
  date: Date | undefined;
  hour: string;
}) => {
  return (
    <div className="border-[0.5px] border-[#999] rounded-xl p-6">
      <h5 className="flex items-center justify-start gap-2">
        <AiOutlineClockCircle className="text-[1.25rem]" />{" "}
        <span>{duration} ngày</span>
      </h5>
      <ol className="w-full ">
        <li className="flex items-center font-medium justify-start gap-2 my-2 ">
          Ngày bắt đầu:
          <span className="underline italic">
            {date ? (
              format(date, "dd/MM/yyyy", { locale: vi })
            ) : (
              <span className="underline italic">Chưa chọn ngày bắt đầu</span>
            )}
          </span>
        </li>
        <li className="font-medium">
          Giờ khởi hành :{" "}
          <span className="underline italic">
            {hour ? hour : "Chưa chọn giờ khởi hành"}
          </span>
        </li>
      </ol>
      <ol className="my-2">
        <li className="flex items-center text-[0.95rem] text-black_sub justify-start gap-2">
          <AiOutlineCheckCircle className="text-[1.3rem]" /> Đầy đủ các dịch vụ
          đi kèm
        </li>
        <li className="flex items-center text-[0.95rem] text-black_sub justify-start gap-2">
          <AiOutlineInfoCircle className="text-[1.4rem]" /> Hủy lịch sau 4h khi
          đặt hoặc tối đa trước 2 ngày tour diễn ra
        </li>
      </ol>
      <ol className="list-disc my-2">
        <li className="font-medium">
          Giá người lớn:{" "}
          <span className="underline">{formatPrice(price[0])}</span> vnđ
        </li>
        <li className="font-medium">
          Giá trẻ em (7 tuổi trở lên):{" "}
          <span className="underline">{formatPrice(price[1])}</span> vnđ
        </li>
      </ol>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-y-0 md:gap-x-4">
        <Button className="bg-red-400">Đặt ngay</Button>
        <Button>Liên hệ </Button>
      </div>
    </div>
  );
};

export default CardBookingTicket;
