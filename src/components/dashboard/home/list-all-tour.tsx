import React from "react";
import ItemCard from "../../components/item-component";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel";
import { getAllTour } from "@/api/api-tour";
import { cn } from "@/lib/utils";

const fetchData = async () => {
  const response = await getAllTour();
  return response.data;
};
const ListAllTour = async () => {
  const data = await fetchData();
  return (
    <div className={cn("w-full my-2", " lg:py-10")}>
      <div className={cn("")}>
        <h1 className="title_largest">Khám phá Việt Nam</h1>
        <div>
          <h4 className="text-black_sub text-[1rem]">
            Các điểm đến đang có nhiều điều chờ đón bạn
          </h4>
          <Carousel opts={{ align: "start" }} className="w-full">
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
                      route="attractions"
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
            <CarouselPrevious className="w-14 h-14 left-2 bg-red-400 border-none text-white" />
            <CarouselNext className="w-14 h-14 right-2 bg-red-400 border-none text-white" />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default ListAllTour;
