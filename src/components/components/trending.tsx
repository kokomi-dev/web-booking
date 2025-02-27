"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

import { ADDRESS_TRENDING } from "@/components/dashboard/constants";
import { cn } from "@/utils/constants";
import { LoadingImg } from "@/components/components/loading";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

interface ITrending {
  page: string;
}

const Trending: React.FC<ITrending> = ({ page }) => {
  return (
    <section className="w-full h-full posing-vertical-2 ">
      <div className="posing-vertical-6">
        <h2 className="text-large font-bold">Điểm đến được gợi ý</h2>
        <h3 className="text-normal text-black_sub hidden lg:block">
          Những trải nghiệm hàng đầu ở Việt Nam để bạn bắt đầu
        </h3>
      </div>
      <div className="w-full max-h-[360px] hidden overflow-auto lg:grid grid-cols-1 gap-4 md:grid-cols-2 md:max-h-full lg:grid-cols-3">
        {ADDRESS_TRENDING.map((address, index) => (
          <TrendingItem key={index} page={page} address={address} />
        ))}
      </div>

      <Carousel opts={{ align: "start" }} className="w-full lg:hidden">
        <CarouselContent>
          {ADDRESS_TRENDING.map((address, index) => {
            return (
              <CarouselItem
                key={index}
                className="basis-[78.67%] sm:basis-1/2 md:basis-1/3"
              >
                <TrendingItem key={index} page={page} address={address} />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious hidden />
        <CarouselNext hidden />
      </Carousel>
    </section>
  );
};

const TrendingItem = ({ page, address }: { page: string; address: any }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Link
      href={`/${page}/searchresult?address=${address.name}&filter=suggest`}
      className="w-full h-full relative transition-all duration-300 hover:cursor-pointer"
    >
      <div className="relative w-full h-[190px] rounded-14 overflow-hidden">
        {isLoading && <LoadingImg />}
        <Image
          src={address.img}
          alt={address.name}
          width={600}
          height={400}
          className={cn(
            "w-full h-full object-cover transition-all duration-300",
            isLoading ? "brightness-75" : "brightness-90 hover:brightness-100"
          )}
          onLoad={() => setIsLoading(false)}
        />
      </div>
      <div className="absolute bottom-2 left-2 text-white">
        <h3 className="capitalize text-normal font-semibold font-mono">
          {address.name}
        </h3>
      </div>
    </Link>
  );
};

export default Trending;
