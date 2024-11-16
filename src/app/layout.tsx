import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "react-slideshow-image/dist/styles.css";
import "./globals.css";
import "../assets/css/toast.css";
import { Fragment } from "react";
import HeaderDashboard from "@/components/layouts/default-layout/header-dashboard";
import FooterDashboard from "@/components/layouts/default-layout/footer-dashboard";

const roboto = Roboto({
  subsets: ["vietnamese"],
  weight: ["100", "300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "KoKo Travel",
  description: "",
  icons: "/favicon.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning style={{}}>
      <body suppressHydrationWarning={true}>
        <Fragment>
          <header className="w-full h-full z-[20]">
            <HeaderDashboard />
          </header>
          <main className="w-full h-full container-padding  py-4">
            {children}
          </main>
          <footer>
            <FooterDashboard />
          </footer>
        </Fragment>
        <ToastContainer autoClose={1500} />
      </body>
    </html>
  );
}
