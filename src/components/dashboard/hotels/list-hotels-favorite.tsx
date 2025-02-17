"use client";
import Link from "next/link";
import { cn } from "@/utils/constants";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ItemCard from "@/components/components/item-component";
import { getHotelFavorite } from "@/api/api-hotels";
import { useQuery } from "@tanstack/react-query";
import QUERY_KEY_HOTEL from "@/services/queryKeyStore/hotelQueryKeyStore";
import { LoadingItemShow } from "@/components/components/loading";
import { IHotel } from "@/types/hotel.type";

const ListHotelFavorite = () => {
  const { data: listHotelFavorite, isLoading } = useQuery({
    queryKey: [QUERY_KEY_HOTEL.GET_ALL_TRENDING],
    queryFn: async () => {
      const res = await getHotelFavorite();
      if (res.status === 200) {
        return res.data.data;
      } else return [];
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
    <div id="list-all-hotel" className={cn("w-full flex flex-col gap-y-2")}>
      <h2 className="text-large font-bold">
        Khách sạn ( nhà nghỉ ) được yêu thích
      </h2>
      <h4 className="text-black_sub text-small mb-1">
        Nếu muốn nhanh gọn và tiết kiệm hơn hãy đến với các gói dịch vụ của
        chúng tôi
        <Link
          href="/combos"
          className="ml-3 text-blue_main_sub text-small font-semibold underline italic"
        >
          Gói dịch vụ
        </Link>
      </h4>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full "
      >
        <CarouselContent>
          {listHotelFavorite?.map((hotel: IHotel) => (
            <CarouselItem
              key={hotel.slug}
              className="basis-[66.67%] md:basis-1/3 lg:basis-1/4"
            >
              <ItemCard
                route="hotels"
                slug={hotel.slug}
                name={hotel.name}
                images={hotel.images[0]}
                location={hotel.location.detail}
                price={hotel.listRooms[0].price}
                rating={hotel.rating}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious hidden />
        <CarouselNext hidden />
      </Carousel>
    </div>
  );
};

export default ListHotelFavorite;
