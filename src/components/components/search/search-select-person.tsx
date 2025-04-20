"use client";
import { ChevronDown, Dot, User } from "lucide-react";
import { useCallback, useState } from "react";

import { Button } from "@/components/ui/button";
import { SearchSelectPersonProps } from "@/types/search";
import { cn } from "@/utils/constants";
import SearchSelectPersonLG from "./search-select-person/search-select-person-lg";
import SearchSelectPersonSM from "./search-select-person/search-select-person-sm";

const SearchSelectPerson = ({
  className,
  numberAdults,
  numberChildren,
  numberRoom,
  setNumberAdults,
  setNumberChildren,
  setNumberRoom,
}: SearchSelectPersonProps) => {
  const handleIncrease = useCallback(
    (setter: (value: number) => void, value: number) => {
      setter(value + 1);
    },
    []
  );

  const handleDecrease = useCallback(
    (setter: (value: number) => void, value: number) => {
      if (value > 0) {
        setter(value - 1);
      }
    },
    []
  );

  const [open, setOpen] = useState(false);
  return (
    <section className="flex flex-col w-full">
      <Button
        type="button"
        variant="ghost"
        className={cn(
          "flex items-center justify-center  w-full h-[44px] bg-white px-2 py-1 ",
          "hover:cursor-pointer ",
          className,
          "md:hidden xl:hidden"
        )}
        onClick={(e) => {
          e.preventDefault();
          setOpen(!open);
        }}
      >
        <User className="size-5 font-medium text-black_sub flex-shrink-0 " />
        <span className="w-full h-full flex items-center justify-start gap-x-1 ">
          <span className="w-full flex items-center justify-start gap-x-0 sm:gap-x-1 text-sm md:text-base font-light whitespace-nowrap ">
            {numberAdults} người lớn <Dot /> {numberChildren} trẻ em <Dot />{" "}
            {numberRoom} phòng
          </span>
        </span>
        <ChevronDown className="size-5 hidden sm:block " />
      </Button>
      <SearchSelectPersonLG
        className={className}
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
        numberAdults={numberAdults}
        numberChildren={numberChildren}
        numberRoom={numberRoom}
        setNumberAdults={setNumberAdults}
        setNumberChildren={setNumberChildren}
        setNumberRoom={setNumberRoom}
        handleDecrease={handleDecrease}
        handleIncrease={handleIncrease}
      />
    </section>
  );
};

export default SearchSelectPerson;
