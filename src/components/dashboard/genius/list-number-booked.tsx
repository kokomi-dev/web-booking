"use client";
import { useAuthenticatedStore } from "@/store/authencation-store";
import { cn } from "@/utils/constants";
import React from "react";

const ListItemBooked = () => {
  const { user } = useAuthenticatedStore();
  const isDataBooked = () => {
    if (user) {
      const total =
        user.numberOfBooked?.attraction + user.numberOfBooked?.hotel;
      return {
        totalNumberBooked: total,
        isNewbie: total >= 5 ? false : true,
        attractioBooked: user.numberOfBooked?.attraction,
        hotelBooked: user.numberOfBooked?.hotel,
      };
    }
  };
  const dataBooked = isDataBooked();
  const checkLevel = () => {
    const total = dataBooked?.totalNumberBooked;
    if (total) {
      if (total < 5) {
        return 1;
      } else if (total > 5 && total < 10) {
        return 2;
      } else return 3;
    }
  };
  const levelBooked = checkLevel();
  return (
    <div className="container-spacing container xl:px-0  ">
      <div className="flex items-start lg:items-center justify-center gap-x-1 gap-y-3 text-base  ">
        <h3 className="capitalize text-center text-lg font-bold">
          {user?.lastname}{" "}
        </h3>
        <span className="">ơi,</span>
        {dataBooked?.isNewbie === true ? (
          <span className="">bạn là người mới</span>
        ) : (
          <span className="">
            bạn đã đặt được {dataBooked?.attractioBooked} vé tham quan địa điểm,{" "}
            {dataBooked?.hotelBooked} phòng nghỉ
          </span>
        )}
      </div>
      <p>
        {dataBooked?.isNewbie
          ? "   Hoàn tất 5 đơn đặt trong vòng 2 năm để mở khóa các giảm giá và tặng thưởng ở Cấp 2 - mọi đơn đặt đều được tính!"
          : "Đạt cấp cao thưởng càng cao"}
      </p>
      {dataBooked && dataBooked?.totalNumberBooked < 5 ? (
        <div className="flex items-center justify-center gap-x-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className={cn(
                "w-[50px] h-[50px] lg:w-[100px] lg:h-[100px] rounded-full bg-black_sub border-dotted	border-1 border-black_sub",
                index < dataBooked.totalNumberBooked && "bg-blue_active"
              )}
            ></div>
          ))}
        </div>
      ) : (
        <div className="font-semibold text-black text-base">
          Bạn đang ở cấp {levelBooked} trong{" "}
          <span className="uppercase text-blue_sub">GENIUS</span> của chúng tôi
        </div>
      )}
    </div>
  );
};

export default ListItemBooked;
