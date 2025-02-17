"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { BreadcrumbItemType } from "@/types/component-types";
import { ChevronRight } from "lucide-react";

const BreadcrumbHead = ({ items }: { items: BreadcrumbItemType[] }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
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
            {index < items.length - 1 && (
              <ChevronRight className="size-4 text-black_main mx-0" />
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbHead;
