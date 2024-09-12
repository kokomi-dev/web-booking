"use client";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import Search from "@/components/dashboard/home/search";
import bannerSearch from "@/assets/images/banner.jpg";
import { TourData } from "@/api/api-tour";
import { searchResult } from "@/api/api-tour";
import ShowResult from "./show-resutl";
import { cn } from "@/lib/utils";
import Loading from "@/app/loading";
const fechData = async (search: string | null): Promise<TourData[]> => {
  const data = await searchResult({ searchParam: search || "" });
  return data.data as TourData[];
};
const SearchResultPage = async () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("address");
  const data = await fechData(search);
  return (
    <Suspense fallback={<Loading />}>
      <div className={cn("search_result w-full h-full pb-0", "")}>
        <div className="bg-gray-600 relative">
          <Search
            page="attractions"
            currentValue={search}
            variant="search"
            className={cn("absolute top-[-130px]", "lg:top-[-50px]")}
          />
        </div>
        <div className={cn("mt-[8rem]", "lg:mt-20")}>
          <ShowResult data={data} />
        </div>
      </div>
    </Suspense>
  );
};

export default SearchResultPage;
