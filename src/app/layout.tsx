import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${roboto.className} bg-white `}
        suppressHydrationWarning={true}
      >
        <h1 className="text-center font-semibold text-[1.4rem] py-2 text-black uppercase">
          Trải nhiệm là cuộc sống
        </h1>
        <header className="sticky top-0 z-[20]">
          <Header />
        </header>
        <main className="w-full h-full">{children}</main>
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
