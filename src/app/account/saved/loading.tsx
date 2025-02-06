import { cn } from "@/utils/constants";

const Loading = () => {
  return (
    <div className={cn("loading")}>
      <div className="loader"></div>
    </div>
  );
};

export default Loading;
