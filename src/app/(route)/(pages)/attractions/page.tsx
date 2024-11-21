import Intro from "@/components/dashboard/attraction/intro";
import ListTrendingTour from "@/components/dashboard/attraction/list-trending-attractions";
import { cn } from "@/lib/utils";
import Trending from "@/components/components/trending";
import ListProvinces from "@/components/dashboard/attraction/list-provinces";
import ReceiveFeedback from "@/components/dashboard/attraction/receive-feedback";
import Link from "next/link";
import ListAttractions from "@/components/dashboard/attraction/list-all-attractions";
const HomePage = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-between gap-2 md:gap-4 lg:gap-6 ">
      <Trending page="attractions" />
      <hr className="hr" />
      <Intro />
      <hr className="hr" />
      <div
        className={cn(
          "w-full h-full py-10 bg-fixed bg-no-repeat bg-cover bg-[url('../assets/images/banner2.jpg')]",
          "lg:py-0"
        )}
      >
        <div className={cn("w-full p-4 text-white", "lg:p-6")}>
          <h1 className="title_Page  !mb-2 text-yellow_main font-bold">
            Ưu đãi
          </h1>
          <p className="mb-2">
            Khuyến mãi giảm giá đặc biệt dành riêng cho bạn
          </p>
          <div className="w-full h-auto flex flex-col items-start justify-start bg-white p-4 text-black_sub rounded-md">
            <h4 className="w-full text-black_main">
              Vi vu tận hưởng không khí mùa hè cùng các địa điểm du lịch nổi
              tiếng của chúng tôi
            </h4>
            <p className="text-black_sub">
              Hãy trải nghiệm nó một cách trọn vẹn
            </p>
            <Link
              href="#list-all-attractions"
              className="bg-bg_primary_main text-white mt-1 hover:bg-bg_primary_active p-2 py-1 rounded-8 text-small"
            >
              Khám phá bây giờ
            </Link>
          </div>
        </div>
        <h3 className={cn("p-5 text-white underline hidden  ", " lg:block")}>
          Chỉ cần đăng nhập tài khoản, bạn sẽ sở hữu cho mình nhiều ưu đãi và
          chương trình tri ân cho những khách hàng mới đặc biệt ưu đãi!
        </h3>
      </div>
      <div
        className={cn(
          "w-full flex flex-col items-start justify-start gap-y-2",
          "md:gap-4",
          "lg:gap-6"
        )}
      >
        <hr className="hr" />
        <ListAttractions />
        <hr className="hr" />
        <ListTrendingTour />
      </div>
      <ListProvinces />
      <hr className="hr" />
      <ReceiveFeedback />
    </div>
  );
};

export default HomePage;
