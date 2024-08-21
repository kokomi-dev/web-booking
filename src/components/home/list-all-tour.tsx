import React from "react";
import ItemCard from "../components/item-component";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { getAllTour } from "@/api/api-tour";

const fetchData = async () => {
  const response = await getAllTour();
  return response.data;
};
const ListAllTour = async () => {
  const data = await fetchData();
  return (
    <div className="w-full px-20 my-10">
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
                    route="tours"
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
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default ListAllTour;
