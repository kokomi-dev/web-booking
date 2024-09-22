import { GoStarFill } from "react-icons/go";
import { FaCalendarXmark, FaCheck } from "react-icons/fa6";
import { Share2 } from "lucide-react";

import { getDetailTour } from "@/api/api-tour";
import CardText from "@/components/components/card-text";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { apiUrl } from "@/api/api-tour";
import BookingContainer from "@/components/components/booking-container";
import { TourData } from "@/constants";
import ScheduleDisplay from "@/components/components/display-schedule";

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

  return (
    <section className="w-full h-full">
      <div
        className={cn(
          "w-full h-full flex flex-col items-start justify-start gap-2 "
        )}
      >
        {/* head */}
        <h3 className="text-center my-3 text-normal text-black_main font-medium underline">
          Lưu ý: tất cả các tour du lịch của chúng tôi đã bao gồm bảo hiểm cho
          quý khách trong toàn bộ chuyến đi
        </h3>
        {/* info */}
        <section className="w-full h-full flex flex-col items-start justify-start gap-2">
          <div className="w-full flex items-center justify-between mt-6">
            <h1 className="text-large font-bold ">{data.name}</h1>
            <div
              className={cn(
                "flex items-center gap-1 justify-start p-1 rounded-8  text-black border-[1px] border-black_sub transition-all duration-300",
                "hover:cursor-pointer hover:bg-bg_black_sub"
              )}
            >
              <Share2 className="w-4 h-4" />
              <span className="text-small">Chia sẻ điểm tham quan này</span>
            </div>
          </div>
          <h3 className="flex items-center justify-start mb-2">
            <GoStarFill className="text-yellow_main text-[1.6rem] mr-2" />
            <span className="text-medium mr-2">
              {data.ratingsQuantity}
              {data.ratingsQuantity > 4 ? (
                <span className="ml-1 text-normal font-medium">Rất tốt</span>
              ) : (
                <span className="ml-1 text-[0.98rem] font-medium">Tốt</span>
              )}
            </span>
            <span className="text-[0.9rem] text-black_sub ">
              ( 0 đánh giá )
            </span>
          </h3>
          {data.duration < 2 ? (
            <span className="bg-yellow_main text-white text-[0.9rem] rounded-xl p-1 px-2">
              Lựa chọn ưa thích của khách du lịch một mình
            </span>
          ) : (
            <></>
          )}
        </section>
        {/* images */}
        <div className="w-full h-auto grid gap-2 grid-cols-2 rounded-8 overflow-hidden">
          {data.images.map((img: string, index: number) => (
            <Image
              key={index}
              width={500}
              height={300}
              src={img}
              alt={`một vài ảnh giới thiệu về tour du lịch ${data.name}`}
              className={index === 0 ? "image-item-large" : "image-item-small"}
            />
          ))}
        </div>
        {/* des */}
        <div>
          <p className=" text-small text-justify">{data.description}</p>
        </div>
        {/* rules */}
        <div className="w-full h-full">
          <div className="flex items-center my-5">
            <FaCalendarXmark className="text-yellow_main text-[1.3rem] mr-2" />
            <span>
              Bạn có thể hủy trong vòng 4 tiếng từ khi đặt vé với chúng tôi (
              ngoài thời gian quy định chúng tôi sẽ trừ tiền chiết khấu với quý
              khách )
            </span>
          </div>
          {/* content and book tickets */}
          <div className="w-full h-full grid grid-cols-1 gap-4 md:grid-cols-layout-2">
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

                      <span className="text-small">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardText>
              {/* healthy */}
              <CardText title="Sức khỏe an toàn">
                <ul className="pl-3 list-disc text-small">
                  <li className="py-1">
                    Không phù hợp với khách có vấn đề về lưng
                  </li>
                  <li className="py-1">
                    Không phù hợp với khách có vấn đề về tim hoặc vấn đề sức
                    khỏe nghiêm trọng
                  </li>
                  <li className="py-1">Phù hợp với mọi tình trạng thể lực</li>
                </ul>
              </CardText>
              {/* languge guides */}
              <CardText title="Ngôn ngữ hướng dẫn viên">
                <ul className="w-full pl-3">
                  <li
                    className={cn(
                      "border-1 border-yellow_main cursor-pointer  rounded-xl w-[40%] flex items-center justify-center mb-3",
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
            <BookingContainer slug={slug} data={data} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailAttractionPage;
