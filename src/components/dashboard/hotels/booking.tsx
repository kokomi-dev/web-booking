"use client";

import { vi } from "date-fns/locale";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { CircleCheck, TriangleAlert } from "lucide-react";
import { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";
import { useRouter } from "next/navigation";

import CardText from "@/components/components/card-text";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "@radix-ui/react-icons";
import { DatePicker, SelectNumberPerson } from "@/constants";
import { toast } from "react-toastify";
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
  const [date, setDate] = React.useState<DateRange | SetStateAction<DateRange>>(
    {
      from: new Date(),
      to: addDays(new Date(), 2),
    }
  );
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

      console.log("kq ", result);

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
        className="w-full flex items-start justify-start flex-col gap-2 h-full p-3 bg-sub rounded-xl "
        id="price"
      >
        {/* choose date */}
        <h3 className="text-medium font-semibold">
          Chọn ngày nhận và trả phòng
        </h3>
        <div className="flex_dou bg-bg_primary_blue_sub text-white rounded-xl">
          <CalendarIcon className="mr-3  h-[1.3rem] w-[1.3rem] text-yellow_main" />
          <DatePicker className="" date={date} setDate={setDate} />
        </div>
        {/* choose person and room */}
        <CardText title="Chọn số lượng người">
          <div className="flex items-center justify-start gap-x-2">
            <TriangleAlert className="text-yellow_main" />
            <h5 className="text-small">
              Vui lòng chọn đúng đủ số người ( nếu bạn đăng kí không trung thực
              chúng tôi sẽ không thể giao nhấn phòng cho bạn)
            </h5>
          </div>
          <SelectNumberPerson
            error={error}
            setError={setError}
            className="bg-bg_primary_blue_sub text-white"
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
        </CardText>
        {/* booking tickets */}
        <CardText title="Chọn loại phòng">
          <table className="table__booking w-full">
            <thead>
              <tr>
                <th>Giá đã gồm</th>
                <th>Sức chứa</th>
                <th>Giá phòng( ngày/đêm )</th>
                <th>Lựa chọn</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <ol>
                    <li className="flex_dou">
                      <CircleCheck className="text-[1rem] text-[#018235]" />
                      <span> Miễn phí hủy trước 3 ngày</span>
                    </li>
                    <li className="flex_dou">
                      <CircleCheck className="text-[1rem] text-[#018235]" />
                      <span>Thanh toán tại nơi ở</span>
                    </li>

                    <li className="flex_dou">
                      <CircleCheck className="text-[1rem] text-[#018235]" />
                      <span>Các tiện nghi đầy đủ kể trên</span>
                    </li>
                    <li className="flex_dou">
                      <CircleCheck className="text-[1rem] text-[#018235]" />
                      <span>Cam kết chất lượng, phục vụ</span>
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
                  <Button variant="outline">Tư vấn</Button>
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
