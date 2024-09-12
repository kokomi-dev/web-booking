import { cn } from "@/lib/utils";
import React from "react";
import FormSignUp from "./form-sign-up";

const SignUpPage = () => {
  return (
    <div className={cn("w-full")}>
      <h3
        className={cn(
          "text-center font-extrabold text-[1.7rem] mb-3",
          "lg:text-[2rem] lg:mb-5"
        )}
      >
        Đăng Ký
      </h3>
      <FormSignUp />
    </div>
  );
};

export default SignUpPage;
