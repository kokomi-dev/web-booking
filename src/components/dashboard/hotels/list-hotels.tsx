import { cn } from "@/utils/constants";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ItemCard from "@/components/components/item-component";
import { getAllHotel } from "@/api/api-hotels";
import { HotelData } from "@/types";

const ListAllHotels = async () => {
  const result = await getAllHotel();
  const data = await result.data;
  return (
    <div className={cn("w-full flex flex-col gap-y-2")}>
      <h2 className="text-large font-bold">
        Khách sạn ( nhà nghỉ ) của chúng tôi
      </h2>
      <h4 className="text-black_sub text-small mb-1">
        Hãy theo dỗi và xem qua những nơi nghỉ chân hàng đầu của chúng tôi
      </h4>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full "
      >
        <CarouselContent>
          {data?.map((hotel: HotelData) => (
            <CarouselItem
              key={hotel.slug}
              className="basis-[66.67%] md:basis-1/3 lg:basis-1/4"
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
          ))}
        </CarouselContent>
        <CarouselPrevious hidden />
        <CarouselNext hidden />
      </Carousel>
    </div>
  );
};

export default ListAllHotels;
