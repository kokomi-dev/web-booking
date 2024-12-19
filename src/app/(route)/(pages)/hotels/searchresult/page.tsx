import { Metadata } from "next";
import React from "react";
import SearchResultPageHotel from "./page-view";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}): Promise<Metadata> {
  const address = searchParams.address || "Tìm kiếm";
  return {
    title: `${decodeURIComponent(address)} -Tìm nơi lưu trú`,
  };
}
const page = () => {
  return <SearchResultPageHotel />;
};

export default page;
