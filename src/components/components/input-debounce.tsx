"use client";
import React from "react";
import { DebounceInput } from "react-debounce-input";
import clsx from "clsx";

import { InputDebounceProps } from "@/types/component-types";

const InputDebounce = React.forwardRef<HTMLInputElement, InputDebounceProps>(
  (
    {
      value,
      onChange,
      placeholder,
      debounceTime = 500,
      className,
      width,
      type,
      name,
      autoFocus,
      ...props
    },
    ref
  ) => {
    return (
      <DebounceInput
        autoFocus={autoFocus ?? true}
        // ref={ref}
        name={name}
        type={type ?? "text"}
        minLength={1}
        debounceTimeout={debounceTime}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...props}
        style={{ width: width ? `${width}px` : "100%" }}
        className={clsx(
          "p-2 border-2 border-gray-300 text-base h-[30px] rounded-md",
          className
        )}
      />
    );
  }
);
InputDebounce.displayName = "InputDebounce";
export default InputDebounce;
