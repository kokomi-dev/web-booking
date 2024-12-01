"use client";

import { vi } from "date-fns/locale";
import React, { useEffect, useState } from "react";
import { Check, TriangleAlert, User, UserPlus, X } from "lucide-react";
import { addDays, format } from "date-fns";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import CardText from "@/components/components/card-text";
import { Button } from "@/components/ui/button";

import SearchDatePickerDou from "@/components/components/search/search-date-picker-dou";
import SearchSelectPerson from "@/components/components/search/search-select-person";
import { convertVND } from "@/utils/constants";
import { Input } from "@/components/ui/input";
import { useBookingInfoStore } from "@/store/booking-info";
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
      await setBookingInfo({
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
    <div className="w-full">
      <div
        className="w-full flex items-start justify-start flex-col gap-2 h-full p-3 bg-sub rounded-xl text-normal"
        id="price"
      >
        {/* choose person and room */}
        <CardText title="Thông tin đặt phòng">
          <div className="flex items-center justify-start gap-x-2">
            <TriangleAlert className="text-yellow_main" />
            <h5 className="text-small mb-1">
              Vui lòng chọn đúng đủ số người cho phòng để có trải nghiệm tốt
              nhất !
            </h5>
          </div>
          <div className="bg-bg_primary_yellow w-fit flex flex-col lg:flex-row items-center justify-start gap-x-2 p-2 rounded-8">
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
        <div id="booking-hotel-container" className="w-full overflow-x-scroll">
          <table className="w-full lg:mt-4 border-collapse border-0.5 border-blue_main_sub overflow-auto">
            <thead className="w-full h-[36px] border-0.5 border-white bg-bg_primary_main text-white  p-2 text-small font-semibold">
              <tr className="w-full">
                <th className="min-w-[150px] lg:max-w-[30%] lg:w-full border-0.5 border-white  ">
                  Loại chỗ nghỉ
                </th>
                <th className="w-[80px] lg:w-auto border-0.5 border-white">
                  Số lượng khách
                </th>
                <th className="w-[180px] lg:w-auto border-0.5 border-white">
                  Giá{" "}
                </th>
                <th className="min-w-[80px] text-center border-0.5 border-white">
                  Chọn số phòng
                </th>
                <th className="min-w-[180px] lg:w-auto border-0.5 border-white"></th>
              </tr>
            </thead>
            <tbody>
              {listRooms.map((room, index) => {
                return (
                  <tr key={index} className="w-full table__booking  ">
                    <td className="p-2 w-[150px] lg:max-w-[30%] lg:w-full ">
                      <span className="text-blue_main underline font-bold">
                        {" "}
                        {room.name}
                      </span>
                      <ul className="flex flex-wrap">
                        {room.details.map((detail, index) => {
                          return (
                            <li
                              key={index}
                              className="text-smallest grid grid-cols-[5%,95%] gap-x-3 md:gap-x-4 items-center "
                            >
                              <Check className="size-3 text-green_main " />
                              <span className="text-start">{detail}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </td>
                    <td className="w-[80px] lg:w-auto  p-2 text-small font-normal text-start   ">
                      <span className="flex items-center justify-start gap-x-1">
                        <User className="size-4 fill-black" />
                        <X className="size-4" />
                        <span className="text-small"> {room.numberPeople}</span>
                      </span>
                      {room.isAddChildren && (
                        <span className="w-full flex items-center justify-start gap-x-1 text-smallest mt-1">
                          <UserPlus className="size-4" />
                          trẻ em
                        </span>
                      )}
                    </td>
                    <td className="w-[180px] lg:w-auto  grid grid-cols-1 gap-y-1 p-2  ">
                      <span className="text-red-400  font-medium text-[0.8rem] line-through">
                        <span className="mr-1">VNĐ</span>
                        {convertVND(room.price)}
                      </span>
                      <span className="text-black_main text-small  font-semibold">
                        <span className="mr-1">VNĐ</span>
                        {convertVND(
                          room.price - (room.price / 100) * room.sale
                        )}
                      </span>
                      <span className="bg-green_main text-white text-[0.7rem] w-fit p-1 rounded-8">
                        Tiết kiệm {room.sale} %
                      </span>
                    </td>
                    <td
                      className="text-center w-[80px] lg:w-auto pl-2 "
                      align="center"
                    >
                      <Input
                        type="number"
                        placeholder=""
                        className=" border-0.5 border-black_main"
                        value={chooseInput[index]}
                        min={0}
                        max={50}
                        onChange={(e) => {
                          const { value } = e.target;
                          setChooseInput((pre) => {
                            const newChoose = [...pre];
                            newChoose[index] = Number(value);
                            return newChoose;
                          });
                        }}
                      />
                    </td>
                    {index === 0 && (
                      <td className="p-2 lg:w-auto " rowSpan={listRooms.length}>
                        {chooseInput && checkHiddenBtn !== true && (
                          <div className="grid mb-4 gap-y-1">
                            <div className="line-through text-red-400 text-small font-normal">
                              <span className="mr-1">VNĐ</span>
                              <span>{convertVND(total)}</span>
                            </div>
                            <div className="text-black_main text-normal font-bold">
                              <span className="mr-1">VNĐ</span>
                              <span>{convertVND(totalSale)}</span>
                            </div>
                            <div>
                              {total && totalSale !== 0 ? (
                                <span className="bg-green_main text-white text-[0.7rem] w-fit p-1 rounded-8">
                                  <span>
                                    Tiết kiệm{" "}
                                    {(100 - (totalSale / total) * 100).toFixed(
                                      2
                                    )}{" "}
                                    %
                                  </span>
                                </span>
                              ) : (
                                ""
                              )}
                            </div>
                            <span className="text-black_sub text-small">
                              Đã bao gồm thuế và phí
                            </span>
                          </div>
                        )}
                        <Button
                          className="w-full h-auto bg-bg_primary_blue_sub text-white select-none"
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
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Booking;
