import Intro from "@/components/home/intro";
import Trending from "@/components/home/trending";
import Search from "@/components/home/search";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import preview from "../assets/images/preview.jpg";
import { Card, CardContent } from "@/components/ui/card";
import { getAllTour } from "@/api/api-tour";
import TourItem from "@/components/components/tour-item";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
const fechData = async () => {
  const data = await getAllTour();
  return data.data;
};
const Home = async () => {
  const data = await fechData();
  return (
    <main className="w-full h-full flex  flex-col items-center justify-between  ">
      <Search />
      {/* <Baner /> */}
      <Intro />
      <div className="w-full h-full bg-fixed bg-no-repeat bg-cover bg-[url('../assets/images/banner2.jpg')]">
        <div className="p-20 text-white">
          <h1 className="title_home !mb-2">Ưu đãi</h1>
          <p className="mb-2">
            Khuyến mãi giảm giá đặc biệt dành riêng cho bạn
          </p>
          <div className="w-full h-auto flex items-center justify-between bg-white p-4 text-black_sub rounded-md">
            <div>
              <h4>
                Vi vu tận hưởng không khí mùa hè cùng các địa điểm du lịch nổi
                tiếng của chúng tôi
              </h4>
              <p>Hãy trải nhiệm nó một cách trọn vẹn</p>
              <Button className="bg-red-400 text-white mt-2">
                Khám phá bây giờ
              </Button>
            </div>
            <Image
              src={preview}
              alt="img_preview"
              className="min-w-[18%] min-h-[80%] w-[25%] h-[100%] object-cover rounded-md"
            />
          </div>
        </div>
        <h3 className="px-20 py-5 text-white">
          Chỉ cần đăng nhập tài khoản, bạn sẽ sở hữu cho mình nhiều ưu đãi và
          chương trình chi ân cho những khách hàng mới đặc biệt ưu đãi!
        </h3>
      </div>
      <div className="w-full px-20 my-10">
        <h1 className="title_home">Khám phá việt nam</h1>
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
                  slug: string;
                  name: string;
                  images: [string];
                  location: string;
                  price: number;
                }) => (
                  <CarouselItem
                    key={tour.slug}
                    className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                  >
                    <TourItem
                      slug={tour.slug}
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
      <Trending />
    </main>
  );
};
export default Home;
