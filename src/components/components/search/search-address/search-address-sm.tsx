"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { MapPinned, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import InputDebounce from "../../input-debounce";
import { ADDRESS_TRENDING } from "@/components/dashboard/constants";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { SearchAddressSMProps } from "@/utils/types/search";

const SearchAddressSM: React.FC<SearchAddressSMProps> = ({
  value,
  valueSearch,
  setValueSearch,
  setValue,
  open2,
  setOpen2,
  data,
  error,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (open2 && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open2]);
  return (
    <Sheet
      open={open2}
      onOpenChange={(isOpen) => {
        setOpen2(isOpen);
      }}
    >
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "flex items-center w-full h-[40px] !-ml-[0.05rem] justify-start text-left font-normal bg-white px-2 py-1 shadow-none ",
            "lg:hidden xl:hidden lg:invisible"
          )}
        >
          <MapPinned className="size-5 text-black_main " />
          <span className="ml-2 text-small font-medium">
            {value === "" || value === null ? "Chọn nơi bạn muốn đến" : value}
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="min-w-full min-h-[80vh] z-[50]   p-2 bg-white text-black"
      >
        <SheetTitle>Tìm</SheetTitle>
        <SheetDescription aria-describedby={undefined}></SheetDescription>
        <div className="flex items-center justify-start gap-x-2 border-1 border-black_sub outline-blue_main_sub p-1 rounded-8 text-black">
          <Search className="w-5 h-5 ml-1" />
          <InputDebounce
            type="text"
            placeholder="Bạn muốn đi đâu !"
            className={cn(
              "min-w-max w-full h-[36px] text-small  font-normal shadow-none border-none outline-none justify-between bg-white text-black  placeholder-black ",
              "lg:text-small "
            )}
            debounceTime={300}
            value={valueSearch}
            onChange={(e: any) => {
              setValueSearch(e.target.value);
            }}
          />
        </div>
        <h5 className="text-small text-black_sub my-2">Điểm đến lân cận</h5>
        {value === "" && (
          <ul className="flex flex-col gap-y-3 max-h-[240px] overflow-y-auto">
            {ADDRESS_TRENDING.map((item, i) => {
              return (
                <li
                  key={i}
                  className="flex items-center justify-start gap-x-2"
                  onClick={() => {
                    setValueSearch(item.name);
                    setValue(item.name);
                    setOpen2(false);
                  }}
                >
                  <Image
                    src={item.img}
                    width={100}
                    height={100}
                    alt="img-suggestion-address "
                    className="rounded-8 w-[40px] h-[40px]"
                  />
                  <span className="text-smallest capitalize">{item.name}</span>
                </li>
              );
            })}
          </ul>
        )}
        <div className="w-full max-h-[300px]  h-full overflow-y-auto bg-white rounded-8 mt-2">
          {data && data.length > 0 ? (
            data.map((item, index) => (
              <div
                key={index}
                className=" px-4 py-3  border-b-1 last:border-none transition-all duration-300 hover:text-blue_main_sub hover:cursor-pointer"
                onClick={() => {
                  setValue(item.name);
                  setValueSearch(item.name);
                  setOpen2(false);
                }}
              >
                <span className="text-small font-medium">{item.name}</span>
              </div>
            ))
          ) : (
            <div className="p-2 text-small font-normal">
              {valueSearch ? (
                <span>Nhập chính xác tên tỉnh thành !</span>
              ) : (
                <span></span>
              )}
            </div>
          )}
        </div>
        {error && (
          <div className="absolute bottom-[-75%] shadow-xl rounded-md px-3 left-0 right-0 bg-red-700 py-2 text-white text-small">
            Chọn nơi bạn muốn đến!
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default SearchAddressSM;
