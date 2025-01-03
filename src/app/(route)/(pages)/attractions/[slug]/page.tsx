import { GoStarFill } from "react-icons/go";
import { FaCalendarXmark, FaCheck } from "react-icons/fa6";
import { MapPin } from "lucide-react";
import dynamic from "next/dynamic";
import type { Metadata } from "next";

import { getDetailAttraction } from "@/api/api-attractions";
import CardText from "@/components/components/card-text";
import { cn } from "@/lib/utils";
import { apiUrl } from "@/api/api-attractions";
import BookingContainer from "@/components/dashboard/attraction/booking-container";
import { AttractionData, PropsGenerateMetaData } from "@/utils/types";
import ScheduleDisplay from "@/components/components/display-schedule";

import Comments from "@/components/components/comments";
import SupportQuestions from "@/components/dashboard/attraction/support-questions";
import NotFoundPage from "@/app/not-found";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import DisplayDocs from "@/components/components/display-docs";
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
    if (data.data) {
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
    return await listAttraction.data.map((attraction: AttractionData) => ({
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
    return <NotFoundPage page="attractions" />;
  }
  return (
    <div className="w-full h-full">
      <div
        className={cn(
          "w-full h-full flex flex-col items-start justify-start gap-y-4"
        )}
      >
        {/* head */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/attractions">
                Địa điểm du lịch
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{data?.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        {/* info */}
        <section
          className={cn(
            "w-full h-full flex  items-start justify-between gap-y-3 "
          )}
        >
          <div className="grid gap-y-2">
            <div className="w-full flex items-center justify-between ">
              <h1 className="text-large font-bold ">{data.name}</h1>
            </div>
            <h3 className="w-fit flex items-center justify-center gap-x-1  ">
              <GoStarFill className="text-yellow_main text-[1.2rem]" />
              <span className="text-medium ">
                <span className="text-normal font-semibold">{data.rating}</span>
                {data?.rating > 4 ? (
                  <span className="ml-1 text-small font-medium">Rất tốt</span>
                ) : (
                  <span className="ml-1 text-small font-medium">Tốt</span>
                )}
              </span>
              <span className="text-small text-black_sub ">
                ( {data.comments.length} đánh giá )
              </span>
            </h3>
            <address className="text-small font-normal text-black_sub flex items-start lg:items-center justify-start gap-x-1">
              <MapPin className="w-6 h-6 text-blue_main_sub" />
              <address className="text-black">
                <span className="font-medium">Địa chỉ: </span>
                {data.location.detail}
              </address>
            </address>
            {data.duration < 2 ? (
              <p className="bg-yellow_main w-fit text-white text-smallest font-normal rounded-8 p-1 px-2 block">
                Lựa chọn ưa thích của khách du lịch một mình
              </p>
            ) : (
              <></>
            )}
          </div>
          <div className="w-fit grid gap-y-2 ">
            <ShareButton model="attractions" slug={slug} title={data.name} />
            {/* <div
              className={cn(
                "flex items-center gap-x-1 justify-start p-1 rounded-[3.5px] py-2 cursor-pointer text-white border-0.5 bg-bg_primary_blue_sub transition-all duration-300  hover:opacity-90"
              )}
            >
              <Heart className="w-4 h-4" />
              <span className="text-smallest font-medium  hidden lg:block">
                Thêm vào yêu thích
              </span>
            </div> */}
          </div>
        </section>
        {/* images */}
        <ImagesDetail data={data} slug={slug} />
        {/* rules */}
        <div className="w-full h-full flex flex-col items-start justify-start gap-y-4">
          {data.cancelFree && (
            <div className="flex items-center ">
              <FaCalendarXmark className="text-green_main text-[1.3rem] mr-2" />
              <h4 className="text-normal text-green_main font-semibold">
                Có lựa chọn hủy miễn phí
              </h4>
            </div>
          )}
          {/* content and book tickets */}
          <div className="w-full h-full flex  flex-col-reverse lg:grid gap-4 lg:grid-cols-layout-2">
            {/* left */}
            <div className="w-full flex flex-col items-start justify-start gap-y-4 lg:pr-2 ">
              {/* descriptiton */}
              <DisplayDocs docs={data.description} />
              {/* schedule in tour */}
              <div className="w-full h-full ">
                <h3 className="text-medium font-semibold  text-blue_main  bg-bg_black_sub rounded-8 p-2">
                  Lịch trình tour của chúng tôi
                </h3>
                <div className="w-full h-full grid gap-y-2 ">
                  <ScheduleDisplay data={data} />
                </div>
              </div>
              {/* included */}
              <CardText title="Dịch vụ bao gồm">
                <ul className="list-none w-full">
                  {data.included.map((item: string, index: number) => (
                    <li key={index} className="flex gap-3 py-1 items-center">
                      <FaCheck className="flex-shrink-0 w-4 h-4 md:w-5 md:h-5 text-green_main" />
                      <span className="text-normal break-words">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardText>
              {/* healthy */}
              <CardText title="Sức khỏe an toàn">
                <ul className="pl-3 list-disc text-normal">
                  <li className="py-1 ">
                    Không phù hợp với khách có vấn đề về lưng
                  </li>
                  <li className="py-1 ">
                    Không phù hợp với khách có vấn đề về tim hoặc vấn đề sức
                    khỏe nghiêm trọng
                  </li>
                  <li className="py-1 ">Phù hợp với mọi tình trạng thể lực</li>
                </ul>
              </CardText>
              {/* languge guides */}
              <CardText title="Ngôn ngữ hướng dẫn viên">
                <ul className="w-full pl-3">
                  <li
                    className={cn(
                      "border-1 border-yellow_main text-small  rounded-8 py-1 w-[40%] flex items-center justify-center mb-3",
                      "lg:w-[20%]"
                    )}
                  >
                    Tiếng Việt
                  </li>
                  <li
                    className={cn(
                      "border-1 border-yellow_main text-small rounded-8 py-1 w-[40%] flex items-center justify-center ",
                      "lg:w-[20%]"
                    )}
                  >
                    Tiếng Anh
                  </li>
                </ul>
              </CardText>
              {/* location on map */}
              <CardText title="Vị trí">
                <ShowOnMap address={data.location.detail || data.location} />
              </CardText>
            </div>
            {/* book tickets */}
            <BookingContainer slug={slug} data={data} />
          </div>
          <hr className="hr" />
          <div className="w-full h-full lg:grid flex flex-col gap-y-4 lg:gap-x-4 lg:grid-cols-layout-2">
            {/* evaluate */}
            <Comments
              category="attraction"
              initialComments={data.comments}
              initialRating={data.rating}
              slug={slug}
            />
            {/* question */}
            <SupportQuestions />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailAttractionPage;
