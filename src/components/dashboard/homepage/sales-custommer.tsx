"use client";
import React from "react";
import { useAuthenticatedStore } from "@/store/authencation-store";
import { Button } from "@/components/ui/button";
import Link from "next/link";
const SalesCustommer = () => {
  const { isAuthenticated, user } = useAuthenticatedStore();
  return (
    <section className=" bg-bg_black_sub rounded-14 p-2 lg:p-4 py-6">
      <h2 className="text-large font-semibold mb-6">
        Ưu đãi cho khách hàng mới
      </h2>

      {!isAuthenticated && !user ? (
        <div>
          <p className="text-black text-justify text-small">
            Đăng ký ngay để nhận được mã giảm giá 10% cho chuyến đi đầu tiên của
            bạn và nhiều ưu đãi đang chờ đón bạn!
          </p>
          <Link
            href="/sign-in"
            className="mt-4 inline-block px-4 py-1 text-small bg-bg_primary_blue_sub hover:bg-bg_primary_active text-white rounded-md"
          >
            Khám phá ngay thôi nào !
          </Link>
        </div>
      ) : (
        <div>
          <p className="text-black text-justify text-small">
            Hãy xem qua các ưu đãi mà bạn đang có để không bỏ lỡ những chương
            trình khuyến mãi đặc biệt có hạn này.
          </p>
          <Button className="mt-4 px-6 py-2 bg-bg_primary_blue_sub hover:bg-bg_primary_active text-white rounded-md">
            Xem ngay các ưu đãi của bạn
          </Button>
        </div>
      )}
    </section>
  );
};

export default SalesCustommer;
