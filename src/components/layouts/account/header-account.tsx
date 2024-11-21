"use client";
import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useAuthenticatedStore } from "@/store/authencation-store";
import Account from "@/components/layouts/account/account";

type Props = {};

export default function HeaderAccount({}: Props) {
  const { isAuthenticated, user } = useAuthenticatedStore();
  return (
    <div>
      <div
        className={cn(
          "w-full h-full container-padding bg-bg_primary_main z-[15]  flex flex-col items-start justify-start gap-2 py-2"
        )}
      >
        <div
          className={cn(
            "w-full font-medium text-white text-normal  flex items-center justify-between transition-all duration-300",
            " lg:text-normal lg:h-auto lg:block  "
          )}
        >
          <div className="w-full font-bold  flex items-center justify-between text-white  ">
            <Link href="/home" className="text-large e font-mono">
              KoKoTravel.com
            </Link>
            {isAuthenticated && user && (
              <div>
                <Account />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
