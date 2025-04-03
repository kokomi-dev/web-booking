"use client";
import { getFilterHotel } from "@/api/api-hotels";
import BreadcrumbHead from "@/components/components/breadcrumb";
import FilterComponent from "@/components/components/filter-item";
import CardItem from "@/components/components/item-search";
import {
  LoadingItemSearch,
  LoadingPage,
} from "@/components/components/loading";
import SheetShowFilter from "@/components/components/sheet-show-filter";
import {
  filterAttraction2,
  filterAttraction3,
  filterBar,
  filterHotel1,
  filterHotel2,
} from "@/components/dashboard/constants";
import { Button } from "@/components/ui/button";
import QUERY_KEY_HOTEL from "@/services/queryKeyStore/hotelQueryKeyStore";
import { IHotel } from "@/types/hotel.type";
import { cn, convertToSlug } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import { Dot, Slice, SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const AllHotelPage = () => {
  const [filter, setFilter] = useState({
    price: "",
    rating: "",
    cancelFree: "",
    filterBar: 0,
    address: "",
    isFavorite: "",
  });
  const [openSheetFilter, setOpenSheetFilter] = useState(false);
  const searchParams = useSearchParams();
  const nameValue = searchParams.get("address");
  const search = nameValue && convertToSlug(nameValue);
  const {
    data: listHotel,
    isLoading,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: [QUERY_KEY_HOTEL.GET_FILTER],
    queryFn: async () => {
      const res = await getFilterHotel({
        price: filter.price,
        rating: filter.rating,
        cancelFree: filter.cancelFree,
        filterBar: filter.filterBar,
        address: nameValue ?? "",
        isFavorite: filter.isFavorite,
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
      rating: "",
      cancelFree: "",
      filterBar: 0,
      address: nameValue ?? "",
      isFavorite: "",
    });
  };
  useEffect(() => {
    refetch();
  }, [filter.filterBar, nameValue]);

  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <div className={cn("container-spacing ")}>
      <BreadcrumbHead
        items={[
          { label: "Lưu trú", href: "/hotels" },
          {
            label: search ? `Tìm kiếm ở ${nameValue}` : `Tât cả nơi lưu trú`,
          },
        ]}
      />
      <div className="container xl:px-0">
        {search ? (
          <h2 className="text-lg font-bold mb-2 flex items-center justify-start gap-x-2 heading-spacing">
            <span className="capitalize">{nameValue}</span>
            <Dot />
            <span className="text-base font-medium">
              tìm thấy {listHotel?.length} địa điểm lưu trú
            </span>
          </h2>
        ) : (
          <span className="text-lg font-bold heading-spacing">
            Lựa chọn nơi lưu trú phù hợp với bạn
          </span>
        )}

        <div className="w-full h-full flex flex-col-reverse list-spacing lg:grid  lg:grid-cols-[28%,72%] xl:grid-cols-[25%,75%] ">
          <div
            className={cn(
              "w-full h-fit border_div_card hidden  !p-0 ",
              "lg:flex flex-col items-start justify-between lg:sticky lg:top-[2rem] xl:top-[3rem]"
            )}
          >
            <h3 className="w-full h-auto  flex items-center justify-start text-lg font-semibold border-b-0.5 p-2 py-3 border-b-black_sub">
              Lọc theo
            </h3>
            <span className="text-xs text-black_blur p-2">
              Giá được áp dụng cho phòng đầu của địa điểm lưu trú
            </span>
            <div className="w-full p-2 list-spacing overflow-y-auto max-h-[80%]">
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
              <FilterComponent
                title="Hủy miễn phí"
                arrayFilterItem={filterHotel1}
                filterKey="cancelFree"
                filter={filter}
                setFilter={setFilter}
              />
              <FilterComponent
                title="Được yêu thích"
                arrayFilterItem={filterHotel2}
                filterKey="isFavorite"
                filter={filter}
                setFilter={setFilter}
              />
              <hr className="hr" />
              <div className="flex items-center justify-between">
                <div
                  className="flex items-center justify-center gap-x-[3px] p-2 bg-black_sub rounded-8 hover:cursor-pointer border-1 border-black_sub hover:bg-blue_hover"
                  onClick={handleResetFilter}
                >
                  <span className="text-xs">Xóa bộ lọc</span>
                  <Slice className="size-4" />
                </div>
                <Button
                  onClick={() => {
                    refetch();
                  }}
                  className="bg-blue_sub text-white"
                >
                  Xem kết quả
                </Button>
              </div>
            </div>
          </div>
          {/* show result */}
          <div
            className={cn(
              "w-full h-full list-spacing !mt-[0.8rem] lg:!mt-0 ",
              "lg:pl-3 "
            )}
          >
            <div
              className={cn(
                "w-full flex items-center justify-between bg-black_sub rounded-24 overflow-x-auto p-2  "
              )}
            >
              <Button
                onClick={() => {
                  setOpenSheetFilter(!openSheetFilter);
                }}
                className="flex py-4 px-3 lg:py-6 lg:px-4 mx-2 !rounded-14 shadow-2xl items-center justify-center gap-x-1 text-sm border-blue border-1  bg-white lg:hidden"
              >
                <SlidersHorizontal className="size-4 text-blue" />
              </Button>
              <SheetShowFilter
                handleResetFilter={handleResetFilter}
                refetch={refetch}
                filter={filter}
                setFilter={setFilter}
                category="hotel"
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
                      "py-0 px-4 w-full text-xs border-1 text-black_blur border-transparent font-normal !rounded-24 shadow-none  bg-transparent hover:border-1  hover:bg-white",
                      filter.filterBar == index && "border-blue bg-white"
                    )}
                  >
                    {item.label}
                  </Button>
                ))}
              </div>
            </div>
            <div
              className={cn(
                "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-5 lg:gap-y-6 xl:gap-y-7"
              )}
            >
              {isFetching
                ? Array.from({ length: 6 }).map((_, index) => (
                    <LoadingItemSearch key={index} />
                  ))
                : listHotel?.length > 0 &&
                  listHotel.map((hotel: IHotel, index: number) => (
                    <CardItem
                      key={index}
                      slug={hotel.slug}
                      name={hotel.name}
                      images={hotel.images[0]}
                      price={hotel.listRooms[0].price}
                      route="hotels"
                      location={hotel.location.detail}
                      description={hotel.details}
                      ratingsQuantity={hotel.rating}
                      cancelFree={hotel.cancelFree}
                    />
                  ))}
            </div>
            {listHotel?.length === 0 && (
              <div className="w-full h-full  mx-auto flex items-center justify-center rounded-8">
                {search ? (
                  <div className="flex items-center justify-center w-full h-full flex-col">
                    <h3 className="text-base font-medium text-blue_sub">
                      Hiện tại chúng tôi chưa có dịch vụ ở đây
                    </h3>
                    <p className="text-sm text-black_sub">
                      Xin vui lòng tìm kiếm với địa điểm khác của chúng tôi
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center justify-center w-full h-full flex-col">
                    <h3 className="text-base font-medium text-blue_sub">
                      Chưa tìm thấy địa điểm du lịch phù hợp
                    </h3>
                    <p className="text-sm text-black_sub">
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

export default AllHotelPage;
