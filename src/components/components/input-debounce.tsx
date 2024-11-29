import React from "react";
import { DebounceInput } from "react-debounce-input";
import clsx from "clsx";
import { InputDebounceProps } from "@/utils/types/component-types";

const InputDebounce: React.FC<InputDebounceProps> = ({
  value,
  onChange,
  placeholder,
  debounceTime = 500,
  className,
  width,
  type,
  name,
  ref,
  ...props
}) => {
  return (
    <DebounceInput
      ref={ref}
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
        'p-2 border-2 border-gray-300" text-sm h-[30px] rounded-md',
        className
      )}
    />
  );
};

export default InputDebounce;
