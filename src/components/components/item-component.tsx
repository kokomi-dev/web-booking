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
}: {
  slug: string;
  name: string;
  images: string;
  location: string;
  price: number;
  route: string;
}) => {
  return (
    <Link
      href={`/${route}/${slug}`}
      className="w-full min-h-[100%]  h-[100%] relative "
    >
      <Card className="min-h-[100%] flex items-center justify-start flex-col p-3">
        <Image
          width={1920}
          height={1080}
          className="rounded-tr-md rounded-tl-md object-cover w-[99%] "
          src={images}
          alt="img_preview_tour"
          loading="lazy"
        />
        <CardContent className="flex flex-col gap-1 text-start  items-start justify-center pt-2 pl-1 ">
          <h4 className="text-normal font-bold w-[100%] h-auto  overflow-hidden line-clamp-2 text-start   ">
            {name}
          </h4>
          <address className="text-small text-black_sub">{location}</address>
        </CardContent>
        <h6 className="text-normal absolute bottom-2 right-4">
          <span className="text-small pr-2 ">Giá từ</span>
          <span className="underline text-blue_main">{formatPrice(price)}</span>
          <span className="text-small font-semibold pl-2">VND</span>
        </h6>
      </Card>
    </Link>
  );
};

export default ItemCard;
