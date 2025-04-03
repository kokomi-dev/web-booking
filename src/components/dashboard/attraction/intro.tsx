import {
  IoAirplaneOutline,
  IoHeartOutline,
  IoStarOutline,
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
    title: "Ưu đãi độc quyền",
    des: "Tận hưởng chuyến đi với mức giá tốt nhất, phù hợp mọi ngân sách.",
  },
  {
    id: 2,
    icon: <IoHeartOutline />,
    title: "Dịch vụ chất lượng",
    des: "Đồng hành cùng bạn với dịch vụ cao cấp và trải nghiệm đáng nhớ.",
  },
  {
    id: 3,
    icon: <IoStarOutline />,
    title: "An toàn tuyệt đối",
    des: "Hành trình an tâm với các chuyến đi an toàn và đáng tin cậy.",
  },
];
const Intro = () => {
  return (
    <section className="container xl:px-0  flex justify-center bg-black_sub p-4 rounded-8">
      <Carousel className="w-[100%] md:w-[98%] lg:w-[95%] xl:w-[85%]">
        <CarouselContent>
          {arrInfo.map((item, index) => (
            <CarouselItem
              key={index}
              className="basis-[76.67%] sm:basis-[45%] md:basis-1/3 transition-transform duration-300 hover:scale-105"
              autoFocus={index === 1}
            >
              <Card
                className={cn(
                  "w-auto h-full shadow-md hover:shadow-lg transition-all",
                  index === 1 && "bg-blue text-white"
                )}
              >
                <CardContent className="h-full flex aspect-square items-center justify-center p-4 md:p-6 flex-col">
                  <div className="text-4xl text-yellow flex-shrink-0">
                    {item.icon}
                  </div>
                  <h5 className="text-lg lg:text-2xl font-semibold text-center capitalize my-3">
                    {item.title}
                  </h5>
                  <p
                    className={cn(
                      "text-black_sub text-sm lg:text-base text-center font-light",
                      index === 1 && "text-white lg:font-normal"
                    )}
                  >
                    {item.des}
                  </p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default Intro;
