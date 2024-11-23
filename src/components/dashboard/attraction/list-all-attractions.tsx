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
    <div id="list-all-attractions" className={cn("w-full ")}>
      <h2 className="text-large font-bold">Khám phá Việt Nam</h2>
      <div>
        <p className="text-black_sub text-small mb-1">
          Các điểm đến đang có nhiều điều chờ đón bạn
        </p>
        <Carousel opts={{ align: "start" }} className="w-full">
          <CarouselContent>
            {data?.map((tour: AttractionData) => (
              <CarouselItem
                key={tour.slug}
                className="basis-[66.67%]  md:basis-1/3 lg:basis-1/4"
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
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default ListAttractions;
