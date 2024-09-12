"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function HeaderAuth() {
  const pathname = usePathname();
  return (
    <div className="w-full h-auto ">
      <div
        className={cn(
          "w-full h-[64px] sticky top-0 z-[15] flex items-center justify-between p-3 px-10 font-[400] text-accent text-[1.2rem] bg-red-400",
          "lg:px-20 text-[1.2rem] h-[60px]"
        )}
      >
        {/* logo */}
        <Link href="/attractions" className=" font-bold font-mono relative">
          KoKo Travel
        </Link>
        {/* navigation */}
        {/* toogle themes and button login ( register) */}
        <div className="flex items-center justify-center">
          {pathname.includes("sign-in") ? (
            <Link href={"/sign-up"}>
              <Button className="ml-4">Đăng ký</Button>
            </Link>
          ) : (
            <Link href={"/sign-in"}>
              <Button className="ml-4">Đăng nhập</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
