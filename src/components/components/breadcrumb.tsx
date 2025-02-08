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

const BreadcrumbHead = ({ items }: { items: BreadcrumbItemType[] }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => (
          <BreadcrumbItem key={index}>
            {item.href ? (
              <BreadcrumbLink
                className="hover:underline text-black_sub"
                href={item.href}
              >
                {item.label}
              </BreadcrumbLink>
            ) : (
              <BreadcrumbPage className="text-blue_main_sub first-letter:uppercase">
                {item.label}
              </BreadcrumbPage>
            )}
            {index < items.length - 1 && "/"}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbHead;
