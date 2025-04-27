import WrapperContacts from "@/components/components/wraper-contacts";
import FooterDashboard from "@/components/layouts/default-layout/footer-dashboard";
import HeaderDashboard from "@/components/layouts/default-layout/header-dashboard";
import { Fragment } from "react";

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
