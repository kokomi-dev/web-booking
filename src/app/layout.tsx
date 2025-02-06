import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "react-slideshow-image/dist/styles.css";
import "../styles/globals.css";
import "../styles/css/toast.css";
import Chat from "@/components/components/chat";
import PingServer from "@/services/connect-server/keep-connect-server";
import { ClerkLoading, ClerkProvider } from "@clerk/nextjs";
import { viVN } from "@clerk/localizations";
import Head from "next/head";
import { LoadingPage } from "@/components/components/loading";
import { DialogSales } from "@/components/components/dialog-sales";
import QueryProvider from "@/configs/providerQuery";
const roboto = Roboto({
  subsets: ["vietnamese"],
  weight: ["100", "300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "KoKo Travel",
  description:
    "Trang web giới thiệu, đặt chỗ, xem trước về các địa điểm du lịch, nơi nghỉ dưỡng trên khắp Việt Nam",
  icons: "/favicon.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <ClerkProvider localization={viVN}>
        <html lang="en" suppressHydrationWarning style={{}}>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover"
            />
          </Head>
          <body suppressHydrationWarning={true}>
            <ClerkLoading>
              <LoadingPage />
            </ClerkLoading>
            {/* <DialogSales /> */}
            {children}
            <ToastContainer autoClose={1500} />
            <Chat />
            <PingServer />
          </body>
        </html>
      </ClerkProvider>
    </QueryProvider>
  );
}
