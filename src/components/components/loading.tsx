import { Skeleton } from "../ui/skeleton";

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
    <div className="flex items-start gap-2 p-1 rounded-lg w-[200px] h-[50px] animate-pulse bg-primary/10">
      <Skeleton className="w-[2.2rem] h-[2.2rem] rounded-full bg-primary/10" />
      <div className="flex flex-col justify-center space-y-1">
        <Skeleton className="w-[100px] h-[16px] rounded bg-primary/10" />
        <Skeleton className="w-[80px] h-[12px] rounded bg-primary/10" />
      </div>
    </div>
  );
};
const LoadingImg = () => {
  return (
    <div className="w-full h-full">
      <Skeleton className="h-full w-full rounded-14 animate-pulse  bg-primary/10" />
    </div>
  );
};
const LoadingItemSearch = () => {
  return (
    <div className="w-full h-full">
      <Skeleton className="h-full w-full rounded-14 animate-pulse  bg-primary/10">
        <div>
          <Skeleton className="size-9 rounded-full mr-2  animate-pulse  bg-primary/10" />
          <Skeleton className="h-full w-fit rounded-14 animate-pulse  bg-primary/10" />
        </div>
        <Skeleton className="h-full w-fit rounded-8 animate-pulse  bg-primary/10" />
      </Skeleton>
    </div>
  );
};
const LoadingItemComment = () => {
  return (
    <div className="w-full h-full">
      <Skeleton className="h-full w-full rounded-14 animate-pulse  bg-primary/10">
        <div>
          <Skeleton className="size-9 rounded-full mr-2  animate-pulse  bg-primary/10" />
          <Skeleton className="h-full w-fit rounded-14 animate-pulse  bg-primary/10" />
        </div>
        <Skeleton className="h-full w-fit rounded-8 animate-pulse  bg-primary/10" />
      </Skeleton>
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
};
