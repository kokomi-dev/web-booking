"use client";
import React from "react";
import { LIST_SIDEBAR_ITEM } from "./constant";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const SidebarContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const updateQueryParam = (paramName: string, paramValue: string) => {
    // Lấy các tham số hiện tại
    const currentParams = new URLSearchParams(searchParams.toString());

    // Cập nhật giá trị tham số
    currentParams.set(paramName, paramValue);

    // Đẩy URL mới với tham số đã cập nhật
    router.push(`${window.location.pathname}?${currentParams.toString()}`);
  };

  return (
    <div>
      {LIST_SIDEBAR_ITEM.map((e: string, i: number) => {
        return (
          <div
            className={cn(
              "text-black_main text-small font-normal py-2 px-1 rounded-8 hover:cursor-pointer pl-5 transition-all duration-150",
              searchParams.get("activeTab") == String(i + 1) &&
                " bg-bg_primary_hover !text-small text-blue_main_sub"
            )}
            onClick={() => updateQueryParam("activeTab", String(i + 1))}
          >
            {e}
          </div>
        );
      })}
    </div>
  );
};

export default SidebarContent;
