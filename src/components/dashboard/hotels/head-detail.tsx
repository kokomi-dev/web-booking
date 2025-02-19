"use client";

const scrollToView = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  } else {
    console.error("Không tìm thấy element scroll.");
  }
};
const HeadDetail = () => {
  return (
    <div className="w-full text-small flex overflow-x-auto items-center justify-between gap-x-3 p-2 lg:p-0 !mt-0 lg:!mt-[1.3rem]   ">
      <div
        className="text-start lg:text-center scroll-smooth min-w-max w-full cursor-pointer "
        onClick={() => {
          scrollToView("overview");
        }}
      >
        Tổng quan
      </div>
      <div
        className="text-start lg:text-center scroll-smooth min-w-max w-full cursor-pointer"
        onClick={() => {
          scrollToView("info_utilities");
        }}
      >
        Thông tin và tiện ích
      </div>
      <div
        className="text-start lg:text-center scroll-smooth min-w-max w-full cursor-pointer"
        onClick={() => {
          scrollToView("price");
        }}
      >
        Giá đặt phòng
      </div>
      <div
        className="text-start lg:text-center scroll-smooth min-w-max w-full cursor-pointer"
        onClick={() => {
          scrollToView("general_rule");
        }}
      >
        Quy tắc chung
      </div>
      <div
        className="text-start lg:text-center scroll-smooth min-w-max w-full cursor-pointer"
        onClick={() => {
          scrollToView("comments");
        }}
      >
        Đánh giá của khách hàng
      </div>
    </div>
  );
};

export default HeadDetail;
