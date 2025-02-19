"use client";

import { getHotelFavorite } from "@/api/api-hotels";
import { LoadingItemShow } from "@/components/components/loading";
import QUERY_KEY_HOTEL from "@/services/queryKeyStore/hotelQueryKeyStore";
import { AttractionData } from "@/types/attraction.type";
import { IHotel } from "@/types/hotel.type";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import ItemCard from "../../components/item-component";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel";

const ListHotelFavorite = () => {
  const {
    data: listHotel,
    isLoading,
    isError,
    isFetching,
  } = useQuery({
    queryKey: [QUERY_KEY_HOTEL.GET_ALL_TRENDING],
    queryFn: async () => {
      try {
        const res = await getHotelFavorite();
        if (res?.status === 200 && res.data?.data) {
          return res.data.data.filter(
            (item: AttractionData) => item.isActive === true
          );
        }
        throw new Error("Dữ liệu không hợp lệ");
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu địa điểm:", error);
        throw error;
      }
    },
    retry: 3,
    retryDelay: 1000,
  });

  const renderCarouselItems = useMemo(() => {
    if (isLoading || isFetching) {
      return Array.from({ length: 5 }).map((_, index) => (
        <CarouselItem
          key={`loading-${index}`}
          className="basis-[66.67%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
        >
          <LoadingItemShow />
        </CarouselItem>
      ));
    }

    return listHotel?.map((hotel: IHotel) => (
      <CarouselItem
        key={hotel.slug}
        className="basis-[66.67%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
      >
        <ItemCard
          route="hotels"
          slug={hotel.slug}
          name={hotel.name}
          images={hotel.images[0]}
          location={hotel.location.detail}
          rating={hotel.rating}
          price={hotel.listRooms[0].price}
        />
      </CarouselItem>
    ));
  }, [listHotel, isLoading, isFetching]);

  return (
    <section id="list-all-attractions" className="w-full posing-vertical-4">
      <div className="posing-vertical-6">
        <div className="flex items-center justify-between">
          <h2 className="text-large font-bold">Nơi lưu trú được yêu thích</h2>
        </div>
        <p className="text-black_sub text-small">
          Sự quan tâm của mọi người hàng đầu
        </p>
      </div>

      {isError && (
        <div className="text-red-500 text-center mt-4">
          Không thể tải dữ liệu. Vui lòng thử lại!
        </div>
      )}

      <Carousel opts={{ align: "start" }} className="w-full">
        <CarouselContent>{renderCarouselItems}</CarouselContent>
        <CarouselPrevious hidden />
        <CarouselNext hidden />
      </Carousel>
    </section>
  );
};

export default ListHotelFavorite;
