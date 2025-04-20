import { Fragment } from "react";
import HeaderDashboard from "@/components/layouts/default-layout/header-dashboard";
import FooterDashboard from "@/components/layouts/default-layout/footer-dashboard";
import Search from "@/components/components/search/search";
import WrapperContacts from "@/components/components/wraper-contacts";

export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Fragment>
      <header className="w-full h-full z-[50]">
        <HeaderDashboard />
      </header>
      <main className="w-full h-full">
        <div className="container-padding-y">{children}</div>
        <WrapperContacts />
      </main>
      <footer>
        <FooterDashboard />
      </footer>
    </Fragment>
  );
}
