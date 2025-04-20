"use client";

import { BadgeHelp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import iconLogo from "@/assets/icons/favicon.png";
import bgStep from "@/assets/images/bg-step.webp";
import coVietNam from "@/assets/images/co-vietnam.png";
import line from "@/assets/images/layer-2.png";
import vietnammap from "@/assets/svg/vietnam_map.svg";
import Search from "@/components/components/search/search";
import Account from "@/components/layouts/account/account";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/utils/constants";
import { useEffect, useMemo, useState } from "react";
import MobileSidebar from "../mobile-sidebar";
import Navigation from "../navigation";

const HeaderDashboard = () => {
  const pathname = usePathname();
  const router = useRouter();

  const shouldShowBackground = useMemo(() => {
    return (
      pathname === "/home" ||
      pathname === "/attractions" ||
      pathname === "/hotels" ||
      (pathname.startsWith("/hotels/") && !pathname.includes("booking")) ||
      (pathname.startsWith("/attractions/") && !pathname.includes("booking"))
    );
  }, [pathname]);
  const containerHeight = shouldShowBackground
    ? `${
        pathname === "/home"
          ? "h-[95vh] max-h-[900px]"
          : "h-[80vh] max-h-[600px]"
      }`
    : "h-auto";

  return (
    <div className={cn("w-full relative py-3", containerHeight)}>
      {/* Background SVG Layer */}
      <div className="absolute inset-0 -z-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="0 0 200 200"
          preserveAspectRatio="xMidYMid slice"
        >
          <rect fill="#006CE4" width="200" height="200" />
          <defs>
            <linearGradient id="a" x1="88" y1="88" x2="0" y2="0">
              <stop offset="0" stopColor="#002276" />
              <stop offset="1" stopColor="#00348e" />
            </linearGradient>
            <linearGradient id="b" x1="75" y1="76" x2="168" y2="160">
              <stop offset="0" stopColor="#868686" />
              <stop offset="0.09" stopColor="#ababab" />
              <stop offset="0.18" stopColor="#c4c4c4" />
              <stop offset="0.31" stopColor="#d7d7d7" />
              <stop offset="0.44" stopColor="#e5e5e5" />
              <stop offset="0.59" stopColor="#f1f1f1" />
              <stop offset="0.75" stopColor="#f9f9f9" />
              <stop offset="1" stopColor="#FFFFFF" />
            </linearGradient>
            <filter id="c" x="0" y="0" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="12" />
            </filter>
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow
                dx="0"
                dy="0"
                stdDeviation="5"
                floodColor="#ffffff"
                floodOpacity="0.5"
              />
            </filter>
          </defs>

          <polygon fill="url(#a)" points="0 174 0 0 174 0" />
          <path
            fill="#000"
            fillOpacity=".5"
            filter="url(#c)"
            d="M121.8 174C59.2 153.1 0 174 0 174s63.5-73.8 87-94c24.4-20.9 87-80 87-80S107.9 104.4 121.8 174z"
          />
          <path
            fill="url(#b)"
            d="M142.7 142.7C59.2 142.7 0 174 0 174s42-66.3 74.9-99.3S174 0 174 0S142.7 62.6 142.7 142.7z"
          />
          <path
            fill="#0c2975"
            fillOpacity="0.3"
            d="M0,100 C30,95 60,110 90,100 C120,90 150,95 180,105 C200,110 200,120 200,130 L200,200 L0,200 Z"
          />
          <path
            fill="#1e3a8a"
            fillOpacity="0.2"
            d="M0,150 C40,140 80,160 120,150 C160,140 200,160 200,150 L200,200 L0,200 Z"
          />
          <path
            fill="#999"
            fillOpacity="0.1"
            d="M0,180 C20,175 40,185 60,180 C80,175 100,185 120,180 C140,175 160,185 180,180 C200,175 200,185 200,190 L200,200 L0,200 Z"
          />
        </svg>
      </div>

      {/* Bản đồ Việt Nam */}
      {shouldShowBackground && (
        <div className="absolute right-[10%] top-[10%] w-[400px] max-w-full ]">
          <Image
            src={vietnammap}
            alt="Bản đồ Việt Nam"
            width={400}
            height={400}
            className="object-contain"
            priority
          />
        </div>
      )}
      {shouldShowBackground && (
        <div className="absolute right-[0%] top-[50%] w-full max-w-full ]">
          <Image
            src={bgStep}
            alt="Bản đồ Việt Nam"
            width={400}
            height={400}
            className="object-contain w-full h-full"
            priority
          />
        </div>
      )}
      {shouldShowBackground && (
        <div className="absolute right-[18%] top-[22%] w-[240px] max-w-full">
          <Image
            src={line}
            alt="Bản đồ Việt Nam"
            width={400}
            height={400}
            className="object-contain w-full h-full"
            priority
          />
        </div>
      )}

      {/* Main Header Content */}
      <div
        className={cn("relative w-full h-full container xl:px-0 flex flex-col")}
      >
        {/* Slogan */}

        {pathname === "/home" && (
          <div className="w-full hidden md:block xl:px-0 absolute top-[20%] md:top-[30%] left-0 z-20">
            <div className="container flex flex-col items-start justify-start space-y-4">
              {/* Slogan chính - Phiên bản mới */}
              <div className="text-start font-bold text-white tracking-wide leading-tight relative">
                {/* SVG Slogan */}
                <svg
                  width="100%"
                  height="160"
                  viewBox="0 0 800 320"
                  xmlns="http://www.w3.org/2000/svg"
                  className="max-w-md"
                >
                  {/* Gradient Definitions */}
                  <defs>
                    <linearGradient
                      id="gradientUyTin"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#00c6ff" />
                    </linearGradient>
                    <linearGradient
                      id="gradientChatLuong"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#ec4899" />
                      <stop offset="100%" stopColor="#f43f5e" />
                    </linearGradient>
                    <linearGradient
                      id="gradientUuDai"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#fbbf24" />
                      <stop offset="100%" stopColor="#f59e0b" />
                    </linearGradient>
                    <filter
                      id="glow"
                      x="-20%"
                      y="-20%"
                      width="140%"
                      height="140%"
                    >
                      <feGaussianBlur stdDeviation="4" result="blur" />
                      <feComposite
                        in="SourceGraphic"
                        in2="blur"
                        operator="over"
                      />
                    </filter>
                    <filter
                      id="blur-bg"
                      x="-10%"
                      y="-10%"
                      width="120%"
                      height="120%"
                    >
                      <feGaussianBlur stdDeviation="5" result="blur" />
                    </filter>
                  </defs>

                  {/* Background Elements */}
                  <rect
                    x="20"
                    y="20"
                    width="760"
                    height="280"
                    rx="15"
                    fill="rgba(255,255,255,0.03)"
                  />
                  <path
                    d="M60,60 Q400,20 740,60 Q700,150 740,240 Q400,280 60,240 Q100,150 60,60"
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="2"
                  />

                  {/* UY TIN Text Group */}
                  <g transform="translate(100, 80)">
                    {/* Line Accent */}
                    <line
                      x1="0"
                      y1="0"
                      x2="40"
                      y2="0"
                      stroke="url(#gradientUyTin)"
                      strokeWidth="4"
                    />

                    {/* Text */}
                    <text
                      x="50"
                      y="15"
                      fontFamily="'Montserrat', sans-serif"
                      fontSize="45"
                      fontWeight="700"
                      fill="white"
                      filter="url(#glow)"
                    >
                      UY TÍN
                    </text>

                    {/* Accent Shape */}
                    <circle
                      cx="340"
                      cy="5"
                      r="8"
                      fill="url(#gradientUyTin)"
                      opacity="0.8"
                    />
                  </g>

                  {/* CHẤT LƯỢNG Text Group with Backdrop Blur */}
                  <g transform="translate(130, 160)">
                    {/* Backdrop blur and black background */}
                    <rect
                      x="-20"
                      y="-30"
                      width="440"
                      height="60"
                      rx="10"
                      fill="rgba(0,0,0,0.1)"
                      filter="url(#blur-bg)"
                    />

                    {/* Line Accent */}
                    <line
                      x1="0"
                      y1="0"
                      x2="40"
                      y2="0"
                      stroke="url(#gradientChatLuong)"
                      strokeWidth="4"
                    />

                    {/* Text */}
                    <text
                      x="50"
                      y="15"
                      fontFamily="'Montserrat', sans-serif"
                      fontSize="45"
                      fontWeight="700"
                      fill="white"
                      filter="url(#glow)"
                    >
                      CHẤT LƯỢNG
                    </text>

                    {/* Accent Shape */}
                    <circle
                      cx="370"
                      cy="5"
                      r="8"
                      fill="url(#gradientChatLuong)"
                      opacity="0.8"
                    />
                  </g>

                  {/* GIÁ ƯU ĐÃI Text Group */}
                  <g transform="translate(100, 240)">
                    {/* Line Accent */}
                    <line
                      x1="0"
                      y1="0"
                      x2="40"
                      y2="0"
                      stroke="url(#gradientUuDai)"
                      strokeWidth="4"
                    />

                    {/* Text */}
                    <text
                      x="50"
                      y="15"
                      fontFamily="'Montserrat', sans-serif"
                      fontSize="45"
                      fontWeight="700"
                      fill="white"
                      filter="url(#glow)"
                    >
                      GIÁ ƯU ĐÃI
                    </text>

                    {/* Accent Shape */}
                    <circle
                      cx="340"
                      cy="5"
                      r="8"
                      fill="url(#gradientUuDai)"
                      opacity="0.8"
                    />
                  </g>

                  {/* Animated Elements */}
                  <g opacity="0.6">
                    <circle cx="50" cy="40" r="5" fill="#ffffff">
                      <animate
                        attributeName="cy"
                        values="40;60;40"
                        dur="3s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle cx="750" cy="260" r="5" fill="#ffffff">
                      <animate
                        attributeName="cy"
                        values="260;240;260"
                        dur="4s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </g>
                </svg>
              </div>
              {/* Call to action */}
              <div className="flex items-center justify-start gap-x-4 ml-6">
                <div className="flex items-center justify-start gap-x-2">
                  {[0, 1, 2, 3, 4].map((index) => (
                    <svg
                      key={index}
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="transition-transform duration-300 hover:scale-110"
                    >
                      <defs>
                        <linearGradient
                          id={`starGradient-${index}`}
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop offset="0%" stopColor="#FFD700" />
                          <stop offset="50%" stopColor="#FBBF24" />
                          <stop offset="100%" stopColor="#F59E0B" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                        fill={`url(#starGradient-${index})`}
                        stroke="#FCD34D"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="12"
                        fill={`url(#starGradient-${index})`}
                        opacity={
                          index === Math.floor(index / 20) ? "0.15" : "0"
                        }
                        className="animate-pulse"
                      />
                    </svg>
                  ))}
                </div>
                <Link
                  href="#trending_shared"
                  className="px-6 py-3 text-nowrap bg-yellow text-black text-sm font-medium rounded-lg shadow-md hover:bg-yellow-500 transition-all duration-300"
                >
                  Bắt đầu khám phá
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Top Bar */}
        <div
          className={cn(
            "w-full font-medium text-white text-base flex items-center justify-between py-1"
          )}
        >
          {/* Logo */}
          {/* Logo tối ưu hóa */}
          <Link
            href="/home"
            className="text-lg md:text-2xl font-bold relative z-10 hover:text-blue-200 flex items-center justify-start gap-x-2 group"
          >
            <Image
              alt="icon__logo__kokotravel"
              width={50}
              height={50}
              priority
              src={iconLogo.src}
              className="size-10"
              quality={100}
            />
            <div className="flex flex-col items-start leading-none">
              <span className="font-sans font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
                KoKo
              </span>
              <span className="text-sm text-blue-100 font-medium tracking-wider">
                Travel
              </span>
            </div>
          </Link>

          {/* Right side icons */}
          <div className="flex items-center gap-x-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Image
                    alt="co-viet nam"
                    width={40}
                    height={40}
                    src={coVietNam}
                    className="rounded-full size-8 border border-white/30"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Việt Nam</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {/* CTA */}
            <div
              className={cn(
                "hidden p-2 rounded-lg transition-all duration-300",
                "lg:block hover:bg-blue_active hover:cursor-pointer"
              )}
            >
              <span
                onClick={() =>
                  router.push(process.env.NEXT_PUBLIC_HOST_ADMIN || "")
                }
                className={cn(
                  "text-sm font-medium",
                  pathname.includes("attractions") && "hidden",
                  pathname.includes("contact") && "hidden",
                  pathname.includes("booking") && "hidden",
                  pathname.includes("hotels") && "hidden",
                  pathname.includes("content") && "hidden"
                )}
              >
                Hợp tác doanh nghiệp
              </span>
            </div>

            {/* Contact Tooltip */}
            <HoverCard>
              <HoverCardTrigger>
                <BadgeHelp
                  onClick={() => router.push("/contact")}
                  className="size__icon-small hidden lg:block hover:cursor-pointer hover:text-blue-200 transition-colors"
                />
              </HoverCardTrigger>
              <HoverCardContent
                align="end"
                className="bg-black text-white border-none p-1 px-2 w-full shadow-2xl z-10"
              >
                <Link href="/contact" className="text-xs font-normal">
                  Liên hệ tư vấn
                </Link>
              </HoverCardContent>
            </HoverCard>

            <Account />
            <MobileSidebar />
          </div>
        </div>

        <Navigation />
      </div>

      {/* Search Box */}
      <div
        className={cn(
          "w-full absolute left-1/2 -translate-x-1/2 z-10",
          pathname === "/home" ? "bottom-[10%]" : "bottom-[12%]"
        )}
      >
        <Search />
      </div>
    </div>
  );
};

export default HeaderDashboard;
