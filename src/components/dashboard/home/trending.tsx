"use client";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";

import { ADDRESS_TRENDING } from "@/constants";
import { cn } from "@/lib/utils";
import { LoadingImg } from "@/components/components/loading";

interface ITrending {
  page: string;
}
const Trending: React.FC<ITrending> = ({ page }) => {
  return (
    <div className="w-full h-full flex flex-col items-start justify-start gap-4">
      <section className="flex flex-col items-start justify-start gap-2">
        <h2 className="text-large font-bold">Điểm đến được gợi ý</h2>
        <h3 className="text-normal text-black_sub">
          Những trải nhiệm hàng đầu ở Việt Nam để bạn bắt đầu
        </h3>
      </section>
      <div
        className={cn(
          " w-full h-full grid grid-col-1 gap-3",
          "md:grid-cols-2",
          "lg:grid-cols-3"
        )}
      >
        {ADDRESS_TRENDING.map((address, index) => {
          return (
            <Link
              href={`/${page}/searchresult?address=${address.slug}&filter=suggest`}
              key={index}
              className={cn(
                "w-full h-full relative transition-all duration-300 ",
                "hover:cursor-pointer"
              )}
            >
              <Suspense fallback={<LoadingImg />}>
                <Image
                  src={address.img}
                  alt="img_trending"
                  width={600}
                  height={400}
                  className="w-full h-[190px] transition-all duration-300 rounded-14 object-cover hover:brightness-100 brightness-75"
                />
              </Suspense>
              <div className="absolute bottom-2 left-2 text-white">
                <div>
                  <h3 className="capitalize text-normal font-medium">
                    {address.name}
                  </h3>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Trending;
