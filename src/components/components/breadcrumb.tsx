"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { BreadcrumbItemType } from "@/types/component-types";
import { ChevronRight, Slash } from "lucide-react";

const BreadcrumbHead = ({ items }: { items: BreadcrumbItemType[] }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList className="line-clamp-1">
        {items.map((item, index) => (
          <BreadcrumbItem key={index}>
            {item.href ? (
              <BreadcrumbLink
                className="hover:underline text-blue_main_sub ub"
                href={item.href}
              >
                {item.label}
              </BreadcrumbLink>
            ) : (
              <BreadcrumbPage className="text-black_main first-letter:uppercase">
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
