"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { searchResult } from "@/api/api-attractions";
import ShowResult from "@/components/dashboard/home/show-resutl";
import { cn } from "@/lib/utils";
import { AttractionData } from "@/constants";
import Loading from "./loading";

const SearchResultPage = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("address");

  const [data, setData] = useState<AttractionData[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetcher = async () => {
      setLoading(true);
      try {
        const data = await searchResult({ searchParam: search || "" });
        return setData(data.data);
      } catch (error) {
        throw new Error();
      } finally {
        setLoading(false);
      }
    };
    fetcher();
  }, [search]);

  if (loading) return <Loading />;
  return (
    <div className={cn("search_result w-full h-full ")}>
      <ShowResult data={data} search={search} />
    </div>
  );
};

export default SearchResultPage;
