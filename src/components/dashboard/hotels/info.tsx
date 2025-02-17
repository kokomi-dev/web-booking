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
    <div className="w-full posing-vertical-2 ">
      <div className="w-full posing-vertical-3" id="overview">
        <div className="w-fit ">
          <h5 className="text-smallest bg-bg_primary_yellow text-black p-1 rounded-8">
            Đặt phòng với chúng tôi !
          </h5>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="text-large font-bold">{name}</h1>
          <div className="flex items-center justify-start gap-x-2">
            <ShareButton model="hotels" slug={slug} title={name} />
          </div>
        </div>
        <div className="w-full flex flex-col items-start md:flex-row md:items-center justify-start md:justify-between">
          <address className="w-full flex items-center justify-start gap-x-2 text-small ">
            <MapPin className="text-blue_main text-normal" />
            {location}
          </address>
          <div className="hidden lg:flex items-center justify-end gap-x-1 lg:p-2 rounded-8 text-blue_main_sub hover:bg-bg_primary_hover">
            <TriangleAlert className="w-5 h-5 " />
            <span className="capitalize text-small text-nowrap  ">
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
      <ImagesDetail slug={slug} data={images} />
    </div>
  );
};

export default Info;
