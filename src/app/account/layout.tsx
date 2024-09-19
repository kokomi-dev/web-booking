import HeaderAccount from "@/components/layouts/account/header-account";
import React, { Fragment } from "react";

interface IAccount {
  children: React.ReactNode;
}
const AccountLayout: React.FC<IAccount> = ({ children }) => {
  return (
    <Fragment>
      <header>
        <HeaderAccount />
      </header>
      <div>{children}</div>
    </Fragment>
  );
};

export default AccountLayout;
