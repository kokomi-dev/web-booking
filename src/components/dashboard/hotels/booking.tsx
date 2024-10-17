"use client";

import { vi } from "date-fns/locale";
import React, { Dispatch, SetStateAction, useState } from "react";
import { CalendarIcon, CircleCheck, TriangleAlert } from "lucide-react";
import { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";
import { useRouter } from "next/navigation";

import CardText from "@/components/components/card-text";
import { Button } from "@/components/ui/button";
import {
  DatePickerDou,
  SelectNumberPerson,
} from "@/components/components/search";
import { toast } from "react-toastify";
import { IoPersonOutline } from "react-icons/io5";
const Booking = ({
  price,
  sales,
  slug,
}: {
  price: [number, number];
  sales: number;
  slug: string;
}) => {
  const router = useRouter();
  const [date, setDate] = React.useState<any>({
    from: new Date(),
    to: addDays(new Date(), 2),
  });
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [numberAdults, setNumberAdults] = useState<number>(0);
  const [numberChildren, setNumberChildren] = useState<number>(0);
  const [numberRoom, setNumberRoom] = useState<number>(1);
  const [numberRoomDouble, setNumberRoomDouble] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);

  const handlePopoverChange = (open: boolean) => {
    setPopoverOpen(open);
    if (!open) {
      const numberPerson = numberAdults + numberChildren;
      const result = numberPerson / 2 <= numberRoom;
      const result2 = numberPerson / 2 < numberRoomDouble;

      if (result === false) {
        setPopoverOpen(true);
        setError(true);
        toast.error("Số phòng đơn không đủ cho số người đã chọn.");
      } else if (numberRoomDouble > 0) {
        if (result2 === false) {
          setError(true);
          toast.error("Số phòng đôi không đủ cho số người đã chọn.");
        }
      } else {
        setError(false);
      }
    }
  };
  const handleBooking = () => {
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
          "&numberRoomDouble=" +
          numberRoomDouble
      );
    }
  };

  return (
    <div className="w-full">
      <div
        className="w-full flex items-start justify-start flex-col gap-2 h-full p-3 bg-sub rounded-xl text-normal"
        id="price"
      >
        {/* choose date */}
        <h3 className="text-medium font-semibold">
          Chọn ngày nhận và trả phòng
        </h3>
        <div className="w-full flex_dou bg-white text-black rounded-8">
          <CalendarIcon className="mr-3 text-black text-large" />
          <DatePickerDou
            className="text-black w-full text-medium font-semibold"
            date={date}
            setDate={setDate}
          />
        </div>
        {/* choose person and room */}
        <CardText title="Chọn số lượng người">
          <div className="flex items-center justify-start gap-x-2">
            <TriangleAlert className="text-yellow_main" />
            <h5 className="text-small mb-1">
              Vui lòng chọn đúng đủ số người ( nếu bạn đăng kí không trung thực
              chúng tôi sẽ không thể giao nhấn phòng cho bạn)
            </h5>
          </div>
          <div className="bg-bg_primary_blue_sub flex items-center justify-start gap-x-2 px-2 rounded-8">
            <IoPersonOutline className="text-large font-medium text-white " />
            <SelectNumberPerson
              isBooking
              error={error}
              setError={setError}
              className=" rounded-8 p-4 w-full text-medium font-semibold text-white"
              popoverOpen={popoverOpen}
              setPopoverOpen={setPopoverOpen}
              numberAdults={numberAdults}
              numberChildren={numberChildren}
              numberRoom={numberRoom}
              numberRoomDouble={numberRoomDouble}
              setNumberAdults={setNumberAdults}
              setNumberChildren={setNumberChildren}
              setNumberRoom={setNumberRoom}
              setNumberRoomDouble={setNumberRoomDouble}
              handlePopoverChange={handlePopoverChange}
            />
          </div>
        </CardText>
        {/* booking tickets */}
        <CardText title="Chọn loại phòng">
          <table className="table__booking w-full">
            <thead>
              <tr>
                <th className="text-normal font-semibold">Giá đã gồm</th>
                <th className="text-normal font-semibold">Sức chứa</th>
                <th className="text-normal font-semibold">
                  Giá phòng( ngày/đêm )
                </th>
                <th className="text-normal font-semibold">Lựa chọn</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <ol>
                    <li className="flex_dou">
                      <CircleCheck className="text-[1rem] text-[#018235]" />
                      <span className="text-normal font-normal">
                        {" "}
                        Miễn phí hủy trước 3 ngày
                      </span>
                    </li>
                    <li className="flex_dou">
                      <CircleCheck className="text-[1rem] text-[#018235]" />
                      <span className="text-normal font-normal">
                        Thanh toán tại nơi ở
                      </span>
                    </li>

                    <li className="flex_dou">
                      <CircleCheck className="text-[1rem] text-[#018235]" />
                      <span className="text-normal font-normal">
                        Các tiện nghi đầy đủ kể trên
                      </span>
                    </li>
                    <li className="flex_dou">
                      <CircleCheck className="text-[1rem] text-[#018235]" />
                      <span className="text-normal font-normal">
                        Cam kết chất lượng, phục vụ
                      </span>
                    </li>
                  </ol>
                </td>
                <td>
                  <div>
                    <div className="font-medium">
                      Phòng đơn :{" "}
                      <span className="font-normal underline italic">
                        1 giường (2 người)
                      </span>
                    </div>
                  </div>
                  <div className="font-medium">
                    Phòng đôi :{" "}
                    <span className="font-normal underline italic">
                      2 giường (4 người)
                    </span>
                  </div>
                </td>
                <td>
                  <ul>
                    <li>1 : {price[0]} vnđ</li>
                    <li>2 : {price[1]} vnđ</li>
                  </ul>
                </td>
                <td>
                  <div>
                    <h5 className="title_small text-yellow_main">
                      Giảm giá:
                      <span>
                        {sales} %
                        <span className="text-black_sub">
                          (đặt qua KoKo Travel)
                        </span>
                      </span>
                    </h5>
                  </div>
                  <Button
                    disabled={!date || !numberAdults || error}
                    className="mr-3 bg-bg_primary_blue_sub text-white "
                    onClick={handleBooking}
                  >
                    Đặt ngay
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-bg_black_sub text-black"
                  >
                    Tư vấn
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </CardText>
      </div>
    </div>
  );
};

export default Booking;
