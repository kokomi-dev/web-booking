import FooterAuth from "@/components/layouts/auth/footer-auth";
import HeaderAuth from "@/components/layouts/auth/header-auth";
import { cn } from "@/lib/utils";
import React from "react";

interface AuthLayoutProps {
  children?: React.ReactNode;
}
const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="w-full h-screen  flex flex-col items-center justify-start ">
      <HeaderAuth />
      <div
        className={cn(
          "w-[90%] h-full flex flex-col items-center justify-center py-10",
          "md:w-[70%]",
          "lg:my-20 lg:w-[40%] lg:mt-[2rem] "
        )}
      >
        {children}
      </div>
      <FooterAuth />
    </div>
  );
};

export default AuthLayout;
