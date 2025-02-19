"use client";
import { useAuthenticatedStore } from "@/store/authencation-store";
import { cn } from "@/utils/constants";
import React from "react";

const ListItemBooked = () => {
  const { user } = useAuthenticatedStore();
  return (
    <div className="posing-vertical-2 shadow-2xl p-3 rounded-8 !mt-0 lg:!mt-[1.3rem]">
      <div className="flex items-center justify-center gap-x-1 gap-y-3 text-large font-bold ">
        <h3 className="capitalize text-center">{user?.lastname} </h3>
        <span>ơi,</span>
        {user?.isNewbie ? "bạn là người mới! " : "bạn đang ở cấp 1"}
      </div>
      <p>
        Hoàn tất 5 đơn đặt trong vòng 2 năm để mở khóa các giảm giá và tặng
        thưởng ở Cấp 2 - mọi đơn đặt đều được tính!
      </p>
      <div className="flex items-center justify-center gap-x-2">
        <div className="w-[50px] h-[50px] lg:w-[100px] lg:h-[100px] rounded-full bg-bg_black_sub border-dotted	border-1 border-black_sub "></div>
        <div className="w-[50px] h-[50px] lg:w-[100px] lg:h-[100px] rounded-full bg-bg_black_sub border-dotted	border-1 border-black_sub "></div>
        <div className="w-[50px] h-[50px] lg:w-[100px] lg:h-[100px] rounded-full bg-bg_black_sub border-dotted	border-1 border-black_sub "></div>
        <div className="w-[50px] h-[50px] lg:w-[100px] lg:h-[100px] rounded-full bg-bg_black_sub border-dotted	border-1 border-black_sub "></div>
        <div className="w-[50px] h-[50px] lg:w-[100px] lg:h-[100px] rounded-full bg-bg_black_sub border-dotted	border-1 border-black_sub "></div>
      </div>
      <div
        className={cn(
          "hidden p-2 rounded-lg transition-all duration-300",
          "lg:block hover:bg-bg_primary_hover hover:cursor-pointer hover:text-blue_main"
        )}
      >
        <h3 className={cn("text-small font-medium text-blue_main_sub ")}>
          Cách thăng cấp trong Genius
        </h3>
      </div>
    </div>
  );
};

export default ListItemBooked;
