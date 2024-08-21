"use client";
import { StaticImageData } from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import React from "react";
type Props = {
  listImg: { id: number; src: StaticImageData; slogan: string }[];
  setImg: React.Dispatch<React.SetStateAction<number>>;
  img: number;
};
const Slide: React.FC<Props> = ({ listImg, setImg, img }) => {
  const [currentIndex, setCurrentIndex] = React.useState(img);
  const handlePrevious = () => {
    const newIndex = currentIndex === 0 ? listImg.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setImg(newIndex);
  };

  const handleNext = () => {
    const newIndex = currentIndex === listImg.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setImg(newIndex);
  };

  return (
    <div className="w-[50%] h-[40%] absolute top-[50%] left-[65%] translate-x-[-50%] translate-y-[-50%]">
      <Carousel className="w-full">
        <CarouselContent>
          {listImg.map((item, index) => (
            <CarouselItem key={index}>
              <Image
                src={item.src}
                alt="img_banner"
                style={{
                  width: "100%",
                  height: " 100%",
                  borderRadius: "10px",
                }}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious onMouseDown={handlePrevious} />
        <CarouselNext onMouseDown={handleNext} />
        <div className="text-center py-[4px] text-white">
          {currentIndex === 0 && <h1>Cầu Long Biên</h1>}
          {currentIndex === 1 && <h1>Phố cổ Hội An</h1>}
          {currentIndex === 2 && <h1>Thị trấn Hoàng Hôn - Phú Quốc</h1>}
        </div>
      </Carousel>
    </div>
  );
};
export default Slide;
