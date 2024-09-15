import Image from "next/image";

import bannerSearch from "@/assets/images/pre-hotel.jpg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ListAllHotels from "@/components/dashboard/hotels/list-hotels";
const HotelPage = () => {
  return (
    <div className="w-full h-full flex  flex-col items-center justify-between gap-2 md:gap-4 lg:gap-6 ">
      <div className={cn("w-full flex items-center justify-center flex-col ")}>
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
      <div className="w-full h-full bg-fixed bg-no-repeat rounded-14 bg-cover bg-[url('../assets/images/banner-hotel.jpg')]">
        <div className={cn("p-4  text-white", "lg:p-10")}>
          <div className="w-full h-auto flex items-center justify-between bg-white p-4 text-black_sub rounded-md">
            <div>
              <h4 className="text-black">
                Để khám phá được một nơi đẹp thì bạn cần một chỗ nghỉ tốt
              </h4>
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
        </div>
        <h3 className={cn("p-4 text-white", "lg:px-20")}>
          Chỉ cần đăng nhập tài khoản, bạn sẽ sở hữu cho mình nhiều ưu đãi và
          chương trình chi ân cho những khách hàng mới đặc biệt ưu đãi!
        </h3>
      </div>
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
