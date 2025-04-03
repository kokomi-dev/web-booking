"use client";

import { addDays, format } from "date-fns";
import { vi } from "date-fns/locale";
import { Check, TriangleAlert, User, UserPlus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import CardText from "@/components/components/card-text";
import { Button } from "@/components/ui/button";

import { getDetailHotel } from "@/api/api-hotels";
import { LoadingBookingCardHotel } from "@/components/components/loading";
import SearchDatePickerDou from "@/components/components/search/search-date-picker-dou";
import SearchSelectPerson from "@/components/components/search/search-select-person";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import QUERY_KEY_HOTEL from "@/services/queryKeyStore/hotelQueryKeyStore";
import { useAuthenticatedStore } from "@/store/authencation-store";
import { IHotelRoom } from "@/types/hotel.type";
import { cn, convertVND } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";

const Booking = ({
  slug,
  listRooms,
}: {
  slug: string;
  listRooms: [IHotelRoom];
}) => {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthenticatedStore();

  const { data: listHotelRoomNew, isLoading } = useQuery({
    queryKey: [QUERY_KEY_HOTEL.GET_LIST_ROOM_HOTEL, slug],
    queryFn: async () => {
      const res = await getDetailHotel({ slug });
      if (res) {
        return res.listRooms;
      }
    },
    retry: 3,
    retryDelay: 1000,
    enabled: !!slug,
  });
  const [date, setDate] = React.useState<any>({
    from: new Date(),
    to: addDays(new Date(), 2),
  });
  const [total, setTotal] = useState(0);
  const [totalSale, setTotalSale] = useState(0);

  const [numberAdults, setNumberAdults] = useState<number>(1);
  const [numberChildren, setNumberChildren] = useState<number>(1);
  const [numberRoom, setNumberRoom] = useState<number>(1);
  const [error, setError] = useState<boolean>(false);
  const [chooseInput, setChooseInput] = useState<number[]>(
    Array.from({ length: listRooms.length }, (_) => {
      return 0;
    })
  );
  const [checkHiddenBtn, setCheckHiddenBtn] = useState(true);

  const handlePopoverChange = useCallback(async (open: boolean) => {
    if (!open) {
      const numberPerson = numberAdults + numberChildren;
      const result = numberPerson / 2 <= numberRoom;
      if (result === false) {
        setError(true);
        toast.error("Số phòng đơn không đủ cho số người đã chọn.");
      } else {
        setError(false);
      }
    }
  }, []);
  const handleBooking = useCallback(() => {
    if (date) {
      const dateFrom = format(String(date.from), "dd/MM/yyyy", { locale: vi });
      const dateTo = format(String(date.to), "dd/MM/yyyy", { locale: vi });

      router.push(
        "/hotels/booking/" +
          slug +
          "?date-from=" +
          dateFrom +
          "&date-to=" +
          dateTo +
          "&numberAdults=" +
          numberAdults +
          "&numberChildren=" +
          numberChildren +
          "&numberRoom=" +
          numberRoom +
          "&price=" +
          total +
          "&roomBooked=" +
          chooseInput
      );
    }
  }, [
    date,
    chooseInput,
    slug,
    numberAdults,
    numberChildren,
    numberRoom,
    total,
    router,
  ]);
  useEffect(() => {
    let res = 0;
    let resSale = 0;

    listRooms.forEach((room, index) => {
      resSale +=
        (room.price - (room.price / 100) * room.sale) * chooseInput[index];
      res += room.price * chooseInput[index];
      setTotalSale(resSale);
      setTotal(res);
    });
    const isCheck = chooseInput.filter((item) => item !== 0);
    if (isCheck.length < 1) {
      return setCheckHiddenBtn(true);
    } else {
      setCheckHiddenBtn(false);
    }
  }, [chooseInput, listRooms]);
  const [showActionBar, setShowActionBar] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const bookingContainer = document.getElementById(
        "booking-hotel-container"
      );
      if (bookingContainer) {
        const rect = bookingContainer.getBoundingClientRect();
        setShowActionBar(rect.top < window.innerHeight && rect.bottom >= 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const handleIncrease = useCallback((index: number) => {
    setChooseInput((prev) => {
      const newChoose = [...prev];
      newChoose[index] = (newChoose[index] || 0) + 1;
      return newChoose;
    });
  }, []);

  const handleDecrease = useCallback((index: number) => {
    setChooseInput((prev) => {
      const newChoose = [...prev];
      if (newChoose[index] > 0) {
        newChoose[index] -= 1;
      }
      return newChoose;
    });
  }, []);
  return (
    <div className="w-full h-full list-spacing p-0 bg-white p-sm-2  lg:p-3 sm:bg-bg_sub rounded-xl text-base">
      {/* choose person and room */}
      <CardText title="Thông tin đặt phòng" className="">
        <div className="hidden lg:flex items-center justify-start gap-x-2">
          <TriangleAlert className="text-yellow" />
          <h5 className="text-sm mb-2">
            Vui lòng chọn đúng đủ số người cho phòng để có trải nghiệm tốt nhất
            !
          </h5>
        </div>
        <div className="bg-yellow w-full flex flex-col lg:flex-row items-center justify-start gap-x-2 p-2 rounded-8">
          <SearchDatePickerDou
            className="text-black w-full h-[36px]  text-sm sm:text-base md:text-lg font-medium"
            date={date}
            setDate={setDate}
          />
          <SearchSelectPerson
            setError={setError}
            className=" w-full h-[36px] text-sm sm:text-base md:text-lg font-semibold mt-2 lg:mt-0"
            numberChildren={numberChildren}
            numberAdults={numberAdults}
            setNumberAdults={setNumberAdults}
            numberRoom={numberRoom}
            setNumberChildren={setNumberChildren}
            setNumberRoom={setNumberRoom}
            handlePopoverChange={handlePopoverChange}
          />
        </div>
      </CardText>
      {/* booking tickets */}

      <div id="booking-hotel-container" className="w-full  list-spacing">
        {isLoading
          ? Array.from({ length: listRooms.length }, (_, i) => (
              <LoadingBookingCardHotel key={i} />
            ))
          : listHotelRoomNew.map((room: IHotelRoom, index: number) => (
              <div key={index} className="bg-white shadow-md rounded-lg p-4">
                <div className="flex flex-col space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="text-base md:text-lg font-bold text-blue">
                      {room.name}
                    </h3>
                    {room.numberOfRoom === 0 && (
                      <span className="text-red-600 text-base md:text-lg">
                        Hết phòng
                      </span>
                    )}
                  </div>
                  <ul className="flex flex-wrap gap-2 text-xs">
                    {Array.isArray(room.details) &&
                      room.details.map((detail, i) => (
                        <li key={i} className="flex items-center gap-1">
                          <Check className="size-3 text-green" />
                          <span>{detail}</span>
                        </li>
                      ))}
                  </ul>
                  <div className="flex items-center gap-2 text-sm">
                    <User className="size-4 fill-black" />
                    <X className="size-4" />
                    <span>{room.numberPeople}</span>
                    {room.isAddChildren && (
                      <span className="flex items-center gap-1 text-xs">
                        <UserPlus className="size-4" /> trẻ em
                      </span>
                    )}
                  </div>
                  {chooseInput[index] >= room.numberOfRoom && (
                    <span className="text-red-600 text-xs   lg:hidden">
                      Đã chọn tối đa số phòng
                    </span>
                  )}
                  <div className="flex flex-col md:flex-row gap-y-1 items-start justify-between md:items-center">
                    <div>
                      <div className="line-through text-red-400 text-[0.8rem]">
                        <span className="mr-1">VNĐ</span>
                        {convertVND(room.price)}
                      </div>
                      <div className="text-black text-sm font-semibold">
                        <span className="mr-1">VNĐ</span>
                        {convertVND(
                          room.price - (room.price / 100) * room.sale
                        )}
                      </div>
                      <span className="bg-green_main text-white text-[0.7rem] px-2 py-1 rounded-md">
                        Tiết kiệm {room.sale}%
                      </span>
                    </div>

                    <div className=" flex items-center justify-start lg:space-x-2 shadow-none border-none">
                      {chooseInput[index] >= room.numberOfRoom && (
                        <span className="text-red-600 text-xs ml-2 hidden lg:block">
                          Đã chọn tối đa số phòng còn lại
                        </span>
                      )}
                      <Label
                        className="text-sm font-normal hidden lg:block"
                        htmlFor="adults"
                      >
                        Số lượng:
                      </Label>
                      <div
                        className={`flex items-center border-0.5 border-black_sub justify-center rounded-[4px] ${
                          chooseInput[index] >= room.numberOfRoom &&
                          "border-red-600 border-2"
                        } `}
                      >
                        <Button
                          disabled={
                            chooseInput[index] === 0 || room.numberOfRoom == 0
                          }
                          type="button"
                          onClick={() => handleDecrease(index)}
                          className={cn(
                            "bg-white text-black shadow-none border-none p-0 px-2 hover:bg-black_sub",
                            chooseInput[index] === 0 && "pointer-events-none"
                          )}
                        >
                          <span
                            className={cn(
                              "!text-4xl text-blue_sub font-normal p-2",
                              chooseInput[index] === 0 &&
                                "opacity-40 hover:cursor-none  hover:bg-transparent text-black"
                            )}
                          >
                            -
                          </span>
                        </Button>
                        <Input
                          type="number"
                          id="adults"
                          min="1"
                          value={chooseInput[index]}
                          className="h-8 outline-none bg-white text-base  max-w-[50px] text-black text-center shadow-none border-none"
                          onChange={(e) => {
                            const { value } = e.target;
                            setChooseInput((prev) => {
                              const newChoose = [...prev];
                              newChoose[index] = Math.min(
                                Number(value),
                                room.numberOfRoom
                              );
                              return newChoose;
                            });
                          }}
                          onMouseDown={(e) => e.stopPropagation()}
                          disabled={room.numberOfRoom === 0}
                        />
                        <Button
                          disabled={
                            room.numberOfRoom == 0 ||
                            chooseInput[index] >= room.numberOfRoom
                          }
                          type="button"
                          onClick={() => handleIncrease(index)}
                          className="bg-white hover:bg-black_sub text-black px-2  shadow-none border-none "
                        >
                          <span className="text-3xl text-blue_sub p-2 ">+</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

        {showActionBar && (
          <div className=" w-full bg-white fixed z-[30] bottom-0 left-0 border-t-2 border-t-blue_main_sub  p-4 flex justify-center items-center shadow-2xl  ">
            <div className="container flex items-center justify-between">
              <div className="min-w-[42%] max-w-[55%] line-clamp-2">
                <div className="line-through text-red-400 text-sm">
                  <span className="mr-1">VNĐ</span>
                  {convertVND(total)}
                </div>
                <div className="text-black text-base font-bold">
                  <span className="mr-1">VNĐ</span>
                  {convertVND(totalSale)}
                </div>
              </div>
              {!!user && isAuthenticated ? (
                <Button
                  className="bg-blue_sub text-white hover:bg-blue_active py-2 px-4 rounded-md"
                  onClick={handleBooking}
                  disabled={checkHiddenBtn}
                >
                  Đặt ngay
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    router.push("/sign-in");
                  }}
                  className="bg-blue hover:bg-blue_active text-white"
                >
                  Đăng nhập
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;
