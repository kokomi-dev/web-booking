"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Asterisk } from "lucide-react";
import { cn } from "@/lib/utils";

interface FormInputProps {
  title: string;
  type: "email" | "text" | "password" | "number";
  placeholder?: string;
  isImportant?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
  error?: boolean;
  errorTitle?: string;
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
}) => {
  return (
    <div className="w-full">
      <label
        htmlFor={title}
        className="capitalize select-none flex items-center justify-start mb-1"
      >
        <span className="text-[0.95rem]">{title}</span>
        {isImportant && <Asterisk className="text-red-700" size={18} />}
      </label>
      <Input
        type={type}
        id={title}
        placeholder={placeholder}
        className={cn(
          "border-[0.5px] border-[#999] rounded-md p-2",
          error && "border-[1px] border-red-500"
        )}
        value={value}
        onChange={onChange}
      />
      {error && (
        <span className="text-red-500 text-[0.9rem]">{errorTitle}</span>
      )}
    </div>
  );
};

export default FormInput;
