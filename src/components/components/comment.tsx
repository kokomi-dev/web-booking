"use client";
import { useAuthenticatedStore } from "@/store/authencation-store";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Star } from "lucide-react";
import { Button } from "../ui/button";
import { sendComment } from "@/api/api-comment";
import { toast } from "react-toastify";
import { Textarea } from "../ui/textarea";

interface IComment {
  id: string;
}
export const Comments: React.FC<IComment> = ({ id }) => {
  const { isAuthenticated } = useAuthenticatedStore();
  const [vote, setVote] = useState(1);
  const [comment, setComment] = useState("");
  const handleComment = async () => {
    if (!comment || comment === "") {
      return toast.warning("Vui lòng nhập nội dung bình luận");
    }
    const result = await sendComment("");
  };
  return (
    <div className="w-full h-auto ">
      {isAuthenticated ? (
        <div className="w-full h-auto flex flex-col items-start justify-start gap-y-2">
          <div>
            <div className="flex items-center justify-start gap-x-1">
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
            </div>
            <h4>Chọn sao</h4>
          </div>
          <div className="w-full">
            <Textarea
              placeholder="Nhập bình luận"
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />

            <Button
              className="text-normal bg-bg_primary_blue_sub text-white mt-1"
              onClick={handleComment}
            >
              Bình luận
            </Button>
          </div>
        </div>
      ) : (
        <div>Đăng nhập để bình luận</div>
      )}
    </div>
  );
};
