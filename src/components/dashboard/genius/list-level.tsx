import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React from "react";
import { levelGenius } from "./constants";
import { Check } from "lucide-react";

const ListLevel = () => {
  return (
    <div className="flex-col flex gap-y-3">
      <h3 className="text-large font-bold">
        Khám phá các cấp độ tăng thưởng du lịch mới
      </h3>
      <p className="text-normal font-normal text-black_sub">
        Mỗi đơn đặt đều được tính vào chương trình. Bạn sẽ được tận hưởng giảm
        giá và tặng thưởng du lịch trọn đời sau khi mở khóa. Bạn sẽ đi đâu tiếp
        theo nào?
      </p>
      <Carousel>
        <CarouselContent>
          {levelGenius.map((item, id) => {
            return (
              <CarouselItem
                key={id}
                className="basis-[66.67%] md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-2 rounded-8 flex flex-col gap-y-2 border-0.5 border-black_sub  ">
                  <div className="text-normal+ text-blue_main font-bold">
                    Genius Cấp {item.level}
                  </div>
                  <hr className="hr lg:my-2" />
                  <div>
                    <p className="text-small text-black_sub text-justify">
                      {item.des}
                    </p>
                  </div>
                  <ul className="space-y-2">
                    {item.voucher.map((vou, i) => {
                      return (
                        <li
                          key={i}
                          className="text-small font-semibold flex items-center justify-start gap-x-2"
                        >
                          <Check className="size-4 text-green_main" />
                          {vou}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselNext />
        <CarouselPrevious />
      </Carousel>
    </div>
  );
};

export default ListLevel;
