"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { NAVIGATIONS } from "@/constants";
import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/store/sidebar-store";
const Nav = () => {
  const pathname = usePathname();
  const { handleClose } = useSidebarStore();
  return (
    <div className={cn("w-full h-full ", "lg:w-[100%]", "md:w-[90%]")}>
      <div
        className={cn(
          "w-[80%] text-[0.9rem] font-[500] flex items-start justify-start gap-x-3  "
        )}
      >
        {NAVIGATIONS.map(({ title, url, icon }) => {
          return (
            <Link
              key={url}
              href={url}
              className={cn(
                "flex items-center justify-start py-2 px-3 transition-all duration-300 select-none rounded-14",
                "hover:bg-bg_primary_active  cursor-pointer",
                "lg:text-white",
                pathname.includes(url) &&
                  "lg:bg-bg_primary_active lg:text-white lg:rounded-14 lg:border-1"
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
              <span className=" font-normal text-[0.95rem]">{title}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default Nav;
