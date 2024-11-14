import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ToastContainer } from "react-toastify";
import { redirect } from "next/navigation";

import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import "../assets/css/toast.css";

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
  // redirect to /attractions
  if (typeof window !== "undefined" && window.location.pathname === "/") {
    redirect("/attractions");
  }
  return (
    <html lang="en" suppressHydrationWarning style={{}}>
      <body suppressHydrationWarning={true}>
        {children}
        <ToastContainer autoClose={1500} />
      </body>
    </html>
  );
}
