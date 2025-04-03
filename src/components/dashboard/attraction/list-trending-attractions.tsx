"use client";

import { getAttractionTrending } from "@/api/api-attractions";
import { LoadingItemShow } from "@/components/components/loading";
import QUERY_KEY_ATTRACTION from "@/services/queryKeyStore/attractionQueryKeyStore";
import { AttractionData } from "@/types/attraction.type";
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

const ListAttractions = () => {
  const {
    data: listAttraction,
    isLoading,
    isError,
    isFetching,
  } = useQuery({
    queryKey: [QUERY_KEY_ATTRACTION.GET_ALL_TRENDING],
    queryFn: async () => {
      try {
        const res = await getAttractionTrending();
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
    <section id="list-all-attractions" className="w-full list-spacing">
      <div className="">
        <h2 className="text-xl md:text-2xl font-bold ">Địa điểm nổi bật</h2>
        <p className="text-black_sub text-sm font-light">
          Xem trước các địa điểm nổi bật của chúng tôi
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
