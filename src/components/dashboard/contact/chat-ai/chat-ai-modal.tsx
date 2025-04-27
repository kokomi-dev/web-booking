"use client";
import { getAttractionTrending } from "@/api/api-attractions";
import { getAllBlogTrending } from "@/api/api-blog";
import { sendMessages } from "@/api/api-chat";
import { getFilterHotel } from "@/api/api-hotels";
import QUERY_KEY_ATTRACTION from "@/services/queryKeyStore/attractionQueryKeyStore";
import QUERY_KEY_BLOG from "@/services/queryKeyStore/blogQueryKeyStore";
import QUERY_KEY_HOTEL from "@/services/queryKeyStore/hotelQueryKeyStore";
import { AttractionData } from "@/types/attraction.type";
import { cn } from "@/utils/constants";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Bot, User } from "lucide-react";
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const ChatModalAI = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [displayedMessages, setDisplayedMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Lấy danh sách nhà nghỉ nổi bật
  const { data: listHotel, isLoading: isLoadingHotel } = useQuery({
    queryKey: [QUERY_KEY_HOTEL.GET_ALL_TRENDING],
    queryFn: async () => {
      const res = await getFilterHotel({ isFavorite: "1" });
      if (res?.status === 200 && res.data?.data) {
        return res.data.data.filter(
          (item: AttractionData) => item.isActive === true
        );
      }
      return [];
    },
    retry: 3,
    retryDelay: 1000,
  });

  // Lấy danh sách địa điểm du lịch nổi bật
  const { data: listAttraction, isLoading: isLoadingAttraction } = useQuery({
    queryKey: [QUERY_KEY_ATTRACTION.GET_ALL_TRENDING],
    queryFn: async () => {
      const res = await getAttractionTrending();
      if (res?.status === 200 && res.data?.data) {
        return res.data.data.filter(
          (item: AttractionData) => item.isActive === true
        );
      }
      return [];
    },
    retry: 3,
    retryDelay: 1000,
  });

  // Lấy danh sách bài viết nổi bật
  const { data: listBlogTrending, isLoading: isLoadingBlog } = useQuery({
    queryKey: [QUERY_KEY_BLOG.GET_ALL_TRENDING],
    queryFn: async () => {
      const res = await getAllBlogTrending();
      if (res.status === 200 && res.data.listBlogs.length > 0) {
        return res.data.listBlogs;
      }
      return [];
    },
    retry: 3,
    retryDelay: 1000,
  });

  const mutationSendMessage = useMutation({
    mutationFn: sendMessages,
  });

  const sendMessage = async (messageContent: string) => {
    if (!messageContent.trim()) return;

    const userMessage: Message = { role: "user", content: messageContent };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");

    mutationSendMessage.mutate(
      { messages: [...messages, userMessage] },
      {
        onSuccess: async (res: any) => {
          const newMessage = res?.data.response;
          if (newMessage) {
            const aiMessage: Message = {
              role: "assistant",
              content: newMessage,
            };
            setMessages((prevMessages) => [...prevMessages, aiMessage]);
          }
        },
        onError: () => {
          const errorMessage: Message = {
            role: "assistant",
            content: "Xin lỗi, đã xảy ra lỗi khi gửi tin nhắn.",
          };
          setMessages((prevMessages) => [...prevMessages, errorMessage]);
        },
      }
    );
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage(input);
    }
  };

  const handleSuggestedQuestionClick = async (question: string) => {
    // Thêm tin nhắn của người dùng
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: question },
    ]);

    const loadingMessage: Message = {
      role: "assistant",
      content: "<skeleton-loading />",
    };
    setMessages((prevMessages) => [...prevMessages, loadingMessage]);

    setTimeout(() => {
      let responseContent = "";

      if (question === "Địa điểm du lịch đẹp nhất" && listAttraction?.length) {
        responseContent = `
          <h4>Dưới đây là các địa điểm du lịch nổi bật:</h4>
        <ul class="mt-3">
  ${listAttraction
    .map(
      (item: AttractionData) => `
      <li style="margin-bottom: 10px;">
        <a href="attractions/${
          item.slug
        }" target="_blank" style="text-decoration: none; color: #003B96; display: flex; align-items: center; gap: 10px; transition: all 0.2s ease-in-out;" onmouseover="this.style.backgroundColor='#f0f7ff'; this.style.textDecoration='underline';" onmouseout="this.style.backgroundColor='transparent'; this.style.textDecoration='none';">
          <img src="${item.images[0] || "/default-image.jpg"}" alt="${
        item.name
      }" style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px; border-radius: 4px" />
          ${item.name}
        </a>
      </li>
    `
    )
    .join("")}
</ul>`;
      } else if (question === "Nhà nghỉ tốt nhất" && listHotel?.length) {
        responseContent = `
          <h4>Dưới đây là các nhà nghỉ nổi bật:</h4>
          <ul class="mt-3">
            ${listHotel
              .map(
                (item: AttractionData) => `
                <li style="margin-bottom: 10px;">
                  <a href="hotels/${
                    item.slug
                  }" target="_blank"style="text-decoration: none; color: #003B96; display: flex; align-items: center; gap: 10px; transition: all 0.2s ease-in-out;" onmouseover="this.style.backgroundColor='#f0f7ff'; this.style.textDecoration='underline';" onmouseout="this.style.backgroundColor='transparent'; this.style.textDecoration='none';">
                    <img src="${item.images[0] || "/default-image.jpg"}" alt="${
                  item.name
                }" style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px; border-radius: 4px" />
                    ${item.name}
                  </a>
                </li>
              `
              )
              .join("")}
          </ul>`;
      } else if (question === "Bài viết hữu ích" && listBlogTrending?.length) {
        responseContent = `
          <h4>Dưới đây là các bài viết hữu ích:</h4>
          <ul class="mt-3">
            ${listBlogTrending
              .map(
                (item: any) => `
                <li style="margin-bottom: 10px;">
                  <a href="blogs/${
                    item.slug
                  }" target="_blank" style="text-decoration: none; color: #003B96; display: flex; align-items: center; gap: 10px; transition: all 0.2s ease-in-out;" onmouseover="this.style.backgroundColor='#f0f7ff'; this.style.textDecoration='underline';" onmouseout="this.style.backgroundColor='transparent'; this.style.textDecoration='none';">
                    <img src="${item.imgBanner || "/default-image.jpg"}" alt="${
                  item.title
                }" style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px; border-radius: 4px" />
                    ${item.title}
                  </a>
                </li>
              `
              )
              .join("")}
          </ul>`;
      } else {
        responseContent = "Hiện tại không có dữ liệu phù hợp.";
      }

      // Cập nhật tin nhắn với kết quả
      const resultMessage: Message = {
        role: "assistant",
        content: responseContent,
      };
      setMessages((prevMessages) => [
        ...prevMessages.slice(0, -1),
        resultMessage,
      ]);
    }, 2500);
  };

  useEffect(() => {
    // Hiển thị toàn bộ tin nhắn ngay lập tức
    setDisplayedMessages(messages);
  }, [messages]);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [displayedMessages]);

  return (
    <div className="flex flex-col h-full rounded-lg text-black p-3 md:p-4">
      <h3 className="text-lg font-semibold text-black_sub">Chat với AI</h3>
      <p className="text-sm text-black_sub mt-2">
        Kết nối với AI để giải đáp các câu hỏi và nhận hỗ trợ nhanh chóng.
      </p>

      {/* Suggested Questions */}
      <div className="flex flex-wrap gap-2 mt-4">
        {[
          "Địa điểm du lịch đẹp nhất",
          "Nhà nghỉ tốt nhất",
          "Bài viết hữu ích",
        ].map((question, idx) => (
          <button
            key={idx}
            onClick={() => handleSuggestedQuestionClick(question)}
            className="px-4 py-2 bg-blue text-white shadow-lg rounded-2xl hover:bg-blue-600 transition-all text-sm"
          >
            {question}
          </button>
        ))}
      </div>

      <div
        ref={messagesContainerRef}
        className="min-h-[200px] flex-1 overflow-y-auto mb-4 p-2 md:p-3 lg:p-4 list-spacing"
      >
        {displayedMessages.map((msg, idx) => (
          <div
            key={idx}
            className={`text-${
              msg.role === "user"
                ? "right flex items-center justify-end"
                : "left w-fit"
            } my-2 first-letter:uppercase`}
          >
            <div className="flex items-start justify-start gap-x-1">
              {msg.role !== "user" && (
                <div className="size-8 rounded-full flex items-center justify-center bg-yellow flex-shrink-0">
                  <Bot className="size-4 " />
                </div>
              )}

              <div
                className={cn(
                  "rounded-14 p-1 px-3 first-letter:uppercase hover:cursor-default cursor-default",
                  msg.role === "user"
                    ? "text-white bg-blue_sub "
                    : "text-black_blur bg-black_sub "
                )}
              >
                {msg.content === "<skeleton-loading />" ? (
                  <div className="flex space-x-1 p-2">
                    <span className="w-2 h-2 lg:w-3 lg:h-3 bg-blue_main_sub rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-2 h-2 lg:w-3 lg:h-3 bg-red-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-2 h-2 lg:w-3 lg:h-3 bg-green rounded-full animate-bounce"></span>
                  </div>
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: msg.content }}></div>
                )}
              </div>
              {msg.role === "user" && (
                <div className="size-8 rounded-full flex items-center justify-center bg-white flex-shrink-0">
                  <User className="size-4 " />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="w-full flex gap-2">
        <input
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="flex-1 border p-2 rounded-lg shadow-sm"
          placeholder="Nhập tin nhắn..."
        />
        <button
          onClick={() => sendMessage(input)}
          className="bg-blue text-xs md:text-base text-white px-4 py-2 rounded-lg hover:bg-blue_main_sub"
        >
          Gửi
        </button>
      </div>
    </div>
  );
};

export default ChatModalAI;
