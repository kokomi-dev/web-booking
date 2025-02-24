"use client";

import { addDays, format } from "date-fns";
import { vi } from "date-fns/locale";
import { Check, TriangleAlert, User, UserPlus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import CardText from "@/components/components/card-text";
import { Button } from "@/components/ui/button";

import SearchDatePickerDou from "@/components/components/search/search-date-picker-dou";
import SearchSelectPerson from "@/components/components/search/search-select-person";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthenticatedStore } from "@/store/authencation-store";
import { useBookingInfoStore } from "@/store/booking-info";
import { IHotelRoom } from "@/types/hotel.type";
import { cn, convertVND } from "@/utils/constants";
import dynamic from "next/dynamic";
const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.div),
  { ssr: false }
);
const Booking = ({
  slug,
  listRooms,
}: {
  slug: string;
  listRooms: [IHotelRoom];
}) => {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthenticatedStore();
  const { setBookingInfo } = useBookingInfoStore();
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
      setBookingInfo({
        chooseInput,
      });
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
    setBookingInfo,
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
    <div
      className="w-full h-full posing-vertical-4 p-2  lg:p-3 bg-sub rounded-xl text-normal"
      id="price"
    >
      {/* choose person and room */}
      <CardText title="Thông tin đặt phòng" className="">
        <div className="hidden lg:flex items-center justify-start gap-x-2">
          <TriangleAlert className="text-yellow_main" />
          <h5 className="text-small mb-2">
            Vui lòng chọn đúng đủ số người cho phòng để có trải nghiệm tốt nhất
            !
          </h5>
        </div>
        <div className="bg-bg_primary_yellow w-full flex flex-col lg:flex-row items-center justify-start gap-x-2 p-2 rounded-8">
          <SearchDatePickerDou
            className="text-black w-full h-[36px]  text-medium font-medium"
            date={date}
            setDate={setDate}
          />
          <SearchSelectPerson
            setError={setError}
            className=" w-full h-[36px] text-medium font-semibold mt-2 lg:mt-0"
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

      <div id="booking-hotel-container" className="w-full  space-y-4">
        {listRooms.map((room, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-4">
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-blue_main">
                  {room.name}
                </h3>
                {room.numberOfRoom === 0 && (
                  <span className="text-red-600">Hết phòng</span>
                )}
              </div>
              <ul className="flex flex-wrap gap-2 text-smallest">
                {Array.isArray(room.details) &&
                  room.details.map((detail, i) => (
                    <li key={i} className="flex items-center gap-1">
                      <Check className="size-3 text-green_main" />
                      <span>{detail}</span>
                    </li>
                  ))}
              </ul>
              <div className="flex items-center gap-2 text-small">
                <User className="size-4 fill-black" />
                <X className="size-4" />
                <span>{room.numberPeople}</span>
                {room.isAddChildren && (
                  <span className="flex items-center gap-1 text-smallest">
                    <UserPlus className="size-4" /> trẻ em
                  </span>
                )}
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <div className="line-through text-red-400 text-[0.8rem]">
                    <span className="mr-1">VNĐ</span>
                    {convertVND(room.price)}
                  </div>
                  <div className="text-black_main text-small font-semibold">
                    <span className="mr-1">VNĐ</span>
                    {convertVND(room.price - (room.price / 100) * room.sale)}
                  </div>
                  <span className="bg-green_main text-white text-[0.7rem] px-2 py-1 rounded-md">
                    Tiết kiệm {room.sale}%
                  </span>
                </div>
                <div className=" flex items-center justify-start lg:space-x-2 shadow-none border-none">
                  <Label
                    className="text-small font-normal hidden lg:block"
                    htmlFor="adults"
                  >
                    Số lượng:
                  </Label>
                  <div className="flex items-center border-0.5 border-black_sub justify-center rounded-[4px] ">
                    <Button
                      disabled={
                        chooseInput[index] === 0 || room.numberOfRoom == 0
                      }
                      type="button"
                      onClick={() => handleDecrease(index)}
                      className={cn(
                        "bg-white text-black shadow-none border-none p-0 px-2 hover:bg-bg_black_sub",
                        chooseInput[index] === 0 && "pointer-events-none"
                      )}
                    >
                      <span
                        className={cn(
                          "!text-large text-blue_main_sub font-normal p-1",
                          chooseInput[index] === 0 &&
                            "opacity-40 hover:cursor-none !text-large hover:bg-transparent text-black_main"
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
                      className="h-8 outline-none bg-white text-normal  max-w-[50px] text-black text-center shadow-none border-none"
                      onChange={(e) => {
                        const { value } = e.target;
                        setChooseInput((prev) => {
                          const newChoose = [...prev];
                          newChoose[index] = Number(value);
                          return newChoose;
                        });
                      }}
                      onMouseDown={(e) => e.stopPropagation()}
                      disabled={room.numberOfRoom === 0}
                    />
                    <Button
                      disabled={room.numberOfRoom == 0}
                      type="button"
                      onClick={() => handleIncrease(index)}
                      className="bg-white hover:bg-bg_black_sub text-black px-2  shadow-none border-none "
                    >
                      <span className="text-large text-blue_main_sub font-light">
                        +
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <MotionDiv
          key={showActionBar ? "visible" : "hidden"}
          initial="hidden"
          animate={showActionBar ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0, y: 100, scale: 0.9 },
            visible: { opacity: 1, y: 0, scale: 1 },
          }}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
            bounce: 0.3,
          }}
        >
          <div className="container-padding fixed z-[30] bottom-0 left-0 w-full bg-white  p-4 flex justify-between items-center shadow-2xl border-t-2 border-t-blue_main_sub">
            <div className="min-w-[42%] max-w-[55%] line-clamp-2">
              <div className="line-through text-red-400 text-small">
                <span className="mr-1">VNĐ</span>
                {convertVND(total)}
              </div>
              <div className="text-black_main text-normal font-bold">
                <span className="mr-1">VNĐ</span>
                {convertVND(totalSale)}
              </div>
            </div>
            {!!user && isAuthenticated ? (
              <Button
                className="bg-bg_primary_blue_sub text-white hover:bg-bg_primary_active py-2 px-4 rounded-md"
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
                className="bg-bg_primary_main hover:bg-bg_primary_active text-white"
              >
                Đăng nhập
              </Button>
            )}
            <div></div>
          </div>
        </MotionDiv>
      </div>
    </div>
  );
};

export default Booking;
