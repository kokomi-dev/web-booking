import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ItemCard from "@/components/components/item-component";
import { getAllHotel } from "@/api/api-hotels";

const ListAllHotels = async () => {
  const result = await getAllHotel();
  const data = await result.data;
  return (
    <div className={cn("w-full")}>
      <h2 className="text-large font-bold">
        Khách sạn ( nhà nghỉ ) của chúng tôi
      </h2>
      <h4 className="text-black_sub text-small mb-1">
        Hãy theo dỗi và xem qua những nơi nghỉ chân hàng đầu của chúng tôi
      </h4>
      <div className="">
        <div className="">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full "
          >
            <CarouselContent>
              {data?.map(
                (hotel: {
                  slug: string;
                  name: string;
                  images: [string];
                  location: string;
                  price: [number];
                  rating: number;
                }) => (
                  <CarouselItem
                    key={hotel.slug}
                    className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                  >
                    <ItemCard
                      route="hotels"
                      slug={hotel.slug}
                      name={hotel.name}
                      images={hotel.images[0]}
                      location={hotel.location}
                      price={hotel.price[0]}
                      rating={hotel.rating}
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
    </div>
  );
};

export default ListAllHotels;
