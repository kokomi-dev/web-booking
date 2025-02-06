"use client";
import React from "react";
import { Eye, EyeOff } from "lucide-react";
import { ButtonShowPassWordProps } from "@/types/component-types";
const ButtonShowPassWord: React.FC<ButtonShowPassWordProps> = ({
  show,
  setShow,
}) => {
  return (
    <div className="absolute top-[50%] right-2 translate-x-[-50%] translate-y-[-50%]">
      {show ? (
        <Eye
          className="size-4 hover:cursor-pointer  transition-all duration-200 hover:opacity-90 select-none"
          onClick={() => setShow(false)}
        />
      ) : (
        <EyeOff
          className="size-4 hover:cursor-pointer transition-all duration-200  hover:opacity-90 select-none"
          onClick={() => setShow(true)}
        />
      )}
    </div>
  );
};

export default ButtonShowPassWord;
