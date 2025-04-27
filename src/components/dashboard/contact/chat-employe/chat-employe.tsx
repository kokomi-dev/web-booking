"use client";
import React from "react";
import UserChat from "./user-chat";
import { useAuthenticatedStore } from "@/store/authencation-store";
const ChatModalEmploye = () => {
  const { user } = useAuthenticatedStore();
  const userId =
    localStorage.getItem("chatUserId") ||
    `user_${Math.random().toString(36).substring(2, 9)}`;

  // Store the ID in localStorage for persistence
  React.useEffect(() => {
    if (!localStorage.getItem("chatUserId")) {
      localStorage.setItem("chatUserId", userId);
    }
  }, [userId]);
  return (
    <div className="flex flex-col h-full rounded-lg  text-black p-3 md:p-4">
      <h3 className="text-lg font-semibold text-black_sub">
        Chat với Nhân viên tư vấn
      </h3>
      <p className="text-sm text-gray-600 mt-2">
        Kết nối với Nhân viên của chúng tôi để được tư vấn chính xác hơn.
      </p>
      <UserChat userId={userId} />
    </div>
  );
};

export default ChatModalEmploye;
