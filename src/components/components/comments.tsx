"use client";
import { deleteComment, editComment, sendComment } from "@/api/api-comment";
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
  const { data } = useSWR(`${apiUrl}/${category}/${slug}`, fetcher, {
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
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editedContent, setEditedContent] = useState("");
  const [openActionsCmt, setOpenActionsComment] = useState(false);
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
        toast.success("Bình luận thành công");
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

  const handleEditComment = (commentId: string, currentContent: string) => {
    setEditingCommentId(commentId);
    setEditedContent(currentContent);
    setOpenActionsComment(false);
  };

  const handleSaveEditedComment = useCallback(
    async (commentId: string) => {
      if (user) {
        const result = await editComment(
          commentId,
          editedContent,
          category,
          slug
        );
        if (result && result.data.code === 200) {
          setEditedContent("");
          await mutate(`${apiUrl}/${category}/${slug}`);
          toast.success("Cập nhật bình luận thành công");
        } else {
          toast.warning("Xảy ra lỗi khi cập nhật bình luận");
        }
        setEditingCommentId(null);
      }
    },
    [editedContent, apiUrl, category, slug, user]
  );

  return (
    <div className="w-full container-spacing">
      {/* Header */}
      <div className="flex flex-col list-spacing">
        <h3 className="text-lg font-semibold">Đánh giá của khách</h3>
        <div className="flex items-center gap-2">
          <Star className="fill-yellow text-yellow text-lg" />
          <span className="text-base font-medium">{rating}</span>
          <Dot />
          <span className="text-base font-medium">
            {rating > 4.5
              ? "Rất tuyệt vời"
              : rating > 4.0
              ? "Tuyệt vời"
              : "Tốt"}
          </span>
          <span>({comments.length} đánh giá)</span>
        </div>
      </div>

      {/* Comment Input */}
      {isAuthenticated ? (
        <div className="space-y-4">
          <h4 className="text-lg font-semibold">Viết bình luận</h4>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={cn(
                  "cursor-pointer size-5",
                  star <= vote ? "text-yellow fill-yellow" : "text-black"
                )}
                onClick={() => handleVote(star)}
              />
            ))}
          </div>
          <Textarea
            value={comment}
            placeholder="Nhập bình luận..."
            onChange={(e) => setComment(e.target.value)}
            className="!text-base font-normal border-gray-300 rounded-lg"
          />
          <Button
            className="w-fit text-sm bg-blue_sub hover:bg-blue_active text-white mt-2 px-4 py-2 rounded-lg"
            onClick={handleComment}
            disabled={!vote || !comment}
          >
            <Send className="size-4 mr-2" /> Gửi bình luận
          </Button>
        </div>
      ) : (
        <div className="text-gray-600">
          <h4 className="flex items-center gap-x-1">
            <Link
              href="/sign-in"
              className="text-sm font-medium text-blue_sub underline"
            >
              Đăng nhập
            </Link>
            <span>để bình luận</span>
          </h4>
        </div>
      )}

      {/* Comments List */}
      {comments.length === 0 ? (
        <div className="mt-3 lg:mt-4">
          <span>Chưa có bình luận nào!</span>
        </div>
      ) : (
        <div className="list-spacing">
          {comments.map((e: CommentProps, index: number) => (
            <Card
              key={index}
              className="p-2 sm:p-3 md:p-4 border-1 border-gray-200 rounded-lg shadow-sm"
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="w-10 h-10 bg-blue_active text-white rounded-full flex items-center justify-center font-bold uppercase">
                  {e.nameShow}
                </div>
                {/* Comment Content */}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="text-sm font-semibold capitalize mb-1 md:mb-2">
                        {e.name}
                      </h5>
                      <p className="text-xs text-black_sub_2">
                        {formatDate(e.commentDate)}
                      </p>
                    </div>
                    {String(user?._id) === e.idUser && (
                      <Popover
                        open={openActionsCmt}
                        onOpenChange={setOpenActionsComment}
                      >
                        <PopoverTrigger asChild>
                          <EllipsisVertical
                            onClick={() =>
                              setOpenActionsComment(!openActionsCmt)
                            }
                            className="w-5 h-5 cursor-pointer text-black_sub_2"
                          />
                        </PopoverTrigger>
                        <PopoverContent className="bg-white shadow-lg rounded-lg p-1 md:p-2">
                          {editingCommentId === e._id ? (
                            <Button
                              size={"sm"}
                              className="text-sm text-white hover:bg-blue_active hover:text-white w-full mb-2"
                              onClick={() => handleSaveEditedComment(e._id)}
                            >
                              Lưu
                            </Button>
                          ) : (
                            <Button
                              size={"sm"}
                              className="text-sm text-white hover:bg-blue_active hover:text-white w-full mb-2"
                              onClick={() =>
                                handleEditComment(e._id, e.content)
                              }
                            >
                              Sửa
                            </Button>
                          )}
                          <Button
                            size={"sm"}
                            className="text-sm bg-white text-black_sub w-full"
                            onClick={() => handleDeleteComment(e._id)}
                          >
                            Xóa
                          </Button>
                        </PopoverContent>
                      </Popover>
                    )}
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    {Array.from({ length: e.ratingVote }).map((_, i) => (
                      <Star
                        key={i}
                        className="text-yellow size-4 fill-yellow"
                      />
                    ))}
                  </div>
                  {editingCommentId === e._id ? (
                    <div>
                      <Textarea
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        className="mt-2 text-sm text-black_sub border-gray-300 rounded-lg"
                      />
                      <div className="flex items-center gap-2 mt-2 justify-start">
                        <Button
                          size={"sm"}
                          className="text-sm text-white hover:bg-blue_active hover:text-white w-fit "
                          onClick={() => handleSaveEditedComment(e._id)}
                        >
                          Lưu
                        </Button>
                        <Button
                          size={"sm"}
                          className="text-sm bg-white text-black_sub w-fit"
                          onClick={() => handleEditComment("", "")}
                        >
                          Hủy
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-black_sub mt-2 first-letter:uppercase">
                      {e.content}
                    </p>
                  )}
                </div>
              </div>
              {/* Actions */}
              {String(user?._id) !== e.idUser && (
                <div className="flex items-center gap-0 sm:gap-3 md:gap-4 mt-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-black_sub_2 hover:text-blue_sub text-xs flex items-center gap-1"
                  >
                    <ThumbsUp className="w-4 h-4" />
                    <span className="hidden sm:block">Thích</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-black_sub_2 hover:text-blue_sub text-xs flex items-center gap-1"
                  >
                    <ThumbsDown className="w-4 h-4" />
                    <span className="hidden sm:block">Không thích</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-black_sub_2 hover:text-blue_sub text-xs flex items-center gap-1"
                  >
                    <MessageSquareMore className="w-4 h-4" />
                    <span className="hidden sm:block">Phản hồi</span>
                  </Button>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comments;
