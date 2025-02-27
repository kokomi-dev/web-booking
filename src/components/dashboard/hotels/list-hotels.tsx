"use client";

import { getAllHotel } from "@/api/api-hotels";
import { LoadingItemShow } from "@/components/components/loading";
import QUERY_KEY_HOTEL from "@/services/queryKeyStore/hotelQueryKeyStore";
import { IHotel } from "@/types/hotel.type";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import ItemCard from "../../components/item-component";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel";

const ListHotel = () => {
  const router = useRouter();
  const {
    data: listHotel,
    isLoading,
    isError,
    isFetching,
  } = useQuery({
    queryKey: [QUERY_KEY_HOTEL.GET_ALL],
    queryFn: async () => {
      try {
        const res = await getAllHotel();
        if (res?.status === 200 && res.data?.data) {
          return res.data.data.filter((item: IHotel) => item.isActive === true);
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
          <h2 className="text-large font-bold">
            Khách sạn (nhà nghỉ) của chúng tôi
          </h2>
          <span
            className="text-blue_main_sub underline text-smallest hover:cursor-pointer"
            onClick={() => {
              router.push("hotels/all");
            }}
          >
            Xem thêm
          </span>
        </div>
        <p className="text-black_sub text-small">
          Hãy theo dỗi và xem qua những nơi nghỉ chân hàng đầu của chúng tôi
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

export default ListHotel;
