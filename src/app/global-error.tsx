"use client";

import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-[400px] h-[200px] ">
            <h2 className="text-largest text-blue_main_sub font-semibold text-center">
              Đã xảy ra lỗi!
            </h2>
            <Button
              onClick={() => reset()}
              className="text-black text-medium text-center"
            >
              Thử lại
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}
