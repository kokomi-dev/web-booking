import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const ManageBooking = () => {
  const has = null;
  return (
    <div className={cn("w-ful h-full p-4", "lg:px-36")}>
      {has ? (
        <div>
          <h1 className="text-large font-bold">
            Quản lí đặt chỗ và chuyến đi của bạn
          </h1>
        </div>
      ) : (
        <div className="w-full min-h-full border-0.5 border-black_sub rounded-8 gap-2 flex items-center justify-center p-6">
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
        </div>
      )}
    </div>
  );
};

export default ManageBooking;
