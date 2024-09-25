"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";
import { HotelData } from "@/constants";
import { searchResultHotel } from "@/api/api-hotel";
import SearchResultMain from "@/components/dashboard/hotels/search-result-main";
import Loading from "./loading";

const SearchResultPageHotel = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("address");

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
      <SearchResultMain data={data} />
    </div>
  );
};

export default SearchResultPageHotel;
