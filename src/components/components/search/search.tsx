"use client";
import { addDays, format } from "date-fns";
import { vi } from "date-fns/locale";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { Fragment, useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HIDDEN_SEARCH, SearchContainerProp } from "@/types/search";
import { cn } from "@/utils/constants";
import SearchAddress from "./search-address";
import SearchDatePicker from "./search-date-picker";
import SearchDatePickerDou from "./search-date-picker-dou";
import SearchSelectPerson from "./search-select-person";

const Search: React.FC<SearchContainerProp> = ({
  className,
  currentValue,
  variant,
}) => {
  const nextToday = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  };
  const tomorrow = addDays(new Date(), 1);
  const [address, setAddress] = useState<string>(currentValue || "");
  const [dateDou, setDateDou] = useState<any>({
    from: tomorrow,
    to: addDays(tomorrow, 2),
  });
  const [date, setDate] = useState<any>(nextToday);
  const [numberAdults, setNumberAdults] = useState<number>(2);
  const [numberChildren, setNumberChildren] = useState<number>(0);
  const [numberRoom, setNumberRoom] = useState<number>(1);

  const [error, setError] = useState(false);

  const pathname = usePathname();
  const router = useRouter();
  const page = pathname.split("/")[1];

  useEffect(() => {
    if (address.trim()) setError(false);
  }, [address]);

  const validateSearch = useCallback(() => {
    if (!address.trim()) {
      setError(true);
      return false;
    }
    return true;
  }, [address]);

  const handleSearch = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (!validateSearch()) return;
      router.push(`/${page}/all?address=${address}`);
    },
    [address, page, router, validateSearch]
  );

  const isDetailPage =
    (pathname.startsWith("/hotels/") && pathname !== "/hotels") ||
    (pathname.startsWith("/attractions/") && pathname !== "/attractions");

  if (page === "home" && !pathname.includes("genius")) {
    return (
      <div className="w-full h-max relative flex items-center justify-center">
        <div className="container xl:p-0">
          {/* Tabs */}
          <Tabs
            defaultValue="attractions"
            // md:bg-white/10 md:backdrop-blur-md
            className="w-full h-auto bg-transparent "
          >
            <TabsList className="grid w-full grid-cols-2 gap-x-2 h-auto p-1 md:p-2 bg-blue-linear">
              <TabsTrigger
                value="attractions"
                className="text-black font-medium text-xs md:text-sm py-2 px-4 rounded-md transition-all duration-300 bg-gray-300 hover:text-blue-600 data-[state=active]:bg-white data-[state=active]:text-blue data-[state=active]:shadow-md"
              >
                Địa điểm
              </TabsTrigger>
              <TabsTrigger
                value="hotels"
                className="text-black font-medium text-xs md:text-sm py-2 px-4 rounded-md transition-all duration-300 bg-gray-300 hover:text-blue-600 data-[state=active]:bg-white data-[state=active]:text-blue data-[state=active]:shadow-md"
              >
                Lưu trú
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="attractions"
              className="border-t-2 border-blue-600 pt-3 bg-transparent rounded-b-lg"
            >
              <Card className="overflow-hidden border-none h-auto rounded-lg shadow-md">
                <CardHeader className="hidden">
                  <CardTitle
                    hidden
                    className="flex items-center justify-between font-medium text-base text-black"
                  ></CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-y-2 justify-start w-full h-auto bg-yellow p-1  md:flex-row md:items-center md:justify-start md:gap-x-2 md:gap-y-0">
                  <SearchAddress
                    value={address}
                    setValue={setAddress}
                    error={error}
                  />
                  <SearchDatePicker date={date} setDate={setDate} />
                  <Button
                    type="submit"
                    variant="default"
                    className="lg:max-w-[140px] w-full h-[44px] text-base font-medium bg-blue hover:bg-blue_active text-white"
                    onClick={(e) => {
                      e.preventDefault();
                      if (address === "" || address === null) {
                        setError(true);
                      } else {
                        router.push(
                          `/attractions/all?address=${address}&date=${format(
                            date,
                            "dd/MM/yyyy",
                            { locale: vi }
                          )}&filter=suggest`
                        );
                      }
                    }}
                  >
                    <span className="text-lg font-medium">Tìm</span>
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent
              value="hotels"
              className="border-t-2 border-yellow-600 pt-3  rounded-b-lg"
            >
              <Card className="overflow-hidden border-none h-auto rounded-lg shadow-md">
                <CardHeader className="hidden">
                  <CardTitle
                    hidden
                    className="flex items-center justify-between font-medium text-base text-black"
                  ></CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-y-2 justify-start w-full h-auto bg-yellow  p-1 md:flex-row md:items-center md:justify-start md:gap-x-2 md:gap-y-0">
                  <SearchAddress
                    value={address}
                    setValue={setAddress}
                    error={error}
                  />
                  <SearchDatePickerDou date={dateDou} setDate={setDateDou} />
                  <SearchSelectPerson
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
                    className="lg:max-w-[140px] w-full h-[44px] text-base font-medium !bg-blue hover:bg-blue_active text-white"
                    onClick={(e) => {
                      e.preventDefault();
                      if (address === "" || address === null) {
                        setError(true);
                      } else {
                        router.push(
                          `/hotels/all?address=${address}&dateFrom=${format(
                            dateDou.from,
                            "dd/MM/yyyy",
                            { locale: vi }
                          )}&dateTo=${format(dateDou.to, "dd/MM/yyyy", {
                            locale: vi,
                          })}&numberAdults=${numberAdults}&numberChildren=${numberChildren}&numberRoom=${numberRoom}`
                        );
                      }
                    }}
                  >
                    <span className="text-lg font-medium">Tìm</span>
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  }
  return (
    <form
      className={cn(
        "w-full h-max flex items-center justify-center py-4 bg-transparent",
        className,
        isDetailPage && "hidden lg:flex  mt-0",
        HIDDEN_SEARCH.some((value) => pathname.includes(value)) &&
          "!hidden !invisible"
      )}
    >
      <div
        className={cn(
          "container xl:px-0 grid z-[10] gap-2",
          "md:gap-4",
          "lg:gap-6",
          variant === "search" && " ",
          " "
        )}
      >
        {/* search slogan */}
        {page === "attractions" && !variant && (
          <section className={cn("text-white ")}>
            <div className="w-full">
              <div
                className={cn(
                  "w-full hidden ",
                  "lg:block lg:text-4xl lg:font-bold mb-5"
                )}
              >
                Một trải nghiệm tuyệt vời cho một chuyến đi đặc biệt
              </div>
              <div
                className={cn(
                  "w-full block lg:hidden !text-2xl text-white font-semibold"
                )}
              >
                Tìm điểm đến tiếp theo
              </div>
              <p
                className={cn(
                  "text-sm text-white",
                  "lg:!text-xl lg:text-white font-light lg:block"
                )}
              >
                Khám phá những khung cảnh thơ mộng tại Việt Nam
              </p>
            </div>
          </section>
        )}
        {page === "hotels" && (
          <section className={cn("text-white")}>
            <div className="w-full">
              <div className="hidden lg:block text-wrap text-4xl font-extrabold mb-5">
                Một nơi nghỉ ngơi xứng đáng cho một chỗ du lịch tuyệt vời
              </div>
              <div className="block lg:hidden text-white text-wrap !text-2xl font-semibold">
                Tìm chỗ nghỉ tiếp theo
              </div>
              <p className="text-sm text-white lg:text-xl font-light">
                Nơi nghỉ chân lý tưởng cho chuyến đi của bạn
              </p>
            </div>
          </section>
        )}
        {/* search container */}
        <div
          className={cn(
            "w-full bg-yellow flex flex-col items-center justify-between gap-y-2 p-1 rounded-lg ",
            variant === "search" && "lg:grid lg:grid-flow-row ",
            " lg:flex  lg:items-center lg:justify-between lg:px-1 lg:gap-2 lg:flex-row"
          )}
        >
          <SearchAddress value={address} setValue={setAddress} error={error} />
          {(page === "attractions" || variant === "search") && (
            <SearchDatePicker date={date} setDate={setDate} />
          )}
          {page === "hotels" && (
            <Fragment>
              <SearchDatePickerDou date={dateDou} setDate={setDateDou} />
              <SearchSelectPerson
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
            variant="ghost"
            className={cn(
              "w-full h-[44px] text-base font-medium bg-blue_sub text-white",
              "lg:text-lg lg:font-semibold lg:max-w-[140px] ",
              "hover:bg-blue_active hover:text-white "
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
