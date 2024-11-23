"use client";
import React, { Fragment, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { addDays, format } from "date-fns";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cx } from "class-variance-authority";
import SearchAddress from "./search-address";
import SearchDatePicker from "./search-date-picker";
import SearchDatePickerDou from "./search-date-picker-dou";
import SearchSelectPerson from "./search-select-person";
import { SearchContainerProp } from "@/utils/types/search";
import { vi } from "date-fns/locale";

const Search: React.FC<SearchContainerProp> = ({
  className,
  currentValue,
  variant,
}) => {
  const [value, setValue] = useState<string>(currentValue || "");
  const [dateDou, setDateDou] = useState<any>({
    from: new Date(),
    to: addDays(new Date(), 2),
  });
  const [date, setDate] = useState<any>();
  const [numberAdults, setNumberAdults] = useState<number>(2);
  const [numberChildren, setNumberChildren] = useState<number>(1);
  const [numberRoom, setNumberRoom] = useState<number>(1);

  const [error, setError] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const page = pathname.split("/")[1];

  useEffect(() => {
    if (value) {
      setError(false);
    }
  }, [value]);

  const handleSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!value) {
      setError(true);
    } else {
      router.push(`/${page}/searchresult?address=${value}&filter=suggest`);
    }
  };
  if (page === "home") {
    return (
      <div className="h-full ">
        <Tabs
          defaultValue="attractions"
          className="w-full  bg-bg_primary_white rounded-8  mt-2"
        >
          <TabsList className="grid w-full grid-cols-2 ">
            <TabsTrigger value="attractions">Địa điểm tham quan</TabsTrigger>
            <TabsTrigger value="hotels">Nơi lưu trú</TabsTrigger>
          </TabsList>
          <TabsContent
            value="attractions"
            className="border-t-1  border-blue_main_sub"
          >
            <Card
              className={cx(
                "overflow-hidden border-none h-[200px]  ",
                "lg:h-[120px]"
              )}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between font-medium text-normal text-black_main -my-2 md:-my-0 ">
                  <span className="hidden md:block">
                    Tìm kiếm điểm tham quan của bạn
                  </span>
                  <Link
                    href="/attractions"
                    className="text-blue_main_sub underline text-small font-normal"
                  >
                    Đến trang gợi ý của chúng tôi
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent
                className={cx(
                  "space-y-2 space-x-2 flex flex-col justify-start  bg-yellow_main px-6 ",
                  "md:flex-row md:items-center md:justify-start"
                )}
              >
                <SearchAddress
                  value={value}
                  setValue={setValue}
                  error={error}
                  className="!z-[10]  !mr-2 lg:!mr-0"
                />
                <SearchDatePicker
                  date={date}
                  setDate={setDate}
                  className="!-ml-[1px] lg:!ml-2"
                />
                <Button
                  type="submit"
                  variant="default"
                  className={cn(
                    "w-full !ml-0  h-[40px] text-normal font-medium bg-bg_primary_blue_sub text-white",
                    "md:!ml-2",
                    "lg:text-medium lg:font-semibold lg:max-w-[140px] ",
                    "hover:bg-bg_primary_active"
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    if (!value) {
                      setError(true);
                    } else {
                      router.push(
                        `/attractions/searchresult?address=${value}&date=${format(
                          date,
                          "dd/MM/yyyy",
                          { locale: vi }
                        )}&filter=suggest`
                      );
                    }
                  }}
                >
                  Tìm
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent
            value="hotels"
            className="border-t-1  border-yellow_main"
          >
            <Card
              className={cx(
                "overflow-hidden border-none h-[246px] ",
                "md:h-[262px]",
                "lg:h-[120px]"
              )}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between font-medium text-normal text-black_main -my-2 md:-my-0">
                  <span className="hidden md:block">
                    Tìm kiếm nơi lưu trú hợp lí cho chuyến đi
                  </span>
                  <Link
                    href="/hotels"
                    className="text-blue_main_sub underline text-small font-normal"
                  >
                    Đến trang gợi ý của chúng tôi
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent
                className={cx(
                  "space-y-2 space-x-2 flex flex-col justify-start  bg-yellow_main px-6",
                  "lg:flex-row lg:items-center lg:justify-start "
                )}
              >
                <SearchAddress
                  value={value}
                  setValue={setValue}
                  error={error}
                  className="!z-[10]"
                />
                <SearchDatePickerDou
                  date={dateDou}
                  setDate={setDateDou}
                  className="mt-2 !z-[5] !ml-0 lg:!ml-2"
                />
                <SearchSelectPerson
                  className="z-[5] !ml-0 lg:!ml-2"
                  error={error}
                  setError={setError}
                  numberAdults={numberAdults}
                  setNumberAdults={setNumberAdults}
                  numberChildren={numberChildren}
                  setNumberChildren={setNumberChildren}
                  numberRoom={numberRoom}
                  setNumberRoom={setNumberRoom}
                />
                <Button
                  type="submit"
                  variant="default"
                  className={cn(
                    "w-full  h-[40px] !ml-0  text-normal font-medium bg-bg_primary_blue_sub text-white",
                    "lg:!ml-2",
                    "lg:text-medium lg:font-semibold lg:max-w-[140px] ",
                    "hover:bg-bg_primary_active"
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    if (!numberAdults || !numberChildren || !numberRoom) {
                      setError(true);
                    } else {
                      router.push(
                        `/hotels/searchresult?address=${value}&dateFrom=${format(
                          dateDou.from,
                          "dd/MM/yyyy",
                          { locale: vi }
                        )}&dateTo=${format(dateDou.to, "dd/MM/yyyy", {
                          locale: vi,
                        })}&numberAdults=${numberAdults}&numberChildren=${numberChildren}&numberRoom=${numberRoom}&filter=suggest`
                      );
                    }
                  }}
                >
                  Tìm
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
  }
  return (
    <form
      className={cn(
        "w-full h-full  flex items-center justify-center py-4",
        className,
        pathname.includes("combos") && "hidden",
        pathname.includes("contact") && "hidden",
        pathname.includes("booking") && "hidden",
        pathname.includes("pay") && "hidden",
        pathname.includes("sign-in") && "hidden",
        pathname.includes("sign-up") && "hidden",
        pathname.includes("content") && "hidden",
        pathname.includes("account") && "hidden"
      )}
    >
      <div
        className={cn(
          "w-full h-full  grid z-[10] gap-2",
          "md:gap-4",
          "lg:gap-6",
          variant === "search" && " ",
          " "
        )}
      >
        {/* search slogan */}
        {page === "attractions" && !variant && (
          <div className={cn("text-white")}>
            <div className="w-full">
              <h1
                className={cn(
                  "w-full hidden ",
                  "lg:block lg:text-largest lg:font-bold"
                )}
              >
                Một trải nghiệm tuyệt vời cho một chuyến đi đặc biệt
              </h1>
              <h1
                className={cn(
                  "w-full block lg:hidden !text-medium text-black font-semibold"
                )}
              >
                Tìm điểm đến tiếp theo
              </h1>
              <p
                className={cn(
                  "text-small text-black_sub",
                  "lg:!text-large lg:text-white font-light lg:block"
                )}
              >
                Khám phá những khung cảnh thơ mộng tại Việt Nam
              </p>
            </div>
          </div>
        )}
        {page === "hotels" && (
          <div className={cn("text-white")}>
            <div className="w-full">
              <h1 className="hidden lg:block text-wrap text-largest font-extrabold">
                Một nơi nghỉ ngơi xứng đáng cho một chỗ du lịch tuyệt vời
              </h1>
              <h1 className="block lg:hidden text-black text-wrap !text-medium font-semibold">
                Tìm chỗ nghỉ tiếp theo
              </h1>
              <p className="md:text-small text-black_sub lg:text-white lg:text-large font-light">
                Những khách sạn hàng đầu tại Việt Nam
              </p>
            </div>
          </div>
        )}
        {/* search container */}
        <div
          className={cn(
            "w-full bg-bg_primary_yellow flex flex-col items-center justify-between gap-y-1 p-1 rounded-lg ",
            variant === "search" && "lg:grid lg:grid-flow-row ",
            " lg:flex  lg:items-center lg:justify-between lg:px-1 lg:gap-2 lg:flex-row"
          )}
        >
          {(page === "attractions" || variant === "search") && (
            <SearchAddress
              value={value}
              setValue={setValue}
              error={error}
              className="!-mt-[0.1rem]"
            />
          )}
          {(page === "attractions" || variant === "search") && (
            <SearchDatePicker date={date} setDate={setDate} />
          )}
          {page === "hotels" && (
            <Fragment>
              <SearchDatePickerDou date={dateDou} setDate={setDateDou} />
              <SearchSelectPerson
                className=""
                error={error}
                setError={setError}
                numberAdults={numberAdults}
                setNumberAdults={setNumberAdults}
                numberChildren={numberChildren}
                setNumberChildren={setNumberChildren}
                numberRoom={numberRoom}
                setNumberRoom={setNumberRoom}
              />
            </Fragment>
          )}
          <Button
            type="submit"
            variant="default"
            className={cn(
              "w-full max-h-[40px]  h-full   text-normal font-medium bg-bg_primary_blue_sub text-white",
              "lg:text-medium lg:font-semibold lg:max-w-[140px] ",
              "hover:bg-bg_primary_active"
            )}
            onClick={handleSearch}
          >
            Tìm
          </Button>
        </div>
      </div>
    </form>
  );
};
export default Search;
