import { cn } from "@/utils/constants";

const Loading = ({ fix }: { fix?: boolean }) => {
  return (
    <div
      className={cn(
        "loading fixed top-0 bottom-0 left-0 right-0 z-[50]",
        fix && ""
      )}
    >
      <div className="loader"></div>
    </div>
  );
};

export default Loading;
