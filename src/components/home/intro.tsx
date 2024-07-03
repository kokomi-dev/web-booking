"use client";
import React from "react";
import {
  IoAirplaneOutline,
  IoStarOutline,
  IoHeartOutline,
} from "react-icons/io5";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import scrollToView from "../components/scrollIntoView";
const arrInfo: {
  id: number;
  icon: any;
  title: string;
  des: string;
}[] = [
  {
    id: 1,
    icon: <IoAirplaneOutline />,
    title: "Giá cả ưu đãi, hấp dẫn",
    des: "Chúng tôi mang tới quý vị những dịch vụ, giá tiền hơn cả sự mong đợi. Giúp nhiều khách hàng có thể tiếp cận đến du lịch hơn",
  },
  {
    id: 2,
    icon: <IoHeartOutline />,
    title: "Công ty du lịch tốt nhất",
    des: "Chúng tôi mang tới quý vị những dịch vụ, giá tiền hơn cả sự mong đợi. Giúp nhiều khách hàng có thể tiếp cận đến du lịch hơn",
  },
  {
    id: 3,
    icon: <IoStarOutline />,
    title: "Tin tưởng & An toàn",
    des: "Chúng tôi mang tới quý vị những dịch vụ, giá tiền hơn cả sự mong đợi. Giúp nhiều khách hàng có thể tiếp cận đến du lịch hơn",
  },
];
const Intro = () => {
  React.useEffect(() => {
    scrollToView(".intro__title", "active__scale");
    scrollToView(".intro__des", "active__scrollY");
    scrollToView(".intro__info__item", "active__scrollX");
  }, []);
  return (
    <div className="flex flex-col items-center justify-start mt-5 px-20 py-10 bg-slate-50">
      <h1 className="intro__title transition-all duration-300 text-center py-5 text-[1.9rem] font-medium scale-50 opacity-0">
        Chào mừng tới với KoKo Travel
      </h1>
      <p className="intro__des block w-[70%] pb-20 text-center text-[#888] translate-y-[70%] transition-all duration-500 opacity-0">
        KoKo Travel hứa hẹn sẽ mang tới cho bạn những trải nhiệm, dịch vụ tiện
        lợi và những chính sách ưu đãi nhất đến quý khách hàng khi sử dụng dịch
        vụ của chúng tôi. Những địa điểm du lịch nổi tiếng của Việt Nam, phong
        tục vùng miền ở đó cũng sẽ được chúng tôi mô tả rõ ràng trong những
        chuyến hành trình. Rât mong quý khách có thể chọn cho mình được một
        chuyến đi phù hợp với mình tại đây !
      </p>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-[90%] md:w-[80%] lg:w-[60%] "
      >
        <CarouselContent>
          {arrInfo.map((item, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/2 lg:basis-1/3 w-full"
            >
              <div className="p-1">
                <Card className="">
                  <CardContent className=" flex aspect-square items-center justify-center p-6 flex-col">
                    <div className="text-[2rem] text-red-400">{item.icon}</div>
                    <h5 className="text-[1.6rem] font-[600] text-center capitalize my-3">
                      {item.title}
                    </h5>
                    <p className="text-black_sub text-justify">{item.des}</p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious />
        <CarouselNext /> */}
      </Carousel>
      <div className="w-full pt-5  grid grid-cols-2 lg:grid-cols-4 gap-2 mt-10 border-t-[2px] border-red-400">
        <div className="flex flex-col items-center justify-center text-center ">
          <span className="text-black_sub mb-1">Địa điểm</span>
          <span className="uppercase">Việt Nam</span>
        </div>
        <div className="flex flex-col items-center justify-center text-center ">
          <span className="text-black_sub mb-1">Người dùng mỗi năm</span>
          <span>23.934</span>
        </div>
        <div className="flex flex-col items-center justify-center text-center ">
          <span className="text-black_sub mb-1">Các chuyến đã hoàn thành</span>
          <span>368</span>
        </div>
        <div className="flex flex-col items-center justify-center text-center ">
          <span className="text-black_sub mb-1">Đơn vị liên kết</span>
          <span>
            Mường Thanh - Nhà xe Hữu Nghĩa - Tour Guides VN - Vietjet Air - Bảo
            hiểm
          </span>
        </div>
      </div>
    </div>
  );
};
export default Intro;
