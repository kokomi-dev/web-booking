"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Image from "next/image";
import imgSun from "@/assets/images/img-sun.png";
import { useEffect, useState } from "react";
import { cn } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { useAuthenticatedStore } from "@/store/authencation-store";

export function DialogSales() {
  const [isShaking, setIsShaking] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    sessionStorage.removeItem("hasShownDialog");
    const hasShownDialog = sessionStorage.getItem("hasShownDialog");
    if (!hasShownDialog) {
      setIsOpen(true);
      sessionStorage.setItem("hasShownDialog", "true");
    }
  }, []);
  useEffect(() => {
    if (isOpen) {
      const timer = setInterval(() => {
        setIsShaking(true);

        setTimeout(() => setIsShaking(false), 1000);
      }, 2400);
      return () => clearInterval(timer);
    }
  }, [isShaking, isOpen]);
  const router = useRouter();
  const { user } = useAuthenticatedStore();
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-full max-w-[96%] md:max-w-[80%] lg:max-w-[60%] h-auto bg-bg_primary_white text-black   ">
        <DialogHeader>
          <DialogTitle className="text-large font-semibold text-blue_main_sub font-serif z-[10]">
            Khám phá Việt Nam với KoKoTravel
          </DialogTitle>
          <DialogDescription className="text-black_sub z-[10]">
            Hãy sẵn sàng cho hành trình khám phá tuyệt vời tại những địa điểm du
            lịch nổi tiếng và khách sạn sang trọng ở Việt Nam.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 z-[10]">
          <div className="">
            <h4 className="font-medium">Đặc quyền dành riêng cho bạn:</h4>
            <ul className="text-small font-light list-disc ml-4">
              <li>Giảm giá 10% cho lần đặt chỗ đầu tiên.</li>
              <li>
                Ưu đãi độc quyền khi đặt phòng khách sạn hoặc tour tham quan
                trong tuần này.
              </li>
            </ul>
          </div>
          <div className="">
            <h4 className="font-medium">Hỗ trợ tận tình:</h4>
            <ul className="text-small font-light list-disc ml-4">
              <li>
                Đội ngũ tư vấn sẵn sàng hỗ trợ bạn lên kế hoạch chuyến đi hoàn
                hảo! .
              </li>
            </ul>
          </div>
          <h4 className="font-medium">
            Chúng tôi luôn đảm bảo về quyền lợi của bạn:
            <ul className="text-small font-light list-disc ml-4">
              <li>Bảo mật thông tin.</li>
              <li>Trải nghiệm khách hàng và ưu tiên hàng đầu của chúng tôi.</li>
            </ul>
          </h4>
        </div>
        <DialogFooter>
          {user && (
            <div className="flex items-center justify-center flex-col md:flex-row gap-2">
              <Button
                onClick={() => {
                  router.push("/attractions");
                  setIsOpen(false);
                }}
                type="submit"
                className="bg-bg_primary_blue_sub text-white"
              >
                Khám phá ngay
              </Button>
              <Button
                onClick={() => {
                  router.push("/account/voucher/" + user._id);
                  setIsOpen(false);
                }}
                type="submit"
                className="bg-bg_primary_yellow text-white"
              >
                Nhận ưu đãi!
              </Button>
            </div>
          )}
        </DialogFooter>
        <Image
          width={500}
          height={500}
          src={imgSun}
          alt="ảnh mặt trời"
          className={cn(
            "absolute w-[8rem] h-[8rem] z-[2] right-4 top-[6rem] opacity-45 md:opacity-70 lg:opacity-100",
            isShaking && "animate-shake"
          )}
        />
      </DialogContent>
    </Dialog>
  );
}
