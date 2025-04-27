"use client";

import { getFilterHotel } from "@/api/api-hotels";
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
        const res = await getFilterHotel({
          isFavorite: "1",
        });
        if (res?.status === 200 && res.data?.data) {
          return res.data.data.filter(
            (item: AttractionData) => item.isActive === true
          );
        } else {
          return [];
        }
      } catch (error) {}
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
          discount={hotel.listRooms[0].sale}
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
    <section id="list-all-attractions" className="w-full list-spacing">
      <div className="">
        <h2 className="text-xl md:text-2xl font-bold mb-1">
          Nơi lưu trú được yêu thích nhất
        </h2>
        <p className="text-black_sub text-sm font-light">
          Sự quan tâm của mọi người hàng đầu
        </p>
      </div>

      {isError && (
        <div className="text-red-500 text-center mt-4">
          Không thể tải dữ liệu. Vui lòng thử lại!
        </div>
      )}
      {listHotel?.length === 0 && (
        <div className="text-black text-center mt-4">
          Chưa có nơi lưu trú nổi bật nào!
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
