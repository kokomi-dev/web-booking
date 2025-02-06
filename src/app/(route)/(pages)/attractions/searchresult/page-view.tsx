"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { searchResult } from "@/api/api-attractions";
import ShowResult from "@/components/components/show-result";
import { cn } from "@/utils/constants";
import { AttractionData } from "@/types";
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
      <ShowResult data={data} isLoading={isLoading} nameValue={nameValue} />
    </div>
  );
};

export default SearchResultPage;
