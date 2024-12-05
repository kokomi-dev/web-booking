import Image from "next/image";

import bannerSearch from "@/assets/images/pre-hotel.jpg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ListAllHotels from "@/components/dashboard/hotels/list-hotels";
import Trending from "@/components/components/trending";
import Rules from "@/components/dashboard/hotels/rules";
import { RULES_DEMO } from "@/components/dashboard/constants";
import ReceiveFeedback from "@/components/components/receive-feedback";
const HotelPage = () => {
  return (
    <div className="w-full h-full flex  flex-col items-center justify-between gap-4  lg:gap-6 ">
      <Trending page="hotels" />
      <hr className="hr" />
      <Rules />
      <hr className="hr" />
      <div className="w-full h-full bg-fixed bg-no-repeat rounded-14 bg-cover bg-[url('../assets/images/banner-hotel.jpg')]">
        <section className={cn("p-4  text-white", "lg:p-10")}>
          <div className="w-full h-auto flex items-center justify-between gap-y-2 bg-white p-4 text-black_sub rounded-md">
            <div>
              <h3 className="text-black text-small lg:text-normal font-normal">
                Để khám phá được một nơi đẹp, bạn cần một chỗ nghỉ tốt
              </h3>
              <Button className="bg-bg_primary_blue_sub text-white mt-2">
                Đặt phòng ngay bây giờ
              </Button>
            </div>
            <Image
              src={bannerSearch}
              alt="img_preview"
              className="min-w-[18%] min-h-[80%]  w-[35%] lg:w-[25%] h-[100%] object-cover rounded-md"
            />
          </div>
        </section>
      </div>
      <hr className="hr" />
      <div
        className={cn(
          "w-full flex flex-col items-start justify-start gap-2",
          "md:gap-4",
          "lg:gap-6"
        )}
      >
        {/* all hotels */}
        <ListAllHotels />
        {/* trending */}
      </div>
      <section className="mt-4">
        <h2 className="text-large font-bold text-gray-800 mb-4">
          Quy định{" "}
          <span className="text-medium">
            (có thể thay đổi theo từng nơi lưu trú)
          </span>
        </h2>
        <div className="grid gap-y-3 md:grid-cols-2 gap-x-2">
          {RULES_DEMO.map((rule, index) => (
            <div key={index} className="bg-bg_black_sub p-2 rounded-14">
              <h3 className="text-normal font-medium text-black">
                {rule.title}
              </h3>
              <p className="text-black-main text-small font-light lg:font-normal mt-1">
                {rule.description}
              </p>
            </div>
          ))}
        </div>
      </section>
      <ReceiveFeedback />
    </div>
  );
};
export default HotelPage;
