import { cn } from "@/lib/utils";
import React from "react";

const FooterAuth = () => {
  return (
    <ul
      className={cn(
        "w-full h-[5rem] py-4  flex items-center justify-evenly bg-bg_black_sub",
        "lg:h-[40rem]"
      )}
    >
      <li className="text-small hover:cursor-pointer hover:underline">
        Điều khoản dịch vụ
      </li>
      <li className="text-small hover:cursor-pointer hover:underline">
        Quyền riêng tư và bảo mật
      </li>
      <li className="text-small hover:cursor-pointer hover:underline">
        Liên hệ với chúng tôi{" "}
      </li>
    </ul>
  );
};

export default FooterAuth;
