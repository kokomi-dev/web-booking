import { BadgeHelp, Bell } from "lucide-react";

import { cn } from "@/lib/utils";
import Account from "@/components/dashboard/account";
import Sidebar from "../sidebar";
import MobileSidebar from "../mobile-sidebar";
import Search from "@/components/components/search";
import Link from "next/link";

const HeaderDashboard = async () => {
  return (
    <div
      className={cn(
        "w-full h-full container-padding bg-bg_primary_main z-[15]  flex flex-col items-start justify-start gap-2 py-2"
      )}
    >
      {/* logo, navigation, notify */}
      <div
        className={cn(
          "w-full font-medium text-white text-normal  flex items-center justify-between transition-all duration-300",
          " lg:text-normal lg:h-[140px] lg:block  "
        )}
      >
        <MobileSidebar />
        <div className="w-full font-bold  flex items-center justify-between text-white  ">
          <Link href="/attractions" className="text-large e font-mono">
            KoKoTravel.com
          </Link>
          <div className="flex items-center justify-start gap-2">
            <div
              className={cn(
                "hidden p-2 rounded-lg transition-all duration-300",
                "lg:block hover:bg-bg_primary_active hover:cursor-pointer"
              )}
            >
              <h3 className="text-small font-medium  ">
                Đăng chỗ nghỉ của bạn
              </h3>
            </div>
            <BadgeHelp className="size__icon-small hidden lg:block" />
            <Bell className="size__icon--small hidden lg:block" />
          </div>
        </div>
        <div
          className={cn(
            "md:mt-2",
            "lg:mt-2 lg:w-full lg:flex lg:items-center lg:justify-between"
          )}
        >
          <Sidebar />
          <Account />
        </div>
      </div>
      {/* slogan , search */}
      <div className="w-full h-full">
        <Search currentValue={""} />
      </div>
    </div>
  );
};
export default HeaderDashboard;
