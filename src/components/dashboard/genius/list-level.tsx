"use client";
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
import { useAuthenticatedStore } from "@/store/authencation-store";
import { cn } from "@/utils/constants";

const ListLevel = () => {
  const { user } = useAuthenticatedStore();
  const isDataBooked = () => {
    if (user) {
      const total =
        user.numberOfBooked?.attraction + user.numberOfBooked?.hotel;
      return {
        totalNumberBooked: total,
        isNewbie: total >= 5 ? false : true,
        attractioBooked: user.numberOfBooked?.attraction,
        hotelBooked: user.numberOfBooked?.hotel,
      };
    }
  };
  const dataBooked = isDataBooked();
  const checkLevel = () => {
    const total = dataBooked?.totalNumberBooked;
    if (total) {
      if (total < 5) {
        return 1;
      } else if (total > 5 && total < 10) {
        return 2;
      } else return 3;
    }
  };
  const levelBooked = checkLevel();
  return (
    <div className="posing-vertical-3">
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
          {levelBooked &&
            levelGenius.map((item, id) => {
              return (
                <CarouselItem
                  key={id}
                  className="basis-[66.67%] md:basis-1/2 lg:basis-1/3 "
                >
                  <div
                    className={cn(
                      "p-2 rounded-8 flex flex-col gap-y-2 border-0.5 border-black_sub ",
                      id <= levelBooked - 1 && "border-blue_main border-2 "
                    )}
                  >
                    <div className="flex items-center justify-between gap-x-2">
                      <div className="text-normal+ text-blue_main font-bold">
                        Genius Cấp {item.level}
                      </div>
                      {id <= levelBooked - 1 && (
                        <div className=" bg-bg_primary_blue_sub text-white p-1 px-2 rounded-8 text-smallest flex items-center justify-start gap-x-1">
                          <Check className="size-3" />
                          Đã đạt
                        </div>
                      )}
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
