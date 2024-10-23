"use client";

import React, { Fragment, useCallback } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useRouter, useSearchParams } from "next/navigation";

import ItemSearchResult from "@/components/components/item-search-result";
import { HotelData, convertToSlug } from "@/constants";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import ShowOnMap from "@/components/components/show-on-map";
import { Dot } from "lucide-react";

interface ISearchResult {
  data: HotelData[];
  search: any;
  nameValue: string | null;
}
const FilterComponent = ({
  title,
  arrayFilterItem,
}: {
  title: string;
  arrayFilterItem: string[];
}) => {
  const listFilter: {
    category: string[];
  } = {
    category: [],
  };

  const handleFilterCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valueChecked = e.target.value;
    if (e.target.checked) {
      listFilter.category = [...listFilter.category, valueChecked];
    } else {
    }
  };
  return (
    <Fragment>
      <h6 className="text-small font-semibold capitalize ">{title}</h6>
      <div className="filter_component w-full">
        {arrayFilterItem.map((item, index) => (
          <div
            key={index}
            className={cn(
              "w-full flex items-center justify-start gap-1 ] text-[0.85rem] font-normal rounded-8 transition-all duration-300",
              "hover:bg-bg_black_sub hover:cursor-pointer"
            )}
          >
            <input
              type="checkbox"
              id={convertToSlug(item)}
              value={convertToSlug(item)}
              onChange={handleFilterCategory}
              className="w-5 h-5"
            />
            <label
              htmlFor={convertToSlug(item)}
              className="flex-1 ml-2 capitalize cursor-pointer transition-all duration-300  py-[0.4rem]"
            >
              {item}
            </label>
          </div>
        ))}
      </div>
    </Fragment>
  );
};
const filterBar = [
  { value: "suggest", label: "Đề xuất của chúng tôi" },
  { value: "most-popular", label: "Được ưa chuộng nhất" },
  { value: "lowest-price", label: "Giá thấp nhất" },
  { value: "rating-best", label: "Đánh giá cao nhất" },
];
const filter1 = [
  "home stay",
  "Nhà khách",
  "Nhà nghỉ B&B",
  "Nhà nghỉ mát",
  "Căn hộ",
  "Khu cắm trại",
  "Biệt thự",
];
const filter2 = [
  "0 - 400.000",
  "400.000 - 1.000.000",
  "1.000.000 - 3.000.000",
  " trên 3 triệu",
];
const filter3 = [
  "từ 4.5 trở lên",
  "từ 4 trở lên",
  "từ 3.5 trở lên",
  "từ 3 trở lên",
];
const SearchResultMain: React.FC<ISearchResult> = ({
  data,
  search,
  nameValue,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filterBarValue = searchParams.get("filter");
  interface IHandleFilterData {
    data: HotelData[];
  }
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
    router.push(`/hotels/searchresult?${newValue}`);
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
  return (
    <div className={cn("w-full h-full  grid gap-y-4", "  lg:w-full")}>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/hotels">Lưu trú</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/hotels/searchresult?address=''">
              Tìm kiếm
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{nameValue}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* main */}
      <div
        className={cn(
          "w-full max-w-full grid grid-cols-1 overflow-x-auto md:grid-cols-layout-3"
        )}
      >
        <div className="w-full h-full grid gap-y-2">
          <div>
            <h2 className="text-medium font-bold mb-2 flex items-center justify-start gap-x-2">
              <span className="capitalize">{nameValue}</span>
              <Dot />
              <span className="text-normal font-medium">
                tìm thấy {data?.length} chỗ nghỉ
              </span>
            </h2>
            <div className="w-full h-full">
              <ShowOnMap address={nameValue || ""} />
            </div>
          </div>
          {/* filter tour */}
          <h3 className="text-normal font-semibold">Lọc theo</h3>
          <div
            className={cn(
              "w-full filter_component border_div_card flex flex-row items-center justify-start gap-2 overflow-x-scroll",
              "lg:flex lg:items-start lg:justify-between lg:flex-col lg:overflow-y-auto"
            )}
          >
            <FilterComponent title="hạng mục" arrayFilterItem={filter1} />
            <FilterComponent title="giá" arrayFilterItem={filter2} />
            <FilterComponent title="điểm đánh giá" arrayFilterItem={filter3} />
          </div>
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
              "w-full flex items-center justify-between bg-bg_black_sub rounded-8"
            )}
          >
            {filterBar.map((item, index) => (
              <Button
                key={index}
                value={item.value}
                className={cn(
                  "py-6 px-2 text-smallest font-normal rounded-8 shadow-none select-none ",
                  filterBarValue === item.value &&
                    "border-1 border-black_sub bg-bg_primary_white"
                )}
                data-value={item.value}
                onClick={handleChangeFilterBar}
              >
                {item.label}
              </Button>
            ))}
          </div>
          {data &&
            data?.map((hotel, index) => {
              return (
                <ItemSearchResult
                  key={index}
                  slug={hotel.slug}
                  name={hotel.name}
                  images={hotel.images[0]}
                  price={hotel.price[0]}
                  route="attractions"
                  location={hotel.location}
                  details={hotel.details}
                />
              );
            })}
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
  );
};

export default SearchResultMain;
