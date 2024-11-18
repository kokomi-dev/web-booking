import FooterAccount from "@/components/layouts/account/footer-account";
import HeaderAccount from "@/components/layouts/account/header-account";
import { AuthLayoutProp } from "@/utils/types/auth";
import React from "react";

const AccountLayout: React.FC<AuthLayoutProp> = ({ children }) => {
  return (
    <div>
      <header>
        <HeaderAccount />
      </header>
      <main className="w-full h-full container-padding py-4 flex items-center justify-center">
        {children}
      </main>
      <footer>
        <FooterAccount />
      </footer>
    </div>
  );
};

export default AccountLayout;
