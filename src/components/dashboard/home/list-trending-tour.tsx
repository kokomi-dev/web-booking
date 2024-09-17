import { getTourTrending } from "@/api/api-tour";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ItemCard from "../../components/item-component";
import { cn } from "@/lib/utils";
const fechData = async () => {
  const data = await getTourTrending();
  return data.data;
};
const ListTrendingTour = async () => {
  const data = await fechData();
  return (
    <div className={cn("w-full")}>
      <h2 className="text-large font-bold">Tour nổi bật của chúng tôi</h2>
      <div className="">
        <p className="text-black_sub text-small mb-1">
          Khám phá các điểm đến hàng đầu theo cách bạn thich tại Việt Nam chúng
          tôi
        </p>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full "
        >
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
          <CarouselPrevious className="w-14 h-14 left-2 bg-bg_primary_blue_sub border-none text-white" />
          <CarouselNext className="w-14 h-14 right-2 bg-bg_primary_blue_sub border-none text-white" />
        </Carousel>
      </div>
    </div>
  );
};

export default ListTrendingTour;
