"use client";
import { ChevronRight, MailWarning, MessageCircle } from "lucide-react";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/constants";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BreadcrumbHead from "@/components/components/breadcrumb";
import { useState } from "react";
import ChatModalAI from "./chat-ai/chat-ai-modal";
import ChatModalEmploye from "./chat-employe/chat-employe";

const stay = [
  "Hủy phòng",
  "Thanh toán",
  "Chi tiết đặt phòng",
  "Trao đổi với khách",
  "Các loại phòng",
  "Giá cả",
  "Thẻ tín dụng",
  "Chính sách chỗ nghỉ",
  "Tiện nghi thêm",
  "Bảo mật và nhận thức",
];
const address = [
  "Những câu hỏi phổ biến nhất",
  "Giá cả",
  "Chi tiết đặt chuyến đi",
  "Tour của chúng tôi",
  "Bảo mật quyền riêng tư",
];
const hotel = [
  "Làm sao để tìm được phòng gần nơi du lịch nhất",
  "Có những ưu đãi gì",
  "Đánh giá của khách hàng",
  "Bài viết về các khu du lịch",
];
const privacy = [
  "Bảo hiểm trong các chuyến đi",
  "Chính sách về quyền lợi của khách hàng",
  "Chính sách đổi trả",
  "Bảo mật thông tin cá nhân khách hàng",
];

const Item = ({ title }: { title: string }) => {
  return (
    <div
      className={cn(
        "w-full border-[0.5px] border-t-[#999] transition-all duration-300 flex items-center justify-between cursor-pointer px-4 py-3",
        "lg:p-4",
        "hover:bg-gray-100"
      )}
    >
      <span className="capitalize font-medium text-sm lg:text-base">
        {title}
      </span>
      <ChevronRight className="text-gray-500 w-5 h-5" />
    </div>
  );
};

export const metadata: Metadata = {
  title: "Trợ giúp - KoKoTravel",
};

const Chat = () => {
  const [aiMessages, setAiMessages] = useState<string[]>([]);
  const [userMessage, setUserMessage] = useState("");

  const handleSendMessageToAI = () => {
    if (userMessage.trim() === "") return;

    // Simulate AI response
    const aiResponse = `AI trả lời: ${userMessage}`;
    setAiMessages((prev) => [...prev, `Bạn: ${userMessage}`, aiResponse]);
    setUserMessage("");
  };

  return (
    <div className="w-full mt-6">
      <Tabs
        defaultValue="ai"
        className="w-full border-[0.5px] border-[#999] rounded-lg overflow-hidden"
      >
        {/* Tabs List */}
        <TabsList className="w-full h-[60px] border-b-[0.5px] border-[#999] flex items-center justify-start gap-x-4 overflow-x-auto scrollbar-hide px-2 lg:grid lg:grid-cols-2 lg:h-auto lg:gap-0 lg:px-4">
          <TabsTrigger
            className="w-auto text-sm lg:text-base font-medium text-black_sub hover:text-blue-500"
            value="ai"
          >
            Chat với AI
          </TabsTrigger>
          <TabsTrigger
            className="w-auto text-sm lg:text-base font-medium text-black_sub hover:text-blue-500"
            value="user"
          >
            Chat với nhân viên hỗ trợ
          </TabsTrigger>
        </TabsList>

        {/* Tabs Content */}
        <TabsContent value="ai">
          <ChatModalAI />
        </TabsContent>

        <TabsContent value="user">
          <ChatModalEmploye />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Chat;
