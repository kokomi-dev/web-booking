import { cn } from "@/utils/constants";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import feedBack1 from "@/assets/images/feedback-1.jpeg";
import feedBack2 from "@/assets/images/feedback-2.jpeg";
import feedBack3 from "@/assets/images/feedback-3.jpeg";
import { listAddressTredingHome } from "@/components/dashboard/homepage/constant";
import ListBlogsTrending from "@/components/dashboard/blog/list-blogs-trending";
import SalesCustommer from "@/components/dashboard/homepage/sales-custommer";
import imgBanner from "@/assets/images/banner2.jpg";
function HomePage() {
  return (
    <div className=" bg-white flex flex-col w-fulll gap-4 lg:gap-6  ">
      <section className="hidden md:block min-w-full h-full text-center relative -mt-4 px-[-10rem] no-container-padding">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg rounded-lg px-6 py-4 flex items-center justify-center ">
          <p className="text-lg font-semibold text-gray-800 text-center">
            ✨ Trải nghiệm những chuyến du lịch đáng nhớ cùng chúng tôi!
            <br /> Khám phá, tận hưởng và ghi dấu những khoảnh khắc tuyệt vời.
            🏝️✈️
          </p>
        </div>

        <Image
          alt="img-banner-home"
          src={imgBanner}
          width={1920}
          height={1080}
          priority={true}
          placeholder="empty"
          className="w-full min-h-[360px] md:min-h-[400px] lg:min-h-[480px] object-cover object-top"
        />
      </section>
      {/* Điểm đến nổi bật */}
      <section className=" ">
        <h2 className={cn("text-medium font-semibold mb-6", "lg:text-large")}>
          Điểm đến hàng đầu
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listAddressTredingHome.map((e, index) => (
            <Link
              href={e.path}
              key={index}
              className="rounded-lg shadow-lg overflow-hidden hover:cursor-pointer"
            >
              <Image
                alt="img-pre-view"
                width={500}
                height={400}
                src={e.img}
                loading="lazy"
                className="w-full h-[220px] md:h-[250px] lg:h-[280px] object-cover "
              />
              <div className="p-4">
                <h3 className="text-normal font-bold">{e.label}</h3>
                <p className=" text-black_sub text-small">{e.des}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <SalesCustommer />
      {/* chỗ nghỉ */}
      <section className="py-5 md:py-8 lg:py-12 px-2 md:px-12 lg:px-24 rounded-14">
        <div className=" text-center">
          <h1 className="text-largest font-bold text-black mb-6">
            Đặt chỗ nghỉ lý tưởng tại Việt Nam
          </h1>
          <p className="text-small text-justify md:text-normal text-black_sub mb-8">
            Trải nghiệm dịch vụ đặt chỗ nhanh chóng và tiện lợi cho chuyến du
            lịch của bạn. Tìm kiếm và lựa chọn từ hàng ngàn khách sạn, homestay,
            và khu nghỉ dưỡng trên khắp Việt Nam, từ những thành phố sôi động
            đến các vùng quê yên bình.
          </p>
          <Link
            href="/hotels"
            className=" text-blue_main_sub font-medium underline px-6 py-3 rounded-md transition duration-300"
          >
            Đi đến nơi lưu trú
          </Link>
        </div>
      </section>
      {/* Phản hồi từ khách hàng */}
      <section className=" bg-bg_black_sub p-2 py-6 rounded-14 flex flex-col gap-y-3">
        <h2 className="text-large  font-semibold text-start">
          Khách hàng nói gì
        </h2>
        <div className="mt-2 md:mt-5 lg:mt-8 max-w-3xl mx-auto space-y-2">
          <blockquote className="p-4 bg-white rounded-md shadow">
            <div className="grid grid-cols-[15%,85%] gap-x-1">
              <Image
                src={feedBack1}
                alt="img-feedback"
                width={400}
                height={400}
                className="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] rounded-full"
              />
              <p className="text-black_sub text-normal font-normal">
                "Trải nghiệm tuyệt vời! Cảnh đẹp và dịch vụ thật sự ấn tượng."
              </p>
            </div>
            <footer className="mt-2 text-right text-sm text-blue_main_sub font-medium text-normal">
              - Nguyễn Văn An
            </footer>
          </blockquote>
          <blockquote className="p-4 bg-white rounded-md shadow">
            <div className="grid grid-cols-[15%,85%] gap-x-1">
              <Image
                src={feedBack3}
                alt="img-feedback"
                width={400}
                height={400}
                className="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] rounded-full"
              />
              <p className="text-black_sub text-normal font-normal">
                "Rất đúng với mô tả, chất lượng ổn, có nhiều ưu đãi."
              </p>
            </div>
            <footer className="mt-2 text-right text-sm text-blue_main_sub font-medium text-normal">
              - Đặng Thanh Huyền
            </footer>
          </blockquote>{" "}
          <blockquote className="p-4 bg-white rounded-md shadow">
            <div className="grid grid-cols-[15%,85%] gap-x-1">
              <Image
                src={feedBack2}
                alt="img-feedback"
                width={400}
                height={400}
                className="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] rounded-full"
              />
              <p className="text-black_sub text-normal font-normal">
                "Tư vấn hỗ trợ nhanh, giải đáp nhiệt tình...."
              </p>
            </div>
            <footer className="mt-2 text-right text-sm text-blue_main_sub font-medium text-normal">
              - Lê Thị Mười
            </footer>
          </blockquote>
          {/* Thêm các phản hồi khác nếu cần */}
        </div>
        <Link
          href="/blog/feedback"
          className="w-fit bg-yellow_main text-white p-1 px-3 rounded-8 text-small "
        >
          Xem thêm
        </Link>
      </section>
      {/* Thanh toán và cam kết chất lượng */}
      <section className="text-normal">
        <h2 className="text-large font-semibold mb-6">
          Thanh toán & Cam kết chất lượng
        </h2>
        <p className="text-black mb-4">
          Chúng tôi cung cấp nhiều phương thức thanh toán linh hoạt như thẻ tín
          dụng, chuyển khoản, và thanh toán qua ví điện tử.
        </p>
        <p className="text-black mb-4">
          Cam kết dịch vụ chất lượng cao với các hướng dẫn viên chuyên nghiệp và
          lịch trình chi tiết.
        </p>
        <Link
          href="/content/privacy?activeTab=1"
          className="text-blue_main text-small underline"
        >
          Xem thêm về chính sách của chúng tôi
        </Link>
      </section>
      {/* Quyền lợi của khách du lịch */}
      <section className="">
        <h2 className="text-large font-semibold mb-6">
          Quyền lợi của khách du lịch
        </h2>
        <ul className=" pl-2 space-y-2">
          <li className="flex items-center justify-start gap-x-1">
            <Check className="size-4 text-green_main" />
            Đảm bảo an toàn và hỗ trợ 24/7 trong suốt hành trình.
          </li>
          <li className="flex items-center justify-start gap-x-1">
            <Check className="size-4 text-green_main" />
            Các tour du lịch được thiết kế riêng theo yêu cầu.
          </li>
          <li className="flex items-center justify-start gap-x-1">
            <Check className="size-4 text-green_main" />
            Bảo hiểm du lịch toàn diện.
          </li>
        </ul>
      </section>
      {/* Ưu đãi cho khách hàng mới */}

      {/* Bài viết & Mẹo du lịch */}
      <ListBlogsTrending />
    </div>
  );
}

export default HomePage;
