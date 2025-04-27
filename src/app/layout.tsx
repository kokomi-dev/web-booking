import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import { ToastContainer } from "react-toastify";

import { LoadingPage } from "@/components/components/loading";
import QueryProvider from "@/configs/providerQuery";
import AuthMiddleWare from "@/utils/middleware/auth-middleware";
import { viVN } from "@clerk/localizations";
import { ClerkLoading, ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/next";
import "react-toastify/dist/ReactToastify.css";
import "../styles/css/toast.css";
import "../styles/globals.css";

const roboto = Be_Vietnam_Pro({
  subsets: ["vietnamese"],
  weight: ["200", "300", "400", "500", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "KoKo Travel",
  description:
    "Trang web giới thiệu, đặt chỗ, xem trước về các địa điểm du lịch, nơi nghỉ dưỡng trên khắp Việt Nam",
  icons: "/favicon.png",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        <meta
          name="viewport"
          content="width=device-width,height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover"
        />
      </head>
      <body
        translate="no"
        className={roboto.className}
        cz-shortcut-listen="false"
      >
        <QueryProvider>
          <ClerkProvider localization={viVN}>
            <AuthMiddleWare />
            <ClerkLoading>
              <LoadingPage />
            </ClerkLoading>
            {children}
            <Analytics />
          </ClerkProvider>
          <ToastContainer
            autoClose={2000}
            position="top-left"
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </QueryProvider>
      </body>
    </html>
  );
}
