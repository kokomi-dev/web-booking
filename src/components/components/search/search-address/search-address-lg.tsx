import React from "react";
import { MapPinned, Search } from "lucide-react";

import { SearchAddressLGProps } from "@/types/search";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/utils/constants";
import { Button } from "@/components/ui/button";
import InputDebounce from "../../input-debounce";
import { ADDRESS_TRENDING } from "@/components/dashboard/constants";

const SearchAddressLG: React.FC<SearchAddressLGProps> = ({
  open,
  setOpen,
  setValue,
  setValueSearch,
  value,
  valueSearch,
  data,
  error,
  inputRef,
  className,
}) => {
  return (
    <Popover
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
      }}
    >
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "flex items-center w-full h-[44px] z-[40] gap-x-1  justify-start  bg-white px-2 py-1 shadow-none hover:cursor-pointer transiton-all duration-150 select-none",
            error && "border-2 border-red-600",
            "md:flex xl:flex"
          )}
          onClick={() => {
            setOpen(!open);
          }}
        >
          <MapPinned className="size-[1.2rem] text-black_sub" />
          <span className="ml-1 text-base font-light">
            {value === "" || value === null ? "Chọn nơi bạn muốn đến ?" : value}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="min-w-[90vw] md:min-w-[60vw] lg:min-w-[40vw]  z-[20] p-4 bg-white text-black"
      >
        <div className="w-full mt-2 flex items-center justify-start gap-x-1 border-1 border-black_sub outline-blue_main_sub p-1 rounded-8 text-black">
          <Search className="w-5 h-5 ml-1" />
          <InputDebounce
            ref={inputRef}
            type="text"
            placeholder="Nhập tên tỉnh thành !"
            className={cn(
              "min-w-max w-full h-[30px] text-sm  font-normal shadow-none border-none outline-none justify-between bg-white text-black"
            )}
            debounceTime={300}
            value={valueSearch}
            onChange={(e: any) => {
              setValueSearch(e.target.value);
            }}
          />
        </div>
        {!valueSearch ? (
          <div className="w-full flex flex-col items-center justify-start gap-y-2">
            <h6 className="text-xs text-black_sub text-start w-full mt-4 ">
              Địa điểm nổi bật
            </h6>
            <ul className=" gap-y-4 w-full flex flex-col items-start justify-start">
              {ADDRESS_TRENDING.map((address, i) => {
                return (
                  <li
                    key={`${address.name}-${i}`}
                    className="w-full p-1 flex items-center justify-start gap-x-2 hover:cursor-pointer hover:text-blue_sub transition-all duration-150"
                    onClick={() => {
                      setValueSearch(address.name);
                      setValue(address.name);
                      setOpen(false);
                    }}
                  >
                    <MapPinned className="size-5" />
                    <span className="text-sm font-normal capitalize">
                      {address.name}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          ""
        )}
        <div className="w-full max-h-[300px]  h-full overflow-y-auto bg-white rounded-8">
          {data && data.length > 0 ? (
            data.map((item, index) => (
              <div
                key={index}
                className=" px-4 py-3  border-b-1 last:border-none transition-all duration-300 hover:text-blue_sub hover:cursor-pointer"
                onClick={() => {
                  setValue(item.name);
                  setValueSearch(item.name);
                  setOpen(false);
                }}
              >
                <span className="text-sm font-medium">{item.name}</span>
              </div>
            ))
          ) : (
            <div className="p-2 text-sm font-normal">
              {valueSearch ? (
                <span>Nhập chính xác tên tỉnh thành !</span>
              ) : (
                <span></span>
              )}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SearchAddressLG;
