"use client";
import React, { useState } from "react";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { createRequestPayment } from "@/api/api-payment";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAuthenticatedStore } from "@/store/authencation-store";

interface ModalConfirmCodeProps {
  lastName: string;
  email: string;
  code: string;
  totalBooking: any;
  tripId: string;
  category: string;
  img: string;
}
const ModalConfirmCode: React.FC<ModalConfirmCodeProps> = ({
  lastName,
  email,
  code,
  totalBooking,
  category,
  tripId,
  img,
}) => {
  const { user } = useAuthenticatedStore();

  const [value, setValue] = useState("");
  const router = useRouter();
  const handleConfirm = async () => {
    function removeDots(numberStr: string) {
      return numberStr.replace(/\./g, "");
    }

    try {
      if (value == code && user) {
        const result = await createRequestPayment({
          amount: parseFloat(removeDots(totalBooking)),
          userId: user._id,
          tripId,
          category,
          img,
        });
        if (result && result.data) {
          router.push(result?.data?.order_url);
        }
      } else {
        toast.error("Nhâp lại mã code");
      }
    } catch (error) {}
  };
  return (
    <div className="w-full h-full flex items-center justify-center bg-bg_black_sub text-black rounded-14">
      <div className="w-full flex items-center justify-start flex-col gap-4 ">
        <DialogHeader>
          <DialogTitle>
            Xin chào
            <span className="capitalize text-[1.2rem]"> {lastName}</span>
          </DialogTitle>
          <DialogDescription>
            Chúng tôi đã gửi email xác thưc tới
            <span className="text-blue_main_sub underline font-medium mx-1">
              {email}
            </span>
            của bạn
          </DialogDescription>
        </DialogHeader>
        <div>
          <h4 className="text-normal font-medium">Vui lòng nhập mã 6 chữ số</h4>
          <div className="w-full my-2">
            <InputOTP
              maxLength={6}
              value={value}
              onChange={(value) => setValue(value)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>
        <div className={cn("w-full flex items-center justify-between gap-2")}>
          <DialogTrigger className="w-full h-9 px-4 py-2 rounded-lg bg-white text-black border-[1px] border-[#999]">
            Hủy
          </DialogTrigger>
          <Button
            onClick={handleConfirm}
            className="w-full rounded-lg bg-bg_primary_blue_sub text-white"
            disabled={!value}
          >
            Tiếp
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmCode;
