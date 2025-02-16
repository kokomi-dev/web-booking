"use client";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";

import { ADDRESS_TRENDING } from "@/components/dashboard/constants";
import { cn } from "@/utils/constants";
import { LoadingImg } from "@/components/components/loading";

interface ITrending {
  page: string;
}
const Trending: React.FC<ITrending> = ({ page }) => {
  return (
    <section className="w-full h-full posing-vertical-2">
      <div className="posing-vertical-6">
        <h2 className="text-large font-bold">Điểm đến được gợi ý</h2>
        <h3 className="text-normal text-black_sub">
          Những trải nhiệm hàng đầu ở Việt Nam để bạn bắt đầu
        </h3>
      </div>
      <div
        className={cn(
          "w-full max-h-[360px] overflow-auto h-full grid grid-col-1 gap-4",
          "md:grid-cols-2 md:max-h-full",
          "lg:grid-cols-3"
        )}
      >
        {ADDRESS_TRENDING.map((address, index) => {
          return (
            <Link
              href={`/${page}/searchresult?address=${address.name}&filter=suggest`}
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
                  className="w-full h-[190px] transition-all duration-300 rounded-14 object-cover hover:brightness-100 brightness-90"
                />
              </Suspense>
              <div className="absolute bottom-2 left-2 text-white">
                <div>
                  <h3 className="capitalize text-normal font-semibold font-mono">
                    {address.name}
                  </h3>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Trending;
