"use client";
import React from "react";
import { Check } from "lucide-react";
import { cx } from "class-variance-authority";
import Link from "next/link";
import Image from "next/image";

import SlideShowImage from "@/components/dashboard/homepage/slide-show";
import { listAddressTredingHome } from "@/components/dashboard/homepage/constant";
import { Button } from "@/components/ui/button";
import { useAuthenticatedStore } from "@/store/authencation-store";
function HomePage() {
  const { isAuthenticated, user } = useAuthenticatedStore();

  return (
    <div className=" bg-white flex flex-col w-fulll gap-8 ">
      <section className=" bg-cover bg-center h-[400px] md:h-[600px] -mt-4 flex items-center justify-center text-black bg-[url('../assets/images/banner2.jpg')]  bg-no-repeat -mx-4 lg:-mx-[10rem]">
        <div className="text-center bg-[rgba(0,0,0,0.5)] rounded-14 p-4 px-8  ">
          <h1
            className={cx(
              "text-medium font-bold text-white",
              "lg:text-largest"
            )}
          >
            Khám phá vẻ đẹp của Việt Nam
          </h1>
          <p className="mt-4 text-small md:text-normal text-white ">
            Trải nghiệm những khoảnh khắc khó quên và khung cảnh tuyệt đẹp.
          </p>
          <Link
            href="/attractions"
            className="mt-6 px-8 py-3 underline text-yellow_main rounded-md"
          >
            Khám phá ngay
          </Link>
        </div>
      </section>
      {/* Điểm đến nổi bật */}
      <section className=" ">
        <h2 className={cx("text-medium font-semibold mb-6", "lg:text-large")}>
          Điểm đến hàng đầu
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {listAddressTredingHome.map((e, index) => (
            <Link
              href={e.path}
              key={index}
              className="rounded-lg shadow-lg overflow-hidden hover:cursor-pointer"
            >
              <Image alt="img-pre-view" width={500} height={400} src={e.img} />
              <div className="p-4">
                <h3 className="text-normal font-semibold">{e.label}</h3>
                <p className="mt-2 text-black_sub text-small">{e.des}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="text-center bg-[rgba(0,0,0,0.5)]  rounded-14 ">
        <SlideShowImage />
      </section>
      {/* chỗ nghỉ */}
      <section className=" py-12 px-6 md:px-12 lg:px-24 rounded-14">
        <div className=" text-center">
          <h1 className="text-largest font-bold text-black mb-6">
            Đặt chỗ nghỉ lý tưởng tại Việt Nam
          </h1>
          <p className="text-small md:text-normal text-black_sub mb-8">
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
      <section className=" bg-bg_black_sub p-4 py-6 rounded-14">
        <h2 className="text-large  font-semibold text-start">
          Khách hàng nói gì
        </h2>
        <div className="mt-8 max-w-3xl mx-auto space-y-4">
          <blockquote className="p-4 bg-white rounded-md shadow">
            <p className="text-black_sub text-normal font-normal">
              "Trải nghiệm tuyệt vời! Cảnh đẹp và dịch vụ thật sự ấn tượng."
            </p>
            <footer className="mt-2 text-right text-sm text-blue_main_sub font-medium text-normal">
              - Nguyễn Văn An
            </footer>
          </blockquote>
          <blockquote className="p-4 bg-white rounded-md shadow">
            <p className="text-black_sub text-normal font-normal">
              "Rất đúng với mô tả, chất lượng ổn, có nhiều ưu đãi."
            </p>
            <footer className="mt-2 text-right text-sm text-blue_main_sub font-medium text-normal">
              - Đặng Thanh Huyền
            </footer>
          </blockquote>{" "}
          <blockquote className="p-4 bg-white rounded-md shadow">
            <p className="text-black_sub text-normal font-normal">
              "Tư vấn hỗ trợ nhanh, giải đáp nhiệt tình...."
            </p>
            <footer className="mt-2 text-right text-sm text-blue_main_sub font-medium text-normal">
              - Lê Thị Mười
            </footer>
          </blockquote>
          {/* Thêm các phản hồi khác nếu cần */}
        </div>
        <Link
          href="/blog/feedback"
          className=" bg-yellow_main text-white p-1 px-3 rounded-8 text-small"
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
          href="/content?activeTab=1"
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
      <section className=" bg-bg_black_sub rounded-14 p-4 py-6">
        <h2 className="text-large font-semibold mb-6">
          Ưu đãi cho khách hàng mới
        </h2>

        {!isAuthenticated && !user ? (
          <div>
            <p className="text-black text-small">
              Đăng ký ngay để nhận được mã giảm giá 10% cho chuyến đi đầu tiên
              của bạn và nhiều ưu đãi đang chờ đón bạn!
            </p>
            <Link
              href="/sign-in"
              className="mt-4 inline-block px-4 py-1 text-small bg-bg_primary_blue_sub hover:bg-bg_primary_active text-white rounded-md"
            >
              Khám phá ngay thôi nào !
            </Link>
          </div>
        ) : (
          <div>
            <p className="text-black text-small">
              Hãy xem qua các ưu đãi mà bạn đang có để không bỏ lỡ những chương
              trình khuyến mãi đặc biệt có hạn này.
            </p>
            <Button className="mt-4 px-6 py-2 bg-bg_primary_blue_sub hover:bg-bg_primary_active text-white rounded-md">
              Xem ngay các ưu đãi của bạn
            </Button>
          </div>
        )}
      </section>
      {/* Bài viết & Mẹo du lịch */}
      <section className="">
        <h2 className="text-large font-semibold mb-6">
          Mẹo du lịch & Bài viết
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-lg shadow-lg p-4 bg-white">
            <h3 className="text-normal font-medium">
              Thời điểm lý tưởng để thăm Việt Nam ?
            </h3>
            <p className="mt-2 text-small text-black_sub">
              Tìm hiểu thời điểm và địa điểm tốt nhất để khám phá.
            </p>
            <button className="mt-4 text-blue-500 text-small">Đọc thêm</button>
          </div>
          <div className="rounded-lg shadow-lg p-4 bg-white">
            <h3 className="text-normal font-medium">
              Nên mang những gì để sang du lịch Việt Nam ?
            </h3>
            <p className="mt-2 text-small text-black_sub">
              Nên xem trước khí hậu, địa hình nơi mà bạn muốn đến để sắp xếp đồ
              đạc một cách hợp lí
            </p>
            <button className="mt-4 text-blue-500 text-small">Đọc thêm</button>
          </div>{" "}
          <div className="rounded-lg shadow-lg p-4 bg-white">
            <h3 className="text-normal font-medium">
              Đồ ăn Việt Nam hợp với mọi khách du lịch không ?
            </h3>
            <p className="mt-2 text-small text-black_sub">
              Theo hầu hết đa số khách du lịch đến Việt Nam đều cho rằng ẩm thực
              ở đây rất dễ ăn và ngon.
            </p>
            <button className="mt-4 text-blue-500 text-small">Đọc thêm</button>
          </div>{" "}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
