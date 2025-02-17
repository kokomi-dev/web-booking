"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { cn } from "@/utils/constants";
import { convertToSlug } from "@/utils/constants";
import { searchResultHotel } from "@/api/api-hotels";
import ShowResult from "@/components/dashboard/hotels/show-result";
import { LoadingPage } from "@/components/components/loading";
import { IHotel } from "@/types/hotel.type";

const SearchResultPageHotel = () => {
  const searchParams = useSearchParams();
  const nameValue = searchParams.get("address");
  const search = nameValue && convertToSlug(nameValue);
  const [data, setData] = useState<IHotel[]>([]);
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
  if (loading) return <LoadingPage />;
  return (
    <div className={cn("search_result w-full h-full ")}>
      <ShowResult isLoading={loading} data={data} nameValue={nameValue} />
    </div>
  );
};

export default SearchResultPageHotel;
