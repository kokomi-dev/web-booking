"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { BreadcrumbItemType } from "@/types/component-types";
import { cn } from "@/utils/constants";

const BreadcrumbHead = ({
  items,
  className,
}: {
  items: BreadcrumbItemType[];
  className?: string;
}) => {
  return (
    <Breadcrumb className={cn("container xl:px-0", className)}>
      <BreadcrumbList className="line-clamp-1">
        {items.map((item, index) => (
          <BreadcrumbItem key={index}>
            {item.href ? (
              <BreadcrumbLink
                className="hover:underline text-blue_sub ub"
                href={item.href}
              >
                {item.label}
              </BreadcrumbLink>
            ) : (
              <BreadcrumbPage className="text-black_blur first-letter:uppercase">
                {item.label}
              </BreadcrumbPage>
            )}
            {index < items.length - 1 && <span className="mr-[3px]">/</span>}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbHead;
