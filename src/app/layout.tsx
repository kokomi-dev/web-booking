import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "react-slideshow-image/dist/styles.css";
import "../styles/globals.css";
import "../styles/css/toast.css";
import Chat from "@/components/components/chat";
import PingServer from "@/services/connect-server/keep-connect-server";
import Head from "next/head";
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
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </Head>
      <body suppressHydrationWarning={true}>
        {children}
        <ToastContainer autoClose={1500} />
        <Chat />
        <PingServer />
      </body>
    </html>
  );
}
