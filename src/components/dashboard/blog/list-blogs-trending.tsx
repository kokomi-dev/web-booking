"use client";
import { getAllBlogTrending } from "@/api/api-blog";
import QUERY_KEY_BLOG from "@/services/queryKeyStore/blogQueryKeyStore";
import { IBlog } from "@/types/blog";
import { useQuery } from "@tanstack/react-query";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import ItemBlog from "./item-blog";
import { LoadingItemBlog } from "@/components/components/loading";

const ListBlogsTrending = () => {
  const { data: listBlogTrending, isLoading } = useQuery({
    queryKey: [QUERY_KEY_BLOG.GET_ALL_TRENDING],
    queryFn: async () => {
      const res = await getAllBlogTrending();
      if (res.status === 200 && res.data.listBlogs.length > 0) {
        return res.data.listBlogs;
      } else {
        return [];
      }
    },
    retry: 3,
    retryDelay: 1000,
  });

  return (
    <section>
      <div className="flex items-center justify-between ">
        <h2 className="text-large font-semibold lg:mb-6">
          Các bài viết được chú ý
        </h2>
        <Link
          href={"/blogs"}
          className="text-blue_main_sub underline  hover:cursor-pointer "
        >
          Xem tất cả
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <LoadingItemBlog key={index} />
          ))
        ) : listBlogTrending?.length > 0 ? (
          listBlogTrending?.map((e: IBlog, i: number) => {
            return <ItemBlog key={i} e={e} />;
          })
        ) : (
          <div>Chưa có bài viết nổi bật nào gần đây</div>
        )}
      </div>
    </section>
  );
};

export default ListBlogsTrending;
