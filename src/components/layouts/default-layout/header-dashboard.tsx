"use client";

import { BadgeHelp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import animation from "@/assets/animations/animation-year.json";
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
import { useMemo } from "react";
import MobileSidebar from "../mobile-sidebar";
import Navigation from "../navigation";
import BgHomePath from "./header/header-bg-home";
import dynamic from "next/dynamic";

const LottiePlayer = dynamic(() => import("lottie-react"), {
  ssr: false,
  loading: () => <div style={{ width: "100%", height: "100%" }} />,
});

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
          ? "h-[95vh] max-h-[760px]"
          : "h-[70vh] max-h-[520px]"
      }`
    : "h-auto";

  return (
    <div className={cn("w-full relative py-3 ", containerHeight)}>
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

      {shouldShowBackground && (
        <>
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
          <div className="absolute right-[0%] top-[50%] w-full max-w-full ]">
            <Image
              src={bgStep}
              alt="img__travel__airplane"
              width={400}
              height={400}
              className="object-contain w-full h-full"
              priority
            />
          </div>
          <div className="absolute right-[18%] top-[22%] w-[240px] max-w-full">
            <Image
              src={line}
              alt="img__line"
              width={400}
              height={400}
              className="object-contain w-full h-full"
              priority
            />
          </div>
        </>
      )}
      {shouldShowBackground && pathname === "/home" && (
        <div
          className={cn(
            "container xl:px-0 w-40 h-40 md:w-48 md:h-48 lg:w-64 lg:h-64 absolute right-5 top-[40%] lg:left-[0%] lg:top-1/2 -translate-y-1/2 z-10"
          )}
        >
          <LottiePlayer animationData={animation} loop={true} />
        </div>
      )}
      {/* Main Header Content */}
      <div
        className={cn("relative w-full h-full container xl:px-0 flex flex-col")}
      >
        {/* Slogan */}
        {shouldShowBackground && pathname === "/home" && <BgHomePath />}

        {/* Top Bar */}
        <div
          className={cn(
            "w-full font-medium text-white text-base flex items-center justify-between py-1"
          )}
        >
          {/* Logo */}
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
