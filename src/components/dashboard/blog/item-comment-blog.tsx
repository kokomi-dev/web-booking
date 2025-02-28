import Icon from "@/components/components/icon";
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
    <Card className="w-full relative p-2 flex flex-col gap-y-2 border-none shadow-none">
      <div className="w-full flex items-start justify-start space-x-2">
        <div className="flex-shrink-0 size-9 bg-bg_primary_active rounded-full relative">
          <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <span className="text-white capitalize font-medium text-small">
              {e.nameShow}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-y-1">
          <div className="bg-bg_black_sub rounded-14 p-2 mr-5 lg:mr-10">
            <div className="flex items-center justify-start gap-x-1">
              <span className="text-small font-semibold capitalize">
                {e.name}
              </span>
              <span className="text-black_sub">-</span>
              <span className="text-[0.8rem] text-black_sub italic ">
                {formatDate(e.commentDate)}
              </span>
            </div>
            <p className="text-normal line-clamp-2 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 first-letter:uppercase  overflow-y-auto ">
              {e.content}.
            </p>
          </div>
          <div className="flex items-center justify-between w-full ">
            <div className="flex items-center justify-start gap-x-2 w-fit">
              <Icon level={4} tooltip="Thích">
                <ThumbsUp />
              </Icon>
              <Icon tooltip="Không thích" level={4}>
                <ThumbsDown />
              </Icon>
              <Icon tooltip="Phản hồi" level={4}>
                <MessageSquareMore />
              </Icon>
            </div>
            {String(user?._id) === e.idUser && (
              <div className="absolute top-2 right-2">
                <Popover>
                  <PopoverTrigger>
                    <EllipsisVertical className="w-5 h-5 md:w-4 md:h-4 cursor-pointer" />
                  </PopoverTrigger>
                  <PopoverContent className="bg-bg_primary_blue_sub2 shadow-2xl rounded-8 p-1 grid gap-1">
                    <Button className="text-smallest hover:cursor-pointer  hover:opacity-100 hover:bg-bg_primary_active bg-bg_primary_blue_sub text-white font-normal">
                      Sửa
                    </Button>
                    <Button
                      className="text-smallest hover:cursor-pointer  hover:opacity-100 bg-yellow_main hover:bg-yellow-500"
                      //  onClick={() => handleDeleteComment(e._id)}
                    >
                      Xóa
                    </Button>
                  </PopoverContent>
                </Popover>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ItemCommentBlog;
