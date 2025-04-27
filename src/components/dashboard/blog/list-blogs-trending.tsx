"use client";
import { getAllBlogTrending } from "@/api/api-blog";
import { LoadingItemBlog } from "@/components/components/loading";
import QUERY_KEY_BLOG from "@/services/queryKeyStore/blogQueryKeyStore";
import { IBlog } from "@/types/blog";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import ItemBlog from "./item-blog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

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
    <section className="container-spacing container xl:px-0">
      <div className="flex flex-wrap items-center justify-between gap-2 ">
        <h2 className="text-nowrap text-lg lg:text-2xl font-semibold ">
          Các bài viết được chú ý
        </h2>
        <Link
          href={"/blogs"}
          className="text-blue_sub underline hover:cursor-pointer text-sm"
        >
          Xem tất cả
        </Link>
      </div>
      <div className="w-full">
        {isLoading ? (
          // Hiển thị LoadingItemBlog khi đang tải dữ liệu
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <LoadingItemBlog key={index} />
            ))}
          </div>
        ) : listBlogTrending?.length > 0 ? (
          <Carousel opts={{ align: "start" }} className="w-full">
            <CarouselContent>
              {listBlogTrending.map((blog: any) => (
                <CarouselItem
                  key={blog._id}
                  className="basis-[66.67%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4 hover:scale-105 transition-transform duration-300"
                >
                  <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <Image
                      width={700}
                      height={300}
                      priority
                      src={blog.imgBanner}
                      alt={blog.title}
                      className="w-full h-[200px] object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-black truncate hover:text-blue transition-colors duration-300">
                        {blog.title}
                      </h3>
                      <p
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                        className="text-sm text-black_sub_2 mt-2 line-clamp-2"
                      ></p>
                      <a
                        href={`/blogs/${blog.slug}`}
                        className="text-blue_sub text-sm font-medium mt-4 block hover:underline"
                      >
                        Đọc thêm
                      </a>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        ) : (
          <div>Chưa có bài viết nổi bật nào gần đây</div>
        )}
      </div>
    </section>
  );
};

export default ListBlogsTrending;
