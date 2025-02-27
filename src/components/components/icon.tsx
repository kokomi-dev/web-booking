import { cn } from "@/utils/constants";
import React, { ReactElement, cloneElement } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IconProps } from "@/types/component-types";

const Icon: React.FC<IconProps> = ({
  children,
  level,
  className,
  tooltip,
  onClick,
}) => {
  const sizeClass = cn(
    level === 1
      ? "size-3"
      : level === 2
      ? "size-4"
      : level === 3
      ? "size-5 w-5 h-5"
      : "size-4 w-4 h-4", // Mặc định là size 4 nếu không có level
    "hover:cursor-pointer transition-all duration-200",
    className
  );

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className={sizeClass} onClick={onClick}>
          {React.isValidElement(children)
            ? cloneElement(children as ReactElement, { className: sizeClass })
            : children}
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Icon;
