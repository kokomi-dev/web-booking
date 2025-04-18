"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { SearchSelectPersonSMProps } from "@/types/search";
import { cn } from "@/utils/constants";
import ButtonEnd from "../button-end";

const SearchSelectPersonSM: React.FC<SearchSelectPersonSMProps> = ({
  open,
  setOpen,
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
    <Sheet
      open={open}
      onOpenChange={() => {
        setOpen(false);
      }}
    >
      <SheetContent
        className={cn(
          " w-full min-h-[70vh] bg-white text-black z-[50] p-2 shadow-2xl mt-1 rounded-8 flex flex-col items-start justify-start"
        )}
        side="bottom"
      >
        <SheetHeader className="w-full text-start p-2">
          <SheetTitle className="text-lg font-semibold">
            Chọn số người, phòng
          </SheetTitle>
          <SheetDescription aria-describedby={undefined}></SheetDescription>
        </SheetHeader>
        <div className="min-w-[100%] grid gap-y-6 mt-8  p-4 rounded-8">
          {/* Người lớn */}
          <div className="grid grid-cols-[50%,50%] items-center gap-4 shadow-none border-none">
            <Label className="text-[1rem] font-normal" htmlFor="adults">
              Người lớn
            </Label>
            <div className="flex items-center border-0.5 border-black_sub justify-center rounded-[4px] ">
              <Button
                disabled={numberAdults === 1}
                type="button"
                onClick={() => handleDecrease(setNumberAdults, numberAdults)}
                className={cn(
                  "bg-white text-black shadow-none border-none p-0 px-2 hover:bg-black_sub",
                  numberAdults === 1 && "pointer-events-none"
                )}
              >
                <span
                  className={cn(
                    "!text-3xl text-blue_sub font-normal p-1",
                    numberAdults === 1 &&
                      "opacity-40 hover:cursor-none !text-3xl hover:bg-transparent text-black"
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
                className="h-8 outline-none bg-white text-base  max-w-[60px] text-black text-center shadow-none border-none"
                onChange={(e) =>
                  setNumberAdults(Math.max(1, Number(e.target.value)))
                }
                onMouseDown={(e) => e.stopPropagation()}
              />
              <Button
                type="button"
                onClick={() => handleIncrease(setNumberAdults, numberAdults)}
                className="bg-white hover:bg-black_sub text-black px-2  shadow-none border-none "
              >
                <span className="text-3xl text-blue_sub font-light">+</span>
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
                disabled={numberChildren === 0}
                type="button"
                onClick={() =>
                  handleDecrease(setNumberChildren, numberChildren)
                }
                className={cn(
                  "bg-white text-black shadow-none border-none p-0 px-2 hover:bg-black_sub",
                  numberChildren === 0 && "pointer-events-none"
                )}
              >
                <span
                  className={cn(
                    "!text-3xl text-blue_sub font-normal p-1",
                    numberChildren === 0 &&
                      "opacity-40 hover:cursor-none !text-3xl hover:bg-transparent text-black"
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
                className="h-8 outline-none text-base bg-white  max-w-[60px] text-black text-center shadow-none border-none"
                onChange={(e) =>
                  setNumberChildren(Math.max(0, Number(e.target.value)))
                }
                onMouseDown={(e) => e.stopPropagation()}
              />
              <Button
                type="button"
                onClick={() =>
                  handleIncrease(setNumberChildren, numberChildren)
                }
                className=" bg-white hover:bg-black_sub text-black px-2 text-4xl shadow-none border-none "
              >
                <span className="text-3xl text-blue_sub font-light">+</span>
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
                disabled={numberRoom === 1}
                type="button"
                onClick={() => handleDecrease(setNumberRoom, numberRoom)}
                className={cn(
                  "bg-white text-black shadow-none border-none p-0 px-2 hover:bg-black_sub",
                  numberRoom === 1 && "pointer-events-none"
                )}
              >
                <span
                  className={cn(
                    "!text-3xl text-blue_sub font-normal p-1",
                    numberRoom === 1 &&
                      "opacity-40 hover:cursor-none !text-3xl hover:bg-transparent text-black"
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
                className="h-8 outline-none text-base bg-white  max-w-[60px] text-black text-center shadow-none border-none"
                onChange={(e) =>
                  setNumberRoom(Math.max(1, Number(e.target.value)))
                }
                onMouseDown={(e) => e.stopPropagation()}
              />
              <Button
                type="button"
                onClick={() => handleIncrease(setNumberRoom, numberRoom)}
                className="bg-white hover:bg-black_sub text-black px-2 text-4xl shadow-none border-none "
              >
                <span className="text-3xl text-blue_sub font-light">+</span>
              </Button>
            </div>
          </div>
        </div>
        <div className="w-full text-start font-normal text-sm p-4">
          <div className="flex items-center justify-between">
            <span>Mang thú cưng đi cùng</span>
            <input type="checkbox" className="w-5 h-5 hover:cursor-pointer" />
          </div>
          <p className="text-xs text-wrap mt-2">
            Động vật trợ giúp không được xem là vật nuôi.{" "}
            <span className="text-blue_sub">
              Đọc thêm về chủ đề đi du lịch cùng động vật trợ giúp
            </span>
          </p>
        </div>
        <SheetFooter>
          <ButtonEnd
            onClick={() => {
              setOpen(false);
            }}
          />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default SearchSelectPersonSM;
