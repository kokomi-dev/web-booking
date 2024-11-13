"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import ShowImages from "./show-images";
import { cn } from "@/lib/utils";
import ShowCommentsImage from "./show-comment-image";

const ImagesDetail = ({ data, slug }: { data: any; slug: string }) => {
  const [open, setOpen] = useState(false);
  const [openShowCmt, setOpenShowCmt] = useState(false);

  const [loading, setLoading] = useState([true, true, true, true, true]);

  const handleImageLoad = (index: number) => {
    setLoading((prev) => {
      const newLoadingState = [...prev];
      newLoadingState[index] = false;
      return newLoadingState;
    });
  };
  const [hoverStartTime, setHoverStartTime] = useState<number | null>(null);
  const [hoverDuration, setHoverDuration] = useState(0);

  const handleMouseEnter = () => {
    setHoverStartTime(Date.now());
  };

  const handleMouseLeave = () => {
    if (hoverStartTime) {
      const duration = Date.now() - hoverStartTime;
      setHoverDuration(duration);
      setHoverStartTime(null);
    }
  };

  useEffect(() => {
    if (hoverDuration > 500) {
      return setOpenShowCmt(false);
    } else {
      return setOpenShowCmt(true);
    }
  }, [hoverDuration]);
  return (
    <div className="w-full h-auto  ">
      {data && (
        <div className="w-full h-full grid grid-cols-2 gap-2 rounded-8 overflow-hidden select-none">
          {/* Main Image */}
          <div className="col-span-1 max-h-[400px] h-full">
            <div className="relative w-full h-full">
              {loading[0] && (
                <div className="absolute w-full h-full inset-0 bg-gray-200 animate-pulse"></div>
              )}
              <Image
                priority
                width={500}
                height={400}
                src={data.images[0]}
                className={`object-cover w-full h-full cursor-pointer select-none transition-opacity duration-300 ${
                  loading[0] ? "opacity-0" : "opacity-100"
                }`}
                alt={`Ảnh chính của tour du lịch ${data.name}`}
                onClick={() => {
                  setOpen(true);
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onLoad={() => handleImageLoad(0)}
              />
              <ShowCommentsImage
                open={openShowCmt}
                setOpen={setOpenShowCmt}
                slug={slug}
                rating={data.rating}
                comments={data.comments}
              />
            </div>
          </div>

          {/* Sub Images */}
          <div className="w-full max-h-[400px] h-full grid grid-cols-2 grid-rows-2 gap-2 col-span-1">
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

                {/* Overlay if more than 5 images */}
                {data.images.length > 5 && index === 3 && (
                  <div
                    className="absolute inset-0 bg-[rgba(0,0,0,0.15)] flex items-center justify-center text-white font-bold text-lg hover:cursor-pointer"
                    onClick={() => {
                      setOpen(true);
                    }}
                  >
                    +{data.images.length - 5}
                  </div>
                )}
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
