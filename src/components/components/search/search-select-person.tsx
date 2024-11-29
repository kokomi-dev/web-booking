"use client";
import { SearchSelectPersonProps } from "@/utils/types/search";
import { Fragment, useState } from "react";
import SearchSelectPersonLG from "./search-select-person/search-select-person-lg";
import SearchSelectPersonSM from "./search-select-person/search-select-person-sm";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronDown, Dot, User } from "lucide-react";

const SearchSelectPerson = ({
  className,
  error,
  numberAdults,
  numberChildren,
  numberRoom,
  setNumberAdults,
  setNumberChildren,
  setNumberRoom,
}: SearchSelectPersonProps) => {
  const handleIncrease = (setter: (value: number) => void, value: number) => {
    setter(value + 1);
  };

  const handleDecrease = (setter: (value: number) => void, value: number) => {
    if (value > 1) {
      setter(value - 1);
    }
  };
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col w-full">
      <Button
        variant="ghost"
        className={cn(
          "flex items-center justify-center  w-full h-[40px] bg-white px-2 py-1",
          "hover:cursor-pointer ",
          error && "border-[2px] border-error_color",
          className,
          "lg:hidden xl:hidden"
        )}
        onClick={(e) => {
          e.preventDefault();
          setOpen(!open);
        }}
      >
        <User className="size-5 font-medium text-black mr-2 " />
        <span className="w-full h-full flex items-center justify-start gap-x-1 ">
          <span className="w-full flex items-center justify-start gap-x-1 text-small font-medium whitespace-nowrap">
            {numberAdults} người lớn <Dot /> {numberChildren} trẻ em <Dot />{" "}
            {numberRoom} phòng
          </span>
        </span>
        <ChevronDown className="size-5 " />
      </Button>
      <SearchSelectPersonLG
        className={className}
        error={error}
        numberAdults={numberAdults}
        numberChildren={numberChildren}
        numberRoom={numberRoom}
        setNumberAdults={setNumberAdults}
        setNumberChildren={setNumberChildren}
        setNumberRoom={setNumberRoom}
        handleDecrease={handleDecrease}
        handleIncrease={handleIncrease}
      />
      <SearchSelectPersonSM
        open={open}
        setOpen={setOpen}
        className={className}
        error={error}
        numberAdults={numberAdults}
        numberChildren={numberChildren}
        numberRoom={numberRoom}
        setNumberAdults={setNumberAdults}
        setNumberChildren={setNumberChildren}
        setNumberRoom={setNumberRoom}
        handleDecrease={handleDecrease}
        handleIncrease={handleIncrease}
      />
    </div>
  );
};

export default SearchSelectPerson;
