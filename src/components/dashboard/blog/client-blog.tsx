"use client";
import { IBlog } from "@/types/blog";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import BreadcrumbHead from "@/components/components/breadcrumb";
import CommentBlog from "@/components/dashboard/blog/comment-blog";
import ListBlogPageRelate from "@/components/dashboard/blog/list-blogs-relate";
import QUERY_KEY_BLOG from "@/services/queryKeyStore/blogQueryKeyStore";
import { apiUrl } from "@/api";
import { formatDate } from "@/utils/constants";

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
    <div className="mt-[1rem] lg:mt-0  posing-vertical-1">
      <BreadcrumbHead
        items={[
          { label: "Trang chủ", href: "/" },
          { label: "Bài viết", href: "/blogs" },
          { label: blog.title },
        ]}
      />
      <h3 className="text-large xl:text-[1.7rem] font-bold capitalize">
        {blog.title}
      </h3>

      <p className="text-black_main text-small">
        Được viết bởi <span className="font-medium">{blog?.author}</span> •{" "}
        {formatDate(blog.createdAt)}
      </p>

      <div
        className="blog-show-detail prose max-w-none   text-black_main font-normal text-small posing-vertical-4"
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
