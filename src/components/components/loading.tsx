import { cn } from "@/utils/constants";
import { Skeleton } from "../ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
const LoadingPage = () => {
  return (
    <div className="loading">
      <div className="loader"></div>
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
        "flex items-center justify-center  gap-2 p-1 z-[80] rounded-lg w-[45px]  h-[45px] animate-pulse bg-bg_primary_blue_sub ",
        "md:w-[60px] md:h-[60px]",
        "lg:justify-start lg:w-[155px] lg:h-[45px] lg:pl-2"
      )}
    >
      <Skeleton className="w-[2.1rem] h-[2.1rem] rounded-full bg-bg_primary_blue_sub2" />
      <div className="hidden lg:flex flex-col justify-center space-y-1">
        <Skeleton className="w-[90px] h-[16px] rounded bg-bg_primary_blue_sub2" />
        <Skeleton className="w-[90px] h-[12px] rounded bg-bg_primary_blue_sub2" />
      </div>
    </div>
  );
};
const LoadingImg = () => {
  return (
    <div className="w-full h-full">
      <Skeleton className="h-full w-full rounded-14 animate-pulse  bg-bg_black_sub  " />
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
    <div className="w-full h-full animate-pulse bg-bg_black_sub rounded-8 ">
      <Skeleton className="h-full w-full rounded-8 bg-bg_primary_white"></Skeleton>
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
    <div className="rounded-lg shadow-lg p-4 bg-white flex flex-col gap-y-1 lg:gap-y-3 justify-start border-0.5 border-[#888] animate-pulse">
      <div className="flex flex-col items-start justify-start lg:gap-y-2 lg:flex-row lg:items-center lg:justify-between">
        <Skeleton className="h-6 w-3/4 rounded" />
        <Skeleton className="h-4 w-1/2 rounded" />
      </div>
      <div className="flex items-center justify-start gap-x-3">
        <Skeleton className="size-7 md:size-9 lg:size-10 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-5/6 rounded" />
        </div>
      </div>
      <Skeleton className="h-4 w-20 rounded mt-2" />
    </div>
  );
};
export {
  LoadingItemSearch,
  LoadingPage,
  LoadingButton,
  LoadingComponentAccount,
  LoadingImg,
  LoadingItemComment,
  LoadingItemShow,
  LoadingItemBlog,
};
