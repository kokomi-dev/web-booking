import { GoStarFill } from "react-icons/go";
import { FaCalendarXmark, FaCheck } from "react-icons/fa6";
import { MapPin, Share2 } from "lucide-react";
import dynamic from "next/dynamic";

import { getDetailTour } from "@/api/api-tour";
import CardText from "@/components/components/card-text";
import { cn } from "@/lib/utils";
import { apiUrl } from "@/api/api-tour";
import BookingContainer from "@/components/components/booking-container";
import { TourData } from "@/constants";
import ScheduleDisplay from "@/components/components/display-schedule";
import Loading from "../loading";
import ImagesDetail from "@/components/components/images-detail";
import { Comments } from "@/components/components/comment";

import ShowComments from "@/components/components/show-comments";
import SupportQuestions from "@/components/dashboard/home/support-questions";
const ShowOnMap = dynamic(() => import("@/components/components/show-on-map"), {
  ssr: false,
});

export async function generateStaticParams() {
  const listTours = await fetch(`${apiUrl}/tour`).then((res) => res.json());
  return listTours.data.map((tour: TourData) => ({
    slug: tour.slug,
  }));
}
const DetailAttractionPage = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const data = await getDetailTour({ slug });
  if (!data) {
    <Loading />;
  }
  return (
    <section className="w-full h-full">
      <div
        className={cn(
          "w-full h-full flex flex-col items-start justify-start gap-y-4 "
        )}
      >
        {/* head */}
        <h3 className="text-center my-3 text-normal text-black_main font-medium underline">
          Lưu ý: tất cả các tour du lịch của chúng tôi đã bao gồm bảo hiểm cho
          quý khách trong toàn bộ chuyến đi
        </h3>
        {/* info */}
        <section className="w-full h-full flex flex-col items-start justify-start gap-y-2">
          <div className="w-full flex items-center justify-between ">
            <h1 className="text-large font-bold ">{data.name}</h1>
            <div
              className={cn(
                "flex items-center gap-x-1 justify-start p-1 rounded-[3.5px] py-2 text-black border-0.5 border-black_sub transition-all duration-300  hover:bg-bg_primary_hover",
                "hover:cursor-pointer hover:bg-bg_black_sub"
              )}
            >
              <Share2 className="w-4 h-4" />
              <span className="text-smallest font-medium  hidden lg:block">
                Chia sẻ điểm tham quan này
              </span>
            </div>
          </div>
          <h3 className="flex items-center justify-start ">
            <GoStarFill className="text-yellow_main text-[1.2rem] mr-2" />
            <span className="text-medium mr-2">
              <span className="text-normal font-semibold">
                {data.ratingsQuantity}
              </span>
              {data.ratingsQuantity > 4 ? (
                <span className="ml-1 text-small font-medium">Rất tốt</span>
              ) : (
                <span className="ml-1 text-small font-medium">Tốt</span>
              )}
            </span>
            <span className="text-[0.9rem] text-black_sub ">
              ( 0 đánh giá )
            </span>
          </h3>
          <address className="text-small font-normal text-black_sub flex items-center justify-start gap-1">
            <MapPin className="w-5 h-5 text-red-500" />
            <span>{data.location.detail}</span>
          </address>
          {data.duration < 2 ? (
            <p className="bg-yellow_main text-white text-smallest font-normal rounded-xl p-1 px-2 block">
              Lựa chọn ưa thích của khách du lịch một mình
            </p>
          ) : (
            <></>
          )}
        </section>
        {/* images */}
        <ImagesDetail data={data} />
        {/* rules */}
        <div className="w-full h-full flex flex-col items-start justify-start gap-y-4">
          <div className="flex items-center ">
            <FaCalendarXmark className="text-yellow_main text-[1.3rem] mr-2" />
            <span>
              Bạn có thể hủy trong vòng 4 tiếng từ khi đặt vé với chúng tôi (
              ngoài thời gian quy định chúng tôi sẽ trừ tiền chiết khấu với quý
              khách )
            </span>
          </div>
          {/* content and book tickets */}
          <div className="w-full h-full grid grid-cols-1 gap-y-4 md:gap-x-4 lg:grid-cols-layout-2">
            {/* left */}
            <div className="w-full flex flex-col items-start justify-start gap-6 ">
              {/* schedule in tour */}
              <div className="w-full pl-3">
                <h3 className="text-medium font-semibold  text-blue_main  bg-bg_black_sub rounded-8 p-2">
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
                      <FaCheck className="text-small text-[#018235] " />

                      <span className="text-normal">{item}</span>
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
          <div className="w-full h-full grid grid-cols-1 gap-y-4 md:gap-x-4 md:grid-cols-layout-2">
            {/* evaluate */}
            <div className="">
              <ShowComments
                type="attractions"
                comments={data.comments}
                rating={data.ratingsQuantity}
              />
              {/* <Comments id={data._id} /> */}
            </div>
            {/* question */}
            <SupportQuestions />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailAttractionPage;
