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
import ShareButton from "@/components/components/share-button";

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
    <div className="container-spacing">
      <BreadcrumbHead
        items={[
          { label: "Trang chủ", href: "/" },
          { label: "Bài viết", href: "/blogs" },
          { label: blog.title },
        ]}
      />
      <div className="container xl:px-0 container-spacing">
        <div className="flex items-center justify-between">
          <h3 className="text-xl lg:text-2xl xl:text-3xl font-bold capitalize ">
            {blog.title}
          </h3>
          <ShareButton
            model="blog"
            slug={blog.slug}
            title={`Bài viết của KoKoTravel: ${blog.title}`}
          />
        </div>

        <p className="text-black text-sm">
          Được viết bởi <span className="font-medium">{blog?.author}</span> •{" "}
          {formatDate(blog.createdAt)}
        </p>

        <div
          className="blog-show-detail prose max-w-none text-black_sub font-normal text-sm list-spacing"
          dangerouslySetInnerHTML={{ __html: blog?.content }}
        />
        <hr className="hr" />
        <h4 className="text-lg font-bold">
          Các bài viết liên quan cùng tác giả
        </h4>
        <ListBlogPageRelate currentBlog={blog?._id} unitCode={blog?.unitCode} />
        <CommentBlog e={blog} />
      </div>
    </div>
  );
};

export default ClientBlogDetail;
