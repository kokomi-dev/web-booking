"use client";
import React, { Suspense } from "react";
import Search from "@/components/home/search";
import bannerSearch from "@/assets/images/banner.jpg";
import { useSearchParams } from "next/navigation";
// import ShowResult from "./show-resutl";
import { TourData } from "@/components/types";
import { searchResult } from "@/api/api-tour";

const fechData = async (search: string | null): Promise<TourData[]> => {
  const data = await searchResult({ searchParam: search || "" });
  return data.data as TourData[];
};
const Page = async () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("address");
  const data = await fechData(search);
  return (
    <div className="search_result w-full h-full pb-10">
      <div>
        <Search img={bannerSearch} page="search" currentValue={search} />
      </div>
      <Suspense fallback="loading">
        yêu em
        {/* <ShowResult /> */}
      </Suspense>
    </div>
  );
};

export default Page;
