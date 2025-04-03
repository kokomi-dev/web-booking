import Image from "next/image";
import React from "react";
import img1 from "@/assets/images/banner-home-4.jpg";
import img2 from "@/assets/images/banner-home-5.jpg";

export default function GridShape() {
  return (
    <>
      <div className="absolute right-0 top-0 -z-1 w-full max-w-[250px] xl:max-w-[450px]">
        {/* <Image width={540} height={254} src={img1} alt="grid" /> */}
      </div>
      <div className="absolute bottom-0 left-0 -z-1 w-full max-w-[250px] rotate-180 xl:max-w-[450px]">
        {/* <Image width={540} height={254} src={img2} alt="grid" /> */}
      </div>
    </>
  );
}
