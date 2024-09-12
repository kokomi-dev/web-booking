import { cn } from "@/lib/utils";
import Account from "@/components/dashboard/account";

import Sidebar from "../sidebar";
import MobileSidebar from "../mobile-sidebar";
import { BadgeHelp, Bell } from "lucide-react";

const HeaderDashboard = () => {
  return (
    <div
      className={cn(
        "w-full h-[80px] z-[15] py-4 font-[500] text-white text-[1.2rem] bg-bg_primary_main flex items-center justify-between transition-all duration-300",
        "lg:px-20 lg:text-[1.2rem] lg:h-[140px] lg:block  "
      )}
    >
      <MobileSidebar />
      <div className="w-full  font-bold  flex items-center justify-between ">
        <h1 className="text-[1.2rem] font-mono">KoKoTravel.com</h1>
        <h3
          className={cn(
            "font-semibold text-[1.2rem]  text-white uppercase hidden",
            "lg:block lg:text-[1.4rem] "
          )}
        >
          Trải nhiệm là cuộc sống
        </h3>
        <div className="flex items-center justify-start gap-2">
          <div
            className={cn(
              "hidden p-2 rounded-lg transition-all duration-300",
              "lg:block hover:bg-red-300 hover:cursor-pointer"
            )}
          >
            <h6 className="text-[1rem] font-medium ">Đăng chỗ nghỉ của bạn</h6>
          </div>
          <BadgeHelp className="size__icon-small" />
          <Bell className="size__icon--small" />
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
  );
};
export default HeaderDashboard;
