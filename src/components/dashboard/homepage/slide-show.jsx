"use client";
import React from "react";
import { Fade } from "react-slideshow-image";
import { listImgSlide } from "./constant";
import Image from "next/image";
const SlideShowImage = () => {
  return (
    <div className="slide-container relative w-full rounded-14 overflow-hidden ">
      <Fade autoplay={true} duration={800}>
        {listImgSlide.map((fadeImage, index) => (
          <div key={index}>
            <Image
              width={500}
              height={400}
              alt="img-slide-show"
              style={{ width: "100%", height: "400px", objectFit: "cover" }}
              src={fadeImage}
              className="rounded-14"
            />
            {/* <h2>{fadeImage.caption}</h2> */}
          </div>
        ))}
      </Fade>
    </div>
  );
};
export default SlideShowImage;
