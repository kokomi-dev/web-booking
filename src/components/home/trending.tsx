import { getAllTour } from "@/api/api-tour";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import TourItem from "../components/tour-item";
const fechData = async () => {
  const data = await getAllTour();
  return data.data;
};
const Trending = async () => {
  const data = await fechData();

  return (
    <div className="w-full p-20">
      <div className="my-5">
        <h1 className=" title_home">Khám phá việt nam</h1>
        <div className="">
          <h4 className="text-black_sub text-[1rem]">
            Các điểm đến đang có nhiều điều chờ đón bạn
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
                  id: string;
                  name: string;
                  images: [string];
                  location: string;
                  price: number;
                }) => (
                  <CarouselItem
                    key={tour.id}
                    className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                  >
                    <TourItem
                      id={tour.id}
                      name={tour.name}
                      images={tour.images[0]}
                      location={tour.location}
                      price={tour.price}
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
      <div className="my-5">
        <h1 className=" title_home">Tour nổi bật của chúng tôi</h1>
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
              {Array.from({ length: 15 }).map((_, index) => (
                <CarouselItem
                  key={index}
                  className="sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
                >
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <span className="text-3xl font-semibold">
                          {index + 1}
                        </span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
      <div className="my-5">
        <h1 className="  capitalize font-medium text-[1.4rem] text-black">
          Nhà nghỉ được yêu thích
        </h1>
        <h4 className="text-black_sub text-[1rem] mb-1">
          Địa điểm nghỉ ngơi được nhiều du khách chú ý
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {Array.from({ length: 4 }).map((item, index) => {
            return (
              <div
                key={index}
                className="w-full h-[180px] border-[1px] border-[#888] rounded-md"
              >
                <CardContent>{index}</CardContent>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Trending;
