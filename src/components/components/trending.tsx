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
import Autoplay from "embla-carousel-autoplay";

interface ITrending {
  page: string;
}

const Trending: React.FC<ITrending> = ({ page }) => {
  const plugin = React.useRef(
    Autoplay({ delay: 1500, stopOnInteraction: true })
  );
  return (
    <section className="container xl:px-0 list-spacing ">
      <div className="">
        <h2 className="text-xl md:text-2xl font-bold">Điểm đến được gợi ý</h2>
        <span className="text-base font-light lg:font-normal text-black_sub hidden md:block">
          Những trải nghiệm hàng đầu ở Việt Nam để bạn bắt đầu
        </span>
      </div>
      <div className="w-full max-h-[360px] hidden overflow-auto lg:grid grid-cols-1 gap-3 lg:gap-4 xl:gap-5 md:grid-cols-2 md:max-h-full lg:grid-cols-3">
        {ADDRESS_TRENDING.map((address, index) => (
          <TrendingItem key={index} page={page} address={address} />
        ))}
      </div>

      <Carousel
        onMouseEnter={() => plugin.current?.stop()}
        onMouseLeave={() => plugin.current?.play()}
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[plugin.current]}
        className="w-full lg:hidden"
      >
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
      href={`/${page}/all?address=${address.name}`}
      className="w-full h-full relative transition-all duration-300 hover:cursor-pointer"
    >
      <div className=" w-full h-[190px] rounded-14 overflow-hidden">
        {isLoading && <LoadingImg />}
        <Image
          src={address.img}
          alt={address.name}
          width={600}
          height={400}
          className={cn(
            "object-cover transition-all duration-300 w-full h-full",
            isLoading ? "brightness-75" : "brightness-90 hover:brightness-100"
          )}
          onLoad={() => setIsLoading(false)}
        />
      </div>
      <div className="absolute bottom-2 left-2 text-white">
        <h3 className="capitalize text-base font-semibold font-mono">
          {address.name}
        </h3>
      </div>
    </Link>
  );
};

export default Trending;
