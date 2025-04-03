"use client";

import ShareButton from "@/components/components/share-button";
import { InfoProps } from "@/types/hotel.type";
import { MapPin, TriangleAlert } from "lucide-react";
import dynamic from "next/dynamic";
import React from "react";
import { GoStarFill } from "react-icons/go";
const ImagesDetail = dynamic(
  () => import("@/components/components/images-detail")
);

const Info: React.FC<InfoProps> = ({
  name,
  location,
  rating,
  images,
  slug,
}) => {
  return (
    <div className="w-full container-spacing ">
      <div className="w-full list-spacing">
        <div className="w-fit ">
          <h5 className="text-xs bg-yellow text-black_sub_2 p-1 px-2 rounded-14">
            Đặt phòng với chúng tôi !
          </h5>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">{name}</h1>
          <div className="flex items-center justify-start gap-x-2">
            <ShareButton model="hotels" slug={slug} title={name} />
          </div>
        </div>
        <div className="w-full flex flex-col items-start md:flex-row md:items-center justify-start md:justify-between">
          <address className="w-full flex items-center justify-start gap-x-2 text-sm ">
            <MapPin className="text-blue text-base" />
            {location}
          </address>
          <div className="hidden lg:flex items-center justify-end gap-x-1 lg:p-2 rounded-8 text-blue_sub hover:bg-blue_hover">
            <TriangleAlert className="w-5 h-5 " />
            <span className="capitalize text-sm text-nowrap  ">
              Chúng tôi luôn khớp giá
            </span>
          </div>
        </div>
        <h6 className="flex items-center justify-start">
          <GoStarFill className="text-yellow text-lg mr-2" />
          <span className="text-base font-medium mr-2">
            {rating} -
            {rating > 4 ? (
              <span className="text-[0.98rem] font-medium"> Rất tốt</span>
            ) : (
              <span className="text-[0.98rem] font-medium"> Tốt</span>
            )}
          </span>
          <span className="text-[0.9rem] text-blue_sub ">(0 đánh giá)</span>
        </h6>
      </div>
      {/* images */}
      <ImagesDetail slug={slug} data={images} />
    </div>
  );
};

export default Info;
