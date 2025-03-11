"use client";
import { cn } from "@/utils/constants";
import { ArrowLeft, MessageCircleMore, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import ChatModalAI from "./chat-ai/chat-ai-modal";
const IuputChat = ({
  value,
  setValue,
}: {
  value: string;
  setValue: () => string;
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className="absolute bottom-1 right-0 left-0 flex items-center justify-between gap-x-2 px-2"
    >
      <Input placeholder="...aaa" className="text-smallest" />
      <Send className="text-blue_main_sub" />
    </form>
  );
};
const Chat = () => {
  const [open, setOpen] = useState(false);
  const [isActive, setIsActive] = useState({
    status: false,
    index: 0,
  });

  return (
    <>
      <Popover
        open={open}
        onOpenChange={() => {
          setOpen(!open);
          setIsActive({
            status: false,
            index: 0,
          });
        }}
      >
        <PopoverTrigger asChild>
          <div
            className={cn(
              "fixed bottom-4 right-4 bg-bg_primary_main rounded-full p-2 shadow-2xl z-[50]",
              "hover:cursor-pointer "
            )}
            onClick={() => {
              setOpen(true);
            }}
          >
            <MessageCircleMore
              className={cn(
                "size-10 lg:size-11 transition-all duration-150 text-white"
              )}
            />
          </div>
        </PopoverTrigger>
        <PopoverContent
          side="top"
          className={cn(
            "w-[290px] bg-bg_primary_white left-[-10%] text-black text-small z-[80] flex flex-col gap-y-2 relative select-none"
          )}
        >
          <h4 className="text-normal font-semibold">Chat</h4>
          <Button
            className="hover:text-blue_main_sub bg-white text-black_main"
            onClick={() => {
              setIsActive({
                status: true,
                index: 1,
              });
            }}
          >
            Liên hệ với chúng tôi
          </Button>
          <Button
            className="hover:text-blue_main_sub bg-white text-blue_main_sub"
            onClick={() => {
              setIsActive({
                status: true,
                index: 2,
              });
            }}
          >
            Giải đáp với AI
          </Button>
          <section
            className={cn(
              "absolute w-[90vw] md:w-[360px] lg:w-[420px] min-h-[350px] h-full top-0 left-[0%] right-[5%] translate-x-[120%] translate-y-[-58%]  bg-white rounded-8 shadow-2xl transition-all duration-150",
              isActive.status === true &&
                "translate-x-[-33%] md:translate-x-[-30%] lg:translate-x-[-28%]"
            )}
          >
            {isActive.index === 1 && (
              <div className="p-2">
                <ArrowLeft
                  className="text-blue_main size-5 hover:cursor-pointer"
                  onClick={() => {
                    setIsActive({ status: false, index: 0 });
                  }}
                />
                <h4 className="text-normal font-semibold">Tư vấn </h4>

                <div>
                  <span>Nội dung chat</span>
                </div>
                <IuputChat value="" setValue={() => ""} />
              </div>
            )}
            {isActive.index === 2 && isActive.status === true && (
              <ChatModalAI setIsActive={setIsActive} />
            )}
          </section>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default Chat;
