import React, { Suspense } from "react";
import Link from "next/link";
import { FaStar } from "react-icons/fa6";
import Image from "next/image";
import { ratingConvert } from "../functions";
import { SkeletonLoading } from "@/util/loading";
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
}: {
  slug: string;
  name: string;
  images: string;
  location: string;
  price: number;
  route: string;
  description: string;
  ratingsQuantity: number;
}) => {
  return (
    <Suspense fallback={<SkeletonLoading />}>
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
          <div className="flex flex-col text-start  items-start justify-center p-4 pt-0">
            <h4 className="title_largest w-[100%] h-[40px]  overflow-hidden line-clamp-1 text-start  text-red-400 ">
              {name}
            </h4>
            <span className="t_small text-black_sub  ">{location}</span>
            <p className="overflow-hidden line-clamp-2 p_type_1">
              {description}
            </p>
            <h6 className="t_medium flex items-center justify-start gap-1 ">
              <FaStar className="text-yellow-400" />
              <span>{ratingsQuantity}</span>
              {ratingConvert(ratingsQuantity)}
            </h6>
            <h6 className="t_small pt-2">
              Giá từ <span className="underline">{formatPrice(price)}</span> VND
            </h6>
          </div>
        </div>
      </Link>
    </Suspense>
  );
};

export default ItemSearchResult;
