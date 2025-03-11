"use client";
import { sendMessages } from "@/api/api-chat";
import { cn } from "@/utils/constants";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeft, Bot, User } from "lucide-react";
import React, {
  useState,
  ChangeEvent,
  KeyboardEvent,
  useRef,
  useEffect,
} from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const ChatModalAI = ({ setIsActive }: { setIsActive: any }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [displayedMessages, setDisplayedMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

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
  useEffect(() => {
    let currentMessage = "";
    let i = 0;

    if (messages.length > 0) {
      const latestMessage = messages[messages.length - 1];
      if (latestMessage.role !== "user") {
        const interval = setInterval(() => {
          currentMessage += latestMessage.content[i];
          setDisplayedMessages((prev) => [
            ...messages.slice(0, -1),
            { ...latestMessage, content: currentMessage },
          ]);

          i++;
          if (i >= latestMessage.content.length) clearInterval(interval);
        }, 30);
      } else {
        setDisplayedMessages(messages);
      }
    }
  }, [messages]);
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [displayedMessages]);
  return (
    <div className="flex flex-col h-full border rounded-lg  bg-white text-black_main shadow-lg">
      <div className="flex items-center justify-between p-4 py-2">
        <ArrowLeft
          className="text-blue_main size-5 hover:cursor-pointer"
          onClick={() => {
            setIsActive({ status: false, index: 0 });
          }}
        />
        <h5 className="font-medium text-small">Trò chuyện với AI</h5>
      </div>
      <hr className="hr" />
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto mb-4 p-4 posing-vertical-6"
      >
        {displayedMessages.map((msg, idx) => (
          <div
            key={idx}
            className={`text-${
              msg.role === "user"
                ? "right  flex items-center justify-end"
                : "left  w-fit"
            } my-2 first-letter:uppercase`}
          >
            <div className="flex items-start justify-start gap-x-1">
              {msg.role !== "user" && (
                <div className="size-8 rounded-full flex items-center justify-center bg-bg_primary_yellow flex-shrink-0">
                  <Bot className="size-4 " />
                </div>
              )}

              <p
                className={cn(
                  "rounded-14 p-1 px-3 first-letter:uppercase hover:cursor-default cursor-default",
                  msg.role === "user"
                    ? "text-white bg-bg_primary_blue_sub "
                    : "text-black_main_blur bg-bg_black_sub "
                )}
              >
                {msg.content}
              </p>
              {msg.role === "user" && (
                <div className="size-8 rounded-full flex items-center justify-center bg-bg_primary_white flex-shrink-0">
                  <User className="size-4 " />
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex space-x-1">
            <span className="w-2 h-2 lg:w-3 lg:h-3 bg-blue_main_sub rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-2 h-2 lg:w-3 lg:h-3 bg-red-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-2 h-2 lg:w-3 lg:h-3 bg-green-600 rounded-full animate-bounce"></span>
          </div>
        )}
      </div>
      <div className="flex gap-2 p-2">
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
