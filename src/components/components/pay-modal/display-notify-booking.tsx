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

import { IModalBookingSucess } from "@/types/component-types";
import { useRouter } from "next/navigation";
import { LoadingPage } from "../loading";
import dynamic from "next/dynamic";

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
            aria-describedby={undefined}
            hidden
          ></DialogDescription>
          <DialogContent
            autoFocus={false}
            className="flex flex-col items-center p-6 text-center"
          >
            <div className="relative mb-4">
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
                  } else {
                    return router.push("/hotels");
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
