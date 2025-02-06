"use client";
import React from "react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";

import {
  AiOutlineInfoCircle,
  AiOutlineCheckCircle,
  AiOutlineClockCircle,
} from "react-icons/ai";
import { Button } from "../../ui/button";
import { formatPrice } from "../../components/item-component";
import { cn } from "@/utils/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { useAuthenticatedStore } from "@/store/authencation-store";
import Link from "next/link";
interface CardBookingTicketProps {
  duration: number;
  price: [number, number];
  date: Date | undefined;
  hour: string;
  slug: string;
  name: string;
}
const CardBookingTicket: React.FC<CardBookingTicketProps> = ({
  duration,
  price,
  date,
  hour,
  slug,
  name,
}) => {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthenticatedStore();
  const cardBookingBody = z
    .object({
      children: z.string().min(0, "Số trẻ em"),
      adult: z.string().min(1, "Số người lớn"),
    })
    .strict();
  type CardBookingData = z.infer<typeof cardBookingBody>;

  const form = useForm<CardBookingData>({
    resolver: zodResolver(cardBookingBody),
    defaultValues: {
      children: "",
      adult: "",
    },
  });

  const onSubmit = ({ adult, children }: CardBookingData) => {
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
        "space-y-3 border-[2px] border-blue_main_sub rounded-xl p-3 relative "
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
      <ol className="w-full">
        <li className="grid grid-cols-[5%,95%] gap-x-2 md:gap-x-2 lg:gap-x-3 items-center  text-black font-normal">
          <AiOutlineCheckCircle className="text-[1.2rem]" />
          <span className="text-small">Đầy đủ các dịch vụ đi kèm</span>
        </li>
        <li className="grid grid-cols-[5%,95%] gap-x-2 md:gap-x-2 lg:gap-x-3 items-center   text-black font-normal">
          <AiOutlineInfoCircle className="text-[1.2rem]" />
          <span className="text-small">
            Hủy lịch sau 4h khi đặt hoặc tối đa trước 2 ngày tour diễn ra
          </span>
        </li>
      </ol>
      <ol className="w-full">
        <li className="text-normal font-medium">
          Giá người lớn:{" "}
          <span className="underline text-blue_main">
            {formatPrice(price[0])}
          </span>
          VNĐ
        </li>
        <li className="text-normal font-medium ">
          Giá trẻ em (7 =&gt; 14 tuổi):{" "}
          <span className="underline text-blue_main">
            {formatPrice(price[1])}
          </span>
          VNĐ
        </li>
      </ol>
      <div className="w-full">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3 text-small"
          >
            <FormField
              control={form.control}
              name="adult"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-small">Số người lớn</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="..." {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="children"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số trẻ em</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="..." {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <div className="w-full  ">
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-y-0 md:gap-x-4">
                <Button
                  type="submit"
                  className="w-full bg-bg_primary_blue_sub hover:bg-bg_primary_active"
                >
                  <span className="text-white text-small font-normal">
                    Đặt ngay
                  </span>
                </Button>
                <Button
                  onClick={() => {
                    router.push("/contact");
                  }}
                  type="button"
                  className="w-full text-small font-normal"
                >
                  Liên hệ
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CardBookingTicket;
