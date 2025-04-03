"use client";
import { useAuthenticatedStore } from "@/store/authencation-store";
import Link from "next/link";
import React from "react";
import bannerSale from "@/assets/images/banner-sale-attraction.jpeg";
const BannerSale = () => {
  const { user, isAuthenticated } = useAuthenticatedStore();
  return (
    <section
      className="w-full h-full relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${bannerSale.src})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10 container xl:px-0"></div>
      {/* Content */}
      <div className="relative z-20 isolate overflow-hidden py-16 sm:py-24 lg:py-32 container">
        <div className="mx-auto px-4 md:px-6 lg:px-8 max-w-3xl text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Ưu đãi hấp dẫn
          </h2>
          <p className="mt-4 text-lg sm:text-xl text-gray-200 font-medium">
            Chúng tôi sẽ mang đến cho bạn những dịch vụ hợp lý với mức giá tốt
            nhất. Đừng bỏ lỡ cơ hội này!
          </p>
          <div className="mt-8 flex flex-col sm:flex-row sm:justify-center gap-4">
            {isAuthenticated && !!user ? (
              <Link
                href={`/genius/${user?._id}`}
                className="bg-yellow text-black px-6 py-3 rounded-md text-sm lg:text-base font-semibold hover:bg-yellow-600 transition"
              >
                Xem ưu đãi
              </Link>
            ) : (
              <Link
                href="/sign-in"
                className="bg-yellow text-black px-6 py-3 rounded-md text-sm lg:text-base font-semibold hover:bg-yellow-600 transition"
              >
                Xem ưu đãi
              </Link>
            )}

            <Link
              href="/contact"
              className="bg-transparent border border-white text-white px-6 py-3 rounded-md text-sm lg:text-base font-semibold hover:bg-white hover:text-black transition"
            >
              Liên hệ ngay
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerSale;
