import { Metadata } from "next";

import BreadcrumbHead from "@/components/components/breadcrumb";
import ListFestivals from "@/components/components/list-festival";
import ListTabAllType from "@/components/components/list-tab-all-type";
import ReceiveFeedback from "@/components/components/receive-feedback";
import Trending from "@/components/components/trending";
import {
  FAG,
  fakeRating,
  Question,
} from "@/components/dashboard/hotels/constant";
import ListAllHotels from "@/components/dashboard/hotels/list-hotels";
import ListHotelFavorite from "@/components/dashboard/hotels/list-hotels-favorite";
import Rules from "@/components/dashboard/hotels/rules";

export const metadata: Metadata = {
  title: "Lưu trú - KoKoTravel",
};

const HotelPage = () => {
  return (
    <div className="w-full h-full section-spacing">
      <section className="list-spacing">
        <BreadcrumbHead
          items={[{ label: "Trang chủ", href: "/home" }, { label: "Lưu trú" }]}
        />
        <Trending page="hotels" />
      </section>
      <Rules />
      {/* list hotels */}
      <section className="section-spacing container xl:px-0">
        <ListHotelFavorite />
        <ListAllHotels />
      </section>
      {/* lợi ích */}
      <section className="container xl:px-0 ">
        <div className="p-4 lg:p-6 bg-blue text-white rounded-xl shadow-md my-6">
          <h2 className="text-lg md:text-xl font-bold heading-spacing text-center">
            Lợi ích khi đặt phòng với chúng tôi
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {FAG.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start gap-3 bg-white text-black p-3 lg:p-4 rounded-lg shadow hover:shadow-md transition-all"
              >
                <div className="text-2xl">{benefit.icon}</div>
                <div>
                  <h3 className="text-base md:text-lg font-medium">
                    {benefit.title}
                  </h3>
                  <p className="text-sm md:text-base text-black_blur mt-1">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* đánh giá */}
      <section className="container p-4 lg:p-6 bg-gray-50 rounded-xl shadow-md my-6 ">
        <h2 className="text-xl md:text-2xl font-bold  text-center heading-spacing">
          Đánh giá từ khách hàng
        </h2>
        <div className="grid gap-3 md:gap-4 lg:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {fakeRating.map((review, index) => (
            <div
              key={index}
              className="flex flex-col items-start bg-white p-4 rounded-lg shadow hover:shadow-md transition-all"
            >
              <h3 className="text-sm lg:text-base font-medium text-black">
                {review.name}
              </h3>
              <p className="text-xs lg:text-sm text-black_sub mt-1">
                {review.feedback}
              </p>
              <div className="mt-2 flex items-center gap-1">
                {Array.from({ length: Math.floor(review.rating) }).map(
                  (_, i) => (
                    <span key={i} className="text-yellow">
                      ★
                    </span>
                  )
                )}
                {review.rating % 1 !== 0 && (
                  <span className="text-yellow">☆</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <ListTabAllType />
      <ListFestivals />
      {/* hỏi */}
      <section className="container p-4 lg:p-6 bg-white rounded-xl shadow-md my-6">
        <h2 className="text-xl md:text-2xl font-bold heading-spacing text-center">
          Câu hỏi thường gặp
        </h2>
        <div className="list-spacing">
          {Question.map((faq, index) => (
            <div key={index} className="p-3 bg-gray-50 rounded-lg shadow">
              <h3 className="text-sm lg:text-base font-medium text-black">
                {faq.question}
              </h3>
              <p className="text-xs lg:text-sm text-black_sub mt-1 font-light">
                {faq.answer}
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
