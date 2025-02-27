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
import { cn } from "@/utils/constants";
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
    des: "Trải nghiệm du lịch tuyệt vời với chi phí hợp lý, phù hợp mọi ngân sách.",
  },
  {
    id: 2,
    icon: <IoHeartOutline />,
    title: "Công ty du lịch tốt nhất",
    des: "Đồng hành cùng bạn trong mọi hành trình, mang đến dịch vụ chất lượng cao.",
  },
  {
    id: 3,
    icon: <IoStarOutline />,
    title: "Tin tưởng & An toàn",
    des: "Du lịch an tâm với những chuyến đi an toàn và đáng tin cậy.",
  },
];
const Intro = () => {
  return (
    <section
      className={cn(
        "w-full flex flex-col items-center justify-start posing-vertical-4  bg-bg_black_sub "
      )}
    >
      <h1
        className={cn(
          "mt-4 hidden text-center py-4  font-medium text-large",
          "lg:text-largest lg:block lg:mt-0 lg:font-bold"
        )}
      >
        KoKo Travel
      </h1>
      <p
        className={cn(
          " w-[90%] hidden pb-5 text-justify  text-[#888]",
          "lg:w-[70%] lg:block lg:pb-20 lg:text-center"
        )}
      >
        KoKo Travel hứa hẹn sẽ mang tới cho bạn những địa điểm chât lượng, dịch
        vụ tiện lợi và những chính sách ưu đãi nhất đến quý khách hàng khi sử
        dụng dịch vụ của chúng tôi
      </p>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-[100%] md:w-[90%] lg:w-[90%] xl:w-[80%] "
      >
        <CarouselContent>
          {arrInfo.map((item, index) => (
            <CarouselItem
              key={index}
              className="basis-[76.67%] md:basis-[45%] lg:basis-1/3"
              autoFocus={index === 1}
            >
              <Card
                className={cn(
                  "w-auto ",
                  index === 1 && "bg-bg_primary_main text-white"
                )}
              >
                <CardContent className=" flex aspect-square items-center justify-center p-6 flex-col">
                  <div className="text-largest text-yellow_main flex-shrink-0">
                    {item.icon}
                  </div>
                  <h5 className="text-large font-[600] text-center capitalize my-3">
                    {item.title}
                  </h5>
                  <p
                    className={cn(
                      "text-black_sub text-justify",
                      index === 1 && "text-white"
                    )}
                  >
                    {item.des}
                  </p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious />
        <CarouselNext /> */}
      </Carousel>
    </section>
  );
};
export default Intro;
