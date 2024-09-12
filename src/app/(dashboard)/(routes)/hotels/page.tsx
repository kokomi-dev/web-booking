import Image from "next/image";
import { Suspense } from "react";

import Loading from "@/app/loading";
import bannerSearch from "@/assets/images/pre-hotel.jpg";
import Search from "@/components/dashboard/home/search";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ListAllHotels from "@/components/dashboard/hotels/list-hotels";
import Banner from "@/components/dashboard/banner";
const HotelPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <div className="w-full h-full flex  flex-col items-center justify-between  ">
        <Banner image={bannerSearch}>
          <Search
            page="hotels"
            currentValue=""
            className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
          />
        </Banner>
        <div
          className={cn(
            "w-full flex items-center justify-center flex-col mt-[20rem]",
            "md:mt-[30rem]",
            "lg:py-10 lg:mt-[43rem]"
          )}
        >
          <h3 className="text-normal font-medium text-center">
            Những nơi ở tiện nghi, phục vụ chu đáo mang đến những trải nghiệm
            tuyệt vời đang chờ quý vị khám phá
          </h3>
          <ol className="text-center">
            <li className="my-3 text-small">Mang đến sự hài lòng</li>
            <li className="my-3 text-small">Mang đến sự trải nghiệm</li>
            <li className="my-3 text-small">Mang đến sự riêng tư</li>
            <li className="my-3 text-small">
              Mang đến với những giá cả hợp lí khi đặt phòng qua chúng tôi
            </li>
          </ol>
        </div>
        <div className="w-full h-full bg-fixed bg-no-repeat bg-cover bg-[url('../assets/images/banner-hotel.jpg')]">
          <div className={cn("p-4 pt-10 text-white", "lg:p-20")}>
            <div className="w-full h-auto flex items-center justify-between bg-white p-4 text-black_sub rounded-md">
              <div>
                <h4 className="text-black">
                  Để khám phá được một nơi đẹp thì bạn cần một chỗ nghỉ tốt
                </h4>
                <Button className="bg-red-400 text-white mt-2">
                  Đặt phòng ngay bây giờ
                </Button>
              </div>
              <Image
                src={bannerSearch}
                alt="img_preview"
                className="min-w-[18%] min-h-[80%] w-[25%] h-[100%] object-cover rounded-md"
              />
            </div>
          </div>
          <h3 className={cn("p-4 text-white", "lg:px-20")}>
            Chỉ cần đăng nhập tài khoản, bạn sẽ sở hữu cho mình nhiều ưu đãi và
            chương trình chi ân cho những khách hàng mới đặc biệt ưu đãi!
          </h3>
        </div>
        <div className={cn("w-full")}>
          {/* all hotels */}
          <ListAllHotels />
          {/* trending */}
        </div>
      </div>
    </Suspense>
  );
};
export default HotelPage;
