import { Skeleton } from "@/components/ui/skeleton";

function LoadingImg() {
  return (
    <div className="w-full h-full">
      <Skeleton className="h-full w-full rounded-14" />
    </div>
  );
}
export { LoadingImg };
