import Image from "next/image";

import bannerSearch from "@/assets/images/pre-hotel.jpg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ListAllHotels from "@/components/dashboard/hotels/list-hotels";
import Trending from "@/components/dashboard/home/trending";
import Rules from "@/components/dashboard/hotels/rules";

const HotelPage = () => {
  return (
    <div className="w-full h-full flex  flex-col items-center justify-between gap-2 md:gap-4 lg:gap-6 ">
      <Trending page="hotels" />
      <hr className="hr" />
      <Rules />
      <hr className="hr" />
      <div className="w-full h-full bg-fixed bg-no-repeat rounded-14 bg-cover bg-[url('../assets/images/banner-hotel.jpg')]">
        <section className={cn("p-4  text-white", "lg:p-10")}>
          <div className="w-full h-auto flex items-center justify-between bg-white p-4 text-black_sub rounded-md">
            <div>
              <h3 className="text-black text-normal font-medium">
                Để khám phá được một nơi đẹp thì bạn cần một chỗ nghỉ tốt
              </h3>
              <Button className="bg-bg_primary_blue_sub text-white mt-2">
                Đặt phòng ngay bây giờ
              </Button>
            </div>
            <Image
              src={bannerSearch}
              alt="img_preview"
              className="min-w-[18%] min-h-[80%] w-[25%] h-[100%] object-cover rounded-md"
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
    </div>
  );
};
export default HotelPage;
