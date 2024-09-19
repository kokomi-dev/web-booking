import { Fragment } from "react";

import HeaderDashboard from "@/components/layouts/default-layout/header-dashboard";
import FooterDashboard from "@/components/layouts/default-layout/footer-dashboard";
import { cn } from "@/lib/utils";

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
      <main className={cn("w-full h-full p-4 py-6", "md:px-24", "lg:px-36 ")}>
        {children}
      </main>
      <footer>
        <FooterDashboard />
      </footer>
    </Fragment>
  );
};
export default RootLayout;
