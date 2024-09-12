"use client";
import { Fragment, useEffect } from "react";

import HeaderDashboard from "@/components/layouts/default-layout/header-dashboard";
import FooterDashboard from "@/components/layouts/default-layout/footer-dashboard";

import { reqCurrentUser } from "@/api/api-auth";
import { useAuthenticatedStore } from "@/store/authencation-store";
import { cn } from "@/lib/utils";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { setUserLogined, setIsAuthenticated } = useAuthenticatedStore();

  useEffect(() => {
    const getUser = async () => {
      try {
        const fetchData = await reqCurrentUser();
        if (fetchData) {
          setUserLogined(fetchData.user);
          setIsAuthenticated();
        }
      } catch (error) {
        console.error("Lỗi khi gọi API để lấy thông tin người dùng:", error);
      }
    };
    getUser();
  }, []);
  return (
    <Fragment>
      <header className="w-full h-full z-[20]">
        <HeaderDashboard />
      </header>
      <main className={cn("w-full h-full p-4", "lg:px-36 py-6")}>
        {children}
      </main>
      <footer>
        <FooterDashboard />
      </footer>
    </Fragment>
  );
}
