"use client";
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/utils/constants";
import { Skeleton } from "../ui/skeleton";

const LoadingPage = () => {
  useEffect(() => {
    // Thêm lớp "overflow-hidden" vào <html> và <body> khi loading
    document.documentElement.classList.add("overflow-hidden");
    document.body.classList.add("overflow-hidden");

    return () => {
      // Loại bỏ lớp "overflow-hidden" khi loading kết thúc
      document.documentElement.classList.remove("overflow-hidden");
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return (
    <div className="absolute top-0 right-0 left-0 bottom-0 w-screen h-screen flex items-center justify-center bg-white/80 backdrop-blur-md z-[999] overflow-hidden">
      <div className="relative flex items-center space-x-2">
        <span className="text-lg lg:text-lg font-bold text-blue">
          KoKoTravel
        </span>
        <div className="flex space-x-1">
          <span className="w-2 h-2 lg:w-3 lg:h-3 bg-blue_main_sub rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-2 h-2 lg:w-3 lg:h-3 bg-red-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-2 h-2 lg:w-3 lg:h-3 bg-green rounded-full animate-bounce"></span>
        </div>
      </div>
    </div>
  );
};

const LoadingButton = () => {
  return <div className="loader-btn"></div>;
};
const LoadingComponentAccount = () => {
  return (
    <div
      className={cn(
        "flex items-center justify-center  gap-2 p-1 z-[80] rounded-lg w-[35px] h-[35px] sm:w-[40px]  sm:h-[40px] animate-pulse bg-blue_sub ",
        "lg:justify-start lg:w-[155px] lg:h-[45px] lg:pl-2"
      )}
    >
      <Skeleton className="w-[2.1rem] h-[2.1rem] rounded-full bg-blue_sub2" />
      <div className="hidden lg:flex flex-col justify-center space-y-1">
        <Skeleton className="w-[90px] h-[16px] rounded bg-blue_sub2" />
        <Skeleton className="w-[90px] h-[12px] rounded bg-blue_sub2" />
      </div>
    </div>
  );
};
const LoadingImg = () => {
  return (
    <div className="w-full h-full">
      <Skeleton className="h-full w-full rounded-14 animate-pulse  bg-black_sub  " />
    </div>
  );
};
const LoadingItemSearch = () => {
  return (
    <div className="w-full p-1">
      <div className="flex flex-col items-center border rounded-lg overflow-hidden shadow-lg w-full animate-pulse">
        <div className="relative w-full h-[220px] lg:h-[240px]">
          <Skeleton className="w-full h-full" />
        </div>

        <div className="p-3 lg:p-4 w-full flex flex-col items-start justify-start text-start">
          <Skeleton className="h-[20px] w-[60%] mb-2 rounded" />
          <Skeleton className="h-[16px] w-[40%] mb-2 rounded" />
          <Skeleton className="h-[16px] w-[50%] mb-2 rounded" />
          <Skeleton className="h-[16px] w-[30%] mb-2 rounded" />
          <Skeleton className="h-[24px] w-[80%] mt-2 rounded" />
        </div>
      </div>
    </div>
  );
};
const LoadingItemComment = () => {
  return (
    <div className="w-full h-full animate-pulse bg-black_sub rounded-8 ">
      <Skeleton className="h-full w-full rounded-8 bg-white"></Skeleton>
    </div>
  );
};
const LoadingItemShow = () => {
  return (
    <div className="w-full min-h-[100%] h-[100%]">
      <Card className="min-h-[100%] flex items-start justify-start flex-col">
        {/* Hình ảnh skeleton */}
        <Skeleton className="rounded-tr-md rounded-tl-md w-full h-[200px] md:h-[230px] lg:h-[240px]" />

        <CardContent className="grid gap-x-1 p-2 pt-1 pb-8 text-start">
          {/* Tiêu đề */}
          <Skeleton className="h-5 w-3/4 mb-1" />

          {/* Địa điểm */}
          <Skeleton className="h-4 w-1/2 mb-2" />

          {/* Đánh giá */}
          <div className="flex items-center gap-1">
            <Skeleton className="w-10 h-5 rounded-8" />
            <Skeleton className="w-4 h-4 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>

          {/* Giá tiền */}
          <div className="absolute bottom-2 right-4 flex items-center">
            <Skeleton className="h-4 w-20" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
const LoadingItemBlog = () => {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg border border-gray-200 bg-white p-2 lg:p-4 flex flex-col gap-y-4 animate-pulse">
      <Skeleton className="h-6 w-3/4 bg-gray-300" />
      <Skeleton className="h-4 w-1/2 bg-gray-300" />

      <div className="flex items-start gap-x-4">
        <Skeleton className="w-10 h-10 rounded bg-gray-300" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-full bg-gray-300" />
          <Skeleton className="h-4 w-5/6 bg-gray-300" />
        </div>
      </div>

      <Skeleton className="h-4 w-20 bg-gray-300" />
    </div>
  );
};
const LoadingBookingCardAttraction = () => {
  return (
    <div className="list-spacing border-[2px] border-blue_sub rounded-xl p-3 relative">
      <Skeleton className="h-6 w-1/2 mb-4" />
      <Skeleton className="h-8 w-3/4 mb-4" />
      <div className="space-y-3">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
      </div>
      <div className="mt-4 space-y-3">
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-5 w-3/4" />
      </div>
      <div className="mt-4 space-y-3">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-y-0 md:gap-x-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
};
const LoadingBookingCardHotel = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 animate-pulse">
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between items-center">
          <Skeleton className="h-6 w-1/3 bg-gray-300 rounded" />
          <Skeleton className="h-4 w-20 bg-gray-300 rounded" />
        </div>
        <div className="flex flex-wrap gap-2">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-4 w-1/4 bg-gray-300 rounded" />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-5 bg-gray-300 rounded-full" />
          <Skeleton className="h-4 w-8 bg-gray-300 rounded" />
          <Skeleton className="h-4 w-8 bg-gray-300 rounded" />
        </div>
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <Skeleton className="h-4 w-20 bg-gray-300 rounded" />
            <Skeleton className="h-5 w-28 bg-gray-300 rounded" />
            <Skeleton className="h-4 w-16 bg-green-400 rounded" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 bg-gray-300 rounded" />
            <Skeleton className="h-8 w-12 bg-gray-300 rounded" />
            <Skeleton className="h-8 w-8 bg-gray-300 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};
const LoadingShowBooked = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4 border border-gray-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="space-y-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-4 w-40" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
        <div className="space-y-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-32" />
        </div>

        <Skeleton className="h-4 w-48" />

        <div className="space-y-2 sm:text-right">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-6 w-24" />
        </div>
      </div>
    </div>
  );
};
export {
  LoadingBookingCardAttraction,
  LoadingBookingCardHotel,
  LoadingButton,
  LoadingComponentAccount,
  LoadingImg,
  LoadingItemBlog,
  LoadingItemComment,
  LoadingItemSearch,
  LoadingItemShow,
  LoadingPage,
  LoadingShowBooked,
};
