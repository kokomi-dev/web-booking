"use client";
import React, { useEffect, useState, useRef, Suspense } from "react";
import { useParams } from "next/navigation";
import { GoStarFill } from "react-icons/go";
import { FaCalendarXmark, FaCheck } from "react-icons/fa6";
import { IoLocation } from "react-icons/io5";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import { vi } from "date-fns/locale";
import Image from "next/image";

import { getDetailHotel } from "@/api/api-hotel";
import CardText from "@/components/components/card-text";
import { CalendarIcon } from "@radix-ui/react-icons";
import Loader from "@/components/components/loading-item";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { SelectNumberPerson } from "@/constants";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Loading from "@/app/loading";
type HotelData = {
  name: string;
  details: [string];
  location: string;
  rating: number;
  images: string[];
  city: string;
  type: number;
  highlights: [string];
  price: [number, number];
  sales: number;
};

const Page = () => {
  const { slug } = useParams<{ slug: string }>();
  const [data, setData] = useState<HotelData | null>(null);
  const [hour, setHour] = useState<string>("7h00");
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 2),
  });
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [numberAdults, setNumberAdults] = useState<number>(1);
  const [numberChildren, setNumberChildren] = useState<number>(0);
  const [numberRoom, setNumberRoom] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(true);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const HotelData = await getDetailHotel({ slug });
        setData(HotelData.data);
      } catch (error) {
        console.error("Failed to fetch tour details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (slug) {
      fetchData();
    }
  }, [slug]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [data]);
  // datePickerDou
  const DatePicker = ({ className }: any) => {
    return (
      <div className={cn("w-full grid gap-2", className)}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              className={cn(
                "min-w-full justify-start text-left text-[1rem] font-[500]  bg-transparent text-white shadow-none",
                !date && "bg-transparent w-full"
              )}
            >
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "dd/MM/yyyy", { locale: vi })} -{" "}
                    {format(date.to, "dd/MM/yyyy", { locale: vi })}
                  </>
                ) : (
                  format(date.from, "dd/MM/yyyy", { locale: vi })
                )
              ) : (
                <span className="">Chọn ngày đi và trả phòng</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto p-0 bg-bg_black_sub z-[15] text-black"
            align="center"
          >
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
              locale={vi}
              className="text-[1.2rem] font-[500]"
            />
          </PopoverContent>
        </Popover>
      </div>
    );
  };
  const scrollToView = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
    } else {
      console.error("Element with id 'info_utilities' not found.");
    }
  };
  return (
    <div className="w-full h-full">
      {isLoading ? (
        <Loading fix />
      ) : data ? (
        <Suspense fallback={<Loading />}>
          <div className={cn("w-full h-full ")}>
            <h1 className="text-center my-3 text-[1.1rem] font-medium underline mb-6">
              Lưu ý: tất cả các ảnh của chúng tôi là ảnh thật. Giá đã bao gồm
              thuế VAT
            </h1>
            <div className="flex items-center justify-between border-b-[1px] pb-6 border-blue_main_sub mb-6 ">
              <div
                className="text-center scroll-smooth w-full cursor-pointer "
                onClick={() => {
                  scrollToView("overview");
                }}
              >
                Tổng quan
              </div>
              <div
                className="text-center scroll-smooth w-full cursor-pointer"
                onClick={() => {
                  scrollToView("info_utilities");
                }}
              >
                Thông tin và tiện ích
              </div>
              <div
                className="text-center scroll-smooth w-full cursor-pointer"
                onClick={() => {
                  scrollToView("price");
                }}
              >
                Giá đặt phòng
              </div>
              <div
                className="text-center scroll-smooth w-full cursor-pointer"
                onClick={() => {
                  scrollToView("general_rule");
                }}
              >
                Quy tắc chung
              </div>
              <div
                className="text-center scroll-smooth w-full cursor-pointer"
                onClick={() => {
                  scrollToView("comments");
                }}
              >
                Đánh giá của khách hàng
              </div>
            </div>
            {/* info */}
            <div className="w-full" id="overview">
              <h1 className="title_largest">{data.name}</h1>
              <address className="my-3 flex_dou">
                <IoLocation className="text-blue_main_sub text-[1.4rem]" />
                {data.location}
              </address>
              <p className=" text-[0.98rem] my-2 px-3 text-justify">
                {data.details}
              </p>
              <h6 className="flex items-center justify-start mb-2">
                <GoStarFill className="text-yellow_main text-[1.6rem] mr-2" />
                <span className="text-[1.3rem] mr-2">
                  {data.rating}{" "}
                  {data.rating > 4 ? (
                    <span className="text-[0.98rem] font-medium">Rất tốt</span>
                  ) : (
                    <span className="text-[0.98rem] font-medium">Tốt</span>
                  )}
                </span>
                <span className="text-[0.9rem] text-black_sub ">
                  ( 0 đánh giá )
                </span>
              </h6>
            </div>
            {/* images */}
            <div className="w-full h-auto grid gap-3 grid-cols-3 mt-3">
              {data.images.map((img: string, index: number) => (
                <Image
                  key={index}
                  width={500}
                  height={300}
                  src={img}
                  alt={`một vài ảnh giới thiệu về tour du lịch ${data.name}`}
                  className={
                    index === 0 ? "image-item-largest" : "image-item-small"
                  }
                />
              ))}
            </div>
            <div className="w-full h-full" id="info_utilities">
              {/*  */}
              <div className="flex items-center my-5">
                <FaCalendarXmark className="text-blue_main_sub text-[1.3rem] mr-2" />
                <span>
                  Bạn có thể hủy trong vòng 4 tiếng từ khi đặt vé với chúng tôi
                  hoặc trước 2 ngày đến lịch đặt ( ngoài thời gian quy định
                  chúng tôi sẽ trừ tiền chiết khấu với quý khách )
                </span>
              </div>
              {/* content */}
              <div className="w-full h-full ">
                <CardText title="Mô tả về chúng tôi">
                  <span className="list-none p_type_1 ">{data.details}</span>
                </CardText>
                {/* healthy */}
                <CardText title="Các tiện nghi được ưa chuộng nhất">
                  <ul className="pl-3 list-disc">
                    {data.highlights.map((highlight: string, index: number) => {
                      return (
                        <li
                          key={index}
                          className="flex items-center justify-start gap-3 py-2"
                        >
                          <FaCheck className="text-[1rem] text-[#018235]" />
                          {highlight}
                        </li>
                      );
                    })}
                  </ul>
                </CardText>
                {/* location on map */}
                <CardText title="Vị trí">
                  Vị trí khách sạn ( nhà nghỉ ) trên bản đồ
                </CardText>
              </div>
              {/* booking */}
              <div
                className="w-full flex items-start justify-start flex-col gap-2 h-full p-3 bg-sub rounded-xl "
                id="price"
              >
                <h3 className="title_large">Chọn ngày nhận và trả phòng</h3>
                <div className="flex_dou bg-bg_primary_blue_sub text-white rounded-xl">
                  <CalendarIcon className="mr-3  h-[1.3rem] w-[1.3rem] text-yellow_main" />
                  <DatePicker />
                </div>
                <CardText title="Chọn số lượng người">
                  <h5 className="my-3">
                    Vui lòng chọn đúng đủ số người ( nếu bạn đăng kí không trung
                    thực chúng tôi sẽ không thể giao nhấn phòng cho bạn)
                  </h5>
                  <SelectNumberPerson
                    className="bg-bg_primary_blue_sub text-white"
                    popoverOpen={popoverOpen}
                    setPopoverOpen={setPopoverOpen}
                    numberAdults={numberAdults}
                    numberChildren={numberChildren}
                    numberRoom={numberRoom}
                    setNumberAdults={setNumberAdults}
                    setNumberChildren={setNumberChildren}
                    setNumberRoom={setNumberRoom}
                  />
                </CardText>
                {/* booking tickets */}
                <CardText title="Chọn loại phòng">
                  <table className="table__booking w-full">
                    <tr>
                      <th>Giá đã gồm</th>
                      <th>Sức chứa</th>
                      <th>Giá phòng( ngày/đêm )</th>
                      <th>Lựa chọn</th>
                    </tr>
                    <tbody>
                      <tr>
                        <td>
                          <ol>
                            <li className="flex_dou">
                              <FaCheck className="text-[1rem] text-[#018235]" />
                              <span> Miễn phí hủy trước 3 ngày</span>
                            </li>
                            <li className="flex_dou">
                              <FaCheck className="text-[1rem] text-[#018235]" />
                              <span>Thanh toán tại nơi ở</span>
                            </li>

                            <li className="flex_dou">
                              <FaCheck className="text-[1rem] text-[#018235]" />
                              <span>Các tiện nghi đầy đủ kể trên</span>
                            </li>
                            <li className="flex_dou">
                              <FaCheck className="text-[1rem] text-[#018235]" />
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
                            <li>1 : {data.price[0]} vnđ</li>
                            <li>2 : {data.price[1]} vnđ</li>
                          </ul>
                        </td>
                        <td>
                          <div>
                            <h5 className="title_small text-yellow_main">
                              Giảm giá:
                              <span>
                                {data.sales}%{" "}
                                <span className="text-black_sub">
                                  (đặt qua KoKo Travel)
                                </span>
                              </span>
                            </h5>
                          </div>
                          <Button className="mr-3 bg-bg_primary_blue_sub text-white">
                            Đặt ngay
                          </Button>
                          <Button variant="outline">Tư vấn</Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </CardText>
              </div>
              {/* regulations */}
              <div
                className="border-1 rounded-8 p-4 my-3 border-blue_main_sub"
                id="general_rule"
              >
                <h3 className="title_large">Quy định về chỗ nghỉ</h3>
                <div>
                  <h5 className="title_medium">Trẻ em và giường phụ</h5>
                  <p className="p_type_2">
                    Giường phụ tùy thuộc vào loại phòng bạn chọn, xin vui lòng
                    kiểm tra thông tin phòng để biết thêm chi tiết. Tất cả trẻ
                    em đều được chào đón.
                  </p>
                </div>
                <div className="w-full  flex items-center justify-start gap-2 mt-3">
                  <div className="border_div_card h-[120px]">
                    <div>
                      <h3 className="title_medium">
                        Trẻ em 0-2 tuổi [bao gồm cả bé 2 tuổi]
                      </h3>
                    </div>
                    <hr />
                    <div className="mt-2">
                      <h5 className="">Ở miễn phí nếu sử dụng giường có sẵn</h5>
                      <p className="p_type_2">
                        Nếu cần một giường phụ thì sẽ phụ thu thêm.
                      </p>
                    </div>
                  </div>
                  <div className="border_div_card h-[120px]">
                    <div>
                      <h3 className="title_medium">
                        Những khách từ 3 tuổi trở lên tính là người lớn
                      </h3>
                    </div>
                    <hr />
                    <div className="mt-2">
                      <p className="p_type_2">
                        Cần đặt thêm một giường phụ và sẽ phụ thu thêm.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* comments */}
              <CardText title="Đánh giá của khách hàng">â</CardText>
              <div id="comments"></div>
            </div>
          </div>
        </Suspense>
      ) : (
        <div>Không tìm thấy dữ liệu</div>
      )}
    </div>
  );
};

export default Page;
