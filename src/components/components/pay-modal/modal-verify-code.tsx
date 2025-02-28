"use client";
import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { useAuthenticatedStore } from "@/store/authencation-store";
import { ModalConfirmCodeProps } from "@/types/component-types";
import { cn } from "@/utils/constants";
import { toast } from "react-toastify";
import { Button } from "../../ui/button";

const ModalConfirmCode: React.FC<ModalConfirmCodeProps> = ({
  open,
  setOpen,
  setOpenModalSuccesBooking,
  lastName,
  email,
  code,
  handleSendReqBooked,
}) => {
  const { user } = useAuthenticatedStore();

  const [value, setValue] = useState("");
  const handleConfirm = async (e: any) => {
    e.preventDefault();
    if (value.length !== 6) {
      return toast.warning("Nhập đúng định dạng CODE");
    }

    try {
      if (value == code && !!user) {
        setOpen(false);
        setValue("");
        setOpenModalSuccesBooking();
        handleSendReqBooked({ paymentMethod: "cod", isSuccess: false });
      } else {
        toast.error("Không khớp mã CODE");
      }
    } catch (error) {
      console.log("lỗi", error);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <div className="w-full h-full flex items-center justify-center bg-bg_black_sub text-black rounded-14 p-3">
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
              <h4 className="text-normal font-medium">
                Vui lòng nhập mã 6 chữ số
              </h4>
              <form onSubmit={handleConfirm} className="w-full my-2">
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
              </form>
            </div>
            <div
              className={cn("w-full flex items-center justify-between gap-2")}
            >
              <DialogTrigger className="w-full h-9 flex items-center justify-center px-4 py-2 rounded-lg bg-white text-black border-[1px] border-[#999]">
                Hủy
              </DialogTrigger>
              <Button
                onClick={handleConfirm}
                type="submit"
                className="w-full rounded-lg bg-bg_primary_blue_sub hover:bg-bg_primary_active text-white"
                disabled={!value}
              >
                Tiếp
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalConfirmCode;
