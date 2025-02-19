"use client";
import { cn } from "@/utils/constants";
import { ArrowLeft, MessageCircleMore, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
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
  const [isShaking, setIsShaking] = useState(false);
  const [open, setOpen] = useState(false);
  const [isActive, setIsActive] = useState({
    status: false,
    index: 0,
  });
  useEffect(() => {
    const timer = setInterval(() => {
      setIsShaking(true);

      setTimeout(() => setIsShaking(false), 1500);
    }, 2400);

    return () => clearInterval(timer);
  }, [isShaking]);
  useEffect(() => {
    setIsActive({ status: false, index: 0 });
  }, [open]);
  return (
    <>
      <Popover
        open={open}
        onOpenChange={() => {
          setOpen(!open);
        }}
      >
        <PopoverTrigger asChild>
          <div
            className={cn(
              "fixed bottom-4 right-4 bg-bg_primary_main rounded-full p-2 shadow-2xl z-[50]",
              !open && isShaking && "animate-shake",
              "hover:cursor-pointer "
            )}
            onClick={() => {
              setOpen(true);
            }}
          >
            <HoverCard>
              <HoverCardTrigger>
                <MessageCircleMore
                  className={cn(
                    "size-10 lg:size-11 transition-all duration-150 text-white"
                  )}
                />
              </HoverCardTrigger>
              <HoverCardContent
                align="end"
                className={cn(
                  "bg-black text-white border-none p-1 px-2 w-full shadow-2xl z-10 select-none",
                  open && "hidden"
                )}
              >
                {"Chat với chúng tôi"}
              </HoverCardContent>
            </HoverCard>
          </div>
        </PopoverTrigger>
        <PopoverContent
          side="top"
          className={cn(
            "w-[290px] bg-bg_primary_white left-[-10%] text-black text-small z-[80] flex flex-col gap-y-2 relative select-none"
            // isActive && "hidden invisible"
          )}
        >
          <h4 className="text-normal font-semibold">Chat</h4>
          <Button
            className="hover:text-blue_main_sub bg-white"
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
            className="hover:text-blue_main_sub bg-white"
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
              "absolute w-[300px] min-h-[350px] h-full top-0 left-[0%] right-0 translate-x-[120%] translate-y-[-58%]  bg-white rounded-8 shadow-2xl transition-all duration-150",
              isActive.status && "translate-x-[-2%]"
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
            {isActive.index === 2 && (
              <div className="p-2">
                <ArrowLeft
                  className="text-blue_main size-5 hover:cursor-pointer"
                  onClick={() => {
                    setIsActive({ status: false, index: 0 });
                  }}
                />
                <h4 className="text-normal font-semibold">AI Hỏi đáp </h4>
                <span className="text-small font-normal"></span>
                <div>
                  <span>Đang phát triển</span>
                </div>
                <IuputChat value="" setValue={() => ""} />
              </div>
            )}
          </section>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default Chat;
