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
import { useRouter } from "next/navigation";

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
        const res = await getAllAttraction({});
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
          discount={tour.discount}
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
  const router = useRouter();
  return (
    <section id="list-all-attractions" className="w-full list-spacing">
      <div className="">
        <div className="flex items-start justify-between ">
          <h2 className="text-xl md:text-2xl font-bold ">
            Tất cả địa điểm của chúng tôi
          </h2>
          <span
            onClick={() => router.push("/attractions/all")}
            className="text-blue_sub underline hover:cursor-pointer hover:underline text-xs lg:text-sm flex-shrink-0 mt-2  lg:mt-2"
          >
            Xem thêm
          </span>
        </div>
        <p className="text-black_sub text-sm font-light">
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
