import React from "react";
import { MapPinned } from "lucide-react";

import { SearchAddressLGProps } from "@/utils/types/search";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import InputDebounce from "../../input-debounce";

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
            "hidden w-full h-[40px] justify-start text-left font-normal bg-white px-2 py-1 shadow-none ",
            className,
            "lg:flex"
          )}
        >
          <MapPinned className="size-5 text-black_main " />
          <span className="ml-2 text-small font-medium">
            {value === "" || value === null ? "Chọn nơi bạn muốn đến" : value}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="center"
        className="min-w-[160px] z-[20]  p-1 bg-white text-black"
      >
        <InputDebounce
          type="text"
          placeholder="Nhập tên tỉnh thành !"
          ref={inputRef}
          debounceTime={300}
          className={cn(
            "min-w-max w-full h-[36px]  text-small font-normal shadow-none justify-between bg-white text-black border-none outline-blue_main_sub placeholder-black transition-all duration-300",
            "lg:text-small "
          )}
          value={valueSearch}
          onChange={(e: any) => {
            setValueSearch(e.target.value);
          }}
        />
        <div className="w-full max-h-[300px]  h-full overflow-y-auto bg-white rounded-8">
          {data && data.length > 0 ? (
            data.map((item, index) => (
              <div
                key={index}
                className=" px-4 py-3  border-b-1 last:border-none transition-all duration-300 hover:text-blue_main_sub hover:cursor-pointer"
                onClick={() => {
                  setValue(item.name);
                  setValueSearch(item.name);
                  setOpen(false);
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
      </PopoverContent>
    </Popover>
  );
};

export default SearchAddressLG;
