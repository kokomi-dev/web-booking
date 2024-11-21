import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ItemCard from "@/components/components/item-component";
import { getHotelOutStanding } from "@/api/api-hotels";

const ListHotelOutStanding = async () => {
  const result = await getHotelOutStanding();
  const data = await result?.data;
  return (
    <div className={cn("w-full")}>
      <h2 className="text-large font-bold">
        Khách sạn ( nhà nghỉ ) nổi bật của chúng tôi
      </h2>
      <h4 className="text-black_sub text-small mb-1">
        Nếu muốn nhanh gọn và tiết kiệm hơn hãy đến với các gói dịch vụ của
        chúng tôi
        <Link
          href="/combos"
          className="ml-3 text-blue_main_sub text-small font-semibold underline italic"
        >
          Gói dịch vụ
        </Link>
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
                    className="basis-1/2 md:basis-1/3 lg:basis-1/4"
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
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default ListHotelOutStanding;
