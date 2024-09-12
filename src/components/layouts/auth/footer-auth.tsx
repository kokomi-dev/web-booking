import { cn } from "@/lib/utils";
import React from "react";

const FooterAuth = () => {
  return (
    <ul
      className={cn(
        "w-full h-[5rem]  flex items-center justify-evenly bg-gray-300",
        "lg:h-[40rem]"
      )}
    >
      <li>Điều khoản dịch vụ</li>
      <li>Quyền riêng tư và bảo mật</li>
      <li>Liên hệ với chúng tôi </li>
    </ul>
  );
};

export default FooterAuth;
