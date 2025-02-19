"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import errIllustration from "@/assets/images/err-illustration.webp";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="w-full h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
        <div className="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center text-center max-w-md">
          <Image
            src={errIllustration}
            alt="Error Illustration"
            width={200}
            height={200}
            className="mb-4"
          />

          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Ôi không! Đã xảy ra lỗi
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            Có vẻ như có một sự cố xảy ra. Hãy thử lại hoặc quay lại trang chủ.
          </p>

          <div className="flex gap-3">
            <Button
              onClick={() => reset()}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Thử lại
            </Button>
            <Button
              asChild
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
            >
              <a href="/home">Trang chủ</a>
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}
