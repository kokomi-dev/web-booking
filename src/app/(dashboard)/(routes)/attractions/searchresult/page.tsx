"use client";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { useSearchParams } from "next/navigation";
import { searchResult } from "@/api/api-tour";
import ShowResult from "@/components/dashboard/home/show-resutl";
import { cn } from "@/lib/utils";
import Loading from "../loading";
import { TourData } from "@/constants";

const SearchResultPage = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("address");

  const [data, setData] = useState<TourData[]>([]);
  useEffect(() => {
    const fetcher = async () => {
      const data = await searchResult({ searchParam: search || "" });
      return setData(data.data);
    };
    fetcher();
  }, [search]);

  // const { data, error } = useSWR(search, fetcher);

  // if (error) return <NotFoundPage />;
  // if (!data) return <Loading />;
  return (
    <div className={cn("search_result w-full h-full ")}>
      <ShowResult data={data} />
    </div>
  );
};

export default SearchResultPage;
