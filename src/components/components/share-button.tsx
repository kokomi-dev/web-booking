"use client";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

import React from "react";
import { ShareButtonProps } from "@/utils/types";
import { Button } from "../ui/button";
import { Share2 } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";

const ShareButton: React.FC<ShareButtonProps> = ({ model, slug, title }) => {
  const shareUrl = process.env.NEXT_PUBLIC_BASE_URL + "/" + model + "/" + slug;
  const size = 34;
  return (
    <Drawer>
      <DrawerTrigger className="w-full">
        <Button className="w-full flex items-center justify-center gap-x-2 p-2 hover:text-blue_main_sub transition-all duration-300">
          <Share2 className="w-4 h-4" />
          <span>Chia sẻ</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent
        className={cn("bg-bg_primary_white w-full  ", "md:px-8", "lg:px-32")}
      >
        <DrawerHeader className="">
          <DrawerTitle className="text-start text-normal">
            Chia sẻ {model === "attractions" && " điểm tham quan này"}
          </DrawerTitle>
          <DrawerDescription className="text-small text-start">
            Hãy cho mọi người cùng được biết điểm đến này.
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex items-center justify-start gap-x-4 flex-wrap p-3">
          <FacebookShareButton
            url={shareUrl}
            title={title}
            className="flex flex-col items-center justify-start hover:underline transiton-all duration-200 decoration-blue_main_sub"
          >
            <FacebookIcon size={size} round={true} />
            <span className="text-small font-normal hidden md:block">
              Facebook
            </span>
          </FacebookShareButton>
          <FacebookMessengerShareButton
            className="flex flex-col items-center justify-start hover:underline transiton-all duration-200 decoration-blue_main_sub"
            appId="1"
            url={shareUrl}
            title={title}
          >
            <FacebookMessengerIcon
              size={size}
              round={true}
              className="flex flex-col items-center justify-start hover:underline transiton-all duration-200 decoration-blue_main_sub"
            />
            <span className="text-small font-normal hidden md:block">
              Messenger
            </span>
          </FacebookMessengerShareButton>
          <WhatsappShareButton
            url={shareUrl}
            title={title}
            className="flex flex-col items-center justify-start hover:underline transiton-all duration-200 decoration-blue_main_sub"
          >
            <WhatsappIcon size={size} round={true} />
            <span className="text-small font-normal hidden md:block">
              Whatsapp
            </span>
          </WhatsappShareButton>
          <TelegramShareButton
            url={shareUrl}
            title={title}
            className="flex flex-col items-center justify-start hover:underline transiton-all duration-200 decoration-blue_main_sub"
          >
            <TelegramIcon size={size} round />
            <span className="text-small font-normal hidden md:block">
              Telegram
            </span>
          </TelegramShareButton>
          <EmailShareButton
            url={shareUrl}
            title={title}
            className="flex flex-col items-center justify-start hover:underline transiton-all duration-200 decoration-blue_main_sub"
          >
            <EmailIcon size={size} round />
            <span className="text-small font-normal hidden md:block">
              Email
            </span>
          </EmailShareButton>
        </div>
        <DrawerFooter>
          <DrawerClose>
            <Button variant="outline">Hủy</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ShareButton;
