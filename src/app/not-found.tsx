"use client";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import notFound from "../assets/images/not-found.png";

const NotFoundPage = ({ page }: { page: string }) => {
  return (
    <div className="w-full min-h-[100vh] flex items-center justify-center bg-gray-100">
      <div className="w-full  h-full flex flex-col gap-y-2 items-center justify-start gap-x-2 text-center p-6 bg-white rounded-14  ">
        <Image
          src={notFound}
          alt="img-not-found"
          width={500}
          height={500}
          className="object-cover w-[300px] h-[300px] "
        />
        <h2 className="text-large font-bold ">
          {page === "attractions" && "Không tìm thấy địa điểm tham quan này !"}
          {page === "hotels" && "Không tìm thấy chỗ nghỉ này !"}
        </h2>
        <h1 className="text-large text-blue_main font-bold">KoKoTravel</h1>
        <p className="text-black_sub text-small ">
          Rất tiếc, trang mà bạn đang cố gắng truy cập không tồn tại hoặc đã bị
          xóa (404)
        </p>
        <Link
          href={`/home`}
          className="flex items-center justify-center gap-2 text-blue_main_sub underline font-medium cursor-pointer"
        >
          <ArrowLeft className="mr-1 size-5" />
          Quay lại Trang chủ
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
