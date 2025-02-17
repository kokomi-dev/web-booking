"use client";
import { getAllAttraction } from "@/api/api-attractions";
import { LoadingItemShow } from "@/components/components/loading";
import QUERY_KEY_ATTRACTION from "@/services/queryKeyStore/attractionQueryKeyStore";

import { cn } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import ItemCard from "../../components/item-component";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel";
import { AttractionData } from "@/types/attraction.type";

const ListAttractions = () => {
  const { data: listAttraction, isLoading } = useQuery({
    queryKey: [QUERY_KEY_ATTRACTION.GET_ALL],
    queryFn: async () => {
      const res = await getAllAttraction();
      if (res && res.status === 200) {
        return res.data.data.filter(
          (item: AttractionData) => item.isActive === true
        );
      }
    },
    retry: 3,
    retryDelay: 1000,
  });
  if (isLoading) {
    return (
      <Carousel>
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="basis-[66.67%] sm:basis-1/2  md:basis-1/3 lg:basis-1/4"
            >
              <LoadingItemShow />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    );
  }
  return (
    <section
      id="list-all-attractions"
      className={cn("w-full posing-vertical-4")}
    >
      <div className="posing-vertical-6">
        <div className="flex items-center justify-between">
          <h2 className="text-large font-bold">
            Tất cả địa điểm của chúng tôi{" "}
          </h2>
          <span className="text-blue_main_sub hover:cursor-pointer hover:underline text-small">
            Xem thêm
          </span>
        </div>
        <p className="text-black_sub text-small">
          Các điểm đến đang có nhiều điều chờ đón bạn
        </p>
      </div>
      <Carousel opts={{ align: "start" }} className="w-full">
        <CarouselContent>
          {listAttraction?.map((tour: AttractionData) => (
            <CarouselItem
              key={tour.slug}
              className="basis-[66.67%] sm:basis-1/2  md:basis-1/3 lg:basis-1/4"
            >
              <ItemCard
                route="attractions"
                slug={tour.slug}
                name={tour.name}
                images={tour.images[0]}
                location={tour.location.detail}
                price={tour.price[0]}
                rating={tour.rating}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious hidden />
        <CarouselNext hidden />
      </Carousel>
    </section>
  );
};

export default ListAttractions;
