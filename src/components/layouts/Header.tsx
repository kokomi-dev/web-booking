import React from "react";
import Nav from "./Nav";
import { Button } from "../ui/button";
import Link from "next/link";
export default function Header() {
  return (
    <div className="w-full h-full">
      <h1 className="text-center font-bold text-[1.8rem] py-2 text-black">
        Trải nhiệm là cuộc sống
      </h1>
      <div className="w-full h-[64px] sticky top-0 z-[15] flex items-center justify-between p-3 px-20 font-[400] text-accent text-[1.2rem] bg-red-400 ">
        {/* logo */}
        <div className=" font-bold font-mono relative">
          KoKo Travel
          <div className="absolute bottom-[-5px] right-[-25px] bg-red  w-[25px] h-[25px]  bg-red-400 rounded-full z-[5]"></div>
        </div>
        {/* navigation */}
        <Nav />
        {/* toogle themes and button login ( register) */}
        <div className="flex items-center justify-center">
          <Link href={"/login"}>
            <Button className="ml-4">Đăng nhập</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
