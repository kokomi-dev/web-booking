"use client";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import {
  ChevronUp,
  MessageCircle,
  MessageCircleMore,
  PhoneCall,
} from "lucide-react"; // Icons from lucide-react
import { cn } from "@/utils/constants"; // Utility function for conditional classNames
import Link from "next/link";
import zaloIcon from "@/assets/img-social/Icon_of_Zalo.svg.webp"; // Zalo icon
import messIcon from "@/assets/img-social/Facebook_Messenger_logo_2025.svg.png"; // Zalo icon
import Image from "next/image";

const WrapperContacts = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Automatically expand on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsExpanded(true); // Automatically expand on desktop
      } else {
        setIsExpanded(false); // Collapse on mobile
      }
    };

    handleResize(); // Check on initial render
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-50 md:bottom-10 md:right-10">
      {/* Toggle Button */}

      {/* Contact Icons */}
      <div
        className={cn(
          "flex flex-col items-center space-y-3 transition-all duration-300",
          isExpanded
            ? "opacity-100 -translate-y-2 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        )}
      >
        {/* Zalo Icon */}
        <Link
          href="https://zalo.me/0961563714"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-12 h-12 bg-white text-white rounded-full shadow-lg hover:bg-blue-600 transition-all"
        >
          <Image
            width={50}
            height={50}
            alt="img__social__zalo"
            src={zaloIcon}
            className="object-cover size-8"
          />
        </Link>

        {/* Messenger Icon */}
        <Link
          href="https://m.me/nguyen.the.an.389568"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-12 h-12 bg-white  rounded-full shadow-lg hover:bg-blue-500 transition-all"
        >
          <Image
            width={50}
            height={50}
            alt="img__social__messenger"
            className="object-cover size-8"
            src={messIcon}
          />
        </Link>

        {/* Contact Page Icon */}
        <Link
          href="/contact"
          className="flex items-center justify-center w-12 h-12 bg-white  rounded-full shadow-lg hover:bg-green-600 transition-all"
        >
          <MessageCircleMore className="w-6 h-6 text-blue" />
        </Link>
      </div>
      <Button
        className="rounded-full p-3 w-12 h-12 shadow-lg bg-blue text-white hover:bg-green-600 transition-all"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <ChevronUp
          className={cn(
            "size-8 transition-transform duration-300 text-white",
            isExpanded ? "rotate-180" : "rotate-0"
          )}
        />
      </Button>
    </div>
  );
};

export default WrapperContacts;
