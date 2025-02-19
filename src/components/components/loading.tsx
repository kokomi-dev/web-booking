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
    <div
      className={cn(
        "w-full h-full animate-pulse  bg-bg_primary_blue_sub2 flex items-center justify-start ",
        "lg:w-full lg:h-[200px]"
      )}
    >
      <Skeleton className="h-[170px] w-[220px] rounded-14  bg-white" />
      <div className="w-full h-[80%] grid gap-y-2 ml-3">
        <Skeleton className="w-[40%] h-[20px]   mr-2  bg-white" />
        <Skeleton className="w-[80%] h-[20px]   bg-white" />
        <Skeleton className="w-[80%] h-[40px]   bg-white" />
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
export {
  LoadingItemSearch,
  LoadingPage,
  LoadingButton,
  LoadingComponentAccount,
  LoadingImg,
  LoadingItemComment,
  LoadingItemShow,
};
