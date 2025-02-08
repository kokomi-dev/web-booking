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
          {listBlogRelate.map((e: IBlog, index: number) => (
            <CarouselItem
              key={index}
              className="basis-76.77 md:basis-1/2 lg:basis-1/3 "
            >
              <ItemBlog e={e} />
            </CarouselItem>
          ))}
        </CarouselContent>
      ) : (
        <span className="text-center text-normal font-medium">
          Chưa có bài viết liên quan nào!
        </span>
      )}
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default ListBlogPageRelate;
