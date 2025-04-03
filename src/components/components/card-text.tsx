import React from "react";
import { cn } from "@/utils/constants";
const CardText = ({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: any;
}) => {
  return (
    <div className="w-full h-full ">
      <h3 className="text-lg font-semibold heading-spacing">{title}</h3>
      <div className={cn("text-base w-full h-auto", className)}>{children}</div>
    </div>
  );
};

export default CardText;
