import React from "react";
import { cn } from "@/lib/utils";
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
    <div className="w-full my-3">
      <h3 className="title_large">{title}</h3>
      <div className={cn(className)}>{children}</div>
    </div>
  );
};

export default CardText;
