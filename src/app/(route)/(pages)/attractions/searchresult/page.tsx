"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { searchResult } from "@/api/api-attractions";
import ShowResult from "@/components/dashboard/attraction/show-resutl";
import { cn } from "@/lib/utils";
import { AttractionData } from "@/utils/types";
import { convertToSlug } from "@/utils/constants";

const SearchResultPage = () => {
  const searchParams = useSearchParams();
  const nameValue = searchParams.get("address");
  const search = nameValue && convertToSlug(nameValue);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<AttractionData[]>([]);
  useEffect(() => {
    setIsLoading(true);
    const fetcher = async () => {
      try {
        const data = await searchResult({ searchParam: search || "" });
        return setData(data.data);
      } catch (error) {
        throw new Error();
      } finally {
        setIsLoading(false);
      }
    };
    fetcher();
  }, [search]);

  return (
    <div className={cn("search_result w-full h-full ")}>
      <ShowResult
        data={data}
        search={search}
        isLoading={isLoading}
        nameValue={nameValue}
      />
    </div>
  );
};

export default SearchResultPage;
