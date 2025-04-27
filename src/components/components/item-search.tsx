import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

import { LoadingItemSearch } from "@/components/components/loading";
import { CalendarCheck, DollarSign, MapPin, Star } from "lucide-react";
export const formatPrice = (num: number) => {
  const str = num.toString();
  return str
    .split("")
    .reverse()
    .reduce((prev, next, index) => {
      return (index % 3 ? next : next + ",") + prev;
    });
};

const ItemSearch = ({
  slug,
  name,
  images,
  location,
  price,
  route,
  ratingsQuantity,
  startDate,
}: {
  slug: string;
  name: string;
  images: string;
  location: string;
  price: number;
  route: string;
  ratingsQuantity?: number;
  startDate?: string;
}) => {
  return (
    <Suspense fallback={<LoadingItemSearch />}>
      <Link
        href={`/${route}/${slug}`}
        className="w-full p-1 group"
        key={slug}
        target="_blank"
      >
        <div className="flex flex-col items-center border rounded-lg overflow-hidden shadow-lg w-full ">
          <div className="relative w-full image-shine-container ">
            <div className="shine-effect"></div>
            <Image
              width={600}
              height={300}
              src={images}
              alt={name}
              priority={true}
              className="object-cover  h-[180px] sm:h-[180px] md:h-[220px] lg:h-[240px] transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="p-3 lg:p-4 w-full flex flex-col items-start justify-start text-start gap-y-2">
            <h3 className="text-lg font-semibold line-clamp-1 ">{name}</h3>
            <address className="flex items-center justify-start gap-x-1 text-xs lg:text-sm text-black_sub line-clamp-1">
              <MapPin className=" size-4" />
              <span className="line-clamp-1">{location}</span>
            </address>
            {route === "attractions" && (
              <h6 className=" flex items-center justify-start gap-x-1 text-xs lg:text-sm text-black_sub">
                <CalendarCheck className="size-4" />
                <span className="text-center  ">Khởi hành: {startDate}</span>
              </h6>
            )}
            <h6 className=" flex items-center justify-start gap-x-1 text-xs lg:text-sm text-black_sub">
              <Star className="size-4 fill-yellow text-yellow" />
              <span className="text-center font-medium">{ratingsQuantity}</span>
            </h6>
            <h6 className="flex items-center justify-start gap-x-1 text-xs lg:text-sm text-black">
              <DollarSign className="size-4 text-black_sub" />
              <span className="text-blue_sub text-base font-semibold">
                {formatPrice(price)}VNĐ
              </span>
            </h6>
          </div>
        </div>
      </Link>
    </Suspense>
  );
};

export default ItemSearch;
