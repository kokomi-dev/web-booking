"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction, useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/utils/constants";

interface IShowImage {
  data: any;
  open: boolean;
  currentIndex?: number;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const ShowImages: React.FC<IShowImage> = ({
  data,
  open,
  currentIndex = 0,
  setOpen,
}) => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (open) {
      setIndex(currentIndex);
    }
  }, [open, currentIndex]);
  const handleBack = () => {
    if (index === 0) {
      return setIndex(data.images.length - 1);
    }
    return setIndex((pre) => pre - 1);
  };
  const handleNext = () => {
    if (index === data.images.length - 1) {
      return setIndex(0);
    } else {
      return setIndex((pre) => pre + 1);
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => setOpen(false)}>
      <DialogContent
        className={cn(
          " w-full bg-white text-black p-4 rounded-14",
          " md:min-w-[900px]",
          "lg:min-w-[1000px]",
          "xl:min-w-[1130px]"
        )}
      >
        <DialogHeader>
          <DialogTitle className="font-normal">{data?.name}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="w-full h-full flex items-center justify-between gap-x-2">
          <Button onClick={handleBack}>
            <ChevronLeft />
          </Button>
          <div className={cn("w-[90%] h-[420px]", "md:w-[70%]", "lg:w-[60%]")}>
            <Image
              src={data?.images[index]}
              alt="img-preview"
              width={1200}
              height={800}
              className="w-full h-full object-cover object-center rounded-8 transition-all duration-200"
            />
          </div>
          <Button onClick={handleNext}>
            <ChevronRight />
          </Button>
        </div>
        <div className="w-full items-center flex  justify-center">
          <span className="text-sm font-semibold">
            {index + 1} / {data?.images.length}
          </span>
        </div>
        <DialogFooter>
          <div className="w-full h-auto flex items-center justify-center ">
            <div className="w-fit h-auto flex items-center justify-start gap-x-2">
              {data &&
                data.images.map((img: string, indexImg: number) => {
                  return (
                    <div className="w-auto h-[80px]" key={indexImg}>
                      <Image
                        src={img}
                        alt="img-previews-list"
                        width={200}
                        height={200}
                        className={cn(
                          "w-auto h-[80px] object-cover brightness-70 blur-[2px] transition-all duration-300 rounded-8",
                          index === indexImg && "brightness-100 blur-[0px]"
                        )}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default ShowImages;
