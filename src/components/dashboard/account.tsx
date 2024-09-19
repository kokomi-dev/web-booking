"use client";
import Link from "next/link";

import { Button } from "../ui/button";
import { useAuthenticatedStore } from "@/store/authencation-store";
import { cn } from "@/lib/utils";
import Image from "next/image";

import { Fragment } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BookmarkCheck, CalendarCheck, LogOut, UserRound } from "lucide-react";
const Account = () => {
  const { isAuthenticated, user } = useAuthenticatedStore();
  return (
    <Fragment>
      {isAuthenticated && user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className={cn(
                "w-fit h-full flex items-start justify-center gap-2 p-1  rounded-lg",
                "bg-bg_primary_active cursor-pointer",
                "md:p-2 md:px-3"
              )}
            >
              <div
                className={cn(
                  "w-[2.2rem] h-[2.2rem] border-1 border-yellow_main rounded-full flex items-center justify-center",
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
              <div className="w-auto h-auto flex flex-col items-start justify-center ">
                <div
                  className={cn(
                    " hidden items-center justify-start gap-x-1 text-white font-bold text-small select-none",
                    "lg:flex"
                  )}
                >
                  <span className="capitalize text-white">
                    {user.firstname}
                  </span>
                  <span className="capitalize text-white">{user.lastname}</span>
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
                  "cursor-pointer p-2 py-3",
                  "hover:bg-bg_primary_hover"
                )}
              >
                <Link
                  className="w-full flex items-center justify-start"
                  href={`/account/${user.email}-${user._id}?do=manage-account`}
                >
                  <UserRound className="w-5 h-5 mr-2" />
                  <span> Quản lí tài khoản</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className={cn(
                  "cursor-pointer p-2 py-3",
                  "hover:bg-bg_primary_hover"
                )}
              >
                <Link
                  className="w-full flex items-center justify-start"
                  href={`/account/${user.email}-${user._id}?do=booking`}
                >
                  <CalendarCheck className="w-5 h-5 mr-2" />
                  <span>Đặt chỗ & chuyến đi</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className={cn(
                  "cursor-pointer p-2 py-3",
                  "hover:bg-bg_primary_hover"
                )}
              >
                <Link
                  className="w-full flex items-center justify-start"
                  href={`/account/${user.email}-${user._id} ?do=saved`}
                >
                  <BookmarkCheck className="w-5 h-5 mr-2" />
                  <span>Đã lưu</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className={cn(
                  "cursor-pointer p-2 py-3",
                  "hover:bg-bg_primary_hover"
                )}
              >
                <LogOut className="w-5 h-5 mr-2" />
                <span>Đăng xuất</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className=" flex items-center justify-center">
          <Link href={"/sign-in"}>
            <Button className="ml-4 text-small">Đăng nhập</Button>
          </Link>
        </div>
      )}
    </Fragment>
  );
};

export default Account;
