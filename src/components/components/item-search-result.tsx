import React, { Suspense } from "react";
import Link from "next/link";
import { FaCalendarXmark, FaStar } from "react-icons/fa6";
import Image from "next/image";

import { ratingConvert } from "@/constants";
import { LoadingItemSearch } from "@/components/components/loading";
export const formatPrice = (num: number) => {
  const str = num.toString();
  return str
    .split("")
    .reverse()
    .reduce((prev, next, index) => {
      return (index % 3 ? next : next + ",") + prev;
    });
};

const ItemSearchResult = ({
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
}) => {
  return (
    <Suspense fallback={<LoadingItemSearch />}>
      <Link
        href={`/${route}/${slug}`}
        className="w-full border_div_card "
        key={slug}
      >
        <div className="w-full grid grid-cols-layout-4 p-1">
          <Image
            width={400}
            height={400}
            className="rounded-md object-cover w-[180px] h-[190px]"
            src={images}
            alt="img_preview_tour"
            loading="lazy"
          />
          <div className="flex flex-col gap-y-1 text-start  items-start justify-center p-4 pt-0">
            <h4 className="text-medium font-bold w-[100%] h-[38px]  overflow-hidden line-clamp-1 text-start  text-blue_main_sub">
              {name}
            </h4>
            <address className="text-smallest font-light text-black_sub  ">
              {location}
            </address>
            <p className="overflow-hidden line-clamp-2 p_type_1 text-small font-light">
              {description}
            </p>
            <p className="overflow-hidden line-clamp-2 p_type_1 text-small font-light">
              {details}
            </p>
            <h6 className=" flex items-center justify-start gap-1 ">
              <FaStar className="text-yellow-400" />
              <span className="text-smallest font-bold">{ratingsQuantity}</span>
              {ratingsQuantity && ratingConvert(ratingsQuantity)}
            </h6>
            {cancelFree && (
              <div className="flex items-center ">
                <FaCalendarXmark className="text-green_main text-small mr-1" />
                <h4 className="text-smallest text-green_main font-medium">
                  Có lựa chọn hủy miễn phí
                </h4>
              </div>
            )}
            <h6 className="t_small pt-2">
              <span className="text-smallest pr-1"> Giá từ </span>
              <span className="underline text-blue_main_sub font-semibold">
                {formatPrice(price)}
              </span>{" "}
              <span className="font-semibold">VNĐ</span>
            </h6>
          </div>
        </div>
      </Link>
    </Suspense>
  );
};

export default ItemSearchResult;
