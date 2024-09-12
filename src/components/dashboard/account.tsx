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
            "w-fit  flex items-start justify-center gap-2 p-2 px-4 rounded-lg",
            "hover:bg-bg_primary_active cursor-pointer"
          )}
        >
          <div className="w-[2.8rem] h-[2.8rem] border-1 border-yellow_main rounded-full flex items-center justify-center">
            <Image
              src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
              width={600}
              height={600}
              alt="avatar-user"
              className="w-[2.75rem] h-[2.75rem] rounded-full object-contain"
            />
          </div>
          <div
            className={cn(
              "mt-2 hidden items-center justify-start gap-1 font-bold text-[0.9rem]",
              "lg:flex"
            )}
          >
            <span className="capitalize">{user.firstname}</span>
            <span className="capitalize">{user.lastname}</span>
          </div>
        </div>
      ) : (
        <div className=" flex items-center justify-center">
          <Link href={"/sign-in"}>
            <Button className="ml-4">Đăng nhập</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Account;
