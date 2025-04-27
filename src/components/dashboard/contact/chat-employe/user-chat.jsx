import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import {
  playNotificationSound,
  requestNotificationPermission,
  sendBrowserNotification,
} from "./notification";
import "../../../../styles/globals.css";
import { cn } from "@/utils/constants";
import { MessageCircleQuestion, Send, User, HelpCircle } from "lucide-react";

const UserChat = ({ userId }) => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const chatWindowVisible = useRef(isChatOpen);
  const pageVisible = useRef(true);

  // Thêm danh sách câu hỏi có sẵn
  const predefinedQuestions = [
    "Tôi cần tư vấn về dịch vụ",
    "Giải đáp thắc mắc về đặt phòng",
    "Tôi muốn biết thêm về chương trình khuyến mãi",
    "Cần hỗ trợ đặt tour du lịch",
  ];

  // Hàm xử lý khi click vào câu hỏi có sẵn
  const handlePredefinedQuestion = (question) => {
    if (socket) {
      const messageData = {
        userId: userId || "user123",
        message: question,
        fromUser: true,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, messageData]);
      socket.emit("user_message", messageData);

      // Scroll to bottom after selecting a predefined question
      setTimeout(() => scrollToBottom(), 50);
    }
  };

  // Track page visibility
  useEffect(() => {
    const handleVisibilityChange = () => {
      pageVisible.current = document.visibilityState === "visible";

      // Reset unread count if chat is open and page becomes visible
      if (pageVisible.current && chatWindowVisible.current) {
        setUnreadCount(0);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Request notification permission on component mount
    requestNotificationPermission();

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Update chat window visibility ref when state changes
  useEffect(() => {
    chatWindowVisible.current = isChatOpen;

    // Reset unread count when chat is opened
    if (isChatOpen) {
      setUnreadCount(0);
    }
  }, [isChatOpen]);

  // Connect to WebSocket server when component mounts
  useEffect(() => {
    // Use a consistent userId
    const actualUserId = userId || "user123";
    const newSocket = io(process.env.NEXT_PUBLIC_HOST_SERVER);
    setSocket(newSocket);

    // Set up connection events immediately
    newSocket.on("connect", () => {
      console.log("Connected to WebSocket server");
      setIsConnected(true);

      // Register user with specific ID
      newSocket.emit("register", { userId: actualUserId, isAdmin: false });
    });

    // Clean up when component unmounts
    return () => {
      newSocket.disconnect();
    };
  }, [userId]);

  // Set up event listeners when socket is created
  useEffect(() => {
    if (!socket) return;

    const actualUserId = userId || "user123";

    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
      setIsConnected(false);
    });

    socket.on("message_history", (history) => {
      console.log("Received message history:", history);
      setMessages(history);

      // Scroll to bottom after message history loads
      setTimeout(() => scrollToBottom(), 100);
    });

    socket.on("new_message", (data) => {
      console.log("User received new message:", data);
      setMessages((prev) => [...prev, data]);

      // Only trigger notifications for admin messages
      if (!data.fromUser) {
        // Play sound
        playNotificationSound();

        // Update unread count if chat is not visible
        if (!chatWindowVisible.current || !pageVisible.current) {
          setUnreadCount((prev) => prev + 1);

          // Send browser notification if page is not visible
          if (!pageVisible.current) {
            sendBrowserNotification("New Support Message", {
              body: data.message || data.content,
              tag: "support-chat",
            });
          }
        }
      }

      // Scroll to bottom whenever there's a new message
      setTimeout(() => scrollToBottom(), 50);
    });

    socket.on("message_confirmed", ({ messageId }) => {
      // Optional: Update UI to show message was delivered
    });

    // Clean up event listeners
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("message_history");
      socket.off("new_message");
      socket.off("message_confirmed");
    };
  }, [socket, userId]);

  // Function to handle scrolling to bottom
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && socket) {
      const actualUserId = userId || "user123";
      const messageData = {
        userId: actualUserId,
        message: message.trim(),
        content: message.trim(), // Ensure both fields are set
        fromUser: true,
        timestamp: new Date().toISOString(),
      };

      // Add message to local state immediately for responsive UI
      setMessages((prev) => [...prev, messageData]);

      // Send to server
      socket.emit("user_message", messageData);
      setMessage("");

      // Ensure scroll to bottom after sending message
      setTimeout(() => scrollToBottom(), 50);
    }
  };

  return (
    <div className="mt-3 flex flex-col md:flex-row h-[600px] bg-gray-100 rounded-lg  overflow-hidden md:border md:border-gray-200">
      {/* Sidebar - Channels */}
      <aside className="w-64 hidden md:flex bg-white border-r border-gray-200 overflow-hidden  flex-col">
        <div className="p-0 md:p-4 border-1  border-gray-200 bg-white text-black">
          <h2 className="text-lg font-semibold">Chọn kênh tư vấn</h2>
          <div className="flex items-center mt-2 text-sm">
            <span
              className={`w-2 h-2 rounded-full mr-2 ${
                isConnected ? "bg-green" : "bg-red-500"
              }`}
            ></span>
            <span>{isConnected ? "Đã kết nối" : "Mất kết nối"}</span>
          </div>
        </div>

        <div className="overflow-y-auto flex-1">
          <ul>
            <li className="border-b border-gray-100 bg-blue cursor-pointer hover:bg-blue-100 transition-colors duration-150">
              <div className="flex items-center p-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue mr-3">
                  <MessageCircleQuestion size={20} />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-white">Kênh tư vấn 1</p>
                </div>
              </div>
            </li>
            <li className="border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors duration-150">
              <div className="flex items-center p-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-black_sub mr-3">
                  <MessageCircleQuestion size={20} />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Kênh tư vấn 2</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col bg-gray-50">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 p-2 md:p-4 flex items-center shadow-md">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">
            <MessageCircleQuestion size={20} />
          </div>
          <div>
            <h3 className="font-medium">Nhân viên tư vấn</h3>
            <p className="text-xs text-gray-500 flex items-center justify-start gap-x-1">
              {isConnected ? (
                <div className="size-3 rounded-full bg-green"></div>
              ) : (
                <div className="size-3 rounded-full bg-red_main"></div>
              )}
              {isConnected ? "Đang trực tuyến" : "Ngoại tuyến"}
            </p>
          </div>
        </div>

        {/* Messages Area */}
        <div
          ref={messagesContainerRef}
          className="flex-1 max-h-[400px] overflow-y-scroll p-4"
        >
          {/* Predefined Questions (Only show when no messages) */}
          {messages.length === 0 && (
            <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                <HelpCircle size={16} className="mr-2" />
                Câu hỏi thường gặp:
              </h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {predefinedQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handlePredefinedQuestion(question)}
                    className="px-4 py-2 text-sm text-start bg-gray-100 hover:bg-gray-200 hover:text-black rounded-full transition-colors duration-200"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-20 lg:h-40 text-gray-500">
              Hãy chọn một câu hỏi hoặc gửi tin nhắn để bắt đầu
            </div>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  msg.fromUser ? "flex justify-end" : "flex justify-start"
                }`}
              >
                {!msg.fromUser && (
                  <div className="w-8 h-8 bg-blue rounded-full flex items-center justify-center text-white mr-2 flex-shrink-0">
                    <User size={16} />
                  </div>
                )}
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg group text-sm ${
                    msg.fromUser
                      ? "bg-blue text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  <p className="break-words">
                    {msg.message || msg.content || "Không có nội dung"}
                  </p>
                  <p className="text-xs mt-1 opacity-70 hidden group-hover:block">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </p>
                </div>
                {msg.fromUser && (
                  <div className="w-8 h-8 bg-white border-1 rounded-full flex items-center justify-center text-black ml-2 flex-shrink-0">
                    <User size={16} />
                  </div>
                )}
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <form
          onSubmit={sendMessage}
          className="border-t border-gray-200 bg-white p-2 md:p-4 flex"
        >
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Nhập tin nhắn của bạn..."
            // disabled={!isConnected}
            className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none "
          />
          <button
            type="submit"
            disabled={!isConnected || !message.trim()}
            className="bg-blue text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <Send size={20} />
          </button>
        </form>
      </main>
    </div>
  );
};

export default UserChat;
