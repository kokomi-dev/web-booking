"use client";
import React, { useEffect, useState, useRef, Suspense } from "react";
import { useParams } from "next/navigation";
import { FaCalendarXmark, FaCheck } from "react-icons/fa6";

import { getDetailHotel } from "@/api/api-hotel";
import CardText from "@/components/components/card-text";
import { cn } from "@/lib/utils";

import Info from "@/components/dashboard/hotels/info";
import Loading from "@/app/loading";
import Booking from "@/components/dashboard/hotels/booking";
export type HotelData = {
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
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<HotelData | null>(null);

  const { slug } = useParams<{ slug: string }>();

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
        <Loading />
      ) : data ? (
        <Suspense fallback={<Loading />}>
          <div className={cn("w-full h-full ")}>
            <h1 className="text-center my-3 text-normal font-medium underline mb-6">
              Lưu ý: tất cả các ảnh của chúng tôi là ảnh thật. Giá đã bao gồm
              thuế VAT
            </h1>
            <div className="w-full text-small flex items-center justify-between border-b-[1px] pb-3 border-blue_main_sub mb-6 ">
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
            <Info
              name={data.name}
              location={data.location}
              rating={data.rating}
              details={data.details}
              images={data.images}
            />
            <div
              className="w-full h-full flex flex-col items-start justify-start gap-y-4"
              id="info_utilities"
            >
              <div className="w-full flex items-center">
                <FaCalendarXmark className="text-blue_main_sub text-[1.3rem] mr-2" />
                <span>
                  Bạn có thể hủy trong vòng 4 tiếng từ khi đặt vé với chúng tôi
                  hoặc trước 2 ngày đến lịch đặt ( ngoài thời gian quy định
                  chúng tôi sẽ trừ tiền chiết khấu với quý khách )
                </span>
              </div>
              {/* content */}
              <div className="w-full h-full flex flex-col items-start justify-start gap-y-2 ">
                <CardText title="Mô tả về chúng tôi">
                  <p title="Chi tiêt" className="list-none p_type_1 ">
                    {data.details}
                  </p>
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
              <Booking price={data.price} sales={data.sales} slug={slug} />
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
              <CardText title="Đánh giá của khách hàng">
                Đánh giá của khách hàng
              </CardText>
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
