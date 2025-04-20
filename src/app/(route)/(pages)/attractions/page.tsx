import { Metadata } from "next";

import BreadcrumbHead from "@/components/components/breadcrumb";
import ReceiveFeedback from "@/components/components/receive-feedback";
import Trending from "@/components/components/trending";
import BannerSale from "@/components/dashboard/attraction/banner-sale";
import Intro from "@/components/dashboard/attraction/intro";
import ListAttractions from "@/components/dashboard/attraction/list-attractions";
import ListProvinces from "@/components/dashboard/attraction/list-provinces";
import ListAttractionsTrending from "@/components/dashboard/attraction/list-trending-attractions";
import ListTabAllType from "@/components/components/list-tab-all-type";
import ListFestivals from "@/components/components/list-festival";

export const metadata: Metadata = {
  title: "Địa điểm du lịch - KoKoTravel",
};

const HomePage = () => {
  return (
    <div className="w-full h-full section-spacing ">
      {/* Trending */}
      <section className="list-spacing">
        <BreadcrumbHead
          items={[
            { label: "Trang chủ", href: "/home" },
            { label: "Địa điểm du lịch" },
          ]}
        />
        <Trending page="attractions" />
      </section>
      {/* Giới thiệu */}
      <Intro />
      <section className="section-spacing container xl:px-0 ">
        {/* địa điểm nổi bật
         */}
        <ListAttractionsTrending />
        {/* tất cả địa điểm */}
        <ListAttractions />
      </section>

      {/* banner giới thiệu */}
      <BannerSale />

      <ListTabAllType />
      <ListFestivals />
      {/* các tinh thành */}
      <ListProvinces />
      {/* feeback */}
      <ReceiveFeedback />
    </div>
  );
};

export default HomePage;
