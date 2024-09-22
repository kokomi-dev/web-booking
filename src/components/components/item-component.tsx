"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";

export const formatPrice = (num: number) => {
  const formattedNumber = new Intl.NumberFormat("vi-VN").format(num);
  return formattedNumber;
};
const ItemCard = ({
  slug,
  name,
  images,
  location,
  price,
  route,
  rating,
}: {
  slug: string;
  name: string;
  images: string;
  location: string;
  price: number;
  route: string;
  rating: number;
}) => {
  return (
    <Link
      href={`/${route}/${slug}`}
      className="w-full min-h-[100%]  h-[100%] relative  "
    >
      <Card className="min-h-[100%] flex items-center justify-start flex-col ">
        <Image
          width={1920}
          height={1080}
          className="rounded-tr-md rounded-tl-md object-cover w-[99%] "
          src={images}
          alt="img_preview_tour"
          loading="lazy"
        />
        <CardContent className="flex flex-col gap-1 items-start justify-start p-2 pt-1 pb-8">
          <h4 className="text-normal font-bold w-[100%]   overflow-hidden line-clamp-1 text-start   ">
            {name}
          </h4>
          <address className="text-[0.8rem] text-black_sub">{location}</address>
          <div className="w-full flex items-center justify-start gap-1 text-[0.8rem] font-normal">
            <div>
              <span className="text-white bg-bg_primary_active rounded-8  px-2 py-1">
                {rating}
              </span>
            </div>
            <h6>{rating > 4.5 ? "Rất tuyệt vời" : "Rất tốt "}</h6>
          </div>
          <h6 className="text-normal absolute bottom-2 right-4">
            <span className="text-[0.8rem] font-light pr-1">Bắt đầu từ</span>
            <span className="text-small font-bold pr-1">VND</span>
            <span className="underline text-blue_main text-small font-bold">
              {formatPrice(price)}
            </span>
          </h6>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ItemCard;
