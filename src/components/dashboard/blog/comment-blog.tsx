"use client";
import React, { useState } from "react";
import { postCommentBlog, updateLikeBlog } from "@/api/api-blog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuthenticatedStore } from "@/store/authencation-store";
import { IBlog, IBlogComment } from "@/types/blog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import ItemCommentBlog from "./item-comment-blog";
import { ThumbsUp } from "lucide-react";

const CommentBlog = ({ e }: { e: IBlog }) => {
  const queryClient = useQueryClient();
  const [messComment, setMessComent] = useState("");
  const mutationPostComment = useMutation({
    mutationFn: postCommentBlog,
  });
  const { isAuthenticated, user } = useAuthenticatedStore();
  const router = useRouter();

  const handlePostComment = ({
    id,
    data,
  }: {
    id: string;
    data: IBlogComment;
  }) => {
    mutationPostComment.mutate(
      { id: id, data: data },
      {
        onSuccess: async (res) => {
          if (res.status === 200) {
            queryClient.invalidateQueries({
              queryKey: [`blog-detail-${e.slug}`],
            });
            setMessComent("");
            toast.success("Bình luận thành công!");
          }
        },
        onError: async () => {
          toast.error("Lỗi khi bình luận bài viết này!");
        },
      }
    );
  };

  return (
    <div className="space-y-6">
      {/* Like Button */}
      <div className="flex items-center gap-4">
        <Button
          onClick={() => {
            updateLikeBlog({ id: e._id });
          }}
          className="bg-blue hover:bg-blue_main_sub text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <ThumbsUp className="w-5 h-5" />
          <span>Thích ({e?.likes})</span>
        </Button>
      </div>

      <hr className="hr" />

      {/* Comment Section */}
      <h3 className="text-lg font-semibold">{e.comments.length} bình luận</h3>

      {/* Comment Input */}
      {isAuthenticated && user ? (
        <div className="flex flex-col gap-4">
          <Textarea
            value={messComment}
            onChange={(e) => setMessComent(e.target.value)}
            placeholder="Viết bình luận của bạn..."
            className="border-gray-300 rounded-lg"
          />
          <Button
            disabled={!messComment.trim()}
            onClick={() => {
              handlePostComment({
                id: e._id,
                data: {
                  email: user.email,
                  roles: user.roles,
                  id: user._id,
                  name: `${user.firstname} ${user.lastname}`,
                  nameShow: user.lastname.slice(0, 1),
                  content: messComment,
                },
              });
            }}
            className="bg-blue w-fit text-white hover:bg-blue-600 px-4 py-2 rounded-lg"
          >
            Bình luận
          </Button>
        </div>
      ) : (
        <Button
          onClick={() => router.push("/sign-in")}
          className="bg-white text-black hover:opacity-90 px-4 py-2 rounded-lg border border-gray-300"
        >
          Đăng nhập để bình luận
        </Button>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {e.comments.length > 0 ? (
          e.comments.map((comment, index) => (
            <ItemCommentBlog key={index} e={comment} user={user} />
          ))
        ) : (
          <div className="text-center text-gray-500">
            Chưa có bình luận nào về bài viết này!
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentBlog;
