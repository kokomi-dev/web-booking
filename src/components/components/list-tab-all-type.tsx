"use client";
import React, { useCallback, useEffect, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ListTabAllType = () => {
  // Dữ liệu mẫu cho các tab
  const data = {
    city: [
      {
        id: 1,
        name: "Hà Nội",
        image:
          "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-ha-noi.jpg",
      },
      {
        id: 2,
        name: "Hồ Chí Minh",
        image:
          "https://imagevietnam.vnanet.vn//MediaUpload/Org/2023/12/19/hcml-1.jpg",
      },
      {
        id: 3,
        name: "Đà Nẵng",
        image: "https://bqn.1cdn.vn/2024/07/25/441-202407251543501.png",
      },
      {
        id: 4,
        name: "Hội An",
        image:
          "https://hoiana.com/wp-content/uploads/2025/01/pho-co-hoi-an-17.webp",
      },
      {
        id: 5,
        name: "Huế",
        image:
          "https://www.kkday.com/vi/blog/wp-content/uploads/6f6a69d3f924397a6035.jpg",
      },
      {
        id: 6,
        name: "Hải Phòng",
        image:
          "https://cdn.haiphong.gov.vn/gov-hpg/SiteFolders/Root/1/thuvienanh/20103-n.jpg",
      },
      {
        id: 7,
        name: "Cần Thơ",
        image:
          "https://ik.imagekit.io/tvlk/blog/2021/11/dia-diem-du-lich-can-tho-cover.jpg",
      },
      {
        id: 8,
        name: "Nha Trang",
        image:
          "https://i2-vnexpress.vnecdn.net/2021/03/22/NhaTrang-KhoaTran-27-1616120145.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=9BMNnjV_o665_kwWTgfOSQ",
      },
      {
        id: 9,
        name: "Đà Lạt",
        image:
          "https://hoadalattravel.vn/wp-content/uploads/2024/09/da-lat.jpeg",
      },
      {
        id: 10,
        name: "Vũng Tàu",
        image:
          "https://dimg04.c-ctrip.com/images/0M70z120009c5xkd998F8_Q60.jpg_.webp",
      },
    ],
    beach: [
      {
        id: 1,
        name: "Nha Trang",
        image:
          "https://dulichnewtour.vn/ckfinder/images/Tours/biennhatrang/bien-nha-trang%20(2).jpg",
      },
      {
        id: 2,
        name: "Phú Quốc",
        image:
          "https://ik.imagekit.io/tvlk/blog/2023/07/bai-bien-phu-quoc-17.jpg",
      },
      {
        id: 3,
        name: "Vũng Tàu",
        image:
          "https://kyhoatourist.com.vn/uploadwb/images/b33887c2-7250-4a89-aecf-15592f88820a(1).jpeg",
      },
    ],
    food: [
      {
        id: 1,
        name: "Phở",
        image:
          "https://cdn.buffetposeidon.com/app/media/Kham-pha-am-thuc/07.2024/050724-pho-viet-huong-vi-tu-goc-pho-02.jpg",
      },
      {
        id: 2,
        name: "Bánh mì",
        image: "https://cdn.tgdd.vn/2020/10/CookProduct/0.-1200x674.jpg",
      },
      {
        id: 3,
        name: "Bún chả",
        image:
          "https://i2.ex-cdn.com/crystalbay.com/files/content/2024/10/31/bun-cha-ha-noi-1-1436.jpg",
      },
    ],
  };

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  return (
    <div className="container xl:px-0">
      <Tabs defaultValue="city" className="w-full">
        {/* Tabs List */}
        <TabsList className="flex justify-start gap-4 p-2  h-auto">
          <TabsTrigger
            value="city"
            className="text-sm md:text-base font-medium p-2"
          >
            Thành phố
          </TabsTrigger>
          <TabsTrigger
            value="beach"
            className="text-sm md:text-base font-medium p-2"
          >
            Bãi biển
          </TabsTrigger>
          <TabsTrigger
            value="food"
            className="text-sm md:text-base font-medium p-2"
          >
            Ẩm thực
          </TabsTrigger>
        </TabsList>

        {/* Tabs Content */}
        <TabsContent value="city">
          <Carousel
            onMouseEnter={() => plugin.current?.stop()}
            onMouseLeave={() => plugin.current?.play()}
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[plugin.current]}
            className="w-full"
          >
            <CarouselContent>
              {data.city.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 hover:cursor-pointer"
                >
                  <div className=" relative shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-[200px] object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <div className=" absolute bottom-1 left-2">
                      <h3 className="text-base font-semibold text-white truncate">
                        {item.name}
                      </h3>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselNext hidden />
            <CarouselPrevious hidden />
          </Carousel>
        </TabsContent>

        <TabsContent value="beach">
          <Carousel className="w-full">
            <CarouselContent>
              {data.beach.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 hover:cursor-pointer"
                >
                  <div className=" relative shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-[200px] object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <div className=" absolute bottom-1 left-2">
                      <h3 className="text-base font-semibold text-white truncate">
                        {item.name}
                      </h3>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselNext />
            <CarouselPrevious />
          </Carousel>
        </TabsContent>

        <TabsContent value="food">
          <Carousel className="w-full">
            <CarouselContent>
              {data.food.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 hover:cursor-pointer"
                >
                  <div className=" relative shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-[200px] object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <div className=" absolute bottom-1 left-2">
                      <h3 className="text-base font-semibold text-white truncate">
                        {item.name}
                      </h3>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselNext />
            <CarouselPrevious />
          </Carousel>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ListTabAllType;
