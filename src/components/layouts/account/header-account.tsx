"use client";
import React from "react";
import { cn } from "@/utils/constants";
import Link from "next/link";
import Account from "@/components/layouts/account/account";
import { useRouter } from "next/navigation";

type Props = {};

export default function HeaderAccount({}: Props) {
  const router = useRouter();
  return (
    <div
      className={cn(
        "w-full h-auto bg-blue z-[15]  flex flex-col items-center justify-start gap-2 py-3"
      )}
    >
      <div
        className={cn(
          "w-full h-full container xl:px-0 font-medium text-white text-base  flex items-center justify-between transition-all duration-300",
          " lg:text-base lg:h-auto lg:block  "
        )}
      >
        <div className="w-full font-bold  flex items-center justify-between text-white  ">
          <Link href="/home" className="text-lg lg:text-2xl font-mono">
            KoKoTravel
          </Link>
          <div className="flex items-center justify-center gap-2">
            <div
              className={cn(
                "hidden p-2 rounded-lg transition-all duration-300",
                "md:block hover:bg-blue_active hover:cursor-pointer"
              )}
              onClick={() => {
                router.push("/home");
              }}
            >
              <h3 className={cn("text-sm font-medium  ")}>
                Khám phá với chúng tôi
              </h3>
            </div>
            <Account />
          </div>
        </div>
      </div>
    </div>
  );
}
