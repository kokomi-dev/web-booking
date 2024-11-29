import { SearchSelectPersonLGProps } from "@/utils/types/search";
import React from "react";
import { PopoverContent } from "@radix-ui/react-popover";
import { ChevronDown, Dot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
const SearchSelectPersonLG: React.FC<SearchSelectPersonLGProps> = ({
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
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "hidden w-full h-[40px] bg-white px-2 py-1",
            "hover:cursor-pointer ",
            error && "border-[2px] border-error_color",
            className,
            "lg:flex"
          )}
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
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          "w-auto bg-bg_primary_white text-black z-[15] p-2 shadow-2xl mt-1 rounded-8 ",
          error && "border-1 border-error_color"
        )}
        align="center"
      >
        <div className="grid gap-2">
          {/* Người lớn */}
          <div className="grid grid-cols-3 items-center gap-4">
            <Label className="text-small" htmlFor="adults">
              Người lớn:
            </Label>
            <div className="col-span-2 flex items-center ">
              <Button
                onClick={() => handleDecrease(setNumberAdults, numberAdults)}
                className="bg-white hover:bg-bg_black_sub text-black px-4 text-medium "
              >
                -
              </Button>
              <Input
                type="number"
                id="adults"
                min="1"
                value={numberAdults}
                className="h-8 outline-none bg-white  max-w-[60px] text-black text-center"
                onChange={(e) =>
                  setNumberAdults(Math.max(1, Number(e.target.value)))
                }
                onMouseDown={(e) => e.stopPropagation()}
              />
              <Button
                onClick={() => handleIncrease(setNumberAdults, numberAdults)}
                className="bg-white hover:bg-bg_black_sub text-black px-4 text-medium "
              >
                +
              </Button>
            </div>
          </div>
          {/* Trẻ em */}
          <div className="grid grid-cols-3 items-center gap-4">
            <Label className="text-small" htmlFor="children">
              Trẻ em:
            </Label>
            <div className="col-span-2 flex items-center">
              <Button
                onClick={() =>
                  handleDecrease(setNumberChildren, numberChildren)
                }
                className="shadow-none bg-white hover:bg-bg_black_sub text-black px-4 text-medium "
              >
                -
              </Button>
              <Input
                type="number"
                id="children"
                min="0"
                value={numberChildren}
                className="h-8 outline-none bg-white  max-w-[60px] text-black text-center"
                onChange={(e) =>
                  setNumberChildren(Math.max(0, Number(e.target.value)))
                }
                onMouseDown={(e) => e.stopPropagation()}
              />
              <Button
                onClick={() =>
                  handleIncrease(setNumberChildren, numberChildren)
                }
                className="shadow-none bg-white hover:bg-bg_black_sub text-black px-4 text-medium "
              >
                +
              </Button>
            </div>
          </div>
          {/* Phòng đơn */}
          <div className="grid grid-cols-3 items-center gap-4">
            <Label className="text-small" htmlFor="numberRoom">
              Phòng:
            </Label>
            <div className="col-span-2 flex items-center">
              <Button
                onClick={() => handleDecrease(setNumberRoom, numberRoom)}
                className="bg-white hover:bg-bg_black_sub text-black px-4 text-medium "
              >
                -
              </Button>
              <Input
                type="number"
                id="numberRoom"
                min="1"
                value={numberRoom}
                className="h-8 outline-none bg-white  max-w-[60px] text-black text-center"
                onChange={(e) =>
                  setNumberRoom(Math.max(1, Number(e.target.value)))
                }
                onMouseDown={(e) => e.stopPropagation()}
              />
              <Button
                onClick={() => handleIncrease(setNumberRoom, numberRoom)}
                className="bg-white hover:bg-bg_black_sub text-black px-4 text-medium "
              >
                +
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SearchSelectPersonLG;
