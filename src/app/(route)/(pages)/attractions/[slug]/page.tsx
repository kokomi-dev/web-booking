import { Clock, MapPin } from "lucide-react";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { FaCalendarXmark, FaCheck } from "react-icons/fa6";
import { GoStarFill } from "react-icons/go";

import { apiUrl, getDetailAttraction } from "@/api/api-attractions";
import CardText from "@/components/components/card-text";
import ScheduleDisplay from "@/components/components/display-schedule";
import BookingContainer from "@/components/dashboard/attraction/booking-container";
import { PropsGenerateMetaData } from "@/types";

import NotFoundPage from "@/app/not-found";
import BreadcrumbHead from "@/components/components/breadcrumb";
import Comments from "@/components/components/comments";
import DisplayDocs from "@/components/components/display-docs";
import SupportQuestions from "@/components/dashboard/attraction/support-questions";
import { AttractionData } from "@/types/attraction.type";
const ImagesDetail = dynamic(
  () => import("@/components/components/images-detail"),
  {
    ssr: false,
  }
);
const ShareButton = dynamic(
  () => import("@/components/components/share-button"),
  {
    ssr: false,
  }
);
const ShowOnMap = dynamic(() => import("@/components/components/show-on-map"), {
  ssr: false,
});

export async function generateMetadata({
  params,
}: PropsGenerateMetaData): Promise<Metadata> {
  const slug = (await params).slug;
  try {
    const attraciton = await fetch(`${apiUrl}/attraction/${slug}`);
    const data = await attraciton.json();
    if (data && data.data) {
      return {
        title: data.data.name,
        description: data.data.description,
      };
    }
    return {};
  } catch (error) {
    throw new Error("Lỗi khi generateMetadata");
  }
}

export async function generateStaticParams() {
  try {
    const listAttraction = await fetch(`${apiUrl}/attraction`).then((res) =>
      res.json()
    );
    if (!listAttraction || !Array.isArray(listAttraction.data)) {
      console.error("Dữ liệu không hợp lệ hoặc không có trường data");
      return [];
    }
    return (
      await listAttraction.data.filter(
        (attraction: AttractionData) => attraction.slug
      )
    ).map((attraction: AttractionData) => ({
      slug: attraction.slug,
    }));
  } catch (error) {
    throw new Error("Lỗi khi server-side-rendering");
  }
}
const DetailAttractionPage = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const data = await getDetailAttraction({ slug });
  if (!data) {
    return <NotFoundPage />;
  }

  return (
    <div className="section-spacing">
      {/* Breadcrumb */}
      <BreadcrumbHead
        items={[
          { label: "Trang chủ", href: "/home" },
          { label: "Các địa điểm du lịch", href: "/attractions" },
          { label: `${data.name}` },
        ]}
      />

      <div className="container xl:p-0 section-spacing">
        {/* Info Section */}
        <section className="w-full h-full flex flex-row items-start justify-between gap-6">
          <div className="flex-1 grid gap-2 md:gap-y-3 lg:gap-y-4">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">
              {data.name}
            </h1>
            <div className="flex items-center gap-2">
              <GoStarFill className="text-yellow text-[1.2rem]" />
              <span className="text-lg font-semibold">{data.rating}</span>
              <span className="text-sm font-medium">
                {data.rating > 4 ? "Rất tốt" : "Tốt"}
              </span>
              <span className="text-sm text-black_sub">
                ({data.comments.length} đánh giá)
              </span>
            </div>
            <address className="text-sm text-black_sub flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue_sub" />
              <span>
                <strong>Địa chỉ:</strong> {data.location.detail}
              </span>
            </address>
          </div>
          <div className="w-fit flex-shrink-0">
            <ShareButton model="attractions" slug={slug} title={data.name} />
          </div>
        </section>

        {/* Images Section */}
        <ImagesDetail data={data} slug={slug} />

        {/* Rules Section */}
        <div className="w-full h-full container-spacing">
          {data.cancelFree && (
            <div className="flex items-center bg-green-100  rounded-lg">
              <FaCalendarXmark className="text-green text-[1.3rem] mr-2" />
              <h4 className="text-base text-green font-semibold">
                Có lựa chọn hủy miễn phí
              </h4>
            </div>
          )}

          {/* Content and Booking Section */}
          <div className="w-full h-full flex flex-col-reverse lg:grid list-spacing lg:grid-cols-layout-2 gap-6">
            {/* Left Content */}
            <div className="flex flex-col gap-6">
              {data.duration < 2 && (
                <p className="bg-yellow text-white text-xs font-normal rounded-8 p-2 w-fit">
                  Lựa chọn ưa thích của khách du lịch một mình
                </p>
              )}
              <h3 className="flex items-center gap-2 text-base font-bold">
                <Clock className="size-5 text-black" /> Thời gian:{" "}
                {data.duration} ngày
              </h3>

              {/* Description */}
              <DisplayDocs docs={data.description} />

              {/* Schedule */}
              <div>
                <h3 className="text-lg font-semibold text-blue bg-black_sub rounded-8 p-2 md:px-3 heading-spacing">
                  Lịch trình tour của chúng tôi
                </h3>
                <ScheduleDisplay data={data} />
              </div>

              {/* Included Services */}
              <CardText title="Dịch vụ bao gồm">
                <ul className="list-none list-spacing">
                  {data.included.map((item: string, index: number) => (
                    <li key={index} className="flex items-center gap-3">
                      <FaCheck className="text-green w-4 h-4" />
                      <span className="text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardText>

              {/* Health and Safety */}
              <CardText title="Sức khỏe an toàn">
                <ul className="list-disc pl-4 list-spacing">
                  <li>Không phù hợp với khách có vấn đề về lưng</li>
                  <li>
                    Không phù hợp với khách có vấn đề về tim hoặc sức khỏe
                    nghiêm trọng
                  </li>
                  <li>Phù hợp với mọi tình trạng thể lực</li>
                </ul>
              </CardText>

              {/* Language Guides */}
              <CardText title="Ngôn ngữ hướng dẫn viên">
                <ul className="flex flex-wrap gap-3">
                  {["Tiếng Việt", "Tiếng Anh"].map((lang, index) => (
                    <li
                      key={index}
                      className="border border-yellow text-sm rounded-8 py-1 px-3"
                    >
                      {lang}
                    </li>
                  ))}
                </ul>
              </CardText>

              {/* Location on Map */}
              <CardText title="Vị trí">
                <ShowOnMap address={data.location.detail || data.location} />
              </CardText>
            </div>

            {/* Booking Section */}
            <BookingContainer slug={slug} data={data} />
          </div>

          {/* Comments and Questions */}
          <div className="w-full h-full lg:grid flex flex-col container-spacing lg:gap-x-4 lg:grid-cols-layout-2">
            <Comments
              category="attraction"
              initialComments={data.comments}
              initialRating={data.rating}
              slug={slug}
            />
            <SupportQuestions />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailAttractionPage;
