"use client";
import React, { useEffect, useState } from "react";
import { LIST_SIDEBAR_ITEM } from "./constant";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/utils/constants";

const SidebarContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<string>("1");

  useEffect(() => {
    const initialTab = searchParams.get("activeTab") || "1";
    setActiveTab(initialTab);
    if (!searchParams.get("activeTab")) {
      router.replace(`${window.location.pathname}?activeTab=${initialTab}`);
    }
    window.scrollTo(0, 0);
  }, [searchParams, router]);

  const updateQueryParam = (paramName: string, paramValue: string) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set(paramName, paramValue);
    router.push(`${window.location.pathname}?${currentParams.toString()}`);
    setActiveTab(paramValue);
  };

  return (
    <div className="flex flex-wrap md:flex-col">
      {LIST_SIDEBAR_ITEM.map((e: string, i: number) => (
        <div
          key={i}
          className={cn(
            "text-black flex items-center justify-center md:justify-start text-sm font-normal p-2 rounded-8 hover:cursor-pointer transition-all duration-150",
            activeTab === String(i + 1) &&
              " bg-blue_hover !text-sm text-blue_sub"
          )}
          onClick={() => updateQueryParam("activeTab", String(i + 1))}
        >
          {e}
        </div>
      ))}
    </div>
  );
};

export default SidebarContent;
