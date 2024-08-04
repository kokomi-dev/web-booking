import Intro from "@/components/home/intro";
import Trending from "@/components/home/trending";
import Search from "@/components/home/search";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import bannerSearch from "@/assets/images/pre-hotel.jpg";
import { Card, CardContent } from "@/components/ui/card";
import { getAllHotel } from "@/api/api-hotel";
import TourItem from "@/components/components/item-component";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import ItemCard from "@/components/components/item-component";
const fechData = async () => {
  const data = await getAllHotel();
  return data.data;
};
const Home = async () => {
  const data = await fechData();
  return (
    <main className="w-full h-full flex  flex-col items-center justify-between  ">
      <Search img={bannerSearch} page="hotels" />

      <div className="w-full py-10 flex items-center justify-center flex-col">
        <h3 className="title_home font-[500]">
          Những nơi ở tiện nghi, phục vụ chu đáo mang đến những trải nghiệm
          tuyệt vời đang chờ quý vị khám phá
        </h3>
        <ol className="text-center">
          <li className="my-3 text-[1.1rem]">Mang đến sự hài lòng</li>
          <li className="my-3 text-[1.1rem]">Mang đến sự trải nghiệm</li>
          <li className="my-3 text-[1.1rem]">Mang đến sự riêng tư</li>
          <li className="my-3 text-[1.1rem]">
            Mang đến với những giá cả hợp lí khi đặt phòng qua chúng tôi
          </li>
        </ol>
      </div>
      <div className="w-full h-full bg-fixed bg-no-repeat bg-cover bg-[url('../assets/images/banner-hotel.jpg')]">
        <div className="p-20 text-white">
          <div className="w-full h-auto flex items-center justify-between bg-white p-4 text-black_sub rounded-md">
            <div>
              <h4 className="text-black">
                Để khám phá được một nơi đẹp thì bạn cần một chỗ nghỉ tốt
              </h4>
              <Button className="bg-red-400 text-white mt-2">
                Đặt phòng ngay bây giờ
              </Button>
            </div>
            <Image
              src={bannerSearch}
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
        <h1 className="title_home">Khách sạn( nhà nghỉ ) chúng tôi đang có</h1>
        <div className="">
          <h4 className="text-black_sub text-[1rem] mb-3">
            Nếu muốn nhanh gọn và tiết kiệm hơn hãy đến với các gói dịch vụ của
            chúng tôi
            <Link href="/combos" className="ml-3 text-red-400 underline italic">
              Gói dịch vụ
            </Link>
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
                  price_one: number;
                }) => (
                  <CarouselItem
                    key={tour.slug}
                    className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                  >
                    <ItemCard
                      route="hotels"
                      slug={tour.slug}
                      name={tour.name}
                      images={tour.images[0]}
                      location={tour.location}
                      price={tour.price_one}
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
      {/* trending */}
    </main>
  );
};
export default Home;
