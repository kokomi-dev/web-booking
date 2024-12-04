import { Fragment } from "react";
import HeaderDashboard from "@/components/layouts/default-layout/header-dashboard";
import FooterDashboard from "@/components/layouts/default-layout/footer-dashboard";
import Search from "@/components/components/search/search";

export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Fragment>
      <header className="w-full h-full z-[50]  sticky top-0 lg:relative">
        <HeaderDashboard />
      </header>
      <main className="w-full h-full">
        <div className="w-full h-full bg-transparent lg:bg-bg_primary_main  container-padding py-2 ">
          <Search />
        </div>
        <div className="container-padding py-4 ">{children}</div>{" "}
      </main>
      <footer>
        <FooterDashboard />
      </footer>
    </Fragment>
  );
}
