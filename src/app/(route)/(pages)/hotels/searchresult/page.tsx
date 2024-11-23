"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";
import { HotelData } from "@/utils/types";
import { convertToSlug } from "@/utils/constants";
import { searchResultHotel } from "@/api/api-hotels";
import ShowResult from "@/components/dashboard/hotels/show-result";
import Loading from "./loading";

const SearchResultPageHotel = () => {
  const searchParams = useSearchParams();
  const nameValue = searchParams.get("address");
  const search = nameValue && convertToSlug(nameValue);
  const [data, setData] = useState<HotelData[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetcher = async () => {
      setLoading(true);
      try {
        const data = await searchResultHotel({ searchParam: search });
        return setData(data.data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetcher();
  }, [search]);
  if (loading) return <Loading />;
  return (
    <div className={cn("search_result w-full h-full ")}>
      <ShowResult data={data} search={search} nameValue={nameValue} />
    </div>
  );
};

export default SearchResultPageHotel;
