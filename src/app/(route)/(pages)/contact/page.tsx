import { ChevronRight, MailWarning } from "lucide-react";
import { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const stay = [
  "Hủy phòng",
  "thanh toán",
  "chi tiết đặt phòng",
  "trao đổi với khách",
  "các loại phòng",
  "giá cả",
  "thẻ tín dụng",
  "chính sách chỗ nghỉ",
  "tiện nghi thêm",
  "bảo mật và nhận thức",
];
const address = [
  "những câu hỏi phổ biến nhất",
  "giá cả",
  "chi tiết đặt chuyến đi",
  "tour của chúng tôi",
  "bảo mật quyền riêng tư",
];
const hotel = [
  "làm sao để tìm được phòng gần nơi du lịch nhât",
  "có những ưu đãi gì",
  "đánh giá của khách hàng",
  "bài viêt về các khu du lịch",
];
const privacy = [
  "bảo hiểm trong các chuyến đi",
  "chính sách về quyền lợi của khách hàng",
  "chính sách đổi trả",
  "bảo mật thông tin cá nhân khách hàng",
];
const Item = ({ title }: { title: string }) => {
  return (
    <div
      className={cn(
        "w-full border-[0.5px] border-t-[#999]  transition-all duration-300 flex items-center justify-between  cursor-pointer px-2 py-3",
        "lg:p-4",
        "hover:bg-gray-100"
      )}
    >
      <span className="capitalize font-normal text-[0.9rem] ">{title}</span>
      <ChevronRight className="text-small font-light" />
    </div>
  );
};

export const metadata: Metadata = {
  title: "Trợ giúp - KoKoTravel",
};
const ContactPage = () => {
  return (
    <section className="w-full">
      {/* head */}
      <div className="w-full ">
        <h6 className="pb-4">Trung tâm trợ giúp</h6>
        <div className="w-full border-[0.5px] border-[#999] rounded-xl p-4">
          <div className="flex items-center justify-start">
            <MailWarning className={cn("pr-2", "lg:pr-3")} />
            <span className="text-small font-bold">Bảo mật online</span>
          </div>
          <p className="my-2">
            Bảo vệ an toàn của bản thân bằng cách không chia sẻ thông tin cá
            nhân hay thẻ tín dụng qua cuộc gọi, email hay tin nhắn.
          </p>
          <Button variant="outline">Tìm hiểu thêm</Button>
        </div>
      </div>
      {/* main */}
      <div className="mt-5 w-full h-full flex flex-col items-start justify-start gap-2">
        <h1 className={cn("font-bold text-medium", "lg:text-large")}>
          Chào mừng đến với Trung tâm Trợ giúp
        </h1>
        <h3 className="text-normal font-normal">Chúng tôi luôn hỗ trợ 24/7</h3>
        <div className="w-full">
          <h4 className="text-small font-bold">Các câu hỏi thường gặp</h4>
          <div className="w-full mt-5">
            <Tabs
              defaultValue="stay"
              className="w-full border-[0.5px] border-[#999] "
            >
              <TabsList
                className={cn(
                  "w-full h-[60px] border-[#999]  flex  items-center justify-start gap-x-2  overflow-x-auto scrollbar-hide ",
                  "lg:grid lg:grid-cols-4 lg:h-auto"
                )}
              >
                <TabsTrigger className="w-auto" value="stay">
                  Lưu trú
                </TabsTrigger>
                <TabsTrigger className="w-auto" value="address">
                  Địa điểm{" "}
                </TabsTrigger>
                <TabsTrigger className="w-auto" value="hotel">
                  Nhà nghỉ & Khách sạn
                </TabsTrigger>
                <TabsTrigger className="w-auto" value="privacy">
                  Quyền lợi
                </TabsTrigger>
              </TabsList>
              <TabsContent value="stay">
                {stay.map((item, index) => {
                  return <Item key={index} title={item} />;
                })}
              </TabsContent>
              <TabsContent value="address">
                {address.map((item, index) => {
                  return <Item key={index} title={item} />;
                })}
              </TabsContent>
              <TabsContent value="hotel">
                {hotel.map((item, index) => {
                  return <Item key={index} title={item} />;
                })}
              </TabsContent>{" "}
              <TabsContent value="privacy">
                {privacy.map((item, index) => {
                  return <Item key={index} title={item} />;
                })}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
