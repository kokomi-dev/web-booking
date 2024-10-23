"use client";
import React from "react";
import { useAuthenticatedStore } from "@/store/authencation-store";

import Image from "next/image";
import BookedAttractions from "@/components/account/manage-booking/booked-attractions";
import BookedHotels from "@/components/account/manage-booking/booked-hotels";

const ManageBooking = () => {
  const { user } = useAuthenticatedStore();

  return (
    <div className="w-full h-full py-4">
      {(user && user.bookedAttractions) || user?.bookedHotels ? (
        <section className="w-full h-full grid gap-y-4">
          <BookedAttractions />
          <hr className="hr" />
          <BookedHotels />
        </section>
      ) : (
        <section className="w-full min-h-full border-0.5 border-black_sub rounded-8 gap-2 flex items-center justify-center p-6">
          <div className=" flex flex-col items-center justify-start gap-4">
            <Image
              src="https://t-cf.bstatic.com/design-assets/assets/v3.125.0/illustrations-traveller/TripsGlobe@2x.png"
              alt="img_not_has_booking"
              width={600}
              height={600}
              className="w-[300px] h-[300px]"
            />
            <h2 className="text-large font-semibold text-center">
              Hiện bạn đang không có chuyến đi nào
            </h2>
            <p className="w-[70%] text-center">
              Trang này thể hiện tất cả các đặt chỗ của bạn. Nếu bạn đã đặt chỗ
              mà không được hiển thị ở đây, bạn có thể nhập đặt chỗ bằng mã xác
              nhận và mã PIN.
            </p>
          </div>
        </section>
      )}
    </div>
  );
};

export default ManageBooking;
