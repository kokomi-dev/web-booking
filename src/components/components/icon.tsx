import { cn } from "@/lib/utils";
import React from "react";

type IconProps = {
  children: React.ReactNode;
};
const Icon: React.FC<IconProps> = ({ children }) => {
  return <div className={cn("size-4")}>{children}</div>;
};

export default Icon;
