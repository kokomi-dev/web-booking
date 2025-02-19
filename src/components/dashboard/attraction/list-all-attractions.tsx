"use client";

import { getAllAttraction } from "@/api/api-attractions";
import ItemCard from "@/components/components/item-component";
import { LoadingItemShow } from "@/components/components/loading";
import QUERY_KEY_ATTRACTION from "@/services/queryKeyStore/attractionQueryKeyStore";
import { AttractionData } from "@/types/attraction.type";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel";

const ListAttractions = () => {
  const {
    data: listAttraction,
    isLoading,
    isError,
    isFetching,
  } = useQuery({
    queryKey: [QUERY_KEY_ATTRACTION.GET_ALL],
    queryFn: async () => {
      try {
        const res = await getAllAttraction();
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

    return listAttraction?.map((tour: AttractionData) => (
      <CarouselItem
        key={tour.slug}
        className="basis-[66.67%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
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
    ));
  }, [listAttraction, isLoading, isFetching]);

  return (
    <section id="list-all-attractions" className="w-full posing-vertical-4">
      <div className="posing-vertical-6">
        <div className="flex items-center justify-between">
          <h2 className="text-large font-bold">
            Tất cả địa điểm của chúng tôi
          </h2>
          {/* <span className="text-blue_main_sub hover:cursor-pointer hover:underline text-small">
            Xem thêm
          </span> */}
        </div>
        <p className="text-black_sub text-small">
          Các điểm đến đang có nhiều điều chờ đón bạn
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

export default ListAttractions;
