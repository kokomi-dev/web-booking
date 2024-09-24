"use client";
import React, { Fragment } from "react";

import NotFoundPage from "@/app/(dashboard)/404";
import { Button } from "@/components/ui/button";
import ItemSearchResult from "@/components/components/item-search-result";
import imgMap from "@/assets/images/img_map.jpg";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

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
const ShowResult: React.FC<ShowResultProps> = ({ data }) => {
  const searchParam = useSearchParams();
  const addressSearch = searchParam.get("address");
  return (
    <div className={cn("w-full h-full mt-5", "  lg:w-full")}>
      {/* main */}
      <div
        className={cn(
          "w-full max-w-full grid grid-cols-1 overflow-x-auto md:grid-cols-layout-3"
        )}
      >
        <div className="w-full h-full flex flex-col items-start justify-start gap-2">
          <div>
            <h2 className="text-large font-bold mb-2">
              Địa điểm tham quan ở <span>{addressSearch}</span>
            </h2>
            <h3 className="text-normal text-black_main !font-bold">
              Có <span className="text-blue_main">{data?.length}</span> kết quả
            </h3>
            <div className="relative">
              <Image
                alt="img_map"
                width={600}
                height={400}
                src={imgMap}
                className="brightness-75 rounded-8"
              />
              <Button className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-bg_primary_main text-white text-smallest hover:bg-bg_primary_active">
                <span className="text-white">Hiển thị trên bản đồ</span>
              </Button>
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
            <Button className="py-6 px-2 text-small rounded-8 shadow-none border-1 border-black bg-bg_primary_white">
              Đề xuất của chúng tôi
            </Button>
            <Button className="py-6 px-2 text-small rounded-8 shadow-none">
              Được ưa chuộng nhất
            </Button>
            <Button className="py-6 px-2 text-small rounded-8 shadow-none">
              Giá thấp nhất
            </Button>
            <Button className="py-6 px-2 text-small rounded-8 shadow-none">
              Được đánh giá tốt nhất
            </Button>
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
                  location={tour.location}
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
