import { cn } from "@/lib/utils";
import React from "react";
import FormSignUp from "./form-sign-up";

const SignUpPage = () => {
  return (
    <div className={cn("w-full flex items-center justify-center flex-col ")}>
      <h3
        className={cn(
          "text-center font-extrabold text-[1.7rem] mb-3",
          "lg:text-[2rem] lg:mb-5"
        )}
      >
        Tạo tài khoản
      </h3>
      <div className="w-full md:w-[80%] lg:w-[60%] flex  items-center justify-center">
        <FormSignUp />
      </div>
    </div>
  );
};

export default SignUpPage;
