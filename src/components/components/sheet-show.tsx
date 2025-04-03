"use client";
import Comments from "./comments";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Star } from "lucide-react";
import React from "react";
import { Progress } from "../ui/progress";
interface ISheetShowComments {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  comments: [
    {
      name: string;
      nameShow: string;
      content: string;
      commmentDate: string;
      ratingVote: number;
    }
  ];
  rating: number;
  slug: string;
}
const SheetShowComments: React.FC<ISheetShowComments> = ({
  open,
  setOpen,
  rating,
  comments,
  slug,
}) => {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="bg-white text-black lg:max-w-[50%] h-full overflow-y-auto scroll-smooth p-6">
        <SheetHeader>
          <SheetTitle className="text-lg font-semibold">Đánh giá</SheetTitle>
          <SheetDescription className="flex items-center justify-between">
            Để lại đánh giá của bạn cho chúng tôi
          </SheetDescription>
        </SheetHeader>
        <div className="w-full h-auto mt-5 grid gap-y-2 text-sm font-normal">
          <div className="w-full h-auto grid grid-cols-[20%,40%,auto] ">
            <div className="flex items-center justify-start gap-x-1">
              <Star className="size-8 text-yellow fill-yellow" />
              <div className="grid  ml-2">
                <h4 className="text-sm">{rating}</h4>
                <span className="text-sm text-blue_sub">
                  {comments.length} đánh giá
                </span>
              </div>
            </div>
            <Input placeholder="Tìm đánh giá" />
            <div className=" text-end">
              <label className="text-xs mr-2">Sắp xếp theo</label>
              <select className="border-0.5 border-black p-2 rounded-8">
                <option>Phù hợp nhất</option>
              </select>
            </div>
          </div>
          <div className="grid gap-4 py-4">
            <h4 className="text-base font-medium">Lọc theo</h4>
            <div className="grid grid-cols-3 gap-x-2">
              <div className="grid ">
                <label>Điểm đánh giá</label>
                <select className="border-0.5 border-black p-2 rounded-8">
                  <option>Tất cả</option>
                  <option>5 sao</option>
                  <option>4 sao</option>
                  <option>3 sao</option>
                  <option>2 sao</option>
                  <option>1 sao</option>
                </select>
              </div>
              <div className="grid">
                <label>Ngôn ngữ</label>
                <select className="border-0.5 border-black p-2 rounded-8">
                  <option>Tất cả</option>
                  <option>Tiếng Anh</option>
                  <option>Tiếng Trung</option>
                  <option>Tiếng Hàn</option>
                  <option>Tiếng Lào</option>
                  <option>Tiếng Campuchia</option>
                  <option>Tiếng Hàn Quốc</option>
                </select>
              </div>
              <div className="grid ">
                <label>THời gian trong năm</label>
                <select className="border-0.5 border-black p-2 rounded-8">
                  <option>Tất cả</option>
                  <option>Tháng 1-3</option>
                  <option>Tháng 4-6</option>
                  <option>Tháng 7-9</option>
                  <option>Tháng 10-12</option>
                </select>
              </div>
            </div>
            <h4 className="text-base font-medium mt-2">Đánh giá tổng quan</h4>
            <div className="grid grid-cols-2 gap-y-4">
              <ProgessComponent value={60} title="Đánh giá tiền" />
              <ProgessComponent value={10} title="Tiện nghi" />
              <ProgessComponent value={70} title="Chất lượng dịch vụ" />
              <ProgessComponent value={70} title="Dễ tiếp cận" />
            </div>
            {comments.length > 0 && open === true && (
              <Comments
                category="attraction"
                initialComments={comments}
                initialRating={rating}
                slug={slug}
              />
            )}
          </div>
        </div>
        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
export default SheetShowComments;
export function ProgessComponent({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="w-full h-auto  grid text-start">
      <label className="text-[0.88rem] font-medium mb-1">{title}</label>
      <Progress value={value} className="w-[80%]  text-yellow"></Progress>
    </div>
  );
}
