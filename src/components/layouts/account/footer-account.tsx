import { cn } from "@/lib/utils";
import React from "react";

const FooterAccount = () => {
  return (
    <div
      className={cn(
        "w-full h-auto p-4 text-small",
        "lg:p-36 bg-bg_black_sub text-black flex flex-col items-start justify-start gap-2"
      )}
    >
      <div>
        <ol className="w-full flex items-center justify-start gap-x-6 flex-wrap list-disc">
          <li
            className={cn(
              "w-fit transition-all duration-200",
              "hover:underline hover:cursor-pointer"
            )}
          >
            Về KoKoTravel
          </li>
          <li
            className={cn(
              "w-fit transition-all duration-200",
              "hover:underline hover:cursor-pointer"
            )}
          >
            Điêu khoản và điều kiện
          </li>
          <li
            className={cn(
              "w-fit transition-all duration-200",
              "hover:underline hover:cursor-pointer"
            )}
          >
            Chúng tôi hoạt động như thế nào
          </li>
          <li
            className={cn(
              "w-fit transition-all duration-200",
              "hover:underline hover:cursor-pointer"
            )}
          >
            Chính sách Bảo mật & Cookie
          </li>
          <li
            className={cn(
              "w-fit transition-all duration-200",
              "hover:underline hover:cursor-pointer"
            )}
          >
            Trung tâm trợ giúp
          </li>
        </ol>
      </div>
      <div>
        <p className="text-smallest font-extralight">
          Bản quyền © 2024 KoKoTravel.com™. Bảo lưu mọi quyền.
        </p>
      </div>
    </div>
  );
};

export default FooterAccount;
