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
import { Button } from "../ui/button";
import FilterComponent from "./filter-item";
import {
  filterAttraction2,
  filterAttraction3,
  filterAttraction4,
} from "../dashboard/constants";
import { Slice } from "lucide-react";

interface ISheetShowFilter {
  category?: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  filter: {
    price?: string;
    startDate?: string;
    difficutly?: string;
  };
  setFilter: any;
  handleResetFilter: any;
  refetch: any;
}

const SheetShowFilter: React.FC<ISheetShowFilter> = ({
  open,
  setOpen,
  filter,
  setFilter,
  handleResetFilter,
  refetch,
}) => {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side="left"
        className="text-black w-[90%] h-auto p-4 pl-8 flex flex-col"
      >
        <SheetHeader className="w-full h-fit text-start flex-shrink-0">
          <SheetTitle className="text-start text-medium font-semibold">
            Lọc theo
          </SheetTitle>
          <SheetDescription className="flex items-center justify-between">
            Hãy chọn các yếu tố mà bạn muốn tìm kiếm
          </SheetDescription>
        </SheetHeader>

        <div className="w-full flex-1 overflow-y-auto my-3 posing-vertical-3 text-small font-normal">
          <FilterComponent
            title="giá"
            arrayFilterItem={filterAttraction2}
            filterKey="price"
            filter={filter}
            setFilter={setFilter}
          />
          <FilterComponent
            title="điểm đánh giá"
            arrayFilterItem={filterAttraction3}
            filterKey="rating"
            filter={filter}
            setFilter={setFilter}
          />
          <div className="flex flex-col posing-vertical-5">
            <h6 className="text-small font-medium capitalize">Ngày bắt đầu</h6>
            <input
              value={filter.startDate}
              type="date"
              className="w-[80%] border-1 border-black_sub p-1 rounded-8 bg-bg_primary_white text-black"
              onChange={(e) => {
                setFilter((pre: any) => ({
                  ...pre,
                  startDate: e.target.value,
                }));
              }}
            />
          </div>
          <FilterComponent
            title="Độ khó"
            arrayFilterItem={filterAttraction4}
            filterKey="difficutly"
            filter={filter}
            setFilter={setFilter}
          />
        </div>

        <SheetFooter className="w-full h-[60px] flex items-center justify-center bg-white border-t flex-shrink-0">
          <div className="w-full flex items-center justify-between">
            <div
              className="flex items-center justify-center gap-x-[3px] p-2 bg-bg_black_sub rounded-8 hover:cursor-pointer border-1 border-black_sub hover:bg-bg_primary_hover"
              onClick={handleResetFilter}
            >
              <span className="text-smallest">Xóa bộ lọc</span>
              <Slice className="size-4" />
            </div>
            <Button
              onClick={() => {
                setOpen(false);
                refetch();
              }}
              className="bg-bg_primary_blue_sub text-white"
            >
              Xem kết quả
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
export default SheetShowFilter;
