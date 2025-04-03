"use client";
import React from "react";
import { useAuthenticatedStore } from "@/store/authencation-store";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
const SalesCustommer = () => {
  const { isAuthenticated, user } = useAuthenticatedStore();
  const router = useRouter();
  return (
    <section className="container xl:px-0">
      <div className="bg-black_sub rounded-14 p-3 lg:p-4 py-6">
        <h2 className="text-lg  xl:text-2xl font-semibold mb-2 mg:mb-4 lg:mb-6">
          Ưu đãi cho khách hàng mới
        </h2>

        {!isAuthenticated && !user ? (
          <div>
            <p className="text-black text-justify text-sm font-light">
              Đăng ký ngay để nhận được mã giảm giá 10% cho chuyến đi đầu tiên
              của bạn và nhiều ưu đãi đang chờ đón bạn!
            </p>
            <Link
              href="/sign-in"
              className="mt-4 inline-block px-4 py-1 text-sm bg-blue_sub hover:bg-blue_active text-white rounded-md"
            >
              Khám phá ngay thôi nào !
            </Link>
          </div>
        ) : (
          <div>
            <p className="text-black text-justify text-sm">
              Hãy xem qua các ưu đãi mà bạn đang có để không bỏ lỡ những chương
              trình khuyến mãi đặc biệt có hạn này.
            </p>
            <Button
              onClick={() => {
                router.push("genius/" + user?._id);
              }}
              className="mt-4 px-6 py-2 bg-blue_sub hover:bg-blue_active text-white hover:text-white rounded-md"
            >
              Xem ngay các ưu đãi của bạn
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default SalesCustommer;
