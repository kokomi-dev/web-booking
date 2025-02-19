"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useAuthenticatedStore } from "@/store/authencation-store";
import { useRouter } from "next/navigation";
import imgSun from "@/assets/images/img-sun.png";
import { Button } from "../ui/button";

export function DialogSales() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { user } = useAuthenticatedStore();

  useEffect(() => {
    const hasShown = sessionStorage.getItem("hasShownDialog");
    if (!hasShown) {
      setIsOpen(true);
      sessionStorage.setItem("hasShownDialog", "true");
    }
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[200]">
      <motion.div
        className="absolute inset-0 bg-black bg-opacity-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsOpen(false)}
      />

      <motion.div
        initial={{ y: "-100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "-100%", opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative bg-white p-6 rounded-lg shadow-lg w-[90%] md:w-[70%] lg:w-[50%] max-w-xl z-50 posing-vertical-3"
      >
        <h2 className="text-lg md:text-xl font-semibold text-blue-600">
          Khám phá Việt Nam với KoKoTravel
        </h2>
        <p className="text-gray-600">
          Hãy sẵn sàng cho hành trình khám phá những địa điểm du lịch nổi tiếng
          và khách sạn sang trọng tại Việt Nam.
        </p>

        <div className="mt-4 text-sm">
          <h4 className="font-medium">Đặc quyền dành riêng cho bạn:</h4>
          <ul className="list-disc ml-4 text-black">
            <li>Giảm giá 10% cho lần đặt chỗ đầu tiên.</li>
            <li>
              Ưu đãi độc quyền khi đặt phòng khách sạn hoặc tour trong tuần này.
            </li>
          </ul>
        </div>

        <div className="mt-4 flex flex-col md:flex-row gap-2">
          <Button
            onClick={() => setIsOpen(false)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md w-full md:w-auto"
          >
            Khám phá ngay
          </Button>
          {user && (
            <Button
              onClick={() => {
                router.push(`/genius/${user._id}`);
                setIsOpen(false);
              }}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md w-full md:w-auto"
            >
              Nhận ưu đãi!
            </Button>
          )}
        </div>

        <Image
          width={80}
          height={80}
          src={imgSun}
          alt="Mặt trời"
          className="absolute top-4 right-4 w-16 h-16 opacity-80 animate-bounce"
        />
      </motion.div>
    </div>
  );
}
