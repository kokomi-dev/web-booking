import React from "react";
import { Metadata } from "next";

import MySetingPage from "./page-view";

export const metadata: Metadata = {
  title: "Quản lí tài khoản - KoKoTravel",
};
const page = () => {
  return <MySetingPage />;
};

export default page;
