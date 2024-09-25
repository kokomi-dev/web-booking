"use client";
import React, { useEffect } from "react";

import FooterAuth from "@/components/layouts/auth/footer-auth";
import HeaderAuth from "@/components/layouts/auth/header-auth";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface AuthLayoutProps {
  children?: React.ReactNode;
}
const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const route = useRouter();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      return route.replace("/attractions");
    }
  }, []);
  return (
    <div className="w-full h-screen  flex flex-col items-center justify-start ">
      <HeaderAuth />
      <div
        className={cn(
          "w-[90%] h-full container-padding flex flex-col items-center justify-center py-10",
          "md:w-[60%]",
          "lg:w-[50%]"
        )}
      >
        {children}
      </div>
      <FooterAuth />
    </div>
  );
};

export default AuthLayout;
