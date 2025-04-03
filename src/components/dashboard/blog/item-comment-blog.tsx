import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { User } from "@/store/authencation-store";
import { IBlogCommentResponse } from "@/types/blog";
import { formatDate } from "@/utils/constants";
import { Popover } from "@radix-ui/react-popover";
import {
  EllipsisVertical,
  MessageSquareMore,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";

const ItemCommentBlog = ({
  e,
  user,
}: {
  e: IBlogCommentResponse;
  user: User | null;
}) => {
  return (
    <Card className="w-full p-4 flex flex-col gap-4 border border-gray-200 rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="w-10 h-10 bg-blue_active text-white rounded-full flex items-center justify-center font-bold">
          {e.nameShow}
        </div>

        {/* Comment Content */}
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h5 className="text-sm font-semibold capitalize">{e.name}</h5>
              <p className="text-xs text-black_sub italic">
                {formatDate(e.commentDate)}
              </p>
            </div>

            {/* Dropdown for Edit/Delete */}
            {String(user?._id) === e.idUser && (
              <Popover>
                <PopoverTrigger>
                  <EllipsisVertical className="w-5 h-5 cursor-pointer text-black_sub" />
                </PopoverTrigger>
                <PopoverContent className="bg-white shadow-lg rounded-lg p-2">
                  <Button
                    className="text-sm text-blue_sub hover:bg-blue_active hover:text-white w-full"
                    onClick={() => console.log("Edit comment")}
                  >
                    Sửa
                  </Button>
                  <Button
                    className="text-sm text-red-500 hover:bg-red-100 w-full"
                    onClick={() => console.log("Delete comment")}
                  >
                    Xóa
                  </Button>
                </PopoverContent>
              </Popover>
            )}
          </div>

          {/* Comment Text */}
          <p className="text-sm text-black_sub first-letter:uppercase mt-2">
            {e.content}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="sm"
          className="text-black_sub hover:text-blue_sub flex items-center gap-1"
        >
          <ThumbsUp className="w-4 h-4" />
          <span>Thích</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-black_sub hover:text-blue_sub flex items-center gap-1"
        >
          <ThumbsDown className="w-4 h-4" />
          <span>Không thích</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-black_sub hover:text-blue_sub flex items-center gap-1"
        >
          <MessageSquareMore className="w-4 h-4" />
          <span>Phản hồi</span>
        </Button>
      </div>
    </Card>
  );
};

export default ItemCommentBlog;
