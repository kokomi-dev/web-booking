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
      <header className="w-full h-full z-[50] sticky top-0 lg:relative">
        <HeaderDashboard />
      </header>
      <main className="w-full h-full">
        <Search />
        <div className="container-padding-y">{children}</div>
      </main>
      <footer>
        <FooterDashboard />
      </footer>
    </Fragment>
  );
}
