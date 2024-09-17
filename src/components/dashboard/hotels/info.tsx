"use client";

import { Heart, MapPin, Share2, TriangleAlert } from "lucide-react";
import Image from "next/image";
import React from "react";
import { GoStarFill } from "react-icons/go";

interface InfoProps {
  name: string;
  location: string;
  details: [string];
  rating: number;
  images: string[];
}
const Info: React.FC<InfoProps> = ({
  name,
  location,
  details,
  rating,
  images,
}) => {
  return (
    <div className="w-full">
      <div className="w-full" id="overview">
        <div className="w-fit mb-3">
          <h5 className="text-smallest bg-bg_primary_yellow text-black p-1 rounded-8">
            Đặt phòng với chúng tôi !
          </h5>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="text-large font-bold">{name}</h1>
          <div className="flex items-center justify-start gap-2">
            <Heart className="text-blue_main_sub " />
            <Share2 className="text-blue_main_sub " />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <address className="my-2 flex_dou">
            <MapPin className="text-red-600 text-[1.4rem]" />
            {location}
          </address>
          <div className="flex items-center justify-center gap-2 p-2 rounded-8 text-blue_main_sub hover:bg-bg_primary_hover">
            <TriangleAlert />
            <span className="capitalize text-small ">
              Chúng tôi luôn khớp giá
            </span>
          </div>
        </div>
        {/* <p className=" text-[0.98rem] my-2 px-3 text-justify">{details}</p>  */}
        <h6 className="flex items-center justify-start mb-2">
          <GoStarFill className="text-yellow_main text-[1.6rem] mr-2" />
          <span className="text-medium mr-2">
            {rating} -
            {rating > 4 ? (
              <span className="text-[0.98rem] font-medium"> Rất tốt</span>
            ) : (
              <span className="text-[0.98rem] font-medium"> Tốt</span>
            )}
          </span>
          <span className="text-[0.9rem] text-blue_main_sub ">
            (0 đánh giá)
          </span>
        </h6>
      </div>
      {/* images */}
      <div className="w-full h-auto grid gap-3 grid-cols-3 mt-3">
        {images.map((img: string, index: number) => (
          <Image
            key={index}
            width={500}
            height={300}
            src={img}
            alt={`một vài ảnh giới thiệu về tour du lịch ${name}`}
            className={index === 0 ? "image-item-largest" : "image-item-small"}
          />
        ))}
      </div>
    </div>
  );
};

export default Info;
