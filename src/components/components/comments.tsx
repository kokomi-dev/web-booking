"use client";
import { deleteComment, sendComment } from "@/api/api-comment";
import { useAuthenticatedStore } from "@/store/authencation-store";
import { CommentProps } from "@/types";
import { cn } from "@/utils/constants";
import { Popover, PopoverContent } from "@radix-ui/react-popover";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import {
  Dot,
  EllipsisVertical,
  MessageSquareMore,
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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { PopoverTrigger } from "../ui/popover";
import { Textarea } from "../ui/textarea";

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
        toast.warning("Xảy ra lỗi khi bình luận");
      }
    }
  }, [comment, vote, apiUrl, category, slug, user]);
  const handleVote = useCallback((value: number) => {
    setVote(value);
  }, []);
  const handleDeleteComment = async (idComment: string) => {
    const result = await deleteComment(idComment, category, slug);
    if (result.code === 200) {
      await mutate(`${apiUrl}/${category}/${slug}`);
      toast.success("Xóa bình luận thành công !", {
        className: "toast-success",
      });
    }
  };
  return (
    <div className="w-full flex flex-col gap-y-4">
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
      {comments.length === 0 ? (
        <span className="text-normal font-normal">Chưa có đánh giá nào!</span>
      ) : (
        <Carousel opts={{ align: "start" }} className="w-full">
          <CarouselContent className="flex ">
            {comments.map((comment: CommentProps) => (
              <CarouselItem
                key={comment._id}
                className={`${
                  comments.length === 1 ? "w-full" : "basis-[69.67%]"
                } lg:basis-1/2 xl:basis-1/3`}
              >
                <Card className="w-full relative p-2 flex flex-col gap-y-2">
                  <div className="w-full flex items-center justify-start gap-1">
                    <div className=" size-9 bg-bg_primary_active rounded-full relative">
                      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
                        <span className="text-white capitalize font-medium text-small">
                          {comment.nameShow}
                        </span>
                      </div>
                    </div>
                    <span className="text-small font-medium capitalize">
                      {comment.name}
                    </span>
                  </div>
                  <p className="text-small font-normal scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 h-[44px] md:h-[48px] lg:h-[50px] xl:h-[52px]  first-letter:uppercase  overflow-y-auto ">
                    {comment.content}.
                  </p>
                  <div className="flex items-center justify-between w-full ">
                    <div className="flex items-center justify-start gap-x-2 w-fit">
                      <ThumbsUp className="w-4 h-4  cursor-pointer" />
                      <ThumbsDown className="w-4 h-4  cursor-pointer" />
                      <MessageSquareMore className="w-4 h-4  cursor-pointer" />
                    </div>
                    <span className="text-smallest text-black_sub italic mr-4">
                      {format(comment.commentDate, "dd/MM/yyyy", {
                        locale: vi,
                      })}
                    </span>
                  </div>
                  {String(user?._id) === comment.idUser && (
                    <div className="absolute top-2 right-2">
                      <Popover>
                        <PopoverTrigger>
                          <EllipsisVertical className="w-5 h-5 md:w-4 md:h-4 cursor-pointer" />
                        </PopoverTrigger>
                        <PopoverContent className="bg-bg_primary_blue_sub2 shadow-2xl rounded-8 p-1 grid gap-1">
                          <Button className="text-smallest hover:cursor-pointer opacity-75 hover:opacity-100 bg-bg_primary_blue_sub text-white font-normal">
                            Sửa
                          </Button>
                          <Button
                            className="text-smallest hover:cursor-pointer opacity-75 hover:opacity-100"
                            onClick={() => handleDeleteComment(comment._id)}
                          >
                            Xóa
                          </Button>
                        </PopoverContent>
                      </Popover>
                    </div>
                  )}
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious hidden />
          <CarouselNext hidden />
        </Carousel>
      )}
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
                  "text-normal bg-bg_primary_blue_sub text-white mt-2 "
                )}
                onClick={handleComment}
                disabled={!vote || !comment}
              >
                Gửi
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
    </div>
  );
};

export default Comments;
