import FooterAuth from "@/components/layouts/auth/footer-auth";
import HeaderAuth from "@/components/layouts/auth/header-auth";
import { AuthLayoutProp } from "@/types/auth";
import React from "react";

export default function AuthLayout({ children }: AuthLayoutProp) {
  return (
    <div>
      <header>
        <HeaderAuth />
      </header>
      <main className="w-full h-full container-padding py-4 flex items-center justify-center">
        <div className="w-[100%]  b-red-400">{children}</div>
      </main>
      <footer>
        <FooterAuth />
      </footer>
    </div>
  );
}
