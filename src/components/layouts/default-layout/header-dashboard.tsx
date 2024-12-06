"use client";
import { BadgeHelp } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import Account from "@/components/layouts/account/account";
import MobileSidebar from "../mobile-sidebar";

import Notifycation from "@/components/components/notifycation";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Navigation from "../navigation";
const HeaderDashboard = () => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div
      className={cn(
        "w-full h-[116px] pb-3 lg:pb-2 bg-bg_primary_main lg:h-full sticky top-0 lg:relative  z-[15]  flex flex-col items-start justify-start   "
      )}
    >
      <div
        className={cn(
          "w-full h-full container-padding p-2 mt-2 font-medium text-white text-normal  flex flex-col items-center justify-between transition-all duration-300"
        )}
      >
        <div className="w-full font-bold  flex items-center justify-between text-white py-1 ">
          <Link href="/home" className="text-medium md:text-large font-mono">
            KoKoTravel
          </Link>
          <div className="h-auto flex items-center justify-center gap-x-4">
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
            <Account />
            <MobileSidebar />
          </div>
        </div>
        <Navigation />
      </div>
    </div>
  );
};
export default HeaderDashboard;
