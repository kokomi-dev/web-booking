import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ItemCard from "@/components/components/item-component";
import { getAllHotel } from "@/api/api-hotel";

const fechData = async () => {
  const data = await getAllHotel();
  return data.data;
};
const ListAllHotels = async () => {
  const data = await fechData();

  return (
    <div className={cn("w-full my-4", " lg:py-10")}>
      <h1 className="text-[1.2rem] font-semibold">
        Khách sạn ( nhà nghỉ ) chúng tôi đang có
      </h1>
      <h4 className="text-black_sub text-[1rem] mb-3">
        Nếu muốn nhanh gọn và tiết kiệm hơn hãy đến với các gói dịch vụ của
        chúng tôi
        <Link href="/combos" className="ml-3 text-red-400 underline italic">
          Gói dịch vụ
        </Link>
      </h4>
      <div className="">
        <div className="">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full "
          >
            <CarouselContent>
              {data?.map(
                (tour: {
                  slug: string;
                  name: string;
                  images: [string];
                  location: string;
                  price: [number];
                }) => (
                  <CarouselItem
                    key={tour.slug}
                    className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                  >
                    <ItemCard
                      route="hotels"
                      slug={tour.slug}
                      name={tour.name}
                      images={tour.images[0]}
                      location={tour.location}
                      price={tour.price[0]}
                    />
                  </CarouselItem>
                )
              )}
            </CarouselContent>
            <CarouselPrevious className="w-14 h-14 left-2 bg-bg_primary_blue_sub border-none text-white" />
            <CarouselNext className="w-14 h-14 right-2 bg-bg_primary_blue_sub border-none text-white" />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default ListAllHotels;
