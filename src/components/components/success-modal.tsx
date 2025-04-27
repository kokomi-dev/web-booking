"use client";

const LottiePlayer = dynamic(() => import("lottie-react"), {
  ssr: false,
  loading: () => <div style={{ width: "100%", height: "100%" }} />,
});

import animation from "@/assets/animations/animation-success.json";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message?: string;
  autoCloseDuration?: number;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  title,
  message = "Thao tác thành công!",
  autoCloseDuration = 1600,
}) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDuration);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose, autoCloseDuration]);

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent
        autoFocus={false}
        className="text-center flex flex-col items-center justify-centere"
      >
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-semibold">
            {title}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div className="w-64 h-64">
          <LottiePlayer animationData={animation}></LottiePlayer>
        </div>
      </AlertDialogContent>
      <AlertDialogFooter hidden autoFocus={false}></AlertDialogFooter>
    </AlertDialog>
  );
};

export default SuccessModal;
