"use client";
import { getAllBlogTrending } from "@/api/api-blog";
import QUERY_KEY_BLOG from "@/services/queryKeyStore/blogQueryKeyStore";
import { IBlog } from "@/types/blog";
import { useQuery } from "@tanstack/react-query";
import { BookOpen } from "lucide-react";
import Link from "next/link";

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
  if (isLoading) {
    return <div>Loading bài viết</div>;
  }
  return (
    <section className="">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {listBlogTrending?.length > 0 ? (
          listBlogTrending?.map((e: IBlog, i: number) => {
            return (
              <Link
                key={i}
                href={`/blogs/${e.slug}`}
                className="rounded-lg shadow-lg p-4 bg-white space-y-3"
              >
                <div className="flex flex-col items-start justify-start gap-y-2 lg:flex-row lg:items-center lg:justify-between ">
                  <h3 className="text-normal font-semibold capitalize line-clamp-1">
                    {e.title}
                  </h3>
                  <h4 className="text-smallest text-black_sub font-normal">
                    Tác giả: {e.author}
                  </h4>
                </div>

                <div className="flex items-start justify-start space-x-2">
                  <BookOpen className="size-6 text-blue_main_sub" />
                  <p
                    className=" text-small text-black_main line-clamp-2 first-letter:uppercase"
                    dangerouslySetInnerHTML={{
                      __html: e.content,
                    }}
                  ></p>
                </div>
                <button className="mt-4 text-blue_main text-small underline">
                  Đọc thêm
                </button>
              </Link>
            );
          })
        ) : (
          <div>Chưa có bài viết nổi bật nào gần đây</div>
        )}
      </div>
    </section>
  );
};

export default ListBlogsTrending;
