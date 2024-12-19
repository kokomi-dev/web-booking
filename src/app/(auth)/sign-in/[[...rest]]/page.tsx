import React from "react";

import { cn } from "@/lib/utils";
import FormLogin from "../form-login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng nhập - KoKoTravel",
};

const SignInPage = () => {
  return (
    <div
      className={cn(
        "w-full  h-full flex flex-col items-center justify-center "
      )}
    >
      <h3
        className={cn(
          "w-full h-full text-center  font-extrabold text-[1.7rem] mb-3",
          "lg:text-[2rem] lg:mb-5"
        )}
      >
        Đăng nhập
      </h3>
      <FormLogin />
    </div>
  );
};

export default SignInPage;
