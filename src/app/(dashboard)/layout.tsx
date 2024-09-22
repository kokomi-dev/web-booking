import { Fragment } from "react";

import HeaderDashboard from "@/components/layouts/default-layout/header-dashboard";
import FooterDashboard from "@/components/layouts/default-layout/footer-dashboard";

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Fragment>
      <header className="w-full h-full z-[20]">
        <HeaderDashboard />
      </header>
      <main className="w-full h-full container-padding  py-4">{children}</main>
      <footer>
        <FooterDashboard />
      </footer>
    </Fragment>
  );
};
export default RootLayout;
