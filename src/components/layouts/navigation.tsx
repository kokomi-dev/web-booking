"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { NAVIGATIONS } from "@/utils/constants";
import { cn } from "@/utils/constants";
import { useSidebarStore } from "@/store/sidebar-store";
import { useRef } from "react";
const Navigation = () => {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const { handleClose } = useSidebarStore();
  return (
    <div
      className={cn(
        "w-[100%] h-full transition-all duration-200 mt-3  lg:mt-4 pt-1 pb-3 lg:pb-1",
        pathname.includes("attractions") && " lg:ml-[-1rem]",
        pathname.includes("hotels") && " lg:ml-[-1rem]",
        pathname.includes("combos") && " lg:ml-[-1rem]",
        pathname.includes("contact") && " lg:ml-[-1rem]",
        pathname.includes("booking") && "hidden invisible"
      )}
    >
      <div
        className="w-[100%] text-sm font-medium flex flex-row items-start justify-start gap-x-3 gap-y-3 overflow-x-auto scrollbar-hide"
        ref={containerRef}
      >
        {NAVIGATIONS.map(({ title, url, icon }, index) => {
          const isActive =
            pathname.includes("genius") && index == 0
              ? true
              : pathname.includes(url);
          if (isActive) {
            itemRefs.current[index]?.scrollIntoView({
              behavior: "smooth",
              block: "nearest",
              inline: "center",
            });
          }
          const handleClick = () => {
            handleClose();
            itemRefs.current[index]?.scrollIntoView({
              behavior: "smooth",
              block: "nearest",
              inline: "center",
            });
          };

          return (
            <Link
              key={url}
              href={url}
              className={`min-w-fit focus-visible:ring-1 p-1 pr-[10px] flex text-white items-center justify-start gap-x-1  transition-all duration-300 select-none rounded-14 border-1 border-transparent ${
                isActive
                  ? "bg-blue-linear text-white rounded-14 border-0.5 border-white"
                  : ""
              } hover:bg-blue_active cursor-pointer`}
              onClick={handleClick}
              ref={(el) => {
                itemRefs.current[index] = el as HTMLAnchorElement | null;
              }}
            >
              <div className="w-[24px] h-[24px] object-cover flex items-center justify-center flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18px"
                  height="18px"
                  viewBox="0 0 24 24"
                  role="presentation"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path d={icon} fill="currentColor"></path>
                </svg>
              </div>
              <span className="font-normal text-sm">{title}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default Navigation;
