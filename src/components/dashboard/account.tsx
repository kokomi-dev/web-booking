"use client";
import Link from "next/link";

import { Button } from "../ui/button";
import { useAuthenticatedStore } from "@/store/authencation-store";
import { cn } from "@/lib/utils";
import Image from "next/image";

const Account = () => {
  const { isAuthenticated, user } = useAuthenticatedStore();

  return (
    <div className="w-fit">
      {isAuthenticated && user ? (
        <div
          className={cn(
            "w-fit flex items-start justify-center gap-2 p-1  rounded-lg",
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
          <div
            className={cn(
              "mt-2 hidden items-center justify-start gap-1 text-white font-bold text-small select-none",
              "lg:flex"
            )}
          >
            <span className="capitalize text-white">{user.firstname}</span>
            <span className="capitalize text-white">{user.lastname}</span>
          </div>
        </div>
      ) : (
        <div className=" flex items-center justify-center">
          <Link href={"/sign-in"}>
            <Button className="ml-4 text-small">Đăng nhập</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Account;
