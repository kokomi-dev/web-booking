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
import { Button } from "../ui/button";

interface ITrending {
  page: string;
}

const Trending: React.FC<ITrending> = ({ page }) => {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );
  return (
    <section
      id="trending_shared"
      className="container xl:px-0 list-spacing py-8 bg-white"
    >
      <div className="mb-6">
        <h2 className="text-xl md:text-2xl font-bold">Điểm đến được gợi ý</h2>
        <span className="text-base font-light lg:font-normal text-black_sub hidden md:block">
          Những trải nghiệm hàng đầu ở Việt Nam để bạn bắt đầu
        </span>
      </div>

      {/* Desktop layout */}
      <div className="w-full hidden md:grid grid-cols-4">
        <div className="col-span-2 row-span-2">
          <TrendingItem
            page={page}
            address={{
              ...ADDRESS_TRENDING[0],
              country: "DU LỊCH",
              title: "Đà Nẵng",
              rating: 4.5,
            }}
            isLarge
          />
        </div>
        <div className="col-span-2">
          <TrendingItem
            page={page}
            address={{
              ...ADDRESS_TRENDING[1],
              country: "ĐIỂM ĐẾN",
              title: "Hội An",
              rating: 5,
            }}
          />
        </div>
        <div>
          <TrendingItem
            page={page}
            address={{
              ...ADDRESS_TRENDING[2],
              country: "BIỂN",
              title: "Nha Trang",
              rating: 4.5,
            }}
          />
        </div>
        <div>
          <TrendingItem
            page={page}
            address={{
              ...ADDRESS_TRENDING[3],
              country: "VĂN HÓA",
              title: "Huế",
              rating: 4,
            }}
          />
        </div>
      </div>

      {/* Mobile and tablet carousel */}
      <Carousel
        onMouseEnter={() => plugin.current?.stop()}
        onMouseLeave={() => plugin.current?.play()}
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[plugin.current]}
        className="w-full md:hidden"
      >
        <CarouselContent>
          {ADDRESS_TRENDING.map((address, index) => {
            // Add sample countries, titles and ratings
            const enhancedAddress = {
              ...address,
              country: ["DU LỊCH", "ĐIỂM ĐẾN", "BIỂN", "VĂN HÓA"][index % 4],
              title: ["Đà Nẵng", "Hội An", "Nha Trang", "Huế"][index % 4],
              rating: [4.5, 5, 4.5, 4][index % 4],
            };

            return (
              <CarouselItem
                key={index}
                className="basis-[78.67%] sm:basis-1/2 md:basis-1/2"
              >
                <TrendingItem
                  key={index}
                  page={page}
                  address={enhancedAddress}
                  isLarge={index === 0}
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </section>
  );
};

const TrendingItem = ({
  page,
  address,
  isLarge = false,
}: {
  page: string;
  address: any;
  isLarge?: boolean;
}) => {
  const [isLoading, setIsLoading] = useState(true);

  // Generate star rating
  const renderRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <span key={i} className="text-yellow">
            ★
          </span>
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <span key={i} className="text-yellow">
            ★
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="text-yellow opacity-50">
            ★
          </span>
        );
      }
    }
    return stars;
  };

  return (
    <Link
      href={`/${page}/all?address=${address.name}`}
      className={cn(
        "w-full relative transition-all duration-300 hover:cursor-pointer block overflow-hidden shadow-md group",
        isLarge ? "h-full" : "h-[280px]"
      )}
    >
      {/* Country Badge */}
      <div className="absolute top-3 left-3 z-10">
        <span className="bg-blue-500 text-white text-sm px-4 py-1 rounded font-medium">
          {address.country || "VIETNAM"}
        </span>
      </div>

      {/* Image */}
      <div className="w-full h-full overflow-hidden">
        {isLoading && <LoadingImg />}
        <Image
          src={address.img}
          alt={address.name}
          width={800}
          height={600}
          className={cn(
            "object-cover transition-transform duration-300 w-full h-full",
            isLoading
              ? "brightness-75"
              : "brightness-90 group-hover:brightness-100 group-hover:scale-105"
          )}
          onLoad={() => setIsLoading(false)}
        />
      </div>

      {/* Overlay with Title, Rating, and Search Button */}
      <div
        className={cn(
          "absolute bottom-0 left-0 w-full group-hover:bg-black/10 group-hover:backdrop-blur-[2px] p-4 transition-transform duration-300",
          "group-hover:translate-y-0 group-hover:opacity-100",
          "translate-y-[0%] opacity-100"
        )}
      >
        {/* Title and Rating (Always Visible) */}
        <h3 className="text-white text-xl font-bold mb-1">
          {address.title || address.name}
        </h3>
        <div className="flex items-center mb-2">
          {address.rating && renderRating(address.rating)}
        </div>

        {/* Search Button (Visible on Hover) */}
        <div
          className={cn(
            "opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0"
          )}
        >
          <Button className="bg-yellow-400 text-white px-4 py-2 rounded-full font-medium shadow-md hover:bg-yellow-500 transition-all duration-300">
            Tìm kiếm ngay
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default Trending;
