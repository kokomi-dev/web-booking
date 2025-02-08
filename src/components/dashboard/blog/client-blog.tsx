"use client";
import { IBlog } from "@/types/blog";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import BreadcrumbHead from "@/components/components/breadcrumb";
import CommentBlog from "@/components/dashboard/blog/comment-blog";
import ListBlogPageRelate from "@/components/dashboard/blog/list-blogs-relate";
import QUERY_KEY_BLOG from "@/services/queryKeyStore/blogQueryKeyStore";
import { apiUrl } from "@/api";

export const fetchBlogDetail = async (slug: string) => {
  const res = await fetch(`${apiUrl}/blog/${slug}`, { cache: "no-store" });
  return res.json();
};
const ClientBlogDetail = ({ initialData }: { initialData: IBlog }) => {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEY_BLOG.GET_DETAIL_BLOG, initialData.slug],
    queryFn: () => fetchBlogDetail(initialData.slug),
    initialData: { detailBlog: initialData },
  });

  if (isLoading) return <p>Đang tải...</p>;
  const blog = data.detailBlog;
  return (
    <div className="flex flex-col gap-y-4">
      <BreadcrumbHead
        items={[
          { label: "Trang chủ", href: "/" },
          { label: "Bài viết", href: "/blogs" },
          { label: blog.title },
        ]}
      />
      <h3 className="text-large font-bold capitalize">{blog.title}</h3>

      <p className="text-black_main text-small">
        Được viết bởi <span className="font-medium">{blog?.author}</span> •{" "}
        {blog?.createdAt}
      </p>

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: blog?.content }}
      />
      <hr className="hr" />
      <h4 className="text-medium font-bold">
        Các bài viết liên quan cùng tác giả
      </h4>
      <ListBlogPageRelate currentBlog={blog?._id} unitCode={blog?.unitCode} />
      <CommentBlog e={blog} />
    </div>
  );
};

export default ClientBlogDetail;
