"use client";
import { deleteComment, sendComment } from "@/api/api-comment";
import { useAuthenticatedStore } from "@/store/authencation-store";
import { CommentProps } from "@/types";
import { cn, formatDate } from "@/utils/constants";
import { Popover, PopoverContent } from "@radix-ui/react-popover";
import {
  Dot,
  EllipsisVertical,
  MessageSquareMore,
  Send,
  Star,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import { toast } from "react-toastify";
import useSWR, { mutate } from "swr";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { PopoverTrigger } from "../ui/popover";
import { Textarea } from "../ui/textarea";
import Icon from "./icon";

interface IComments {
  category: string;
  initialComments: [{}];
  initialRating: number;
  slug: string;
}

const fetcher = async (url: string) => {
  const response = await fetch(url);
  const result = await response.json();

  return {
    comments: result.data.comments,
    rating: result.data.rating,
  };
};

const Comments: React.FC<IComments> = ({
  category,
  initialComments,
  initialRating,
  slug,
}) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;
  const { data, isLoading } = useSWR(`${apiUrl}/${category}/${slug}`, fetcher, {
    fallbackData: {
      comments: initialComments || [],
      rating: initialRating,
    },
  });
  const comments = data?.comments;
  const rating = data?.rating;

  const { isAuthenticated, user } = useAuthenticatedStore();
  const [vote, setVote] = useState(0);
  const [comment, setComment] = useState("");

  const handleComment = useCallback(async () => {
    if (!comment || comment === "") {
      return toast.warning("Vui lòng nhập nội dung bình luận");
    }
    if (user) {
      const result = await sendComment(
        { vote, comment },
        slug,
        category,
        user._id,
        user.firstname + " " + user.lastname,
        user.lastname.slice(0, 1)
      );
      if (result.message && result.data) {
        await mutate(`${apiUrl}/${category}/${slug}`);
        setVote(0);
        setComment("");
        toast.success("Bình luận thành công", { className: "toast-success" });
      } else {
        toast.warning("Xảy ra lỗi khi bình luận. Liên hệ quản trị viên");
      }
    }
  }, [comment, vote, apiUrl, category, slug, user]);
  const handleVote = useCallback((value: number) => {
    setVote(value);
  }, []);
  const handleDeleteComment = useCallback(
    async (idComment: string) => {
      const result = await deleteComment(idComment, category, slug);
      if (result.code === 200) {
        await mutate(`${apiUrl}/${category}/${slug}`);
        toast.success("Xóa bình luận thành công !", {
          className: "toast-success",
        });
      }
    },
    [apiUrl, category, slug]
  );
  return (
    <div className="w-full posing-vertical-3 !z-0">
      <h3 className="text-medium font-semibold">Đánh giá của khách</h3>
      <div className="w-auto flex items-center justify-start gap-x-1">
        <Star className="fill-yellow_main text-yellow_main text-medium" />
        <span className="text-normal font-medium">{rating}</span>
        <Dot />
        <span className="text-normal font-medium">
          {rating > 4.5 ? "Rất tuyệt vời" : rating > 4.0 ? "Tuyệt vời" : "Tốt"}
        </span>
        <span>({comments.length} đánh giá)</span>
      </div>
      <hr className="hr" />
      <div className="w-full h-auto ">
        {isAuthenticated ? (
          <div className="w-full h-auto grid gap-y-2">
            <h4 className="text-normal font-medium">Bình luận</h4>
            <div className="flex items-center justify-start gap-x-1 w-fit ">
              {[1, 2, 3, 4, 5].map((star) => {
                return (
                  <div
                    key={star}
                    onClick={() => {
                      handleVote(star);
                    }}
                  >
                    <Star
                      className={cn(
                        "cursor-pointer size-5",
                        star <= vote
                          ? "text-yellow_main fill-yellow_main"
                          : "text-black"
                      )}
                    />
                  </div>
                );
              })}
            </div>
            <div className="w-full">
              <Textarea
                value={comment}
                placeholder="Nhập bình luận..."
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                className="!text-normal font-normal"
              />
              <Button
                className={cn(
                  "text-normal bg-bg_primary_blue_sub hover:bg-bg_primary_active  text-white mt-2 "
                )}
                onClick={handleComment}
                disabled={!vote || !comment}
              >
                <Send className="size-4" /> Gửi bình luận
              </Button>
            </div>
          </div>
        ) : (
          <div className="w-full h-auto">
            <h4 className="flex items-center justify-start gap-x-1 ext-normal font-medium">
              <Link
                href="/sign-in"
                className="text-normal font-medium text-blue_main_sub underline"
              >
                Đăng nhập
              </Link>
              <span className="font-normal ">để bình luận</span>
            </h4>
          </div>
        )}
      </div>
      {comments.length === 0 ? (
        <span>Chưa có bình luận nào</span>
      ) : (
        <div>
          {comments.map((e: CommentProps, index: number) => {
            return (
              <Card
                key={index}
                className="w-full relative p-2 flex flex-col gap-y-2 border-none shadow-none !z-0"
              >
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
                      <div className="flex items-center justify-start gap-x-1">
                        {Array.from({ length: e.ratingVote }).map(
                          (_, index) => (
                            <Star
                              key={index}
                              className="text-yellow_main size-3 fill-yellow_main"
                            />
                          )
                        )}
                      </div>
                      <p className="text-normal font-light line-clamp-2 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 first-letter:uppercase  overflow-y-auto ">
                        {e.content}.
                      </p>
                    </div>
                    <div className="flex items-center justify-between w-full ">
                      <div className="flex items-center justify-start gap-x-2 w-fit">
                        <Icon level={3} tooltip="Thích">
                          <ThumbsUp />
                        </Icon>
                        <Icon tooltip="Không thích" level={3}>
                          <ThumbsDown />
                        </Icon>
                        <Icon tooltip="Phản hồi" level={3}>
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
          })}
        </div>
      )}
    </div>
  );
};

export default Comments;
