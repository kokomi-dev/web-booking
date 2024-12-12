"use client";
import React from "react";
import { Slide } from "react-slideshow-image";
import { listImgSlide } from "./constant";
import Image from "next/image";

const SlideShowImage = () => {
  const customArrow = (direction) => (
    <button
      className={`absolute z-[20] ${
        direction === "prev" ? "left-6" : "right-6"
      } top-[50%] translate-y-[-50%] !bg-blue_main_sub text-white w-9 h-9 rounded-full hover:bg-bg_primary_active`}
    >
      {direction === "prev" ? "←" : "→"}
    </button>
  );

  return (
    <div className="slide-container relative w-full h-full">
      <div className="select-none absolute w-[90%] lg:w-[70%] z-[10] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-bg_primary_hover  p-4 text-black rounded-24 text-center overflow-hidden">
        <h3 className="text-large font-semibold font-mono">
          Khám phá những nơi nghỉ dưỡng đẹp nhất Việt Nam
        </h3>
        <p>
          Hãy trải nghiệm dịch vụ của chúng tôi để giúp bạn có trải nghiệm tốt
          nhất
        </p>
      </div>

      <Slide
        autoplay={true}
        duration={2400}
        prevArrow={customArrow("prev")}
        nextArrow={customArrow("next")}
        infinite={true}
        transitionDuration={500}
      >
        {listImgSlide.map((fadeImage, index) => (
          <div key={index} className="relative">
            <Image
              width={1000}
              height={900}
              style={{ height: "540px", objectFit: "cover" }}
              alt="img-slide-show"
              src={fadeImage}
              loading="eager"
            />
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default SlideShowImage;
