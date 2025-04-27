import Link from "next/link";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import { GoStarFill } from "react-icons/go";
import { memo, useMemo } from "react";
import { ItemCardProps } from "@/types/component-types";
import { DollarSign, MapPin, Ticket } from "lucide-react";

export const formatPrice = (num: number) => {
  const formattedNumber = new Intl.NumberFormat("vi-VN").format(num);
  return formattedNumber;
};

const ItemCard = memo(
  ({
    slug,
    name,
    images,
    location,
    price,
    route,
    rating,
    discount,
  }: ItemCardProps) => {
    const ratingText =
      rating > 4.5 ? "Rất tuyệt vời" : rating > 4 ? "Rất tốt" : "Tốt";
    const formattedPrice = useMemo(() => formatPrice(price), [price]);

    return (
      <Link
        href={`/${route}/${slug}`}
        className="w-full h-full relative group transition-transform duration-300 hover:z-10"
      >
        {discount && (
          <div className="absolute -right-1 top-3 z-[150]">
            <div className="relative">
              <div className="bg-red-600 text-white font-normal leading-[20px] px-3 text-[0.7rem] uppercase flex items-center rounded-tl-[4px] rounded-bl-[4px]">
                {discount}%
              </div>
              <div className="absolute right-0 -bottom-2 w-0 h-0 border-t-[8px] border-r-[5px] border-l-[0px] border-t-red-800 border-r-transparent"></div>
            </div>
          </div>
        )}
        <Card className="min-h-[100%] flex items-start justify-start flex-col shadow-md hover:shadow-lg rounded-lg overflow-hidden">
          {/* ảnh */}
          <div className="w-full relative overflow-hidden h-[178px] sm:h-[186px] md:h-[205px] lg:h-[220px] xl:h-[240px] image-shine-container">
            {/* Hiệu ứng shine chỉ trên ảnh */}
            <div className="shine-effect"></div>

            <Image
              width={600}
              height={400}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              src={images}
              alt={name}
              priority={true}
              placeholder="empty"
              quality={85}
            />
          </div>

          {/* nội dung */}
          <CardContent className="flex flex-col gap-2 p-4 text-start">
            {/* Name */}
            <h4 className="text-base font-bold w-full overflow-hidden line-clamp-2 text-start">
              {name}
            </h4>

            {/* địa điểm */}
            <address className="text-[0.8rem] text-black_sub overflow-hidden line-clamp-1 flex items-center gap-x-1">
              <MapPin className="size-4 text-blue" />
              <span className="line-clamp-1">{location}</span>
            </address>

            {/* đánh giá */}
            <div className="w-full flex items-center gap-2 text-[0.8rem] font-normal">
              <div className="text-white bg-blue_active rounded-8 flex items-center px-2 py-1 gap-x-1 text-sm">
                <span className="text-[0.75rem] md:text-sm">{rating}</span>
              </div>
              <GoStarFill className="text-yellow text-[1rem]" />
              <h6 className="text-xs font-medium">{ratingText}</h6>
            </div>

            {/* giá */}
            <h6 className="text-base flex items-center justify-start gap-x-1 mt-2">
              <DollarSign className="size-4 text-blue" />
              <span className="text-blue text-sm font-bold underline">
                {formattedPrice} VNĐ
              </span>
            </h6>
          </CardContent>
        </Card>
      </Link>
    );
  }
);

ItemCard.displayName = "ItemCard";
export default ItemCard;
