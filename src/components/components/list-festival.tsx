"use client";
import Autoplay from "embla-carousel-autoplay";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

const vietnameseFestivals = [
  {
    name: "Tết Nguyên Đán",
    image:
      "https://congdankhuyenhoc.qltns.mediacdn.vn/449484899827462144/2023/1/19/1901-trungquoc-7-1674100963166-167410096328720683809.png",
  },
  {
    name: "Lễ hội Đền Hùng",
    image:
      "https://tapchidulich.net.vn/FileManager/Anh%20web%202018/Thang4/9c714670698fbbec8160155eb66b8698_dh2.jpg",
  },
  {
    name: "Lễ hội Chùa Hương",
    image:
      "https://lh3.googleusercontent.com/0bVnhSBPQaLvibwc9DBa0LVva7TSY0vJZDmrXHsEVyEb3o0N6XaVO9aScmfQa6egLWda-t0tkzhzYOXtquPmOtDEGwjeFBcPMqznhrB6j83LqHsHxtMpltZd50NSuv54lHyBCqRRvwX8St2xdGl2tA",
  },
  {
    name: "Hội Lim",
    image:
      "https://media.vov.vn/sites/default/files/styles/large_watermark/public/2023-02/le_hoi_lim_1.jpg",
  },
  {
    name: "Lễ hội Yên Tử",
    image: "https://static.vinwonders.com/production/le-hoi-yen-tu-1.jpg",
  },
  {
    name: "Hội Gióng",
    image:
      "https://image.sggp.org.vn/1200x630/Uploaded/2025/ymzmf/2024_02_15/den-giong-4555.jpg.webp",
  },
  {
    name: "Lễ hội Đua thuyền",
    image: "https://octo.vn/img_data/images/fb-img-1662019453935-2465.jpg",
  },
  {
    name: "Lễ hội Vu Lan",
    image:
      "https://image.plo.vn/w1000/Uploaded/2025/wopobun/2022_08_07/6j1a1107-2537.jpg.webp",
  },
  {
    name: "Tết Trung Thu",
    image:
      "https://ik.imagekit.io/tvlk/blog/2024/08/tet-trung-thu-2.png?tr=q-70,c-at_max,w-500,h-300,dpr-2",
  },
  {
    name: "Lễ hội Đèn lồng Hội An",
    image:
      "https://mia.vn/media/uploads/blog-du-lich/Pho-den-long-Hoi-An-Chiem-nguong-ve-dep-lung-linh-day-lang-man-01-1618322258.jpg",
  },
  {
    name: "Lễ hội Cầu ngư",
    image:
      "https://www.baolongan.vn/image/news/2024/20240229/images/ttxvn-cau-ngu-6841.jpg.webp",
  },
  {
    name: "Lễ hội Katê",
    image:
      "https://images.baodantoc.vn/uploads/2024/Thang-9/Ngay-17/Anh/untitled%20folder/1-hpht.jpg",
  },
];
const ListFestivals = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-4 list-spacing">
      <h2 className="text-lg md:text-xl font-bold text-start">
        Lễ Hội Lớn Tại Việt Nam
      </h2>
      <Carousel
        className="w-full gap-0"
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[plugin.current]}
      >
        <CarouselContent className="gap-0">
          {vietnameseFestivals.map((item) => (
            <CarouselItem
              key={item.name}
              className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 hover:cursor-pointer "
            >
              <div className=" relative shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-[240px] object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className=" absolute bottom-1 left-2">
                  <h3 className="text-sm font-semibold text-white truncate">
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
    </div>
  );
};

export default ListFestivals;
