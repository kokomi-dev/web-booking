import { cn } from "@/lib/utils";
import React from "react";

const FooterAccount = () => {
  return (
    <footer
      className={cn(
        "w-full h-[100px] p-4 text-small px-4 md:px-12 lg:px-24 ",
        "xl:px-36  bg-bg_black_sub text-black grid gap-2"
      )}
    >
      <div className="w-full h-auto ">
        <ol className="w-full flex items-center justify-center gap-x-6 flex-wrap text-smallest font-normal text-center ">
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
      <div className="text-center">
        <p className="text-smallest font-extralight">
          Bản quyền © 2024 KoKoTravel.com™. Bảo lưu mọi quyền.
        </p>
      </div>
    </footer>
  );
};

export default FooterAccount;
