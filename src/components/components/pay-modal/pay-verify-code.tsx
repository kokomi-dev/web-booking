"use client";
import React, { useState } from "react";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { useAuthenticatedStore } from "@/store/authencation-store";
import { ModalConfirmCodeProps } from "@/types/component-types";
import { Check } from "lucide-react";
import { toast } from "react-toastify";
import { Button } from "../../ui/button";

const PayConfirmCode: React.FC<ModalConfirmCodeProps> = ({
  prevStep,
  nextStep,
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
        // setOpen(false);
        setValue("");
        nextStep();
        handleSendReqBooked({ paymentMethod: "cod", isSuccess: false });
      } else {
        toast.error("Không khớp mã CODE");
      }
    } catch (error) {
      console.log("lỗi", error);
    }
  };
  return (
    <div className="w-full h-full flex items-center justify-center text-black">
      <div className="w-full p-2 list-spacing">
        {/* Header */}
        <div className="text-center space-y-2">
          <h3 className="text-lg font-bold flex items-center justify-center gap-x-2">
            <Check className="size-7 text-green" />
            Xác thực tài khoản
          </h3>
          <p className="text-black_sub text-sm">
            Xin chào
            <span className="capitalize text-lg first-letter:uppercase font-semibold text-black_blur mx-1">
              {lastName}
            </span>
            ! Chúng tôi đã gửi mã xác thực đến
            <span className="text-blue_sub font-medium underline mx-1">
              {email}
            </span>
          </p>
        </div>

        {/* OTP Input */}
        <div className="space-y-3">
          <h4 className="text-base font-semibold text-center">
            Nhập mã gồm 6 chữ số
          </h4>
          <div className="flex justify-center gap-2">
            <InputOTP
              maxLength={6}
              value={value}
              onChange={(value) => setValue(value)}
            >
              <InputOTPGroup>
                {Array.from({ length: 6 }).map((_, index) => (
                  <InputOTPSlot key={index} index={index} />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col lg:flex-row gap-3">
          <Button
            size="sm"
            onClick={prevStep}
            className="w-full h-10 bg-black_sub text-black rounded-lg hover:bg-white transition"
          >
            Quay lại
          </Button>
          <Button
            size="sm"
            onClick={handleConfirm}
            type="button"
            className={`w-full h-10 rounded-lg text-white ${
              value
                ? "bg-blue_sub hover:bg-blue_active"
                : "bg-white cursor-not-allowed"
            } transition`}
            disabled={!value}
          >
            Tiếp tục
          </Button>
        </div>

        {/* Resend code */}
        <div className="text-center text-xs text-black_sub">
          Chưa nhận được mã?{" "}
          <button className="text-blue_sub font-medium underline">
            Gửi lại
          </button>
        </div>
      </div>
    </div>
  );
};

export default PayConfirmCode;
