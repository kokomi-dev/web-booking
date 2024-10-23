import FooterAccount from "@/components/layouts/account/footer-account";
import HeaderAccount from "@/components/layouts/account/header-account";
import React, { Fragment } from "react";

interface IAccount {
  children: React.ReactNode;
}
const AccountLayout: React.FC<IAccount> = ({ children }) => {
  return (
    <Fragment>
      <HeaderAccount />
      <main className="container-padding">{children}</main>
      <FooterAccount />
    </Fragment>
  );
};

export default AccountLayout;
