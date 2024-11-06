"use client";
import React from "react";

const scrollToView = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  } else {
    console.error("Element with id 'info_utilities' not found.");
  }
};
const HeadDetail = () => {
  return (
    <div className="w-full text-small flex items-center justify-between   ">
      <div
        className="text-center scroll-smooth w-full cursor-pointer "
        onClick={() => {
          scrollToView("overview");
        }}
      >
        Tổng quan
      </div>
      <div
        className="text-center scroll-smooth w-full cursor-pointer"
        onClick={() => {
          scrollToView("info_utilities");
        }}
      >
        Thông tin và tiện ích
      </div>
      <div
        className="text-center scroll-smooth w-full cursor-pointer"
        onClick={() => {
          scrollToView("price");
        }}
      >
        Giá đặt phòng
      </div>
      <div
        className="text-center scroll-smooth w-full cursor-pointer"
        onClick={() => {
          scrollToView("general_rule");
        }}
      >
        Quy tắc chung
      </div>
      <div
        className="text-center scroll-smooth w-full cursor-pointer"
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
