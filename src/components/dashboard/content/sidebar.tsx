"use client";
import React, { useEffect, useState } from "react";
import { LIST_SIDEBAR_ITEM } from "./constant";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const SidebarContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab] = useState(searchParams.get("activeTab") ?? 1);
  const updateQueryParam = (paramName: string, paramValue: string) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set(paramName, paramValue);
    router.push(`${window.location.pathname}?${currentParams.toString()}`);
  };

  return (
    <div className="flex flex-wrap md:flex-col">
      {LIST_SIDEBAR_ITEM.map((e: string, i: number) => {
        return (
          <div
            key={i}
            className={cn(
              "text-black_main text-small font-normal py-2 px-1 rounded-8 hover:cursor-pointer pl-5 transition-all duration-150",
              activeTab == String(i + 1) &&
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
