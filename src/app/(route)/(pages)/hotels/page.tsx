import { Metadata } from "next";
import Image from "next/image";

import bannerSearch from "@/assets/images/pre-hotel.jpg";
import BreadcrumbHead from "@/components/components/breadcrumb";
import Icon from "@/components/components/icon";
import ReceiveFeedback from "@/components/components/receive-feedback";
import Trending from "@/components/components/trending";
import { RULES_DEMO } from "@/components/dashboard/constants";
import ListAllHotels from "@/components/dashboard/hotels/list-hotels";
import ListHotelFavorite from "@/components/dashboard/hotels/list-hotels-favorite";
import Rules from "@/components/dashboard/hotels/rules";
import { cn } from "@/utils/constants";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Lưu trú - KoKoTravel",
};

const HotelPage = () => {
  return (
    <div className="w-full h-full posing-vertical-1 ">
      <BreadcrumbHead
        items={[{ label: "Trang chủ", href: "/home" }, { label: "Lưu trú" }]}
      />
      <Trending page="hotels" />
      <hr className="hr" />
      <Rules />
      <hr className="hr" />
      <div className="relative w-full h-full bg-fixed bg-no-repeat rounded-14 bg-cover bg-[url('../assets/images/banner-hotel.jpg')]">
        <div className="absolute inset-0 bg-black/40 rounded-14"></div>{" "}
        <section className={cn("relative p-4 text-white", "lg:p-10")}>
          <div className="w-full h-auto flex items-center justify-between gap-y-2 bg-white p-6 text-black_sub rounded-md shadow-lg">
            <div className="posing-vertical-6">
              <h3 className="text-black text-normal lg:text-lg font-semibold mb-3">
                Tận hưởng không gian nghỉ dưỡng lý tưởng - Hành trình đáng nhớ
                đang chờ đón bạn! ✨
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Chúng tôi giúp bạn tìm kiếm những khách sạn lý tưởng nhất, từ
                view biển thơ mộng đến trung tâm sôi động.
              </p>
              <Link
                href="#list-all-hotel"
                className="bg-bg_primary_main text-white hover:bg-bg_primary_active transition-all duration-300 transform hover:scale-105 hover:shadow-lg p-3 py-2 rounded-8 text-normal font-medium"
              >
                Khám phá ngay
              </Link>
            </div>
            <Image
              src={bannerSearch}
              alt="img_preview"
              className="min-w-[18%] min-h-[80%] w-[35%] lg:w-[25%] h-[100%] object-cover rounded-md shadow-md"
            />
          </div>
        </section>
      </div>

      <hr className="hr" />
      {/* favorite */}
      <ListHotelFavorite />
      {/* all hotels */}
      <hr className="hr" />
      <ListAllHotels />
      <section className="p-6 bg-gray-100 rounded-xl shadow-md posing-vertical-3">
        <h2 className="text-xl font-bold text-gray-800 ">
          Quy định{" "}
          <span className="text-sm text-gray-600">
            (có thể thay đổi theo từng nơi lưu trú)
          </span>
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {RULES_DEMO.map((rule, index) => (
            <div
              key={index}
              className="flex items-start gap-3 bg-white p-4 rounded-lg shadow hover:shadow-md transition-all"
            >
              <Icon className="text-blue_main_sub size-4 lg:size-5 mt-[1px]">
                <rule.icon />
              </Icon>
              <div>
                <h3 className="text-md font-medium text-gray-800">
                  {rule.title}
                </h3>
                <p className="text-gray-600 text-sm mt-1">{rule.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <ReceiveFeedback />
    </div>
  );
};
export default HotelPage;
