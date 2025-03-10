"use client";
import { sendMessages } from "@/api/api-chat";
import { cn } from "@/utils/constants";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import React, { useState, ChangeEvent, KeyboardEvent } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const ChatModalAI = ({ setIsActive }: { setIsActive: any }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const mutationSenMess = useMutation({
    mutationFn: sendMessages,
  });

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setIsLoading(true);

    mutationSenMess.mutate(
      { messages: [...messages, userMessage] },
      {
        onSuccess: async (res: any) => {
          const newMess = res?.data.response;
          if (newMess) {
            const aiMessage: Message = { role: "assistant", content: newMess };
            setMessages((prevMessages) => [...prevMessages, aiMessage]);
          }
          setIsLoading(false);
        },
        onError: () => {
          setIsLoading(false);
        },
      }
    );
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full border rounded-lg p-4 bg-white text-black_main shadow-lg">
      <ArrowLeft
        className="text-blue_main size-5 hover:cursor-pointer"
        onClick={() => {
          setIsActive({ status: false, index: 0 });
        }}
      />
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`text-${
              msg.role === "user"
                ? "right  flex items-center justify-end"
                : "left  w-fit"
            } my-2 first-letter:uppercase`}
          >
            <p
              className={cn(
                "rounded-14 p-1 px-3 first-letter:uppercase hover:cursor-default",
                msg.role === "user"
                  ? "text-white bg-bg_primary_blue_sub "
                  : "text-black_main_blur bg-bg_black_sub "
              )}
            >
              {msg.content}
            </p>
          </div>
        ))}
        {isLoading && (
          <p className="text-center text-gray-400">Đang phản hồi...</p>
        )}
      </div>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="flex-1 border p-2 rounded-lg shadow-sm"
          placeholder="Nhập tin nhắn..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue_main_sub"
        >
          Gửi
        </button>
      </div>
    </div>
  );
};

export default ChatModalAI;
