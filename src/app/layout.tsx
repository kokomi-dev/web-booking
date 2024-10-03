import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./globals.css";

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
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
