import { FaCalendarXmark, FaCheck } from "react-icons/fa6";

import { apiUrl, getDetailHotel } from "@/api/api-hotels";
import CardText from "@/components/components/card-text";

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
import { IHotel } from "@/types/hotel.type";
import {
  Baby,
  Bed,
  ChevronRight,
  MessageCircle,
  UserCheck,
} from "lucide-react";
import { Metadata } from "next";

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
    return <NotFoundPage />;
  }

  return (
    <section className="w-full h-full section-spacing  ">
      {/* Breadcrumb */}
      <BreadcrumbHead
        items={[
          { label: "Trang chủ", href: "/home" },
          { label: "Lưu trú", href: "/hotels" },
          { label: `${data.name}` },
        ]}
      />
      <div className="container-spacing container xl:px-0">
        <HeadDetail />
        <Info
          name={data.name}
          location={data.location.detail}
          rating={data.rating}
          details={data.details}
          images={data}
          slug={slug}
        />
      </div>
      <div className=" container-spacing container xl:px-0">
        {data.cancelFree && (
          <div className="flex items-center bg-green-50 p-3 rounded-lg border border-green-200 shadow-sm">
            <FaCalendarXmark className="text-green w-5 h-5 lg:w-6 lg:h-6 mr-2 flex-shrink-0" />
            <p className="text-sm text-black_sub">
              Bạn có thể hủy trong vòng 4 tiếng từ khi đặt vé hoặc trước 2 ngày
              đến lịch đặt. Ngoài thời gian quy định, chúng tôi sẽ trừ tiền
              chiết khấu.
            </p>
          </div>
        )}
        {/* nội dung and đặt */}
        <div className="flex flex-col-reverse lg:flex-row gap-6 ">
          {/* Left Content */}
          <div className="flex-1 grid gap-6">
            {/* Description */}
            <CardText title="Mô tả về chúng tôi">
              <DisplayDocs docs={data.details} />
            </CardText>
            {/* Popular Amenities */}
            {data.includes.length > 0 && (
              <CardText title="Các tiện nghi được ưa chuộng nhất">
                <ul className="flex flex-wrap gap-4">
                  {data.includes.map((include: string, index: number) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <FaCheck className="text-green w-4 h-4" />
                      <span className="font-light">
                        {include.charAt(0).toUpperCase() + include.slice(1)}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardText>
            )}
          </div>
          {/* Highlights */}
          {data.highlights.length > 0 && (
            <div className="w-full lg:w-1/3 bg-blue-50 p-4 rounded-lg shadow-sm">
              <CardText title="Điểm nổi bật của chỗ nghỉ">
                <ul className="list-disc list-spacing pl-4">
                  {data.highlights.map((highlight: string, index: number) => (
                    <li key={index} className="text-sm text-black_sub">
                      {highlight}
                    </li>
                  ))}
                </ul>
              </CardText>
            </div>
          )}
        </div>

        <Booking slug={slug} listRooms={data.listRooms} />
        <div className="bg-white border border-blue-200 rounded-lg p-4 shadow-sm  list-spacing">
          <h3 className="text-lg font-semibold text-black flex items-center gap-2 ">
            <UserCheck className="text-blue w-5 h-5" />
            Quy định về chỗ nghỉ
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Children 0-2 Years */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Baby className="text-blue w-5 h-5" />
                <h4 className="text-md font-semibold text-black">
                  Trẻ em 0-2 tuổi
                </h4>
              </div>
              <p className="text-sm font-light text-black_sub">
                Ở miễn phí nếu sử dụng giường có sẵn. Nếu cần giường phụ, sẽ phụ
                thu thêm.
              </p>
            </div>

            {/*  3+ Years */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Bed className="text-blue w-5 h-5" />
                <h4 className="text-md font-semibold text-black">
                  Khách từ 3 tuổi trở lên
                </h4>
              </div>
              <p className="text-sm text-black_sub">
                Cần đặt thêm giường phụ và sẽ phụ thu thêm.
              </p>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <Comments
          category="hotel"
          initialComments={data.comment}
          initialRating={data.rating}
          slug={slug}
        />

        {/* Location and FAQ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
          <CardText title="Vị trí" className="w-full">
            <ShowOnMap address={data.location.detail} />
          </CardText>
          <div>
            <h3 className="text-lg font-medium mb-2">Các câu hỏi thường gặp</h3>
            <ul className="border border-gray-300 rounded-lg p-3">
              {LIST_QUESTION_HOTELS.map((question, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between text-sm py-2 md:py-3 lg:py-4 border-b last:border-none"
                >
                  <span className="flex items-center gap-2">
                    <MessageCircle className="text-black w-4 h-4" />
                    {question.charAt(0).toUpperCase() + question.slice(1)}
                  </span>
                  <ChevronRight className="text-black w-4 h-4" />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Feedback Section */}
        <ReceiveFeedback />
      </div>
    </section>
  );
};

export default DetailHotelPage;
