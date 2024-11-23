"use client";
import React, { useCallback, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import ItemSearchResult from "@/components/components/item-search-result";
import { cn } from "@/lib/utils";
import { AttractionData } from "@/utils/types";
import ShowOnMap from "@/components/components/show-on-map";
import { LoadingItemSearch } from "@/components/components/loading";
import { Dot, SlidersHorizontal } from "lucide-react";
import SheetShowFilter from "@/components/components/sheet-show-filter";
import FilterComponent from "@/components/components/filter-item";
import { filterBar, filter1, filter2, filter3 } from "../constants";

interface ShowResultProps {
  data: AttractionData[];
  search: any;
  isLoading: boolean;
  nameValue: string | null;
}
interface IHandleFilterData {
  data: AttractionData[];
}

const ShowResult: React.FC<ShowResultProps> = ({
  data,
  search,
  isLoading,
  nameValue,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filterBarValue = searchParams.get("filter");

  const handleFilterData = useCallback(
    ({ data }: IHandleFilterData, value: string) => {
      switch (value) {
        case "lowest-price": {
          return data.sort((a, b) => a.price[1] - b.price[1]);
        }
        case "hightest-price": {
          return data.sort((a, b) => b.price[1] - a.price[1]);
        }
        case "rating-best": {
          return data.sort((a, b) => b.rating - a.rating);
        }
        case "suggest":
          return data;
        default: {
          return data;
        }
      }
    },
    [filterBarValue]
  );

  const handleChangeFilter = (newFilter: string) => {
    const currentParams = new URLSearchParams(searchParams.toString());

    currentParams.set("filter", newFilter);
    const newValue = currentParams.toString();
    router.push(`/attractions/searchresult?${newValue}`);
    handleFilterData({ data }, newValue.split("&filter=")[1]);
  };
  const handleChangeFilterBar = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const { value } = event.currentTarget.dataset;
    if (value) {
      handleChangeFilter(value);
    }
  };
  const [openSheetFilter, setOpenSheetFilter] = useState(false);
  return (
    <div className={cn("w-full h-full grid grid-y-4")}>
      {/* head */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/attractions">
              Địa điểm du lịch
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/attractions/searchresult?address=''">
              Tìm kiếm
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{nameValue}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="w-full max-w-full grid grid-cols-1 gap-2 mt-1">
        <h2 className="text-medium font-bold mb-2 flex items-center justify-start gap-x-2">
          <span className="capitalize">{nameValue}</span>
          <Dot />
          <span className="text-normal font-medium">
            tìm thấy {data?.length} điểm tham quan
          </span>
        </h2>
        <div className="w-full h-full flex flex-col-reverse lg:grid lg:grid-cols-layout-3 gap-4">
          <ShowOnMap address={nameValue || ""} />
          {/* filter attraction and show */}
          <div className="flex flex-col gap-2">
            <h3 className="text-normal font-semibold">Lọc theo</h3>
            <div
              className={cn(
                "w-full h-full border_div_card hidden ",
                "lg:flex items-start justify-between  overflow-y-auto"
              )}
            >
              <FilterComponent title="hạng mục" arrayFilterItem={filter1} />
              <FilterComponent title="giá" arrayFilterItem={filter2} />
              <FilterComponent
                title="điểm đánh giá"
                arrayFilterItem={filter3}
              />
            </div>
            {/* show result */}
            <div
              className={cn(
                "w-full h-full flex flex-col items-center justify-start gap-y-1 pl-1",
                "lg:pl-3 lg:gap-y-3"
              )}
            >
              <div
                className={cn(
                  "w-full flex items-center justify-between bg-bg_black_sub rounded-8 overflow-x-auto py-2"
                )}
              >
                <Button
                  onClick={() => {
                    setOpenSheetFilter(!openSheetFilter);
                  }}
                  className="flex py-6 px-2 mx-2  items-center justify-center gap-x-1 text-small  bg-bg_primary_blue_sub2 lg:hidden"
                >
                  <SlidersHorizontal className="size-4" />
                </Button>
                <SheetShowFilter
                  open={openSheetFilter}
                  setOpen={setOpenSheetFilter}
                />
                {filterBar.map((item, index) => (
                  <Button
                    key={index}
                    value={item.value}
                    className={cn(
                      "py-6 px-2 text-smallest font-normal rounded-8 shadow-none ",
                      filterBarValue === item.value &&
                        "border-1 border-black bg-bg_primary_blue_sub2"
                    )}
                    data-value={item.value}
                    onClick={handleChangeFilterBar}
                  >
                    {item.label}
                  </Button>
                ))}
              </div>
              {isLoading && <LoadingItemSearch />}
              {!isLoading && data.length > 0
                ? data.map((attraction, index) => (
                    <ItemSearchResult
                      key={index}
                      slug={attraction.slug}
                      name={attraction.name}
                      images={attraction.images[0]}
                      price={attraction.price[0]}
                      route="attractions"
                      location={attraction.location.detail}
                      description={attraction.description}
                      ratingsQuantity={attraction.rating}
                      cancelFree={attraction.cancelFree}
                    />
                  ))
                : !isLoading && (
                    <div className="w-full h-20 flex items-center justify-center">
                      <p>Không tìm thấy kết quả nào</p>
                    </div>
                  )}
              {data.length === 0 && (
                <div className="w-full h-[20%] flex items-center justify-center  rounded-8">
                  <div className="flex items-center justify-center w-full h-full flex-col">
                    <h3 className="text-normal font-medium text-blue_main_sub">
                      Hiện tại chúng tôi chưa có dịch vụ ở đây
                    </h3>
                    <p className="text-small text-black_sub">
                      Xin vui lòng tìm kiếm với địa điểm khác của chúng tôi
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowResult;
