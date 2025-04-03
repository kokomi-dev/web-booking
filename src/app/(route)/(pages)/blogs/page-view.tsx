"use client";

import { getAllBlog } from "@/api/api-blog";
import BreadcrumbHead from "@/components/components/breadcrumb";
import InputDebounce from "@/components/components/input-debounce";
import { LoadingItemBlog } from "@/components/components/loading";
import ReceiveFeedback from "@/components/components/receive-feedback";
import BannerBlog from "@/components/dashboard/blog/banner-blog";
import ItemBlog from "@/components/dashboard/blog/item-blog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import QUERY_KEY_BLOG from "@/services/queryKeyStore/blogQueryKeyStore";
import { IBlog } from "@/types/blog";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import Image from "next/image";
import { Suspense, useMemo, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton từ ShadCN UI

const PageView = () => {
  const { data: listBlogs } = useQuery({
    queryKey: [QUERY_KEY_BLOG.GET_ALL],
    queryFn: async () => {
      const res = await getAllBlog();
      if (res.status === 200 && res.data.listBlogs.length > 0) {
        return res.data.listBlogs;
      } else {
        return [];
      }
    },
    retry: 3,
    retryDelay: 1000,
  });

  const [filterBlog, setFilterBlog] = useState({
    title: "",
  });

  const [isImageLoading, setIsImageLoading] = useState(true); // Trạng thái kiểm tra ảnh đã tải xong

  const _dataListBlog = useMemo(() => {
    if (!listBlogs) return [];
    if (listBlogs.length > 0) {
      return listBlogs.filter((item: IBlog) => {
        return Object.keys(filterBlog).every((key) => {
          const filterValue = filterBlog[key as keyof { title: string }];
          const itemValue = item[key as keyof IBlog];
          if (
            filterValue === null ||
            filterValue === undefined ||
            filterValue === ""
          )
            return true;
          if (typeof filterValue === "boolean") {
            return filterValue === Boolean(itemValue);
          }
          return itemValue
            ?.toString()
            .toLowerCase()
            .includes(filterValue.toString().toLowerCase());
        });
      });
    }
  }, [listBlogs, filterBlog]);

  // Lọc bài viết mới và bài viết nổi bật
  const newBlogs = listBlogs?.slice(0, 5) || [];
  const todayBlog = listBlogs?.filter((blog: IBlog) => blog.isToday) || [];
  const listBlogTrending =
    listBlogs?.filter((blog: IBlog) => blog.isTrending) || [];
  return (
    <div className="container-spacing">
      {/* Breadcrumb */}
      <BreadcrumbHead
        items={[{ label: "Trang chủ", href: "/home" }, { label: "Bài viết" }]}
      />
      <div className="container container-spacing xl:px-0">
        <div className="w-full list-spacing">
          <h2 className="text-xl lg:text-2xl xl:text-3xl font-bold text-black">
            Bài viết nổi bật trong ngày
          </h2>
          <p className="text-sm text-black_sub_2 ">
            Khám phá bài viết được yêu thích nhất hôm nay!
          </p>
          {todayBlog.length > 0 && (
            <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 mt-4">
              {/* Skeleton hiển thị khi ảnh đang tải */}
              {isImageLoading && (
                <Skeleton className="w-full h-[300px] sm:h-[360px] md:h-[400px] lg:h-[450px] xl:h-[500px]" />
              )}
              <Image
                width={1000}
                priority
                height={500}
                src={todayBlog[0].imgBanner}
                alt={todayBlog[0].title}
                className={`w-full h-[300px] sm:h-[360px] md:h-[400px] lg:h-[450px] xl:h-[500px] object-cover hover:scale-105 transition-transform duration-300 ${
                  isImageLoading ? "hidden" : "block"
                }`}
                onLoadingComplete={() => setIsImageLoading(false)} // Ẩn skeleton khi ảnh tải xong
              />
              <div className="p-4">
                <h3 className="text-xl lg:text-2xl font-bold text-black truncate hover:text-blue transition-colors duration-300">
                  {todayBlog[0].title}
                </h3>
                <p
                  dangerouslySetInnerHTML={{ __html: todayBlog[0].content }}
                  className="text-base text-black_sub_2 mt-2 line-clamp-3"
                ></p>
                <a
                  href={`/blogs/${todayBlog[0].slug}`}
                  className="text-blue text-sm font-medium mt-4 block hover:underline"
                >
                  Đọc thêm
                </a>
              </div>
            </div>
          )}
        </div>
        <div className="list-spacing">
          <h2 className="text-base md:text-xl font-semibold">
            Bài viết nổi bật
          </h2>
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
        </div>
      </div>

      <BannerBlog />

      {/* Search Input */}
      <div className="container xl:px-0">
        <h2 className="text-base md:text-xl font-semibold mb-4">
          Tìm kiếm bài viết
        </h2>
        <div className="relative max-w-[400px]">
          <InputDebounce
            autoFocus={false}
            type="text"
            placeholder="Nhập tên bài viết..."
            className="border-0.5 p-2 rounded  !h-[38px] w-full pl-10 text-sm"
            value={filterBlog.title}
            debounceTime={400}
            onChange={(e: any) =>
              setFilterBlog((pre) => ({
                ...pre,
                title: e.target.value,
              }))
            }
          />
          <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
        </div>
      </div>

      {/* New Blogs Carousel */}
      <div className="list-spacing container xl:px-0">
        <h2 className="text-base md:text-xl font-semibold">Bài viết mới</h2>
        <Carousel opts={{ align: "start" }} className="w-full">
          <CarouselContent>
            {newBlogs.map((blog: any) => (
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
      </div>

      {/* Blog List */}
      <div className="list-spacing container xl:px-0">
        <h2 className="text-base md:text-xl font-semibold mb-4">
          Tất cả bài viết
        </h2>
        <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-col-3 lg:grid-cols-4 xl:grid-cols-5  gap-6">
          {_dataListBlog.length > 0 ? (
            _dataListBlog.map((e: IBlog, i: number) => {
              return (
                <Suspense key={i} fallback={<LoadingItemBlog />}>
                  <ItemBlog key={i} e={e} />
                </Suspense>
              );
            })
          ) : (
            <div>Không tìm thấy bài viết phù hợp</div>
          )}
        </section>
      </div>
      <ReceiveFeedback />
    </div>
  );
};

export default PageView;
