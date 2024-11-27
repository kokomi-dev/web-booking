"use client";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { NAVIGATIONS } from "@/utils/constants";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import { useSidebarStore } from "@/store/sidebar-store";
import { cn } from "@/lib/utils";
const MobileSidebar = () => {
  const { isOpen, handleClose, handleCloseOrModal } = useSidebarStore();
  const pathname = usePathname();

  return (
    <div className={cn("w-fit h-full block", "lg:hidden")}>
      <MenuIcon
        onClick={handleCloseOrModal}
        className="w-6 h-6 ml-4  text-white hover:cursor-pointer transition-all duration-300"
      />
      <Sheet open={isOpen} onOpenChange={handleClose}>
        <SheetTitle></SheetTitle>
        <SheetDescription></SheetDescription>
        <SheetContent
          onClick={handleClose}
          className="w-[65%] h-full bg-bg_primary_main text-white"
          side="left"
        >
          <div className={cn("w-full h-full ", "lg:w-[80%]", "md:w-[90%]")}>
            <div
              className={cn(
                "w-[80%]  text-[0.9rem] font-[500]  flex flex-col items-start justify-start text-black gap-y-3 ",
                "lg:w-[100%] flex items-center justify-evenly text-white"
              )}
            >
              {NAVIGATIONS.map(({ title, url, icon }) => {
                return (
                  <Link
                    key={url}
                    href={url}
                    className={cn(
                      "w-full flex items-start justify-start p-2 transition-all duration-300 select-none text-white",
                      "lg:text-white",
                      pathname.includes(url) &&
                        "bg-bg_primary_active text-white rounded-14 hover:opacity-100 shadow-xl"
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
                    <span className="text-[0.95rem] font-normal">{title}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileSidebar;
