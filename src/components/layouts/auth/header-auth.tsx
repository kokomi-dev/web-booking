"use client";
import { cn } from "@/utils/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HeaderAuth() {
  const pathname = usePathname();

  return (
    <div>
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
            <Link href="/home" className="text-medium lg:text-large  font-mono">
              KoKoTravel
            </Link>
            {pathname === "/sign-in" ? (
              <Link
                href="/sign-up"
                className="bg-bg_primary_active p-2 rounded-8 text-white text-small font-semibold"
              >
                Đăng ký
              </Link>
            ) : (
              <Link
                href="/sign-in"
                className="bg-bg_primary_active p-2 rounded-8 text-white text-small font-semibold"
              >
                Đăng nhập
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
