"use client";
import React, { useEffect, useRef } from "react";
import { Search } from "lucide-react";

import { cn } from "@/lib/utils";
import InputDebounce from "../../input-debounce";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { SearchAddressSMProps } from "@/utils/types/search";
import ButtonEnd from "../button-end";

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
      <SheetContent
        side="bottom"
        className="h-[80vh] w-full  z-[50]  bg-white text-black flex flex-col items-center justify-start  p-4 pb-6"
      >
        <SheetHeader className="text-start w-full">
          <SheetTitle className="text-normal+ font-semibold text-start w-fit flex items-start justify-start">
            Tìm
          </SheetTitle>
          <SheetDescription aria-describedby={undefined}></SheetDescription>
        </SheetHeader>
        <div className="absolute top-10 left-0 right-0 translate-x-[5%] translate-y-[30%] w-[90%]  mt-2 flex overflow-y-auto items-center justify-start gap-x-2 border-1 border-black_sub outline-blue_main_sub p-1 rounded-8 text-black">
          <Search className="w-5 h-5 ml-1" />
          <InputDebounce
            ref={inputRef}
            type="text"
            placeholder="Bạn muốn đi đâu !"
            className={cn(
              "w-full h-[36px] text-normal font-normal shadow-none border-none outline-none justify-between bg-white text-black  placeholder-black_sub "
            )}
            debounceTime={400}
            value={valueSearch}
            onChange={(e: any) => {
              setValueSearch(e.target.value);
            }}
          />
        </div>
        <div className="w-full max-h-[300px] overflow-y-scroll  bg-white rounded-8 mt-[15%] mb-[10%]">
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
                <span className="text-normal font-medium">{item.name}</span>
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
        <SheetFooter>
          <ButtonEnd
            onClick={() => {
              setOpen2(false);
            }}
          />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default SearchAddressSM;
