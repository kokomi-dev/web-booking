"use client";
import { postCommentBlog, updateLikeBlog } from "@/api/api-blog";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Textarea } from "@/components/ui/textarea";
import QUERY_KEY_BLOG from "@/services/queryKeyStore/blogQueryKeyStore";
import { useAuthenticatedStore } from "@/store/authencation-store";
import { IBlog, IBlogComment } from "@/types/blog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import ItemCommentBlog from "./item-comment-blog";

const CommentBlog = ({ e }: { e: IBlog }) => {
  const queryClient = useQueryClient();
  const [messComment, setMessComent] = useState("");
  const mutationUpdateLikeBlog = useMutation({
    mutationFn: updateLikeBlog,
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEY_BLOG.GET_DETAIL_BLOG, e.slug],
      });

      const previousData = queryClient.getQueryData([
        QUERY_KEY_BLOG.GET_DETAIL_BLOG,
        e._id,
      ]);

      queryClient.setQueryData(
        [QUERY_KEY_BLOG.GET_DETAIL_BLOG, e._id],
        (oldData: any) => {
          if (!oldData || !oldData.detailBlog) return oldData;
          return {
            ...oldData,
            detailBlog: {
              ...oldData.detailBlog,
              likes: oldData.detailBlog.likes + 1,
            },
          };
        }
      );

      return { previousData };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY_BLOG.GET_DETAIL_BLOG, e.slug],
      });
    },
    onError: (err, _, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          [QUERY_KEY_BLOG.GET_DETAIL_BLOG, e._id],
          context.previousData
        );
      }
    },
  });
  const handleReloadComment = async () => {
    const previousData = queryClient.getQueryData([
      QUERY_KEY_BLOG.GET_DETAIL_BLOG,
      e._id,
    ]);

    queryClient.setQueryData(
      [QUERY_KEY_BLOG.GET_DETAIL_BLOG, e._id],
      (oldData: any) => {
        if (!oldData || !oldData.detailBlog) return oldData;
        return {
          ...oldData,
          detailBlog: {
            ...oldData.detailBlog,
            likes: oldData.detailBlog.likes + 1,
          },
        };
      }
    );

    return { previousData };
  };
  const mutationPostComment = useMutation({
    mutationFn: postCommentBlog,
  });
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
              queryKey: [QUERY_KEY_BLOG.GET_DETAIL_BLOG, e.slug],
            });
            setMessComent("");
            toast.success("Bình luận thành công!");
          }
        },
        onError: async (err) => {
          toast.error("Lỗi khi bình luận bài viết này!");
        },
      }
    );
  };
  const { isAuthenticated, user } = useAuthenticatedStore();
  const router = useRouter();
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Button
          onClick={() => mutationUpdateLikeBlog.mutate({ id: e._id })}
          className="bg-blue-500 hover:bg-blue_main_sub text-white"
        >
          👍 Thích ({e?.likes})
        </Button>
      </div>
      <hr className="hr" />
      <h3 className="text-medium font-semibold">
        {e.comments.length} bình luận
      </h3>

      <div className="flex-shrink grid grid-cols-1 gap-y-2 lg:gap-y-3 ">
        {isAuthenticated && !!user ? (
          <div className="flex flex-col items-start justify-start space-y-2">
            <Textarea
              value={messComment}
              onChange={(e) => {
                setMessComent(e.target.value);
              }}
              placeholder="Viết bình luận của bạn..."
            />
            <Button
              disabled={!messComment && !!user}
              onClick={() => {
                handlePostComment({
                  id: e._id,
                  data: {
                    email: user.email,
                    roles: user.roles,
                    id: user._id,
                    name: user.firstname + " " + user.lastname,
                    nameShow: user.lastname.slice(0, 1),
                    content: messComment,
                  },
                });
              }}
              className="bg-green_main max-w-[140px] text-white hover:bg-green-600"
            >
              Bình luận
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => {
              router.push("/sign-in");
            }}
            className="max-w-[200px] w-full bg-bg_primary_white text-black hover:opacity-90"
          >
            Đăng nhập để bình luận
          </Button>
        )}
        <Carousel
          opts={{
            align: "start",
          }}
          orientation="vertical"
          className="w-full"
        >
          {e?.comments.length > 0 ? (
            <CarouselContent>
              {e?.comments.map((comment, index) => (
                <CarouselItem key={index} className=" ">
                  <ItemCommentBlog e={comment} user={user} />
                </CarouselItem>
              ))}
            </CarouselContent>
          ) : (
            <span>Chưa có bình luận nào về bài viết này!</span>
          )}
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default CommentBlog;
