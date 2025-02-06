import React from "react";
import { ChevronDown, Dot, User } from "lucide-react";

import { PopoverContent } from "@radix-ui/react-popover";
import { SearchSelectPersonLGProps } from "@/types/search";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/utils/constants";
const SearchSelectPersonLG: React.FC<SearchSelectPersonLGProps> = ({
  className,
  numberAdults,
  numberChildren,
  numberRoom,
  setNumberAdults,
  setNumberChildren,
  setNumberRoom,
  handleIncrease,
  handleDecrease,
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "hidden w-full h-[44px] bg-white px-2 py-1",
            "hover:cursor-pointer ",
            className,
            "md:flex"
          )}
        >
          <User className="size-5  text-black_sub mr-2 " />
          <span className="w-full h-full flex items-center justify-start gap-x-1 ">
            <span className="w-full flex items-center justify-start gap-x-1 text-normal font-light whitespace-nowrap">
              {numberAdults} người lớn <Dot /> {numberChildren} trẻ em <Dot />{" "}
              {numberRoom} phòng
            </span>
          </span>
          <ChevronDown className="size-5 " />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          "w-full md:min-w-[40vw] lg:min-w-[25vw] lg:max-w-[26vw] flex flex-col items-center justify-center bg-white text-black z-[15] p-4 shadow-2xl mt-1 rounded-8 "
        )}
        align="end"
      >
        <div className="min-w-[100%] grid gap-y-6 mt-8  p-4 rounded-8">
          {/* Người lớn */}
          <div className="grid grid-cols-[50%,50%] items-center gap-4">
            <Label className="text-[1rem] font-normal" htmlFor="adults">
              Người lớn
            </Label>
            <div className=" flex items-center border-0.5 border-black_sub justify-center rounded-[4px] ">
              <Button
                onClick={() => handleDecrease(setNumberAdults, numberAdults)}
                className="bg-white text-black shadow-none border-none p-0"
              >
                <span
                  className={cn(
                    "!text-large text-blue_main_sub font-normal p-1",
                    numberAdults === 1 &&
                      "opacity-40 hover:cursor-none !text-large hover:bg-transparent text-black_main"
                  )}
                >
                  -
                </span>
              </Button>
              <Input
                type="number"
                id="adults"
                min="1"
                value={numberAdults}
                className="h-8 outline-none bg-white  max-w-[60px] text-black text-center shadow-none border-none"
                onChange={(e) =>
                  setNumberAdults(Math.max(1, Number(e.target.value)))
                }
                onMouseDown={(e) => e.stopPropagation()}
              />
              <Button
                onClick={() => handleIncrease(setNumberAdults, numberAdults)}
                className="bg-white hover:bg-bg_black_sub text-black px-2 text-largest shadow-none border-none "
              >
                <span className="text-large text-blue_main_sub font-light">
                  +
                </span>
              </Button>
            </div>
          </div>
          {/* Trẻ em */}
          <div className="grid grid-cols-[50%,50%] items-center gap-4 shadow-none border-none">
            <Label className="text-[1rem] font-normal" htmlFor="children">
              Trẻ em
            </Label>
            <div className="flex items-center border-0.5 border-black_sub justify-center rounded-[4px]">
              <Button
                onClick={() =>
                  handleDecrease(setNumberChildren, numberChildren)
                }
                className="bg-white text-black shadow-none border-none p-0"
              >
                <span
                  className={cn(
                    "!text-large text-blue_main_sub font-normal p-1",
                    numberChildren === 0 &&
                      "opacity-40 hover:cursor-none !text-large hover:bg-transparent text-black_main"
                  )}
                >
                  -
                </span>
              </Button>
              <Input
                type="number"
                id="children"
                min="0"
                value={numberChildren}
                className="h-8 outline-none bg-white  max-w-[60px] text-black text-center shadow-none border-none"
                onChange={(e) =>
                  setNumberChildren(Math.max(0, Number(e.target.value)))
                }
                onMouseDown={(e) => e.stopPropagation()}
              />
              <Button
                onClick={() =>
                  handleIncrease(setNumberChildren, numberChildren)
                }
                className=" bg-white hover:bg-bg_black_sub text-black px-2 text-largest shadow-none border-none "
              >
                <span className="text-large text-blue_main_sub font-light">
                  +
                </span>
              </Button>
            </div>
          </div>
          {/* Phòng đơn */}
          <div className="grid grid-cols-[50%,50%] items-center gap-4 shadow-none border-none">
            <Label className="text-[1rem] font-normal" htmlFor="numberRoom">
              Phòng
            </Label>
            <div className=" flex items-center border-0.5 border-black_sub justify-center rounded-[4px]">
              <Button
                onClick={() => handleDecrease(setNumberRoom, numberRoom)}
                className="bg-white text-black shadow-none border-none p-0"
              >
                <span
                  className={cn(
                    "!text-large text-blue_main_sub font-normal p-1",
                    numberRoom === 1 &&
                      "opacity-40 hover:cursor-none !text-large hover:bg-transparent text-black_main"
                  )}
                >
                  -
                </span>
              </Button>
              <Input
                type="number"
                id="numberRoom"
                min="1"
                value={numberRoom}
                className="h-8 outline-none bg-white  max-w-[60px] text-black text-center shadow-none border-none"
                onChange={(e) =>
                  setNumberRoom(Math.max(1, Number(e.target.value)))
                }
                onMouseDown={(e) => e.stopPropagation()}
              />
              <Button
                onClick={() => handleIncrease(setNumberRoom, numberRoom)}
                className="bg-white hover:bg-bg_black_sub text-black px-2 text-largest shadow-none border-none "
              >
                <span className="text-large text-blue_main_sub font-light">
                  +
                </span>
              </Button>
            </div>
          </div>
        </div>
        <div className="w-full text-start font-normal text-small p-4">
          <div className="flex items-center justify-between">
            <span>Mang thú cưng đi cùng</span>
            <input type="checkbox" className="w-5 h-5 hover:cursor-pointer" />
          </div>
          <p className="text-smallest text-wrap mt-2">
            Động vật trợ giúp không được xem là vật nuôi.{" "}
            <span className="text-blue_main_sub">
              Đọc thêm về chủ đề đi du lịch cùng động vật trợ giúp
            </span>
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SearchSelectPersonLG;
