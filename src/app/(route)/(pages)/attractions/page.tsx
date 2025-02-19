import { Metadata } from "next";
import Link from "next/link";

import BreadcrumbHead from "@/components/components/breadcrumb";
import ReceiveFeedback from "@/components/components/receive-feedback";
import Trending from "@/components/components/trending";
import Intro from "@/components/dashboard/attraction/intro";
import ListAttractions from "@/components/dashboard/attraction/list-all-attractions";
import ListProvinces from "@/components/dashboard/attraction/list-provinces";
import ListAttractionsTrending from "@/components/dashboard/attraction/list-trending-attractions";
import { cn } from "@/utils/constants";

export const metadata: Metadata = {
  title: "Địa điểm du lịch - KoKoTravel",
};

const HomePage = () => {
  return (
    <div className="w-full h-full posing-vertical-1 ">
      <BreadcrumbHead
        items={[
          { label: "Trang chủ", href: "/home" },
          { label: "Địa điểm du lịch" },
        ]}
      />
      <Trending page="attractions" />
      <hr className="hr" />
      <Intro />
      <hr className="hr" />
      <section
        className={cn(
          "w-full h-full py-10 bg-fixed bg-no-repeat bg-cover bg-[url('../assets/images/banner.jpg')]",
          "lg:py-0"
        )}
      >
        <div className={cn("w-full p-2 md:p-6", "lg:p-12")}>
          <div className="w-full h-auto posing-vertical-5 bg-white p-4 text-black_sub rounded-md">
            <h1 className="title_Page  !mb-2 text-yellow_main font-bold">
              Ưu đãi
            </h1>
            <h4 className="w-full text-black_main text-normal font-light">
              Vi vu tận hưởng không khí mùa hè cùng các địa điểm du lịch nổi
              tiếng của chúng tôi
            </h4>
            <p className="text-black_sub text-small font-light">
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
      </section>
      <hr className="hr" />
      <ListAttractionsTrending />
      <hr className="hr" />
      <ListAttractions />
      <ListProvinces />
      <hr className="hr" />
      <ReceiveFeedback />
    </div>
  );
};

export default HomePage;
