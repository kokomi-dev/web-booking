import React from "react";
import { Metadata } from "next";

import SearchResultPage from "./page-view";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}): Promise<Metadata> {
  const address = searchParams.address || "Tìm kiếm";
  return {
    title: `${decodeURIComponent(address)} - Địa điểm du lịch`,
  };
}
const page = () => {
  return <SearchResultPage />;
};

export default page;
