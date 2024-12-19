import { FaCalendarXmark, FaCheck } from "react-icons/fa6";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { apiUrl, getDetailHotel } from "@/api/api-hotels";
import CardText from "@/components/components/card-text";
import { cn } from "@/lib/utils";

import Info from "@/components/dashboard/hotels/info";
import Booking from "@/components/dashboard/hotels/booking";
import { HotelData, PropsGenerateMetaData } from "@/utils/types";
import HeadDetail from "@/components/dashboard/hotels/head-detail";
import Comments from "@/components/components/comments";
import ShowOnMap from "@/components/components/show-on-map";
import NotFoundPage from "@/app/not-found";
import { Button } from "@/components/ui/button";
import { ChevronRight, MessageCircle } from "lucide-react";
import { LIST_QUESTION_HOTELS } from "@/components/dashboard/constants";
import Link from "next/link";
import DisplayDocs from "@/components/components/display-docs";
import ReceiveFeedback from "@/components/components/receive-feedback";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: PropsGenerateMetaData): Promise<Metadata> {
  const slug = (await params).slug;
  try {
    const attraciton = await fetch(`${apiUrl}/hotel/${slug}`);
    const data = await attraciton.json();
    if (data.data) {
      return {
        title: data.data.name,
        description: data.data.details,
      };
    }
    return {};
  } catch (error) {
    throw new Error("Lỗi khi generateMetadata");
  }
}

export async function generateStaticParams() {
  try {
    const listTours = await fetch(`${apiUrl}/hotel`).then((res) => res.json());
    if (!listTours || Array.isArray(listTours)) return [];
    return listTours.data.map((hotel: HotelData) => ({
      slug: hotel.slug,
    }));
  } catch (error) {
    throw Error("Lỗi khi server side");
  }
}

