"use client";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect } from "react";
import { BookmarkCheck, CalendarCheck, LogOut, UserRound } from "lucide-react";

import { reqCurrentUser } from "@/api/api-auth";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuthenticatedStore } from "@/store/authencation-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LoadingComponentAccount } from "@/util/loading";

const HeaderAccount = () => {
  const { setUserLogined, setIsAuthenticated, user } = useAuthenticatedStore();

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
    <div className="w-full h-auto ">
      <div
        className={cn(
          "w-full h-[64px] text-normal text-white sticky top-0 z-[15] flex items-center justify-between p-3 px-10 bg-bg_primary_main container-padding",

          "lg:h-[84px]"
        )}
      >
        {/* logo */}
        <Link
          href="/attractions"
          className=" font-bold font-mono relative text-large"
        >
          KoKo Travel
        </Link>
        {/* navigation */}
        {user && (
          <Suspense fallback={<LoadingComponentAccount />}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className={cn(
                    "h-full flex items-center justify-end  rounded-lg bg-bg_primary_active",
                    "cursor-pointer",
                    "md:items-center md:px-1 md:w-auto",
                    "lg:gap-x-2 "
                  )}
                >
                  <div
                    className={cn(
                      "w-[2.3rem] h-[2.3rem] border-1  border-yellow_main rounded-full flex items-center justify-center",
                      "md:w-[2.8rem] md:h-[2.8rem]"
                    )}
                  >
                    <Image
                      src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
                      width={600}
                      height={600}
                      alt="avatar-user"
                      className=" rounded-full object-contain"
                    />
                  </div>
                  <div
                    className={cn(
                      "w-auto h-auto hidden flex-col items-start justify-center ",
                      "lg:flex"
                    )}
                  >
                    <div
                      className={cn(
                        "flex items-center justify-start gap-x-1 text-white font-bold text-small select-none"
                      )}
                    >
                      <span className="capitalize text-white">
                        {user?.firstname}
                      </span>
                      <span className="capitalize text-white">
                        {user?.lastname}
                      </span>
                    </div>
                    <div className="text-start">
                      <span className="text-[0.8rem] text-yellow_main">
                        Genius Cấp 1
                      </span>
                    </div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 h-auto bg-white text-black rounded-14 p-0 ">
                <DropdownMenuGroup className="w-full">
                  <DropdownMenuItem
                    className={cn(
                      "cursor-pointer ",
                      "hover:bg-bg_primary_hover"
                    )}
                  >
                    <Link
                      className="w-full h-full  p-2 py-3 flex items-center justify-start"
                      href={`/account/mysetting/${user._id}?do=manage-account`}
                    >
                      <UserRound className="w-5 h-5 mr-2" />
                      <span> Quản lí tài khoản</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className={cn(
                      "cursor-pointer ",
                      "hover:bg-bg_primary_hover"
                    )}
                  >
                    <Link
                      className="w-full flex p-2 py-3 items-center justify-start"
                      href={`/account/manage-booking/${user._id}?do=booking`}
                    >
                      <CalendarCheck className="w-5 h-5 mr-2" />
                      <span>Đặt chỗ & chuyến đi</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className={cn(
                      "cursor-pointer ",
                      "hover:bg-bg_primary_hover"
                    )}
                  >
                    <Link
                      className="w-full flex p-2 py-3 items-center justify-start"
                      href={`/account/saved/${user._id} ?do=saved`}
                    >
                      <BookmarkCheck className="w-5 h-5 mr-2" />
                      <span>Đã lưu</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className={cn(
                      "cursor-pointer px-4 py-3",
                      "hover:bg-bg_primary_hover"
                    )}
                  >
                    <LogOut className="w-5 h-5 mr-2" />
                    <span>Đăng xuất</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default HeaderAccount;
