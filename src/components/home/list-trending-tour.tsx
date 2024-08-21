import { getTourTrending } from "@/api/api-tour";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ItemCard from "../components/item-component";
const fechData = async () => {
  const data = await getTourTrending();
  return data.data;
};
const ListTrendingTour = async () => {
  const data = await fechData();
  return (
    <div className="w-full p-20 pt-0">
      <div className="my-5">
        <h1 className=" title_largest">Tour nổi bật của chúng tôi</h1>
        <div className="">
          <h4 className="text-black_sub text-[1rem]">
            Khám phá các điểm đến hàng đầu theo cách bạn thich tại Việt Nam
            chúng tôi
          </h4>
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
    </div>
  );
};

export default ListTrendingTour;