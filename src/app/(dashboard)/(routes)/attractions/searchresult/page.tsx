"use client";
import React from "react";
import { useSearchParams } from "next/navigation";

import Search from "@/components/dashboard/home/search";
import { TourData } from "@/api/api-tour";
import { searchResult } from "@/api/api-tour";
import ShowResult from "./show-resutl";
import { cn } from "@/lib/utils";

const fechData = async (search: string | null): Promise<TourData[]> => {
  const data = await searchResult({ searchParam: search || "" });
  return data.data as TourData[];
};

const SearchResultPage = async () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("address");
  const data = await fechData(search);
  return (
    <div className={cn("search_result w-full h-full ")}>
      <ShowResult data={data} />
    </div>
  );
};

export default SearchResultPage;
