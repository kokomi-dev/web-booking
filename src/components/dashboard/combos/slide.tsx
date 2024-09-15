"use client";
import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";

import img1 from "@/assets/images/img1.webp";
import img2 from "@/assets/images/img2.webp";
import img3 from "@/assets/images/img3.webp";
import SlideImg from "@/components/components/slide";
export default function Slide() {
  const [img, setImg] = useState(0);
  const listImg: {
    id: number;
    src: StaticImageData;
    slogan: string;
  }[] = [
    {
      id: 1,
      src: img1,
      slogan:
        "Khám phá vẻ đẹp thời gian, trường tồn với con người qua các thế hệ năm tháng",
    },
    {
      id: 2,
      src: img2,
      slogan:
        "Bản sắc dân tộc, nét đẹp con người và đặc sản vùng miền từng nơi bạn đến",
    },
    {
      id: 3,
      src: img3,
      slogan:
        "Hãy đến với chúng tôi để mang lại cho bạn được những trải nhiệm, phục vụ và giá trị ",
    },
  ];

  return (
    <div className="relative w-full h-full select-none  ">
      <Image
        src={listImg[img].src}
        alt="img1"
        style={{
          objectFit: "contain",
          width: "100%",
          height: "100%",
          filter: "blur(10px)",
          userSelect: "none",
        }}
        priority
      />
      <div className="w-[20%] h-[40%] absolute top-[50%] left-[20%] translate-x-[-50%] translate-y-[-50%]   ">
        <p className="slogan__banner text-[2rem] font-mono font-bold text-white type__banner overflow-hidden ">
          {listImg[img].slogan}
        </p>
      </div>
      <SlideImg img={img} listImg={listImg} setImg={setImg} />
    </div>
  );
}
