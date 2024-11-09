"use client";

import ImagesDetail from "@/components/components/images-detail";
import { Heart, MapPin, Share2, TriangleAlert } from "lucide-react";
import React from "react";
import { GoStarFill } from "react-icons/go";

interface InfoProps {
  name: string;
  location: string;
  details: [string];
  rating: number;
  images: any;
}
const Info: React.FC<InfoProps> = ({ name, location, rating, images }) => {
  return (
    <div className="w-full grid ">
      <div className="w-full grid mb-4  " id="overview">
        <div className="w-fit mb-2">
          <h5 className="text-smallest bg-bg_primary_yellow text-black p-1 rounded-8">
            Đặt phòng với chúng tôi !
          </h5>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="text-large font-bold">{name}</h1>
          <div className="flex items-center justify-start gap-x-2">
            <Heart className="text-blue_main_sub  size-5 " />
            <Share2 className="text-blue_main_sub  size-5 " />
          </div>
        </div>
        <div className="w-full flex items-center justify-between">
          <address className="flex items-center justify-start gap-x-2 text-small ">
            <MapPin className="text-blue_main text-normal" />
            {location}
          </address>
          <div className="flex items-center justify-center gap-2 p-2 rounded-8 text-blue_main_sub hover:bg-bg_primary_hover">
            <TriangleAlert className="text-normal" />
            <span className="capitalize text-small ">
              Chúng tôi luôn khớp giá
            </span>
          </div>
        </div>
        <h6 className="flex items-center justify-start">
          <GoStarFill className="text-yellow_main text-medium mr-2" />
          <span className="text-normal font-medium mr-2">
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
      <ImagesDetail data={images} />
    </div>
  );
};

export default Info;
