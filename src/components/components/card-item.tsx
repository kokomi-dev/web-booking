import React, { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";

import { ratingConvert } from "@/utils/constants";
import { LoadingItemSearch } from "@/components/components/loading";
import { CalendarCheck, DollarSign, MapPin, Rat, Star } from "lucide-react";
export const formatPrice = (num: number) => {
  const str = num.toString();
  return str
    .split("")
    .reverse()
    .reduce((prev, next, index) => {
      return (index % 3 ? next : next + ",") + prev;
    });
};

const CardItem = ({
  slug,
  name,
  images,
  location,
  price,
  route,
  description,
  ratingsQuantity,
  details,
  cancelFree,
  startDate,
  duration,
}: {
  slug: string;
  name: string;
  images: string;
  location: string;
  price: number;
  route: string;
  description?: string;
  ratingsQuantity?: number;
  details?: string;
  cancelFree?: boolean;
  startDate?: string;
  duration?: number;
}) => {
  return (
    <Suspense fallback={<LoadingItemSearch />}>
      <Link
        href={`/${route}/${slug}`}
        className="w-full p-1"
        key={slug}
        target="_blank"
      >
        <div className="flex flex-col items-center border rounded-lg overflow-hidden shadow-lg w-full ">
          <div className="relative w-full ">
            <Image
              width={600}
              height={300}
              src={images}
              alt={name}
              priority={true}
              className="object-cover h-[220px] lg:h-[240px]"
            />
          </div>
          <div className="p-3 lg:p-4 w-full flex flex-col items-start justify-start text-start posing-vertical-5">
            <h3 className="text-medium font-semibold line-clamp-1 ">{name}</h3>
            <address className="flex items-center justify-start gap-x-1 text-smallest lg:text-small text-black_sub line-clamp-1">
              <MapPin className=" size-4" />
              <span className="line-clamp-1">{location}</span>
            </address>
            {route === "attractions" && (
              <h6 className=" flex items-center justify-start gap-x-1 text-smallest lg:text-small text-black_sub">
                <CalendarCheck className="size-4" />
                <span className="text-center  ">Khởi hành: {startDate}</span>
              </h6>
            )}
            <h6 className=" flex items-center justify-start gap-x-1 text-smallest lg:text-small text-black_sub">
              <Star className="size-4 fill-yellow_main text-yellow_main" />
              <span className="text-center font-medium">{ratingsQuantity}</span>
            </h6>
            <h6 className="flex items-center justify-start gap-x-1 text-smallest lg:text-small text-black">
              <DollarSign className="size-4 text-black_sub" />
              <span className="text-blue_main_sub text-normal font-semibold">
                {formatPrice(price)}VNĐ
              </span>
            </h6>
          </div>
        </div>
      </Link>
    </Suspense>
  );
};

export default CardItem;
