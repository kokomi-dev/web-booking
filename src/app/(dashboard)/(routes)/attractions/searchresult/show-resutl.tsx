"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import ItemSearchResult from "@/components/components/item-search-result";
import { cn } from "@/lib/utils";
function convertToSlug(str: string) {
  return String(str)
    .normalize("NFKD") // split accented characters into their base characters and diacritical marks
    .replace(/[\u0300-\u036f]/g, "") // remove all the accents, which happen to be all in the \u03xx UNICODE block.
    .trim() // trim leading or trailing whitespace
    .toLowerCase() // convert to lowercase
    .replace(/[^a-z0-9 -]/g, "") // remove non-alphanumeric characters
    .replace(/\s+/g, "-") // replace spaces with hyphens
    .replace(/-+/g, "-"); // remove consecutive hyphens
}

const FilterComponent = ({
  title,
  arrayFilterItem,
}: {
  title: string;
  arrayFilterItem: string[];
}) => {
  // get  list filter tour
  const listFilter: {
    category: string[];
  } = {
    category: [],
  };

  const handleFilterCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valueChecked = e.target.value;
    if (e.target.checked) {
      listFilter.category = [...listFilter.category, valueChecked];
      console.log(listFilter);
    } else {
      console.log(listFilter.category.includes(valueChecked));
    }
  };
  return (
    <>
      <h6 className="text-small font-semibold ">{title}</h6>
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
    </>
  );
};

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
  data: {
    name: string;
    slug: string;
    images: [string];
    price: [number];
    location: string;
    description: string;
    ratingsQuantity: number;
  }[];
}
const ShowResult: React.FC<ShowResultProps> = async ({ data }) => {
  return (
    <div className={cn("w-full h-full p-4 mt-5", "lg:px-20  lg:w-full")}>
      {/* main */}
      <div
        className={cn(
          "w-full max-w-full grid grid-cols-1 overflow-x-auto md:grid-cols-layout-3"
        )}
      >
        <div className="w-full">
          <h6 className="title_small text-red-400 !font-bold">
            Có {data?.length} kết quả
          </h6>

          {/* filter tour */}
          <h3 className="title_medium border-b-[0.8px] border-[#c3c2c2]">
            Lọc theo
          </h3>
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
          {data ? (
            data?.map((tour, index) => {
              return (
                <ItemSearchResult
                  slug={tour.slug}
                  name={tour.name}
                  images={tour.images[0]}
                  price={tour.price[0]}
                  route="attractions"
                  location={tour.location}
                  description={tour.description}
                  ratingsQuantity={tour.ratingsQuantity}
                />
              );
            })
          ) : (
            <div className="w-full">
              <h4 className="text-[1.2rem] font-bold">
                Không có chuyến du lịch nào tại địa điểm này
              </h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowResult;
