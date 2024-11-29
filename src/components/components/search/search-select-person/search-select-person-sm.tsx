import { SearchSelectPersonSMProps } from "@/utils/types/search";
import React from "react";
import { ChevronDown, Dot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ButtonEnd } from "../search";
const SearchSelectPersonSM: React.FC<SearchSelectPersonSMProps> = ({
  open,
  setOpen,
  className,
  error,
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
      <SheetTrigger asChild></SheetTrigger>
      <SheetContent
        className={cn(
          " w-auto min-h-[70vh] bg-white text-black z-[50] p-2 shadow-2xl mt-1 rounded-8 flex flex-col items-start justify-start",
          error && "border-1 border-error_color"
        )}
        side="bottom"
      >
        <SheetTitle aria-describedby={undefined}></SheetTitle>
        <SheetDescription aria-describedby={undefined}></SheetDescription>
        <div className="min-w-[100%] grid gap-y-6 mt-8  p-4 rounded-8">
          {/* Người lớn */}
          <div className="grid grid-cols-[50%,50%] items-center gap-4">
            <Label className="text-[1rem] font-normal" htmlFor="adults">
              Người lớn
            </Label>
            <div className=" flex items-center border-0.5 border-black_sub justify-center rounded-[4px] ">
              <Button
                onClick={() => handleDecrease(setNumberAdults, numberAdults)}
                className="bg-white hover:bg-bg_black_sub text-black px-2 text-largest shadow-none border-none"
              >
                <span className="text-large text-blue_main_sub font-normal">
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
                className=" bg-white hover:bg-bg_black_sub text-black px-2 text-largest shadow-none border-none"
              >
                <span className="text-large text-blue_main_sub font-normal">
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
                className="bg-white hover:bg-bg_black_sub text-black px-2 text-largest shadow-none border-none "
              >
                <span className="text-large text-blue_main_sub font-normal">
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
        <ButtonEnd
          onClick={() => {
            setOpen(false);
          }}
        />
      </SheetContent>
    </Sheet>
  );
};

export default SearchSelectPersonSM;
