import { Skeleton } from "@/components/ui/skeleton";

function SkeletonLoading() {
  return (
    <div className="flex items-center space-x-4 ">
      <Skeleton className="h-12 w-12  animate-pulse rounded-md bg-primary/10" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}
function LoadingComponentAccount() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-[50px] w-[200px] rounded-8 animate-pulse  bg-primary/10" />
    </div>
  );
}
export { SkeletonLoading, LoadingComponentAccount };