const DetailHotelPage = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const data = await getDetailHotel({ slug });
  if (!data) {
    return <NotFoundPage page="hotels" />;
  }

  return (
    <section
      className={cn(
        "w-full h-full flex flex-col items-start justify-start gap-y-4 "
      )}
    >
      {/* head */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/hotels">Lưu trú</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{data?.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <HeadDetail />
      <hr className="hr" />
      {/* info */}
      <Info
        name={data.name}
        location={data.location.detail}
        rating={data.rating}
        details={data.details}
        images={data}
        slug={slug}
      />
      <div
        className="w-full h-full flex flex-col items-start justify-start gap-y-2"
        id="info_utilities"
      >
        {data.cancelFree && (
          <div className="w-full grid grid-cols-[5%,93%] gap-x-2">
            <FaCalendarXmark className="text-blue_main_sub w-5 h-5 lg:w-7 lg:h-7 mr-2" />
            <p className="text-small font-light text-justify pr-1">
              Bạn có thể hủy trong vòng 4 tiếng từ khi đặt vé với chúng tôi hoặc
              trước 2 ngày đến lịch đặt ( ngoài thời gian quy định chúng tôi sẽ
              trừ tiền chiết khấu với quý khách )
            </p>
          </div>
        )}
        {/* content and booking*/}
        <div className="w-full h-full flex flex-col-reverse lg:flex-col items-start justify-start gap-y-2 ">
          <div className="w-full grid grid-cols-1 lg:grid-cols-layout-2 ">
            <div className="w-full h-auto grid gap-y-4 pr-4">
              <CardText title="Mô tả về chúng tôi ">
                <p
                  title="Chi tiêt"
                  className="list-none text-justify text-small "
                >
                  <DisplayDocs docs={data.details} />
                </p>
              </CardText>
              {/* healthy */}
              {data.includes.length > 0 && (
                <CardText title="Các tiện nghi được ưa chuộng nhất">
                  <ul className="pl-3 flex flex-wrap gap-x-4">
                    {data.includes.map((include: string, index: number) => {
                      return (
                        <li
                          key={index}
                          className="flex items-center justify-start gap-x-1 py-2"
                        >
                          <FaCheck className="text-[1rem] text-[#4cce80] " />
                          <span className="!first:uppercase block text-normal">
                            {include.charAt(0).toUpperCase() + include.slice(1)}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </CardText>
              )}
            </div>
            {/* highlights */}
            <div className="l h-fit  bg-bg_primary_hover text-black rounded-14 p-4">
              <CardText title="Điểm nổi bật của chỗ nghỉ">
                <ul className="pl-3 list-disc">
                  {data.highlights.map((highlight: string, index: number) => {
                    return (
                      <li
                        key={index}
                        className="flex items-center justify-start py-1 text-smallest"
                      >
                        {highlight}
                      </li>
                    );
                  })}
                </ul>
                <Link
                  href="#booking-hotel-container"
                  className="min-w-full block text-center w-full bg-bg_primary_blue_sub text-white mt-4 p-1 rounded-8 px-2"
                >
                  Đặt ngay
                </Link>
              </CardText>
            </div>
          </div>
          {/* booking */}
          <Booking slug={slug} listRooms={data.listRooms} />
        </div>
        {/* regulations */}
        <div
          className="w-full flex flex-col gap-y-4 border-1 rounded-8 p-4 my-3 border-blue_main_sub"
          id="general_rule"
        >
          <h3 className="text-medium font-semibold">Quy định về chỗ nghỉ</h3>
          <div className="w-full h-atuo">
            <h5 className="text-normal">Trẻ em và giường phụ</h5>
            <p className="text-small text-black_sub">
              Giường phụ tùy thuộc vào loại phòng bạn chọn, xin vui lòng kiểm
              tra thông tin phòng để biết thêm chi tiết. Tất cả trẻ em đều được
              chào đón.
            </p>
          </div>
          <div className="w-full  grid grid-cols-1 gap-y-3 md:grid-cols-2 gap-x-2 ">
            <div className="border_div_card h-[120px]">
              <div>
                <h3 className="text-normal">
                  Trẻ em 0-2 tuổi [bao gồm cả bé 2 tuổi]
                </h3>
              </div>
              <hr />
              <div className="mt-2 text-small font-light">
                <h5 className="">Ở miễn phí nếu sử dụng giường có sẵn</h5>
                <p className="">Nếu cần một giường phụ thì sẽ phụ thu thêm.</p>
              </div>
            </div>
            <div className="border_div_card h-[120px]">
              <div>
                <h3 className="text-normal">
                  Những khách từ 3 tuổi trở lên tính là người lớn
                </h3>
              </div>
              <hr />
              <div className="mt-2 text-small font-light">
                <p className="">
                  Cần đặt thêm một giường phụ và sẽ phụ thu thêm.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* comments */}
        <Comments
          category="hotel"
          initialComments={data.comment}
          initialRating={data.rating}
          slug={slug}
        />
        {/* location on map */}
        <CardText
          title="Vị trí"
          className="grid grid-cols-1 lg:grid-cols-2 gap-4"
        >
          <ShowOnMap address={data.location.detail} />
          {/* question */}
          <div className="w-full">
            <h3 className="text-medium font-medium">Các câu hỏi thường gặp</h3>
            <ul className="border-0.5 border-[#999] rounded-8 p-2">
              {LIST_QUESTION_HOTELS.map((question: string, index: number) => {
                return (
                  <li
                    key={index}
                    className="flex items-center justify-between gap-x-1 text-small py-2 pt-3 border-b-0.5 border-[#999] hover:cursor-pointer rounded-8 p-2"
                  >
                    <span className="flex items-center justify-center gap-x-2">
                      <MessageCircle className="size-4 text-black" />
                      <span className="first:uppercase ">
                        {question.charAt(0).toUpperCase() + question.slice(1)}
                      </span>
                    </span>
                    <ChevronRight className="size- text-black" />
                  </li>
                );
              })}
            </ul>
          </div>
        </CardText>
        <ReceiveFeedback />
      </div>
    </section>
  );
};

export default DetailHotelPage;
