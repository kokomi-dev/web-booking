import { useState, useEffect, Fragment } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { IModalBookingSucess } from "@/types/component-types";
import { useRouter } from "next/navigation";
import { LoadingPage } from "../loading";

export default function BookingSuccessModal({
  open,
  setOpen,
  model,
  handleClose,
}: IModalBookingSucess) {
  const [animate, setAnimate] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (open) {
      setIsLoading(true);
      setIsVisible(false);

      setTimeout(() => {
        setIsLoading(false);
        setIsVisible(true);
      }, 2400);
    }
  }, [open]);

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => setAnimate(true), 200);
    }
  }, [isVisible]);
  if (isLoading) {
    return (
      <div className="bg-[rgba(0,0,0,0.4)] flex items-center justify-center fixed top-[-3rem] left-0 right-0 bottom-0 z-[999]">
        <div className="loader"></div>
      </div>
    );
  }
  return (
    <Fragment>
      {isLoading && <LoadingPage />}
      {isVisible && (
        <Dialog
          open={isVisible}
          onOpenChange={() => {
            setOpen(false);
            setTimeout(() => setIsVisible(false), 300);
          }}
        >
          <DialogTitle hidden></DialogTitle>
          <DialogDescription
            hidden
            aria-aria-describedby={undefined}
          ></DialogDescription>
          <DialogContent className="flex flex-col items-center p-6 text-center">
            <div className="relative mb-4">
              <motion.div
                className="absolute inset-0 border-4 border-green-500 rounded-full"
                initial={{ scale: 1.5, opacity: 0 }}
                animate={animate ? { scale: 1, opacity: 1, rotate: 360 } : {}}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              <CheckCircle className="w-16 h-16 text-green-500 relative" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              Đặt {model === "attraction" ? "Tour" : "Nơi lưu trú"} Thành Công!
            </h2>
            <p className="text-gray-600 mt-2">
              Cảm ơn bạn đã đặt. Chúng tôi sẽ phản hồi với bạn sớm nhất qua số
              điện thoại hoặc email của bạn.
            </p>
            <DialogFooter autoFocus={false}>
              <Button
                autoFocus={false}
                onClick={() => {
                  handleClose();
                  setOpen(false);
                  setTimeout(() => setIsVisible(false), 300);
                  if (model === "attraction") {
                    return router.push("/attractions");
                  }
                }}
                className="w-[180px] lg:w-[160px] mt-4 bg-blue-600 text-white hover:bg-bg_primary_active border-none border-transparent"
              >
                Xong
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </Fragment>
  );
}
