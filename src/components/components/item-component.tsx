import Link from "next/link";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import { GoStarFill } from "react-icons/go";
import { memo, useMemo } from "react";
import { ItemCardProps } from "@/types/component-types";
import { DollarSign, MapPin } from "lucide-react";

export const formatPrice = (num: number) => {
  const formattedNumber = new Intl.NumberFormat("vi-VN").format(num);
  return formattedNumber;
};
const ItemCard = memo(
  ({ slug, name, images, location, price, route, rating }: ItemCardProps) => {
    const ratingText =
      rating > 4.5 ? "Rất tuyệt vời" : rating > 4 ? "Rất tốt" : "Tốt";
    const formattedPrice = useMemo(() => formatPrice(price), [price]);

    return (
      <Link href={`/${route}/${slug}`} className="w-full h-full relative">
        <Card className="min-h-[100%] flex items-start justify-start flex-col ">
          <Image
            width={600}
            height={400}
            className="rounded-tr-md rounded-tl-md object-cover w-full h-[190px] md:h-[205px] lg:h-[220px] xl:h-[240px]"
            src={images}
            alt={name}
            priority={true}
            placeholder="empty"
            quality={85}
          />
          <CardContent className="flex flex-col gap-1 p-2 pt-1 pb-8 text-start ">
            <h4 className="text-normal font-bold w-full overflow-hidden line-clamp-2 text-start ">
              {name}
            </h4>
            <address className="text-[0.8rem] text-black_sub overflow-hidden line-clamp-1 flex items-center justify-start gap-x-1">
              <MapPin className="size-4" />
              <span className="line-clamp-1">{location}</span>
            </address>
            <div className="w-full flex items-center justify-start gap-1 text-[0.8rem] font-normal">
              <div className="text-white bg-bg_primary_active rounded-8 flex items-center justify-start px-2 py-1 gap-x-1 text-small">
                <span className="text-[0.75rem] md:text-small">{rating}</span>
              </div>
              <GoStarFill className="text-yellow_main text-[1rem]" />
              <h6 className="text-smallest font-normal">{ratingText}</h6>
            </div>
            <h6 className="text-normal absolute bottom-2 right-4 flex items-center justify-start gap-x-1">
              <span className="text-small font-bold pr-1">
                <DollarSign className="size-4" />
              </span>
              <span className="underline text-blue_main text-small font-bold">
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
