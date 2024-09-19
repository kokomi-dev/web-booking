"use client";
import { BadgeHelp, Bell } from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import Account from "@/components/dashboard/account";
import Sidebar from "../sidebar";
import MobileSidebar from "../mobile-sidebar";
import Search from "@/components/dashboard/home/search";
import { Fragment, useEffect } from "react";
import { reqCurrentUser } from "@/api/api-auth";
import { useAuthenticatedStore } from "@/store/authencation-store";

const HeaderDashboard = () => {
  const pathname = usePathname();
  const { setUserLogined, setIsAuthenticated } = useAuthenticatedStore();

  useEffect(() => {
    try {
      const getCurrentUser = async () => {
        const fetchData = await reqCurrentUser();
        if (fetchData) {
          setUserLogined(fetchData.user);
          setIsAuthenticated();
        }
      };
      getCurrentUser();
    } catch (error) {}
  }, []);
  return (
    <div
      className={cn(
        "w-full h-full bg-bg_primary_main z-[15] py-4 flex flex-col items-start justify-start gap-2",
        "md:gap-4",
        "lg:gap-6"
      )}
    >
      {/* logo, navigation, notify */}
      <div
        className={cn(
          "w-full font-[500] text-white text-normal  flex items-center justify-between transition-all duration-300",
          "lg:px-36 lg:text-normal lg:h-[140px] lg:block  "
        )}
      >
        <MobileSidebar />
        <div className="w-full font-bold  flex items-center justify-between text-white ">
          <h1 className="text-large e font-mono">KoKoTravel.com</h1>
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
      {/* slogan , search */}
      {pathname.includes("booking" || "pay" || "combos" || "contact") ? (
        <Fragment></Fragment>
      ) : (
        <div className="w-full h-full">
          <Search page={pathname.split("/")[1]} currentValue={""} />
        </div>
      )}
    </div>
  );
};
export default HeaderDashboard;
