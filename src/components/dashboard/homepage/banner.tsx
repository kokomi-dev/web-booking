import Image from "next/image";
import React from "react";
import img1 from "@/assets/images/banner-home-7.jpg";
import img2 from "@/assets/images/banner-home-2.jpg";
import img3 from "@/assets/images/banner-home-4.jpg";
import img4 from "@/assets/images/banner-home-5.jpg";
import img5 from "@/assets/images/banner-home-6.jpg";
import img6 from "@/assets/images/banner2.jpg";
import img7 from "@/assets/images/banner.jpg";
import Link from "next/link";

const BannerHome = () => {
  return (
    <div className="container xl:px-0 relative overflow-hidden">
      <div className="pb-80 pt-3 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
        <div className="relative  sm:static ">
          <div className="sm:max-w-lg">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-black sm:text-6xl ">
              Khám phá Việt Nam với chúng tôi!
            </h1>
            <p className="mt-4 text-base md:text-xl text-black_sub">
              Hứa hẹn mang đến sự trải nghiệm, chất lượng dịch vụ, phục vụ cho
              mỗi trải nghiệm của bạn đáng giá hơn
            </p>
          </div>
          <div>
            <div className="mt-10">
              {/* ảnh */}
              <div
                aria-hidden="true"
                className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
              >
                <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                  <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                        <Image
                          width={176}
                          height={256}
                          alt=""
                          src={img1}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <Image
                          width={176}
                          height={256}
                          alt=""
                          src={img2}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <Image
                          width={176}
                          height={256}
                          alt=""
                          src={img3}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <Image
                          width={176}
                          height={256}
                          alt=""
                          src={img4}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <Image
                          width={176}
                          height={256}
                          alt=""
                          src={img5}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <Image
                          width={176}
                          height={256}
                          alt=""
                          src={img6}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <Image
                          width={176}
                          height={256}
                          alt=""
                          src={img7}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                href="#"
                className="inline-block text-sm sm:text-base md:text-lg rounded-md border border-transparent bg-blue_sub px-8 py-3 text-center font-medium text-white hover:bg-blue_active"
              >
                Khám phá ngay
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerHome;
