"use client";
import { CheckCircle } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const BookingSuccess = () => {
  const router = useRouter();
  return (
    <div className="w-full h-fit">
      <div className="flex flex-col items-center justify-center h-[calc(100vh-180px)] text-center bg-gray-50">
        <CheckCircle size={100} color="green" />
        <h1 className="text-largest font-bold text-gray-800 my-4">
          Thanh toán thành công!
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.
        </p>
        <Button
          className="px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-300"
          onClick={() => {
            router.push("/attractions");
          }}
        >
          Quay lại trang chủ
        </Button>
      </div>
    </div>
  );
};

export default BookingSuccess;
