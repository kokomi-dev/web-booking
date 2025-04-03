import { formatPrice } from "@/components/components/item-component";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ItemBookedProps } from "@/types";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import Link from "next/link";
import React from "react";
const checkStatusBtn = (status: number, slug: string, index: number) => {
  if (status === 1) {
    return (
      <span className="font-medium text-blue_sub p-2 cursor-default">
        Đã thanh toán
      </span>
    );
  } else if (status === 2) {
    return (
      <div className="flex flex-row gap-y-2 w-fit text-xs font-medium items-center justify-center">
        <span className="w-[70px] text-yellow  p-2">Hết hạn</span>
        <Link href={`/attractions/${slug}`} className="text-green-700">
          Đặt lại
        </Link>
      </div>
    );
  } else {
    return (
      <span className="font-medium text-black_sub p-2 ">Chưa thanh toán</span>
    );
  }
};
const ItemBooked: React.FC<ItemBookedProps> = ({
  data,
  status,
  index,
  booked,
}) => {
  return (
    <AccordionItem value={data._id}>
      <AccordionTrigger>
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 items-center">
          <h6 className="text-sm text-start text-blue_sub">{data.name}</h6>
          <address className="truncate font-normal text-start hidden lg:block">
            Địa chỉ: {data.location.detail}
          </address>
          <div className="hidden xl:flex items-center justify-center gap-x-1">
            Trạng thái:{" "}
            {checkStatusBtn(status[index], data.slug, index) || "Checking..."}{" "}
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <ul className="w-full h-auto list-disc text-xs p-2 pt-0 ml-4">
          <li>
            <address className="truncate">
              Địa chỉ: {data.location.detail}
            </address>
          </li>
          <li>Giá tiền: {formatPrice(booked[index].amount)} VNĐ </li>
          <li>
            Ngày đặt:{" "}
            {format(booked[index].bookingDate, "dd/MM/yyyy", {
              locale: vi,
            })}{" "}
          </li>
          <li>
            Trạng thái:{" "}
            {checkStatusBtn(status[index], data.slug, index) || "Checking..."}{" "}
          </li>
        </ul>
      </AccordionContent>
    </AccordionItem>
  );
};

export default ItemBooked;
