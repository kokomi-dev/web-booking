import React from "react";

import { cn } from "@/lib/utils";
import FormLogin from "./form-login";
const SignInPage = () => {
  return (
    <div className={cn("w-full h-full mt ")}>
      <div>
        <h3
          className={cn(
            "text-center font-extrabold text-[1.7rem] mb-3",
            "lg:text-[2rem] lg:mb-5"
          )}
        >
          Đăng nhập
        </h3>
      </div>
      <FormLogin />
    </div>
  );
};

export default SignInPage;
