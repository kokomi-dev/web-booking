"use client";
import { getFilterAttractions } from "@/api/api-attractions";
import BreadcrumbHead from "@/components/components/breadcrumb";
import CardItem from "@/components/components/card-item";
import FilterComponent from "@/components/components/filter-item";
import {
  LoadingItemSearch,
  LoadingPage,
} from "@/components/components/loading";
import SheetShowFilter from "@/components/components/sheet-show-filter";
import {
  filterAttraction2,
  filterAttraction3,
  filterAttraction4,
  filterBar,
} from "@/components/dashboard/constants";
import { Button } from "@/components/ui/button";
import QUERY_KEY_ATTRACTION from "@/services/queryKeyStore/attractionQueryKeyStore";
import { cn, convertToSlug, formatDate } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import { Dot, Slice, SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const AllAttractionsPage = () => {
  const [filter, setFilter] = useState({
    price: "",
    rating: "",
    difficulty: "",
    startDate: "",
    filterBar: 0,
    address: "",
  });
  const [openSheetFilter, setOpenSheetFilter] = useState(false);
  const searchParams = useSearchParams();
  const nameValue = searchParams.get("address");
  const search = nameValue && convertToSlug(nameValue);
  const {
    data: listAttraction,
    isLoading,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: [QUERY_KEY_ATTRACTION.GET_FILTER],
    queryFn: async () => {
      const res = await getFilterAttractions({
        price: filter.price,
        startDate: filter.startDate,
        rating: filter.rating,
        difficulty: filter.difficulty,
        filterBar: filter.filterBar,
        address: nameValue ?? "",
      });
      if (res) {
        return res.data.data;
      } else {
        return [];
      }
    },
    retry: 3,
    retryDelay: 1000,
    refetchOnWindowFocus: false,
  });
  const handleResetFilter = () => {
    setFilter({
      price: "",
      startDate: "",
      rating: "",
      difficulty: "",
      filterBar: 0,
      address: nameValue ?? "",
    });
  };
  useEffect(() => {
    refetch();
  }, [filter.filterBar, nameValue]);

  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <div className={cn("w-full h-full posing-vertical-1 mt-[1rem] lg:mt-0")}>
      <BreadcrumbHead
        items={[
          { label: "Địa điểm du lịch", href: "/attractions" },
          {
            label: search
              ? `Tìm kiếm ở ${nameValue}`
              : `Tât cả địa điểm du lịch`,
          },
        ]}
      />
      <div className="w-full h-full max-w-full posing-vertical-2">
        {search ? (
          <h2 className="text-medium font-bold mb-2 flex items-center justify-start gap-x-2">
            <span className="capitalize">{nameValue}</span>
            <Dot />
            <span className="text-normal font-medium">
              tìm thấy {listAttraction?.length} điểm tham quan
            </span>
          </h2>
        ) : (
          <span className="text-medium font-bold">
            Lựa chọn điểm đến phù hợp với bạn
          </span>
        )}

        <div className="w-full h-full flex flex-col-reverse posing-vertical-3 lg:grid  lg:grid-cols-[28%,72%] xl:grid-cols-[25%,75%] ">
          <div
            className={cn(
              "w-full h-fit border_div_card hidden  !p-0 ",
              "lg:flex flex-col items-start justify-between lg:sticky lg:top-[2rem] xl:top-[3rem]"
            )}
          >
            <h3 className="w-full h-auto  flex items-center justify-start text-normal+ font-semibold border-b-0.5 p-2 py-3 border-b-black_sub">
              Lọc theo
            </h3>
            <div className="w-full p-2 posing-vertical-3 overflow-y-auto max-h-[80%]">
              <FilterComponent
                title="giá"
                arrayFilterItem={filterAttraction2}
                filterKey="price"
                filter={filter}
                setFilter={setFilter}
              />
              <FilterComponent
                title="điểm đánh giá"
                arrayFilterItem={filterAttraction3}
                filterKey="rating"
                filter={filter}
                setFilter={setFilter}
              />
              <div className="flex flex-col posing-vertical-5">
                <h6 className="text-small font-medium capitalize">
                  Ngày bắt đầu
                </h6>
                <input
                  value={filter.startDate}
                  type="date"
                  className="w-[80%] border-1 border-black_sub p-1 rounded-8"
                  onChange={(e) => {
                    setFilter((pre) => ({
                      ...pre,
                      startDate: e.target.value,
                    }));
                  }}
                />
              </div>
              <FilterComponent
                title="Độ khó"
                arrayFilterItem={filterAttraction4}
                filterKey="difficulty"
                filter={filter}
                setFilter={setFilter}
              />
              <hr className="hr" />
              <div className="flex items-center justify-between">
                <div
                  className="flex items-center justify-center gap-x-[3px] p-2 bg-bg_black_sub rounded-8 hover:cursor-pointer border-1 border-black_sub hover:bg-bg_primary_hover"
                  onClick={handleResetFilter}
                >
                  <span className="text-smallest">Xóa bộ lọc</span>
                  <Slice className="size-4" />
                </div>
                <Button
                  onClick={() => {
                    refetch();
                  }}
                  className="bg-bg_primary_blue_sub text-white"
                >
                  Xem kết quả
                </Button>
              </div>
            </div>
          </div>
          {/* show result */}
          <div
            className={cn(
              "w-full h-full posing-vertical-3 !mt-[0.8rem] lg:!mt-0 ",
              "lg:pl-3 "
            )}
          >
            <div
              className={cn(
                "w-full flex items-center justify-between bg-bg_black_sub rounded-24 overflow-x-auto p-2  "
              )}
            >
              <Button
                onClick={() => {
                  setOpenSheetFilter(!openSheetFilter);
                }}
                className="flex py-4 px-3 lg:py-6 lg:px-4 mx-2 !rounded-14 shadow-2xl items-center justify-center gap-x-1 text-small border-blue_main border-1  bg-white lg:hidden"
              >
                <SlidersHorizontal className="size-4 text-blue_main" />
              </Button>
              <SheetShowFilter
                handleResetFilter={handleResetFilter}
                refetch={refetch}
                filter={filter}
                setFilter={setFilter}
                category="attraction"
                open={openSheetFilter}
                setOpen={setOpenSheetFilter}
              />
              <div className="w-full gap-x-2 lg:gap-x-3 xl:gap-x-4 flex  items-center justify-between">
                {filterBar.map((item, index) => (
                  <Button
                    key={index}
                    value={item.value}
                    onClick={() => {
                      setFilter((pre) => ({
                        ...pre,
                        filterBar: item.value,
                      }));
                    }}
                    className={cn(
                      "py-0 px-4 w-full text-smallest border-1 text-black_main_blur border-transparent font-normal !rounded-24 shadow-none  bg-transparent hover:border-1  hover:bg-white",
                      filter.filterBar == index && "border-blue_main bg-white"
                    )}
                  >
                    {item.label}
                  </Button>
                ))}
              </div>
            </div>
            <div
              className={cn(
                "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-y-5 lg:gap-y-6 xl:gap-y-7"
              )}
            >
              {isFetching
                ? Array.from({ length: 6 }).map((_, index) => (
                    <LoadingItemSearch key={index} />
                  ))
                : listAttraction?.length > 0 &&
                  listAttraction.map((attraction: any, index: number) => (
                    <CardItem
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
                      startDate={formatDate(attraction.startDate)}
                      duration={attraction.duration}
                    />
                  ))}
            </div>
            {listAttraction?.length === 0 && (
              <div className="w-full h-full  mx-auto flex items-center justify-center rounded-8">
                {search ? (
                  <div className="flex items-center justify-center w-full h-full flex-col">
                    <h3 className="text-normal font-medium text-blue_main_sub">
                      Hiện tại chúng tôi chưa có dịch vụ ở đây
                    </h3>
                    <p className="text-small text-black_sub">
                      Xin vui lòng tìm kiếm với địa điểm khác của chúng tôi
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-full h-full flex-col">
                    <h3 className="text-normal font-medium text-blue_main_sub">
                      Chưa tìm thấy địa điểm du lịch phù hợp
                    </h3>
                    <p className="text-small text-black_sub">
                      Xin vui lòng tìm kiếm với địa điểm khác của chúng tôi
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllAttractionsPage;
