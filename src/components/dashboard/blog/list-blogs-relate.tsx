"use client";
import { getAllBlogRelate } from "@/api/api-blog";
import ItemBlog from "@/components/dashboard/blog/item-blog";
import { LoadingPage } from "@/components/components/loading";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import QUERY_KEY_BLOG from "@/services/queryKeyStore/blogQueryKeyStore";
import { IBlog } from "@/types/blog";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import Image from "next/image";

const ListBlogPageRelate = ({
  unitCode,
  currentBlog,
}: {
  unitCode: string;
  currentBlog: string;
}) => {
  const queryClient = useQueryClient();
  const { data: listBlogRelate, isLoading } = useQuery({
    queryKey: [QUERY_KEY_BLOG.GET_ALL_RELATE],
    queryFn: async () => {
      const res = await getAllBlogRelate(unitCode);
      if (res.status === 200) {
        return res.data.listBlogs.filter((item: IBlog) => {
          if (item._id !== currentBlog) {
            return item;
          }
        });
      } else return [];
    },
    retry: 3,
    retryDelay: 1000,
    enabled: !!unitCode,
  });
  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEY_BLOG.GET_ALL_RELATE],
    });
  }, [unitCode]);
  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      {listBlogRelate.length > 0 ? (
        <CarouselContent>
          {listBlogRelate.map((blog: any) => (
            <CarouselItem
              key={blog.id}
              className="basis-[66.67%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4 hover:scale-105 transition-transform duration-300"
            >
              <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <Image
                  width={700}
                  height={300}
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
      ) : (
        <span className="text-center text-base font-medium">
          Chưa có bài viết liên quan nào!
        </span>
      )}
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default ListBlogPageRelate;
