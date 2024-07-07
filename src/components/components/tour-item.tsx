import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
const TourItem = ({
  id,
  name,
  images,
  location,
  price,
}: {
  id: string;
  name: string;
  images: string;
  location: string;
  price: number;
}) => {
  const formatPrice = (num: number) => {
    const str = num.toString();
    return str
      .split("")
      .reverse()
      .reduce((prev, next, index) => {
        return (index % 3 ? next : next + ",") + prev;
      });
  };
  return (
    <Link href={`/tour/${id}`} className="w-full h-full">
      <Card>
        <Image
          sizes="w-full h-[400px]"
          width={500}
          height={300}
          className=" rounded-tr-md rounded-tl-md"
          src={images}
          alt="img_preview_tour"
          loading="lazy"
        />
        <CardContent className="flex flex-col  text-start  items-start justify-center p-6 pt-0">
          <h4 className="text-[1.4rem] text-start font-[500] capitalize py-1">
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

export default TourItem;
