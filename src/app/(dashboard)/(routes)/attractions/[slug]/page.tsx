"use client";
import { useEffect, useState, useRef, Suspense } from "react";
import { useParams } from "next/navigation";
import { GoStarFill } from "react-icons/go";
import { FaCalendarXmark, FaCheck } from "react-icons/fa6";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { getDetailTour } from "@/api/api-tour";
import CardText from "@/components/components/card-text";
import CardBookingTicket from "@/components/components/card-booking-ticket";
import Image from "next/image";
import DatePicker from "@/components/components/pickdate-calender";
import useAutoResizeTextarea from "@/hook/useAutoResizeTextarea";
import { cn } from "@/lib/utils";
import Loading from "@/app/loading";
interface TourData {
  name: string;
  description: string;
  ratingsQuantity: number;
  duration: number;
  images: string[];
  schedule: string[];
  included: string[];
  price: [number, number];
}

interface ScheduleDisplayProps {
  data: TourData;
}

const ScheduleDisplay = ({ data }: ScheduleDisplayProps) => {
  return (
    <div className="w-full h-full flex flex-col flex-grow">
      {data.schedule.length > 0 ? (
        data.schedule.map((sche: string, index: number) => {
          const textareaRef = useAutoResizeTextarea(sche);
          return (
            <div key={index}>
              <h4 className="font-medium underline text-[1.2rem]">
                Ngày <span>{index + 1}</span>
              </h4>
              <textarea
                readOnly
                ref={textareaRef}
                className="w-full resize-none box-border border-none outline-none mt-3 text-justify"
                value={sche}
              ></textarea>
            </div>
          );
        })
      ) : (
        <textarea
          readOnly
          ref={useAutoResizeTextarea(data.schedule[0])}
          className="w-full resize-none box-border border-none outline-none mt-3 text-justify"
          value={data.schedule[0]}
        ></textarea>
      )}
    </div>
  );
};

const DetailAttractionPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [data, setData] = useState<TourData | null>(null);
  const [date, setDate] = useState<Date>();
  const [hour, setHour] = useState<string>("7h00");
  const [isLoading, setIsLoading] = useState(true);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const tourData = await getDetailTour({ slug });
        setData(tourData.data);
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

  return (
    <section className="w-full h-full">
      {isLoading ? (
        <Loading />
      ) : data ? (
        <Suspense fallback={<Loading />}>
          <div className={cn("w-full h-full ")}>
            <h1 className="text-center my-3 text-normal text-black_main font-medium underline mb-6">
              Lưu ý: tất cả các tour du lịch của chúng tôi đã bao gồm bảo hiểm
              cho quý khách trong toàn bộ chuyến đi
            </h1>
            <div
              className={cn(
                "sticky top-0 mx-[-1rem] shadow-lg",
                " lg:mx-[-9rem]"
              )}
            >
              <Link
                href="/attractions"
                className={cn(
                  "w-full bg-bg_primary_main transition-all duration-300 text-white py-3 px-4 flex items-center justify-start  ",
                  "hover:bg-bg_primary_active",
                  "lg:px-20"
                )}
              >
                <ArrowLeft className="mr-2" />
                <span className="font-[600]">Quay lại</span>
              </Link>
            </div>
            {/* info */}
            <div>
              <h1 className="name_detail">{data.name}</h1>
              <p className=" text-[0.98rem] my-2 px-3 text-justify">
                {data.description}
              </p>
              <h6 className="flex items-center justify-start mb-2">
                <GoStarFill className="text-yellow_main text-[1.6rem] mr-2" />
                <span className="text-medium mr-2">
                  {data.ratingsQuantity}
                  {data.ratingsQuantity > 4 ? (
                    <span className="ml-1 text-normal font-medium">
                      Rất tốt
                    </span>
                  ) : (
                    <span className="ml-1 text-[0.98rem] font-medium">Tốt</span>
                  )}
                </span>
                <span className="text-[0.9rem] text-black_sub ">
                  ( 0 đánh giá )
                </span>
              </h6>
              {data.duration < 2 ? (
                <span className="bg-yellow_main text-white text-[0.9rem] rounded-xl p-1 px-2">
                  Lựa chọn ưa thích của khách du lịch một mình
                </span>
              ) : (
                <></>
              )}
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
                    index === 0 ? "image-item-large" : "image-item-small"
                  }
                />
              ))}
            </div>
            <div className="w-full h-full">
              <div className="flex items-center my-5">
                <FaCalendarXmark className="text-yellow_main text-[1.3rem] mr-2" />
                <span>
                  Bạn có thể hủy trong vòng 4 tiếng từ khi đặt vé với chúng tôi
                  ( ngoài thời gian quy định chúng tôi sẽ trừ tiền chiết khấu
                  với quý khách )
                </span>
              </div>
              {/* content and book tickets */}
              <div className="w-full h-full grid grid-cols-1 gap-4 md:grid-cols-layout-2">
                {/* left */}
                <div className="w-full flex flex-col items-start justify-start gap-6 ">
                  {/* schedule in tour */}
                  <div className="w-full pl-3">
                    <h3 className="text-normal font-bold text-blue_main  bg-bg_black_sub rounded-8 p-2">
                      Lịch trình tour của chúng tôi
                    </h3>
                    <div className="w-full h-full flex flex-col flex-grow ">
                      <ScheduleDisplay data={data} />
                    </div>
                  </div>
                  {/* included */}
                  <CardText title="Dịch vụ bao gồm">
                    <ul className="list-none ">
                      {data.included.map((item: string, index: number) => (
                        <li
                          key={index}
                          className="flex items-center justify-start gap-3 py-1"
                        >
                          <FaCheck className="text-[1rem] text-[#018235] " />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardText>
                  {/* healthy */}
                  <CardText title="Sức khỏe an toàn">
                    <ul className="pl-3 list-disc">
                      <li>Không phù hợp với khách có vấn đề về lưng</li>
                      <li>
                        Không phù hợp với khách có vấn đề về tim hoặc vấn đề sức
                        khỏe nghiêm trọng
                      </li>
                      <li>Phù hợp với mọi tình trạng thể lực</li>
                    </ul>
                  </CardText>
                  {/* languge guides */}
                  <CardText title="Ngôn ngữ hướng dẫn viên">
                    <ul className="w-full pl-3">
                      <li
                        className={cn(
                          "border-1 border-yellow_main cursor-pointer bg-bg_black_sub rounded-xl w-[40%] flex items-center justify-center mb-3",
                          "lg:w-[20%]"
                        )}
                      >
                        Tiếng Việt
                      </li>
                      <li
                        className={cn(
                          "border-1 border-yellow_main cursor-pointer rounded-xl w-[40%] flex items-center justify-center ",
                          "lg:w-[20%]"
                        )}
                      >
                        Tiếng Anh
                      </li>
                    </ul>
                  </CardText>
                  {/* location on map */}
                  <CardText title="Vị trí">Vị trí địa điểm du lịch</CardText>
                  {/* evaluate */}
                  <div className="my-3">
                    <h3 className="text-medium font-bold">
                      Đánh giá của khách hàng
                    </h3>
                  </div>
                </div>
                {/* book tickets */}
                <div className="w-full h-fit flex items-start justify-start flex-col gap-4 p-4 sticky top-[2rem] bg-bg_black_sub border-[2px] border-blue_main_sub rounded-xl ">
                  <div>
                    <h3 className="text-medium font-bold">Chọn ngày</h3>
                    <DatePicker date={date} setDate={setDate} />
                  </div>
                  <CardText title="Chọn giờ">
                    <div className="flex items-center justify-start gap-x-2">
                      <label className="border-blue_main border-1 cursor-pointer transiton-all duration-200 text-black hover:opacity-80 rounded-xl p-2">
                        <input
                          className="button"
                          name="picktime"
                          type="radio"
                          value="7h00"
                          checked={hour === "7h00"}
                          onChange={(e) => setHour(e.target.value)}
                        />
                        <span>7h00</span>
                      </label>
                      <label className="border-blue_main border-1 cursor-pointer transiton-all duration-200 text-black hover:opacity-80 rounded-xl p-2">
                        <input
                          className="button"
                          name="picktime"
                          type="radio"
                          value="13h00"
                          checked={hour === "13h00"}
                          onChange={(e) => setHour(e.target.value)}
                        />
                        <span>13h00</span>
                      </label>
                    </div>
                  </CardText>
                  {/* booking tickets */}
                  <div className="w-full">
                    <h3 className="text-normal font-semibold bg-bg_primary_blue_sub text-white p-2 rounded-xl mb-2">
                      Đặt vé
                    </h3>
                    <CardBookingTicket
                      slug={slug}
                      hour={hour}
                      date={date}
                      duration={data.duration}
                      price={data.price}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Suspense>
      ) : (
        <div>Không tìm thấy dữ liệu</div>
      )}
    </section>
  );
};

export default DetailAttractionPage;
