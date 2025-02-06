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
        "w-full h-[70px] lg:h-full container-padding bg-bg_primary_main z-[15]  flex flex-col items-center justify-start gap-2 py-2"
      )}
    >
      <div
        className={cn(
          "w-full h-full font-medium text-white text-normal  flex items-center justify-between transition-all duration-300",
          " lg:text-normal lg:h-auto lg:block  "
        )}
      >
        <div className="w-full font-bold  flex items-center justify-between text-white  ">
          <Link href="/home" className="text-medium lg:text-large font-mono">
            KoKoTravel
          </Link>
          <div className="flex items-center justify-center gap-2">
            <div
              className={cn(
                "hidden p-2 rounded-lg transition-all duration-300",
                "md:block hover:bg-bg_primary_active hover:cursor-pointer"
              )}
              onClick={() => {
                router.push("/home");
              }}
            >
              <h3 className={cn("text-small font-medium  ")}>
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
