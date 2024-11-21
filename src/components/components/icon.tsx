import { cn } from "@/lib/utils";
import React from "react";

type IconProps = {
  children: React.ReactNode;
  level?: number;
};
const Icon: React.FC<IconProps> = ({ children, level }) => {
  return (
    <div
      className={cn(
        "size-4",
        level === 1 && "size-2 w-2 h-2",
        level === 2 && "size-3 w-3 h-3"
      )}
    >
      {children}
    </div>
  );
};

export default Icon;
