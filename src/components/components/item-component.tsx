import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
export const formatPrice = (num: number) => {
  const str = num.toString();
  return str
    .split("")
    .reverse()
    .reduce((prev, next, index) => {
      return (index % 3 ? next : next + ",") + prev;
    });
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
    <Link href={`/${route}/${slug}`} className="w-full min-h-[100%]  h-[100%] ">
      <Card className="min-h-[100%]">
        <Image
          width={500}
          height={300}
          className=" rounded-tr-md rounded-tl-md"
          src={images}
          alt="img_preview_tour"
          loading="lazy"
        />
        <CardContent className="flex flex-col   text-start  items-start justify-center p-6 pt-0">
          <h4 className="text-[1.4rem] w-[100%] h-[75px]  overflow-hidden line-clamp-2 text-start font-[500] capitalize py-1  ">
            {name}
          </h4>
          <span className="text-[0.9rem] text-black_sub font-[300] ">
            {location}
          </span>
          <h6 className="text-[0.9rem] pt-2">
            Giá từ <span className="underline">{formatPrice(price)}</span> VND
          </h6>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ItemCard;
