import React from "react";
import { Metadata } from "next";

import ManageBooking from "./page-view";

export const metadata: Metadata = {
  title: "Đã đặt - KoKoTravel",
};
const page = () => {
  return <ManageBooking />;
};

export default page;
