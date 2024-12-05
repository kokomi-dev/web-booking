"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { NAVIGATIONS } from "@/utils/constants";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store/sidebar-store";
const Navigation = () => {
  const pathname = usePathname();
  const { handleClose } = useSidebarStore();
  return (
    <div
      className={cn(
        "w-[100%] h-full transition-all duration-200 mt-[18px]",
        "md:mt-[4px]",
        "lg:mt-[8px]  ",

        pathname.includes("attractions") && " lg:ml-[-1rem]",
        pathname.includes("hotels") && " lg:ml-[-1rem]",
        pathname.includes("combos") && " lg:ml-[-1rem]",
        pathname.includes("contact") && " lg:ml-[-1rem]",
        pathname.includes("booking") && "hidden invisible"
      )}
    >
      <div
        className={cn(
          "w-[100%] text-small font-medium flex flex-row items-start justify-start gap-x-3 gap-y-3 overflow-x-auto scrollbar-hide "
        )}
      >
        {NAVIGATIONS.map(({ title, url, icon }) => {
          const isActive = pathname.includes(url);
          return (
            <Link
              key={url}
              href={url}
              className={cn(
                "min-w-fit flex text-white items-center justify-start p-1 lg:p-2 transition-all duration-300 select-none rounded-14 border-1 border-transparent",
                "hover:bg-bg_primary_active cursor-pointer",
                isActive
                  ? "bg-bg_primary_active text-white rounded-14  border-1 border-blue-50"
                  : ""
              )}
              onClick={handleClose}
            >
              <div className="w-[24px] h-[24px]  object-cover flex items-center justify-center mr-2">
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
              <span className=" font-normal text-[0.93rem]">{title}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default Navigation;
