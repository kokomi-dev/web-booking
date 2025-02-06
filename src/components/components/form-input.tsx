"use client";
import React from "react";
import { Input } from "../ui/input";
import { Asterisk } from "lucide-react";
import { cn } from "@/utils/constants";

interface FormInputProps {
  title: string;
  type: "email" | "text" | "password" | "number";
  placeholder?: string;
  isImportant?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | number | undefined;
  error?: boolean;
  errorTitle?: string;
  className?: string;
  defaultValue?: string;
  disable?: any;
}

const FormInput: React.FC<FormInputProps> = ({
  title,
  placeholder,
  isImportant,
  onChange,
  value,
  type,
  error,
  errorTitle,
  className,
  defaultValue,
  disable,
}) => {
  return (
    <div className={cn("w-full text-small", className)}>
      <label
        htmlFor={title}
        className="select-none flex items-center justify-start mb-1"
      >
        <span className="text-normal capitalize font-normal">{title}</span>
        {isImportant && <Asterisk className="text-red-700" size={18} />}
      </label>
      <Input
        type={type}
        id={title}
        placeholder={placeholder}
        className={cn(
          "border-[0.5px] border-[#999] rounded-md p-2",
          error && "border-1 border-red-500"
        )}
        value={value}
        onChange={onChange}
        defaultValue={defaultValue}
        disabled={disable}
      />
      {error && (
        <span className="text-red-500 text-smallest">{errorTitle}</span>
      )}
    </div>
  );
};

export default FormInput;
