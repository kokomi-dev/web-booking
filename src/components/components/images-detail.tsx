"use client";

import React, { useState, useMemo, lazy, Suspense } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

// Lazy load components
const ShowImages = lazy(() => import("./show-images"));
const ShowCommentsImage = lazy(() => import("./show-comment-image"));

const ImagesDetail = ({ data, slug }: { data: any; slug: string }) => {
  // State
  const [open, setOpen] = useState(false);
  const [openShowCmt, setOpenShowCmt] = useState(false);
  const [loading, setLoading] = useState<boolean[]>(
    Array(data?.images?.length || 0).fill(true)
  );

  // Helper to handle image loading
  const handleImageLoad = (index: number) => {
    setLoading((prev) => {
      const newLoadingState = [...prev];
      newLoadingState[index] = false;
      return newLoadingState;
    });
  };

  // Helper to toggle comment section
  const toggleShowCmt = (state: boolean, delay: number) => {
    setTimeout(() => setOpenShowCmt(state), delay);
  };

  // Memoize sub-images to avoid recalculations
  const subImages = useMemo(
    () => data?.images?.slice(1, 5) || [],
    [data?.images]
  );

  // Fallback if no images available
  if (!data?.images || !Array.isArray(data.images)) return null;

  return (
    <div className="w-full h-[380px] lg:h-auto">
      {/* show image display > 768px */}
      <div className="w-full h-full hidden md:grid grid-cols-2 gap-2 rounded-8 overflow-hidden select-none">
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
              onClick={() => setOpen(true)}
              onLoad={() => handleImageLoad(0)}
            />
            <Suspense fallback={<div>Loading...</div>}>
              <ShowCommentsImage
                open={openShowCmt}
                setOpen={setOpenShowCmt}
                slug={slug}
                rating={data.rating}
                comments={data.comments}
              />
            </Suspense>
          </div>
        </div>
        {/* Sub Images */}
        <div className="w-full max-h-[400px] h-full grid grid-cols-2 grid-rows-2 gap-2 col-span-1">
          {subImages.map((img: string, index: number) => (
            <div key={`${img}-${index}`} className="relative w-full h-full">
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
                onClick={() => setOpen(true)}
                onLoad={() => handleImageLoad(index + 1)}
                alt={`Ảnh giới thiệu về tour du lịch ${data.name}`}
              />
              {/* Overlay if more than 5 images */}
              {data.images.length > 5 && index === 3 && (
                <div
                  className="absolute inset-0 bg-[rgba(0,0,0,0.15)] flex items-center justify-center text-white font-bold text-lg hover:cursor-pointer"
                  onClick={() => setOpen(true)}
                >
                  <span className="text-small font-semibold">
                    + Hiển thị thêm ảnh ({data.images.length - 5})
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* show img display < 768px */}
      <div className="block md:hidden">
        <Carousel opts={{ align: "start" }} className="w-full">
          <CarouselContent>
            {data.images.map((e: any, i: number) => (
              <CarouselItem
                key={i}
                className="w-full md:basis-1/3 lg:basis-1/4"
              >
                <Image
                  priority
                  width={800}
                  height={800}
                  src={e}
                  className={`object-cover w-full h-[380px] cursor-pointer select-none transition-opacity duration-300 rounded-8 ${
                    loading[0] ? "opacity-0" : "opacity-100"
                  }`}
                  alt={`Ảnh  của tour du lịch ${data.name}`}
                  onLoad={() => handleImageLoad(0)}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <ShowImages open={open} data={data} setOpen={setOpen} />
      </Suspense>
    </div>
  );
};

export default ImagesDetail;
