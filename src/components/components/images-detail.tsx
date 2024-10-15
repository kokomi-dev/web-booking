"use client";

import Image from "next/image";
import React, { useState } from "react";
import ShowImages from "./show-images";

const ImagesDetail = ({ data }: { data: any }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState([true, true, true, true, true]);

  const handleImageLoad = (index: number) => {
    setLoading((prev) => {
      const newLoadingState = [...prev];
      newLoadingState[index] = false;
      return newLoadingState;
    });
  };

  return (
    <div className="w-full h-auto  ">
      {data && (
        <div className="w-full h-full   grid grid-cols-2 gap-2 rounded-8 overflow-hidden">
          {/* Main Image */}
          <div className="col-span-1">
            <div className="relative w-full h-full">
              {loading[0] && (
                <div className="absolute w-full h-full inset-0 bg-gray-200 animate-pulse"></div>
              )}
              <Image
                priority
                width={500}
                height={600}
                src={data.images[0]}
                className={`object-cover w-full h-full cursor-pointer transition-opacity duration-300 ${
                  loading[0] ? "opacity-0" : "opacity-100"
                }`}
                alt={`Ảnh chính của tour du lịch ${data.name}`}
                onClick={() => {
                  setOpen(true);
                }}
                onLoad={() => handleImageLoad(0)}
              />
            </div>
          </div>
          {/* Sub Images */}
          <div className="grid grid-cols-2 grid-rows-2 gap-2 col-span-1">
            {data.images.slice(1, 5).map((img: string, index: number) => (
              <div key={index + 1} className="relative w-full h-full">
                {loading[index + 1] && (
                  <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                )}
                <Image
                  width={250}
                  height={300}
                  src={img}
                  className={`object-cover w-full h-full cursor-pointer transition-opacity duration-300 ${
                    loading[index + 1] ? "opacity-0" : "opacity-100"
                  }`}
                  onClick={() => {
                    setOpen(true);
                  }}
                  onLoad={() => handleImageLoad(index + 1)}
                  alt={`Ảnh giới thiệu về tour du lịch ${data.name}`}
                />
              </div>
            ))}
          </div>
        </div>
      )}
      <ShowImages open={open} data={data} setOpen={setOpen} />
    </div>
  );
};

export default ImagesDetail;
