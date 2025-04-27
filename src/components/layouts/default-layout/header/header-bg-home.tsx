import Link from "next/link";
import React from "react";

const BgHomePath = () => {
  return (
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
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <filter id="blur-bg" x="-10%" y="-10%" width="120%" height="120%">
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
                  opacity={index === Math.floor(index / 20) ? "0.15" : "0"}
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
  );
};

export default BgHomePath;
