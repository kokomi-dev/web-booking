import { Skeleton } from "../ui/skeleton";

const LoadingItem = () => {
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
    <div className="flex items-center space-x-4">
      <Skeleton className="h-[50px] w-[200px] rounded-8 animate-pulse  bg-primary/10" />
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
  LoadingItem,
  LoadingButton,
  LoadingComponentAccount,
  LoadingImg,
  LoadingItemComment,
};
