"use client";
import { getAttractionTrending } from "@/api/api-attractions";
import { LoadingItemShow } from "@/components/components/loading";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import QUERY_KEY_ATTRACTION from "@/services/queryKeyStore/attractionQueryKeyStore";
import { cn } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import ItemCard from "../../components/item-component";
import { AttractionData } from "@/types/attraction.type";

const ListTrendingTour = async () => {
  const { data: listAttractionTrending, isLoading } = useQuery({
    queryKey: [QUERY_KEY_ATTRACTION.GET_ALL_TRENDING],
    queryFn: async () => {
      const res = await getAttractionTrending();
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
    <section className={cn("w-full posing-vertical-4")}>
      <div className="posing-vertical-6">
        <h2 className="text-large font-bold ">Địa điểm tham quan nổi bật</h2>
        <p className="text-black_sub text-small  ">
          Khám phá các điểm đến hàng đầu theo cách bạn thich tại Việt Nam chúng
          tôi
        </p>
      </div>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full "
      >
        <CarouselContent>
          {listAttractionTrending.map((tour: AttractionData) => (
            <CarouselItem
              key={tour.slug}
              className="basis-[66.67%] md:basis-1/3 lg:basis-1/4"
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

export default ListTrendingTour;
