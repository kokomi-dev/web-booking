import ItemCard from "../../components/item-component";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel";
import { getAllAttraction } from "@/api/api-attractions";
import { cn } from "@/lib/utils";
import { AttractionData } from "@/utils/types";

const ListAttractions = async () => {
  const { data } = await getAllAttraction();
  return (
    <div
      id="list-all-attractions"
      className={cn("w-full flex flex-col gap-y-2 ")}
    >
      <h2 className="text-large font-bold">Khám phá Việt Nam</h2>
      <p className="text-black_sub text-small">
        Các điểm đến đang có nhiều điều chờ đón bạn
      </p>
      <Carousel opts={{ align: "start" }} className="w-full">
        <CarouselContent>
          {data?.map((tour: AttractionData) => (
            <CarouselItem
              key={tour.slug}
              className="basis-[66.67%] sm:basis-1/2  md:basis-1/3 lg:basis-1/4"
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
    </div>
  );
};

export default ListAttractions;
