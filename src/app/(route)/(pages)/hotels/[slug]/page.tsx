import { FaCalendarXmark, FaCheck } from "react-icons/fa6";

import { apiUrl, getDetailHotel } from "@/api/api-hotels";
import CardText from "@/components/components/card-text";
import { cn } from "@/utils/constants";

import NotFoundPage from "@/app/not-found";
import BreadcrumbHead from "@/components/components/breadcrumb";
import Comments from "@/components/components/comments";
import DisplayDocs from "@/components/components/display-docs";
import ReceiveFeedback from "@/components/components/receive-feedback";
import ShowOnMap from "@/components/components/show-on-map";
import { LIST_QUESTION_HOTELS } from "@/components/dashboard/constants";
import Booking from "@/components/dashboard/hotels/booking";
import HeadDetail from "@/components/dashboard/hotels/head-detail";
import Info from "@/components/dashboard/hotels/info";
import { PropsGenerateMetaData } from "@/types";
import {
  Baby,
  Bed,
  ChevronRight,
  MessageCircle,
  UserCheck,
} from "lucide-react";
import { Metadata } from "next";
import { IHotel } from "@/types/hotel.type";

export async function generateMetadata({
  params,
}: PropsGenerateMetaData): Promise<Metadata> {
  const slug = (await params).slug;
  try {
    const res = await fetch(`${apiUrl}/hotel/${slug}`);
    const data = await res.json();
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
    const listHotel = await fetch(`${apiUrl}/hotel`).then((res) => res.json());

    if (!listHotel || !Array.isArray(listHotel.data)) {
      console.error(
        "Dữ liệu không hợp lệ hoặc không có trường data",
        listHotel
      );
      return [];
    }
    return (await listHotel.data.filter((hotel: IHotel) => hotel.slug)).map(
      (hotel: IHotel) => ({
        slug: hotel.slug,
      })
    );
  } catch (error) {
    console.error("🔥 Lỗi khi fetch danh sách khách sạn:", error);
    return [];
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
    <section className={cn("w-full h-full posing-vertical-1 ")}>
      {/* head */}
      <BreadcrumbHead
        items={[
          { label: "Trang chủ", href: "/home" },
          { label: "Lưu trú", href: "/hotels" },
          { label: `${data.name}` },
        ]}
      />

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
      <div className="w-full h-full posing-vertical-2" id="info_utilities">
        {data.cancelFree && (
          <div className="w-full flex items-center justify-start">
            <FaCalendarXmark className="text-blue_main_sub w-5 h-5 lg:w-7 lg:h-7 mr-2 flex-shrink-0" />
            <p className="text-small font-normal text-justify pr-1">
              Bạn có thể hủy trong vòng 4 tiếng từ khi đặt vé với chúng tôi hoặc
              trước 2 ngày đến lịch đặt ( ngoài thời gian quy định chúng tôi sẽ
              trừ tiền chiết khấu với quý khách )
            </p>
          </div>
        )}
        {/* content and booking*/}
        <div className="z-[30] w-full h-full flex flex-col-reverse lg:flex-col items-start justify-start posing-vertical-3 ">
          <div className="w-full grid grid-cols-1 lg:grid-cols-layout-2 mt-2 lg:mt-0 ">
            <div className="w-full h-auto grid gap-y-4 pr-4">
              <CardText title="Mô tả về chúng tôi ">
                <DisplayDocs docs={data.details} />
              </CardText>
              {/* healthy */}
              {data.includes.length > 0 && (
                <CardText title="Các tiện nghi được ưa chuộng nhất">
                  <ul className="lg:pl-3 flex flex-wrap gap-x-4">
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
            <div className=" h-fit bg-bg_primary_hover text-black rounded-14 p-4">
              <CardText title="Điểm nổi bật của chỗ nghỉ">
                <ul className="pl-1 list-disc">
                  {data.highlights.map((highlight: string, index: number) => {
                    return (
                      <li
                        key={index}
                        className="flex items-center justify-start py-1 text-smallest lg:text-small font-normal"
                      >
                        {highlight}
                      </li>
                    );
                  })}
                </ul>
              </CardText>
            </div>
          </div>
          {/* booking */}
          <Booking slug={slug} listRooms={data.listRooms} />
        </div>
        {/* regulations */}
        <div className="w-full bg-white border border-blue-200 rounded-lg p-2 md:p-4 lg:p-6 shadow-md posing-vertical-3">
          <h3 className="text-lg font-semibold text-black_main flex items-center gap-2">
            <UserCheck className="text-blue-500 w-5 h-5" />
            Quy định về chỗ nghỉ
          </h3>
          <div>
            <h5 className="text-md font-medium text-black_main">
              Trẻ em và giường phụ
            </h5>
            <p className="text-sm text-black_sub mt-1">
              Giường phụ tùy thuộc vào loại phòng bạn chọn, xin vui lòng kiểm
              tra thông tin phòng để biết thêm chi tiết. Tất cả trẻ em đều được
              chào đón.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Trẻ em 0-2 tuổi */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 shadow-sm flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Baby className="text-blue-600 w-5 h-5" />
                <h3 className="text-md font-semibold text-black_main">
                  Trẻ em 0-2 tuổi [bao gồm cả bé 2 tuổi]
                </h3>
              </div>
              <hr className="border-gray-300" />
              <div className="text-sm text-black_sub mt-2">
                <p>Ở miễn phí nếu sử dụng giường có sẵn.</p>
                <p>Nếu cần một giường phụ thì sẽ phụ thu thêm.</p>
              </div>
            </div>

            {/* Khách từ 3 tuổi trở lên */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 shadow-sm flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Bed className="text-blue-600 w-5 h-5" />
                <h3 className="text-md font-semibold text-black_main">
                  Những khách từ 3 tuổi trở lên tính là người lớn
                </h3>
              </div>
              <hr className="border-gray-300" />
              <div className="text-sm text-black_sub mt-2">
                <p>Cần đặt thêm một giường phụ và sẽ phụ thu thêm.</p>
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
