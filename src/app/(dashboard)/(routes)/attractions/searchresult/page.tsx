"use client";
import React from "react";
import useSWR from "swr";
import { useSearchParams } from "next/navigation";
import { searchResult } from "@/api/api-tour";
import ShowResult from "./show-resutl";
import { cn } from "@/lib/utils";
import Loading from "../loading";
import NotFoundPage from "@/app/(dashboard)/404";

const fetcher = async (search: string | null) => {
  const data = await searchResult({ searchParam: search || "" });
  return data.data;
};

const SearchResultPage = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("address");

  const { data, error } = useSWR(search, fetcher);

  if (error) return <NotFoundPage />;
  if (!data) return <Loading />;

  return (
    <div className={cn("search_result w-full h-full ")}>
      <ShowResult data={data} />
    </div>
  );
};

export default SearchResultPage;
