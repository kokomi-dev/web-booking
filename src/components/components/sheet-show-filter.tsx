"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import React from "react";
import FilterComponent from "./filter-item";
import { filterBar, filter1, filter2, filter3 } from "../dashboard/constants";
import { Button } from "../ui/button";
interface ISheetShowFilter {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const SheetShowFilter: React.FC<ISheetShowFilter> = ({ open, setOpen }) => {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side="left"
        className="bg-white text-black lg:max-w-[50%] h-full p-6"
      >
        <SheetHeader className="w-full text-start">
          <SheetTitle className="text-start text-medium font-semibold">
            Lọc theo
          </SheetTitle>
          <SheetDescription className="flex items-center justify-between">
            Hãy chọn các yếu tố mà bạn muốn tìm kiếm
          </SheetDescription>
        </SheetHeader>
        <div className="w-full h-full mt-5  text-small font-normal overflow-y-scroll">
          <FilterComponent title="hạng mục" arrayFilterItem={filter1} />
          <FilterComponent title="giá" arrayFilterItem={filter2} />
          <FilterComponent title="điểm đánh giá" arrayFilterItem={filter3} />
        </div>
        <SheetFooter className="absolute w-full bottom-2 left-0 right-0 text-center flex items-center justify-center">
          <Button
            onClick={() => {
              setOpen(false);
            }}
            className="bg-bg_primary_active w-[90%] text-white"
          >
            Áp dụng
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
export default SheetShowFilter;
