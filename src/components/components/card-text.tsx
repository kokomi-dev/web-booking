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
    <div className="w-full h-full posing-vertical-6">
      <h3 className="text-medium font-semibold ">{title}</h3>
      <div className={cn("text-normal w-full h-auto", className)}>
        {children}
      </div>
    </div>
  );
};

export default CardText;
