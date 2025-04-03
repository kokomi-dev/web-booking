import Image from "next/image";
import Link from "next/link";

import feedBack1 from "@/assets/images/feedback-1.jpeg";
import feedBack2 from "@/assets/images/feedback-2.jpeg";
import feedBack3 from "@/assets/images/feedback-3.jpeg";
import FeedbackCard from "@/components/components/feedback-card";
import ListFestivals from "@/components/components/list-festival";
import ListTabAllType from "@/components/components/list-tab-all-type";
import ReceiveFeedback from "@/components/components/receive-feedback";
import ListBlogsTrending from "@/components/dashboard/blog/list-blogs-trending";
import BannerHome from "@/components/dashboard/homepage/banner";
import BannerSlogan from "@/components/dashboard/homepage/banner-slogan";
import { listAddressTredingHome } from "@/components/dashboard/homepage/constant";
import SalesCustommer from "@/components/dashboard/homepage/sales-custommer";
import TravelBenefitsSection from "@/components/dashboard/homepage/travel-benefit";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "KoKo Travel - Trang chủ",
  description:
    "Trang web giới thiệu, đặt chỗ, xem trước về các địa điểm du lịch, nơi nghỉ dưỡng trên khắp Việt Nam",
  icons: "/favicon.png",
};

function HomePage() {
  return (
    <div className="section-spacing">
      {/* Banner chính */}
      <BannerHome />

      {/* Điểm đến nổi bật */}
      <section className="list-spacing container xl:px-0 ">
        <h2 className="text-lg lg:text-2xl font-semibold">Điểm đến hàng đầu</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
          {listAddressTredingHome.map((e, index) => (
            <Link
              href={e.path}
              key={index}
              className="rounded-lg shadow-lg overflow-hidden hover:cursor-pointer"
            >
              <Image
                alt={e.label}
                width={500}
                height={400}
                src={e.img}
                loading="lazy"
                className="w-full h-[220px] md:h-[250px] lg:h-[280px] object-cover"
              />
              <div className="p-4">
                <h3 className="text-base font-bold">{e.label}</h3>
                <p className="text-black_sub font-light text-sm">{e.des}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Ưu đãi khách hàng */}
      <SalesCustommer />

      {/* Banner slogan */}
      <BannerSlogan />

      {/* Chỗ nghỉ */}
      <section className="container xl:px-0 px-2 md:px-12  rounded-14">
        <div className="text-center list-spacing">
          <h1 className="text-lg lg:text-3xl font-bold text-black ">
            Đặt chỗ nghỉ lý tưởng tại Việt Nam
          </h1>
          <p className="text-sm md:text-base text-black_sub  font-light lg:font-normal">
            Trải nghiệm dịch vụ đặt chỗ nhanh chóng và tiện lợi cho chuyến du
            lịch của bạn. Tìm kiếm và lựa chọn từ hàng ngàn khách sạn, homestay,
            và khu nghỉ dưỡng trên khắp Việt Nam, từ những thành phố sôi động
            đến các vùng quê yên bình.
          </p>
          <Link
            href="/hotels"
            className="text-blue_sub block font-medium underline px-6 py-3 rounded-md transition duration-300"
          >
            Đi đến nơi lưu trú
          </Link>
        </div>
      </section>

      {/* Phản hồi từ khách hàng */}
      <section className="container xl:px-0">
        <div className="bg-black_sub px-3 py-6 rounded-14 flex flex-col list-spacing">
          <h2 className="text-lg lg:text-2xl font-semibold text-start">
            Khách hàng nói gì
          </h2>
          <div className="list-spacing max-w-3xl mx-auto">
            <FeedbackCard
              image={feedBack1}
              alt="Ảnh phản hồi từ Nguyễn Văn An"
              feedback="Trải nghiệm tuyệt vời! Cảnh đẹp và dịch vụ thật sự ấn tượng."
              author="Nguyễn Văn An"
            />
            <FeedbackCard
              image={feedBack3}
              alt="Ảnh phản hồi từ Đặng Thanh Huyền"
              feedback="Rất đúng với mô tả, chất lượng ổn, có nhiều ưu đãi."
              author="Đặng Thanh Huyền"
            />
            <FeedbackCard
              image={feedBack2}
              alt="Ảnh phản hồi từ Lê Thị Mười"
              feedback="Tư vấn hỗ trợ nhanh, giải đáp nhiệt tình...."
              author="Lê Thị Mười"
            />
          </div>
        </div>
      </section>

      {/* Lợi ích du lịch */}
      <TravelBenefitsSection />

      {/* Bài viết & Mẹo du lịch */}
      <ListBlogsTrending />
      <ListTabAllType />
      <ListFestivals />
      {/* Nhận phản hồi */}
      <ReceiveFeedback />
    </div>
  );
}

export default HomePage;
