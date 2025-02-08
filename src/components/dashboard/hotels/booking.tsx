"use client";

import { addDays, format } from "date-fns";
import { vi } from "date-fns/locale";
import { Check, TriangleAlert, User, UserPlus, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import CardText from "@/components/components/card-text";
import { Button } from "@/components/ui/button";

import SearchDatePickerDou from "@/components/components/search/search-date-picker-dou";
import SearchSelectPerson from "@/components/components/search/search-select-person";
import { Input } from "@/components/ui/input";
import { useBookingInfoStore } from "@/store/booking-info";
import { convertVND } from "@/utils/constants";
const Booking = ({
  slug,
  listRooms,
}: {
  slug: string;
  listRooms: [
    {
      name: string;
      details: string[];
      price: number;
      sale: number;
      isAddChildren: boolean;
      numberPeople: number;
    }
  ];
}) => {
  const router = useRouter();
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
  const handlePopoverChange = (open: boolean) => {
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
  };
  const handleBooking = async () => {
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
          total
      );
    }
  };
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
  }, [chooseInput]);

  return (
    <div
      className="w-full h-full flex items-start justify-start flex-col gap-2  p-3 bg-sub rounded-xl text-normal"
      id="price"
    >
      {/* choose person and room */}
      <CardText title="Thông tin đặt phòng">
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
      <div
        id="booking-hotel-container"
        className="w-full h-full  overflow-x-scroll !bg-sub scrollbar-hide"
      >
        <table className="w-full  bg-sub border border-blue_main_sub border-collapse overflow-x-auto lg:overflow-visible">
          <thead className="bg-bg_primary_main text-white text-small font-semibold">
            <tr>
              <th className="min-w-[150px] lg:max-w-[30%] border border-blue_main_sub px-2 py-1">
                Loại chỗ nghỉ
              </th>
              <th className="min-w-[100px] text-center border border-blue_main_sub px-2 py-1">
                Số lượng khách
              </th>
              <th className="min-w-[180px] text-center border border-blue_main_sub px-2 py-1">
                Giá
              </th>
              <th className="min-w-[100px] text-center border border-blue_main_sub px-2 py-1">
                Chọn số phòng
              </th>
              <th className="min-w-[180px] border border-blue_main_sub"></th>
            </tr>
          </thead>
          <tbody>
            {listRooms.map((room, index) => (
              <tr key={index} className="border border-blue_main_sub">
                <td className="p-2 border border-blue_main_sub text-start">
                  <span className="text-blue_main underline font-bold">
                    {room.name}
                  </span>
                  <ul className="flex flex-wrap gap-1 mt-1">
                    {Array.isArray(room.details) &&
                      room.details.map((detail, i) => (
                        <li
                          key={i}
                          className="flex gap-2 text-smallest items-center"
                        >
                          <Check className="size-3 flex-shrink-0  text-green_main" />
                          <span className="break-words">{detail}</span>
                        </li>
                      ))}
                  </ul>
                </td>
                <td className="p-2 border border-blue_main_sub text-center">
                  <span className="flex items-center justify-center gap-1">
                    <User className="size-4 fill-black" />
                    <X className="size-4" />
                    <span>{room.numberPeople}</span>
                  </span>
                  {room.isAddChildren && (
                    <span className="flex items-center justify-center text-smallest mt-1">
                      <UserPlus className="size-4" /> trẻ em
                    </span>
                  )}
                </td>
                <td className="p-2 border border-blue_main_sub text-center">
                  <div className="line-through text-red-400 text-[0.8rem]">
                    <span className="mr-1">VNĐ</span>
                    {convertVND(room.price)}
                  </div>
                  <div className="text-black_main text-small font-semibold">
                    <span className="mr-1">VNĐ</span>
                    {convertVND(room.price - (room.price / 100) * room.sale)}
                  </div>
                  <span className="bg-green_main text-white text-[0.7rem] p-1 rounded-8">
                    Tiết kiệm {room.sale} %
                  </span>
                </td>
                <td className="pl-[2%] ">
                  <Input
                    type="number"
                    className="border border-black_main w-[70px] text-center"
                    value={chooseInput[index]}
                    min={0}
                    max={50}
                    onChange={(e) => {
                      const { value } = e.target;
                      setChooseInput((prev) => {
                        const newChoose = [...prev];
                        newChoose[index] = Number(value);
                        return newChoose;
                      });
                    }}
                  />
                </td>
                {index === 0 && (
                  <td
                    className="p-2 align-top border border-blue_main_sub"
                    rowSpan={listRooms.length}
                  >
                    {chooseInput && !checkHiddenBtn && (
                      <div className="mb-4">
                        <div className="line-through text-red-400 text-small">
                          <span className="mr-1">VNĐ</span>
                          {convertVND(total)}
                        </div>
                        <div className="text-black_main text-normal font-bold">
                          <span className="mr-1">VNĐ</span>
                          {convertVND(totalSale)}
                        </div>
                        <div>
                          {total && totalSale !== 0 && (
                            <span className="bg-green_main text-white text-[0.7rem] p-1 rounded-8">
                              Tiết kiệm{" "}
                              {(100 - (totalSale / total) * 100).toFixed(2)} %
                            </span>
                          )}
                        </div>
                        <span className="text-black_sub text-small">
                          Đã bao gồm thuế và phí
                        </span>
                      </div>
                    )}
                    <Button
                      className="w-full bg-bg_primary_blue_sub text-white"
                      onClick={handleBooking}
                      disabled={checkHiddenBtn}
                    >
                      Đặt ngay
                    </Button>
                    <ul className="text-smallest pl-3 mt-2">
                      <li>Chỉ mất 2 phút</li>
                      <li>Xác thực tức thời</li>
                    </ul>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Booking;
