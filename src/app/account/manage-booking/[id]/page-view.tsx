"use client";
import React, { Fragment } from "react";
import { useAuthenticatedStore } from "@/store/authencation-store";

import Image from "next/image";
import BookedAttractions from "@/components/account/manage-booking/booked-attractions";
import BookedHotels from "@/components/account/manage-booking/booked-hotels";
import { useRouter } from "next/navigation";
import BreadcrumbHead from "@/components/components/breadcrumb";

const ManageBooking = () => {
  const { user } = useAuthenticatedStore();
  const router = useRouter();
  return (
    <div className="w-full h-full section-spacing">
      {user ? (
        <Fragment>
          <BreadcrumbHead
            items={[
              {
                label: "Trang chủ",
                href: "/home",
              },
              {
                label: "Tài khoản",
              },
              {
                label: "Quản lí đặt",
              },
            ]}
          />
          <section className="container xl:px-0 flex flex-col items-center justify-start gap-y-4 ">
            <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-start lg:justify-between">
              <h3 className="text-lg lg:text-3xl font-semibold">
                Hãy khám phá thêm nhiều địa điểm với chúng tôi
              </h3>
              <span
                onClick={() => {
                  router.push("/home");
                }}
                className="text-blue_sub cursor-pointer transition-all duration-200 hover:underline"
              >
                Tìm thêm
              </span>
            </div>
            <BookedAttractions />
            <BookedHotels />
          </section>
        </Fragment>
      ) : (
        <section className="container xl:px-0 min-h-full border-0.5 border-black_sub rounded-8 gap-2 flex items-center justify-center p-6">
          <div className=" flex flex-col items-center justify-start gap-4">
            <Image
              src="https://t-cf.bstatic.com/design-assets/assets/v3.125.0/illustrations-traveller/TripsGlobe@2x.png"
              alt="img_not_has_booking"
              width={600}
              height={600}
              className="w-[300px] h-[300px]"
            />
            <h2 className="text-3xl font-semibold text-center">
              Hiện bạn chưa thể xem được dữ liệu này
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
