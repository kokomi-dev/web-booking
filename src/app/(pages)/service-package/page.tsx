import Baner from "@/components/service-package/baner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
const Page = () => {
  return (
    <div className="w-full h-full">
      <Baner />

      <div className="my-5 px-20">
        <h1 className=" title_home">Các dịch vụ trọn gói của chúng tôi!</h1>
        <div className="">
          <h4 className="text-black_sub text-[1rem]">
            Khám phá các điểm đến du lịch mà không phải lo lắng về lịch trình,
            nơi nghỉ ngơi, xe đưa đón và các dịch vụ khác như ăn uống bảo
            hiểm... tất cả đã có chúng tôi sắn sàng giúp đỡ quý khách
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
    </div>
  );
};

export default Page;
