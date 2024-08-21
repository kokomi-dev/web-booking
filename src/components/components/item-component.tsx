import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
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
    <Link href={`/${route}/${slug}`} className="w-full min-h-[100%]  h-[100%] ">
      <Card className="min-h-[100%] flex items-center justify-start flex-col p-3">
        <Image
          width={500}
          height={500}
          className=" rounded-tr-md rounded-tl-md object-cover w-[99%] "
          src={images}
          alt="img_preview_tour"
          loading="lazy"
        />
        <CardContent className="flex flex-col   text-start  items-start justify-center pb-3 pl-1 ">
          <h4 className="title_large w-[100%] h-[65px]  overflow-hidden line-clamp-2 text-start py-1  ">
            {name}
          </h4>
          <span className="t_small text-black_sub">{location}</span>
          <h6 className="t_medium pt-2">
            Giá từ <span className="underline">{formatPrice(price)}</span> VND
          </h6>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ItemCard;
