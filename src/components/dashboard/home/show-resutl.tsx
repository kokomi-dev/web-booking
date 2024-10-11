"use client";
import React, { Fragment, useCallback, useMemo } from "react";

import { Button } from "@/components/ui/button";
import ItemSearchResult from "@/components/components/item-search-result";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { TourData } from "@/constants";
import ShowOnMap from "@/components/components/show-on-map";

function convertToSlug(str: string) {
  return String(str)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
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
      <div className="filter_component">
        {arrayFilterItem.map((item, index) => (
          <div key={index} className="filter_item">
            <Button variant="ghost">
              <input
                type="checkbox"
                id={convertToSlug(item)}
                value={convertToSlug(item)}
                onChange={handleFilterCategory}
              />
              <label
                htmlFor={convertToSlug(item)}
                className="ml-2 capitalize cursor-pointer transition-all duration-300"
              >
                {item}
              </label>
            </Button>
          </div>
        ))}
      </div>
    </Fragment>
  );
};
const filterBar = [
  { value: "suggest", label: "Đề xuất của chúng tôi" },
  { value: "hightest-price", label: "Giá cao nhất" },
  { value: "lowest-price", label: "Giá thấp nhất" },
  { value: "rating-best", label: "Đánh giá cao nhất" },
];
const filter1 = [
  "tour",
  "thiên nhiên và ngoài trời",
  "bảo tàng nghệ thuật văn hóa",
  "hoạt động giải trí, vé",
  "ăn uống",
  "dịch vụ & cho thuê",
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
interface ShowResultProps {
  data: TourData[];
  search: any;
}
interface IHandleFilterData {
  data: TourData[];
}

const ShowResult: React.FC<ShowResultProps> = ({ data, search }) => {
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
          return data.sort((a, b) => b.ratingsQuantity - a.ratingsQuantity);
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
  return (
    <div className={cn("w-full h-full mt-5", "  lg:w-full")}>
      {/* main */}
      <div
        className={cn(
          "w-full max-w-full grid grid-cols-1 overflow-x-auto md:grid-cols-layout-3"
        )}
      >
        <div className="w-full h-full grid gap-y-2">
          <div>
            {data?.length > 0 && (
              <h2 className="text-large font-bold mb-2">
                {data[0]?.city}{" "}
                <span className="text-normal font-medium">
                  : tìm thấy {data?.length} điểm tham quan
                </span>
              </h2>
            )}

            <div className="relative">
              <ShowOnMap address={search} />
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
          {data &&
            data?.map((tour, index) => {
              return (
                <ItemSearchResult
                  key={index}
                  slug={tour.slug}
                  name={tour.name}
                  images={tour.images[0]}
                  price={tour.price[0]}
                  route="attractions"
                  location={tour.location.detail}
                  description={tour.description}
                  ratingsQuantity={tour.ratingsQuantity}
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

export default ShowResult;
