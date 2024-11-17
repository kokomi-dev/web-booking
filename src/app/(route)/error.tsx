"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const Error = () => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-6 bg-white rounded shadow-lg">
        <h1 className="text-4xl font-bold text-red-500">404</h1>
        <h2 className="text-2xl font-semibold my-4">
          Trang bạn tìm kiếm không tồn tại
        </h2>
        <p className="text-gray-600 mb-8">
          Rất tiếc, trang mà bạn đang cố gắng truy cập không tồn tại hoặc đã bị
          xóa.
        </p>
        <div
          className="flex items-center justify-center gap-2"
          onClick={() => {
            router.back();
          }}
        >
          <ArrowLeft className="mr-1" />
          <span className="text-red-500 underline font-medium">
            Quay lại Trang chủ
          </span>
        </div>
      </div>
    </div>
  );
};

export default Error;
