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
      <div className="w-full h-full py-4  bg-transparent lg:bg-blue ">
        <div className="container xl:p-0">
          <Tabs
            defaultValue="attractions"
            className="w-full h-auto bg-white rounded-8"
          >
            <TabsList className="grid w-full grid-cols-2 gap-x-2 h-auto p-1 md:p-2 bg-black_sub">
              <TabsTrigger
                value="attractions"
                className="text-black font-medium text-sm"
              >
                Địa điểm
              </TabsTrigger>
              <TabsTrigger
                value="hotels"
                className="text-black font-medium text-sm "
              >
                Lưu trú
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="attractions"
              className="border-t-1  border-blue_sub"
            >
              <Card
                className={cn(
                  "overflow-hidden border-none h-auto rounded-none rounded-br-8 rounded-bl-8"
                )}
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between font-medium text-base text-black -my-2 md:-my-0 ">
                    <span className="hidden md:block text-sm text-black_sub">
                      Tìm kiếm điểm tham quan của bạn
                    </span>
                    <Link
                      href="/attractions"
                      className="text-blue_sub underline text-sm font-normal"
                    >
                      Đến trang gợi ý của chúng tôi
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent
                  className={cn(
                    "flex flex-col gap-y-2 justify-start w-full h-auto  bg-yellow p-1 ",
                    "lg:flex-row lg:items-center lg:justify-start lg:gap-x-2 lg:gap-y-0"
                  )}
                >
                  <SearchAddress
                    value={address}
                    setValue={setAddress}
                    error={error}
                  />
                  <SearchDatePicker date={date} setDate={setDate} />
                  <Button
                    type="submit"
                    variant="default"
                    className={cn(
                      "lg:max-w-[140px] w-full h-[44px] text-base font-medium bg-blue_sub hover:bg-blue_active hover:text-white text-white"
                    )}
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
            <TabsContent value="hotels" className="border-t-1  border-yellow">
              <Card className={cn("overflow-hidden  border-none mt-0 ")}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between font-medium text-base text-black -my-2 md:-my-0">
                    <span className="hidden text-black_sub text-sm md:block">
                      Tìm kiếm nơi lưu trú hợp lí cho chuyến đi
                    </span>
                    <Link
                      href="/hotels"
                      className="text-blue_sub underline text-sm font-normal"
                    >
                      Đến trang gợi ý của chúng tôi
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent
                  className={cn(
                    "w-full h-auo flex flex-col justify-start bg-yellow p-1 gap-y-2",
                    "lg:flex-row lg:items-center lg:justify-start lg:gap-x-2  "
                  )}
                >
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
                    className={cn(
                      "lg:max-w-[140px] w-full  h-[44px]   bg-blue_sub text-white"
                    )}
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
        "w-full h-full flex items-center justify-center py-4 bg-transparent lg:bg-blue",
        className,
        isDetailPage && "hidden lg:flex",
        HIDDEN_SEARCH.some((value) => pathname.includes(value)) &&
          "!hidden !invisible"
      )}
    >
      <div
        className={cn(
          "container lg:p-0  grid z-[10] gap-2",
          "md:gap-4",
          "lg:gap-6",
          variant === "search" && " ",
          " "
        )}
      >
        {/* search slogan */}
        {page === "attractions" && !variant && (
          <section className={cn("text-white")}>
            <div className="w-full">
              <h1
                className={cn(
                  "w-full hidden ",
                  "lg:block lg:text-4xl lg:font-bold"
                )}
              >
                Một trải nghiệm tuyệt vời cho một chuyến đi đặc biệt
              </h1>
              <h1
                className={cn(
                  "w-full block lg:hidden !text-lg text-black font-semibold"
                )}
              >
                Tìm điểm đến tiếp theo
              </h1>
              <p
                className={cn(
                  "text-sm text-black_sub",
                  "lg:!text-3xl lg:text-white font-light lg:block"
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
              <h1 className="hidden lg:block text-wrap text-4xl font-extrabold">
                Một nơi nghỉ ngơi xứng đáng cho một chỗ du lịch tuyệt vời
              </h1>
              <h1 className="block lg:hidden text-black text-wrap !text-lg font-semibold">
                Tìm chỗ nghỉ tiếp theo
              </h1>
              <p className="md:text-sm text-black_sub lg:text-white lg:text-3xl font-light">
                Những khách sạn hàng đầu tại Việt Nam
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
