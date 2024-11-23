"use client";
import { BadgeHelp } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import Account from "@/components/layouts/account/account";
import Sidebar from "../sidebar";
import MobileSidebar from "../mobile-sidebar";

import Notifycation from "@/components/components/notifycation";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const HeaderDashboard = () => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div
      className={cn(
        "w-full h-full sticky top-0 lg:relative  z-[15]  flex flex-col items-start justify-start  "
      )}
    >
      <div
        className={cn(
          "w-full container-padding p-2 font-medium text-white text-normal bg-bg_primary_main flex items-center justify-between transition-all duration-300",
          " lg:text-normal lg:h-auto lg:block  "
        )}
      >
        <MobileSidebar />
        <div className="w-full font-bold  flex items-center justify-between text-white  ">
          <Link href="/home" className="text-normal md:text-large font-mono">
            KoKoTravel.com
          </Link>
          <div className="flex items-center justify-start gap-x-2">
            <div
              className={cn(
                "hidden p-2 rounded-lg transition-all duration-300",
                "lg:block hover:bg-bg_primary_active hover:cursor-pointer"
              )}
            >
              <h3
                className={cn(
                  "text-small font-medium  ",
                  pathname.includes("attractions") && "hidden",
                  pathname.includes("contact") && "hidden",
                  pathname.includes("booking") && "hidden"
                )}
              >
                Đăng chỗ nghỉ của bạn
              </h3>
            </div>
            <HoverCard>
              <HoverCardTrigger>
                <BadgeHelp
                  onClick={() => {
                    router.push("/contact");
                  }}
                  className="size__icon-small hidden lg:block hover:cursor-pointer"
                />
              </HoverCardTrigger>
              <HoverCardContent
                align="end"
                className="bg-black text-white border-none p-1 px-2 w-full shadow-2xl z-10"
              >
                <Link href="/contact" className="text-smallest font-normal">
                  Liên hệ tư vấn
                </Link>
              </HoverCardContent>
            </HoverCard>

            <Notifycation />
          </div>
        </div>
        <div
          className={cn(
            "md:mt-2",
            "lg:mt-3",
            "xl:mt-4 lg:w-full lg:flex lg:items-center lg:justify-between"
          )}
        >
          <Sidebar />
          <Account />
        </div>
      </div>
    </div>
  );
};
export default HeaderDashboard;
