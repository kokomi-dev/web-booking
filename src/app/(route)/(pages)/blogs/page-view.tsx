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
import { Search, BookOpen, TrendingUp, Clock, Tag, Filter } from "lucide-react";
import Image from "next/image";
import { Suspense, useMemo, useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import bannerBlog1 from "@/assets/images/banner-blog.jpg";
import bannerBlog2 from "@/assets/images/banner-blog-bg.jpeg";
import { Input } from "@/components/ui/input";

const PageView = () => {
  const { data: listBlogs, isLoading } = useQuery({
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

  const [isImageLoading, setIsImageLoading] = useState(true);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState("all");

  // Danh sách các danh mục giả định
  const categories = [
    { id: "all", name: "Tất cả" },
    { id: "attraction", name: "Du lịch" },
    { id: "hotel", name: "Lưu trú" },
    { id: "lifestyle", name: "Mẹo hay" },
  ];

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
  const newBlogs = listBlogs?.slice(0, 6) || [];
  const todayBlog = listBlogs?.filter((blog: IBlog) => blog.isToday) || [];
  const listBlogTrending =
    listBlogs?.filter((blog: IBlog) => blog.isTrending) || [];

  // Lọc bài viết theo danh mục (giả định cho ví dụ)
  const filteredBlogs = useMemo(() => {
    if (activeCategory === "all") return _dataListBlog;
    // Giả định mỗi blog có thuộc tính category
    return (
      _dataListBlog?.filter((blog: any) => blog.category === activeCategory) ||
      []
    );
  }, [_dataListBlog, activeCategory]);

  return (
    <div className="container mx-auto lg:px-0 grid gap-4">
      {/* Breadcrumb */}
      <BreadcrumbHead
        items={[{ label: "Trang chủ", href: "/home" }, { label: "Bài viết" }]}
      />

      {/* Grid Layout chính */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
        {/* Content chính - 3/4 */}
        <div className="lg:col-span-3">
          {/* Bài viết nổi bật hôm nay và carousel */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-24">
            {/* Bài viết nổi bật trong ngày */}
            <div className="lg:col-span-1">
              <div className="mb-5 flex items-center">
                <div className="h-6 w-1 bg-blue mr-3"></div>
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <BookOpen size={20} className="mr-2" />
                  Bài Viết Nổi Bật
                </h2>
              </div>

              {todayBlog.length > 0 ? (
                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 h-auto">
                  <div className="relative">
                    {isImageLoading && (
                      <div className="animate-pulse bg-gray-200 w-full h-48"></div>
                    )}
                    <Image
                      width={1000}
                      height={500}
                      priority
                      src={todayBlog[0].imgBanner}
                      alt={todayBlog[0].title}
                      className={`w-full h-48 object-cover transition-transform duration-500 hover:scale-105 ${
                        isImageLoading ? "hidden" : "block"
                      }`}
                      onLoadingComplete={() => setIsImageLoading(false)}
                    />
                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
                      <span className="text-xs font-medium bg-blue text-white px-3 py-1 rounded-full">
                        Nổi bật
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-xl font-bold text-black_sub hover:text-blue transition-colors duration-300 line-clamp-2">
                      <a href={`/blogs/${todayBlog[0].slug}`}>
                        {todayBlog[0].title}
                      </a>
                    </h3>

                    <div
                      dangerouslySetInnerHTML={{
                        __html: todayBlog[0].content,
                      }}
                      className="text-gray-600 mt-3 line-clamp-3 text-sm"
                    ></div>

                    <div className="mt-5 flex justify-between items-center">
                      <a
                        href={`/blogs/${todayBlog[0].slug}`}
                        className="inline-flex items-center text-blue font-medium hover:text-blue_sub transition-colors"
                      >
                        Đọc tiếp
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 ml-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </a>

                      <span className="text-xs text-black_sub_2 flex items-center">
                        <Clock size={14} className="mr-1" />
                        {todayBlog[0].createdAt &&
                          new Date(todayBlog[0].createdAt).toLocaleDateString(
                            "vi-VN"
                          )}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl p-8 shadow-md text-center">
                  <p className="text-black_sub_2">
                    Chưa có bài viết nổi bật hôm nay
                  </p>
                </div>
              )}
            </div>

            {/* Các bài viết nổi bật - Carousel */}
            <div className="lg:col-span-2">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-6 w-1 bg-blue mr-3"></div>
                  <h2 className="text-xl font-bold text-gray-800 flex items-center">
                    <TrendingUp size={20} className="mr-2" />
                    Tin Nổi Bật
                  </h2>
                </div>

                {/* Dots indicator */}
                <div className="flex gap-1.5">
                  {Array.from({
                    length: Math.ceil(listBlogTrending.length / 2),
                  }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCarouselIndex(i)}
                      className={`h-2 w-2 rounded-full transition-colors ${
                        i === carouselIndex ? "bg-blue" : "bg-gray-300"
                      }`}
                      aria-label={`Slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

              <div className="relative">
                <Carousel
                  opts={{ align: "start", loop: true }}
                  className="w-full"
                >
                  <CarouselContent>
                    {listBlogTrending.length > 0 ? (
                      listBlogTrending.map((blog: any) => (
                        <CarouselItem
                          key={blog._id}
                          className="md:basis-1/2 p-1"
                        >
                          <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-gray-100">
                            <div className="relative overflow-hidden">
                              <Image
                                width={700}
                                height={300}
                                priority
                                src={blog.imgBanner}
                                alt={blog.title}
                                className="w-full h-48 object-cover transition-transform duration-700 hover:scale-110"
                              />
                              <div className="absolute top-3 right-3">
                                <span className="text-xs font-medium bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full">
                                  Tin hot
                                </span>
                              </div>
                            </div>

                            <div className="p-5 flex flex-col flex-grow">
                              <h3 className="text-lg font-bold text-black_sub hover:text-blue transition-colors duration-300 mb-2 line-clamp-2">
                                <a href={`/blogs/${blog.slug}`}>{blog.title}</a>
                              </h3>

                              <div
                                dangerouslySetInnerHTML={{
                                  __html: blog.content,
                                }}
                                className="text-gray-600 line-clamp-2 text-sm flex-grow"
                              ></div>

                              <div className="mt-4 flex justify-between items-center pt-3 border-t border-gray-100">
                                <a
                                  href={`/blogs/${blog.slug}`}
                                  className="text-blue text-sm font-medium hover:text-blue_sub flex items-center"
                                >
                                  Đọc tiếp
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-3.5 w-3.5 ml-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                                    />
                                  </svg>
                                </a>

                                <span className="text-xs text-black_sub_2 flex items-center">
                                  <Clock size={14} className="mr-1" />
                                  {blog.createdAt &&
                                    new Date(blog.createdAt).toLocaleDateString(
                                      "vi-VN"
                                    )}
                                </span>
                              </div>
                            </div>
                          </div>
                        </CarouselItem>
                      ))
                    ) : (
                      <CarouselItem className="basis-full">
                        <div className="bg-white rounded-xl p-8 shadow-md text-center">
                          <p className="text-black_sub_2">
                            Chưa có bài viết nổi bật
                          </p>
                        </div>
                      </CarouselItem>
                    )}
                  </CarouselContent>

                  <div className="absolute -left-4 top-1/2 -translate-y-1/2">
                    <CarouselPrevious className="bg-white shadow-lg border-none h-10 w-10 rounded-full" />
                  </div>
                  <div className="absolute -right-4 top-1/2 -translate-y-1/2">
                    <CarouselNext className="bg-white shadow-lg border-none h-10 w-10 rounded-full" />
                  </div>
                </Carousel>
              </div>
            </div>
          </div>

          {/* Bài viết mới nhất - Grid hiển thị */}
          <div className="mb-12">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-6 w-1 bg-blue mr-3"></div>
                <h2 className="text-xl font-bold text-gray-800">
                  Bài Viết Mới Nhất
                </h2>
              </div>
              <Button variant="outline" className="text-sm">
                Xem tất cả
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {newBlogs.length > 0 ? (
                newBlogs.slice(0, 4).map((blog: any) => (
                  <div
                    key={blog._id}
                    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col h-full"
                  >
                    <div className="flex flex-col md:flex-row h-full">
                      <div className="md:w-2/5 relative overflow-hidden">
                        <Image
                          width={300}
                          height={200}
                          src={blog.imgBanner}
                          alt={blog.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                        <div className="absolute top-2 left-2">
                          <span className="text-xs font-medium bg-blue/90 text-white px-2 py-1 rounded-md">
                            Mới
                          </span>
                        </div>
                      </div>
                      <div className="p-4 md:w-3/5 flex flex-col justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-black_sub hover:text-blue transition-colors duration-300 mb-2 line-clamp-2">
                            <a href={`/blogs/${blog.slug}`}>{blog.title}</a>
                          </h3>
                          <div
                            dangerouslySetInnerHTML={{ __html: blog.content }}
                            className="text-gray-600 text-sm line-clamp-2"
                          ></div>
                        </div>
                        <div className="mt-3 flex justify-between items-center pt-3 border-t border-gray-100">
                          <a
                            href={`/blogs/${blog.slug}`}
                            className="text-blue text-sm font-medium hover:text-blue_sub flex items-center"
                          >
                            Đọc tiếp
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3.5 w-3.5 ml-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                              />
                            </svg>
                          </a>
                          <span className="text-xs text-black_sub_2 flex items-center">
                            <Clock size={14} className="mr-1" />
                            {blog.createdAt &&
                              new Date(blog.createdAt).toLocaleDateString(
                                "vi-VN"
                              )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full bg-white rounded-xl p-8 shadow-md text-center">
                  <p className="text-black_sub_2">Chưa có bài viết mới</p>
                </div>
              )}
            </div>
          </div>

          {/* Tabs để lọc bài viết theo danh mục */}
          <div className="mb-6">
            <Tabs defaultValue="all" className="w-full">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <div className="h-6 w-1 bg-blue mr-3"></div>
                  <h2 className="text-xl font-bold text-gray-800">
                    Khám Phá Theo Danh Mục
                  </h2>
                </div>
              </div>

              <TabsList className="bg-white p-1 border border-gray-200 rounded-lg mb-6">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className="text-sm data-[state=active]:bg-blue data-[state=active]:text-white"
                  >
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value={activeCategory} className="mt-0">
                <div className="grid grid-cols-1 gap-6">
                  {isLoading ? (
                    Array(3)
                      .fill(0)
                      .map((_, i) => (
                        <div
                          key={i}
                          className="bg-white p-4 rounded-xl shadow-sm animate-pulse"
                        >
                          <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
                          <div className="h-4 bg-gray-200 rounded mb-2"></div>
                          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                        </div>
                      ))
                  ) : filteredBlogs && filteredBlogs.length > 0 ? (
                    filteredBlogs.slice(0, 5).map((blog: any) => (
                      <div
                        key={blog._id}
                        className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-bold text-black_sub hover:text-blue transition-colors duration-300">
                            <a href={`/blogs/${blog.slug}`}>{blog.title}</a>
                          </h3>
                          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                            {blog.category || "Chung"}
                          </span>
                        </div>
                        <div
                          dangerouslySetInnerHTML={{ __html: blog.content }}
                          className="text-gray-600 mt-2 text-sm line-clamp-2"
                        ></div>
                        <div className="mt-3 flex justify-between items-center pt-3 border-t border-gray-100">
                          <a
                            href={`/blogs/${blog.slug}`}
                            className="text-blue text-sm font-medium hover:text-blue_sub flex items-center"
                          >
                            Đọc tiếp
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3.5 w-3.5 ml-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                              />
                            </svg>
                          </a>
                          <span className="text-xs text-black_sub_2 flex items-center">
                            <Clock size={14} className="mr-1" />
                            {blog.createdAt &&
                              new Date(blog.createdAt).toLocaleDateString(
                                "vi-VN"
                              )}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="bg-white rounded-xl p-8 shadow-md text-center">
                      <p className="text-black_sub_2">
                        Không tìm thấy bài viết trong danh mục này
                      </p>
                    </div>
                  )}

                  {filteredBlogs && filteredBlogs.length > 5 && (
                    <div className="text-center mt-2">
                      <Button variant="outline" className="mx-auto">
                        Xem thêm
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        {/* Sidebar - 1/4 */}
        <div className="lg:col-span-1">
          {/* Danh mục */}
          <div className="bg-white rounded-xl shadow-sm p-5 mb-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Danh Mục</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center justify-between w-full p-2 rounded-lg transition-colors ${
                    activeCategory === category.id
                      ? "bg-blue-50 text-blue"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <span className="font-medium">{category.name}</span>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                    {category.id === "all"
                      ? _dataListBlog?.length || 0
                      : _dataListBlog?.filter(
                          (blog: any) => blog.category === category.id
                        ).length || 0}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Bài viết được xem nhiều nhất */}
          <div className="bg-white rounded-xl shadow-sm p-5 mb-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Được Xem Nhiều
            </h3>
            <div className="space-y-4">
              {listBlogs?.slice(0, 3).map((blog: any) => (
                <div key={blog._id} className="flex gap-3 group">
                  <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded-lg">
                    <Image
                      width={100}
                      height={100}
                      src={blog.imgBanner}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm line-clamp-2 group-hover:text-blue transition-colors">
                      <a href={`/blogs/${blog.slug}`}>{blog.title}</a>
                    </h4>
                    <p className="text-xs text-black_sub_2 mt-1 flex items-center">
                      <Clock size={12} className="mr-1" />
                      {blog.createdAt &&
                        new Date(blog.createdAt).toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Tags */}
          <div className="bg-white rounded-xl shadow-sm p-5 mb-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <Tag size={18} className="mr-2" />
              Tags Phổ Biến
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                "Du lịch",
                "Phượt",
                "Bãi biển",
                "Khám phá",
                "Hang động",
                "Chèo thuyền",
                "Mạo hiểm",
                "Du lịch nhanh",
                "Giá rẻ",
                "Dài ngày",
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 hover:bg-blue-50 hover:text-blue rounded-full text-sm font-medium cursor-pointer transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Feedback */}
          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Góp ý & Phản hồi
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Chúng tôi luôn mong muốn cải thiện nội dung. Hãy cho chúng tôi
              biết ý kiến của bạn!
            </p>
            <Button className="w-full">Gửi phản hồi</Button>
          </div>
        </div>
      </div>

      <div className="mt-10 mb-12">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-6 w-1 bg-blue mr-3"></div>
            <h2 className="text-xl font-bold text-gray-800">Tất Cả Bài Viết</h2>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <Filter size={16} />
              Lọc
            </Button>
            <select className="border border-gray-300 rounded-md px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm">
              <option value="latest">Mới nhất</option>
              <option value="oldest">Cũ nhất</option>
              <option value="popular">Phổ biến</option>
            </select>
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-xl shadow-sm animate-pulse"
              >
                <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            ))}
        </div>
      ) : _dataListBlog && _dataListBlog.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {_dataListBlog.map((blog: any) => (
            <div
              key={blog._id}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col h-full"
            >
              <div className="relative overflow-hidden">
                <Image
                  width={500}
                  height={300}
                  src={blog.imgBanner}
                  alt={blog.title}
                  className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
                />
                {blog.isToday && (
                  <div className="absolute top-3 right-3">
                    <span className="text-xs font-medium bg-blue text-white px-3 py-1 rounded-full">
                      Hôm nay
                    </span>
                  </div>
                )}
                {blog.isTrending && (
                  <div className="absolute top-3 left-3">
                    <span className="text-xs font-medium bg-orange-500 text-white px-3 py-1 rounded-full">
                      Nổi bật
                    </span>
                  </div>
                )}
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                    {blog.category || "Chung"}
                  </span>
                  <span className="text-xs text-black_sub_2 flex items-center">
                    <Clock size={14} className="mr-1" />
                    {blog.createdAt &&
                      new Date(blog.createdAt).toLocaleDateString("vi-VN")}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-black_sub hover:text-blue transition-colors duration-300 mb-2 line-clamp-2">
                  <a href={`/blogs/${blog.slug}`}>{blog.title}</a>
                </h3>
                <div
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                  className="text-gray-600 line-clamp-3 text-sm flex-grow"
                ></div>
                <div className="mt-4 flex justify-between items-center pt-3 border-t border-gray-100">
                  <a
                    href={`/blogs/${blog.slug}`}
                    className="text-blue text-sm font-medium hover:text-blue_sub flex items-center"
                  >
                    Đọc tiếp
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </a>
                  <div className="flex items-center text-sm text-black_sub_2">
                    <span className="flex items-center mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      {blog.views || 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <div className="flex justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-700 mb-2">
            Không tìm thấy bài viết
          </h3>
          <p className="text-black_sub_2 mb-4">
            Không có bài viết nào phù hợp với tiêu chí tìm kiếm của bạn
          </p>
          <Button onClick={() => setFilterBlog({ title: "" })}>
            Xem tất cả bài viết
          </Button>
        </div>
      )}
      {/* Phân trang */}
      {_dataListBlog && _dataListBlog.length > 0 && (
        <div className="mt-8 flex justify-center">
          <div className="flex items-center space-x-1">
            <Button variant="outline" size="sm" className="w-10 p-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-10 p-0 bg-blue-50 text-blue border-blue-200"
            >
              1
            </Button>
            <Button variant="outline" size="sm" className="w-10 p-0">
              2
            </Button>
            <Button variant="outline" size="sm" className="w-10 p-0">
              3
            </Button>
            <span className="px-2">...</span>
            <Button variant="outline" size="sm" className="w-10 p-0">
              10
            </Button>
            <Button variant="outline" size="sm" className="w-10 p-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Button>
          </div>
        </div>
      )}

      <div className="bg-gradient-to-r from-blue to-blue_main_sub text-white rounded-2xl shadow-xl p-8 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Đăng ký nhận thông báo bài viết mới
            </h2>
            <p className="text-blue-100 mb-6">
              Để không bỏ lỡ bất kỳ nội dung mới nào, hãy đăng ký nhận thông báo
              qua email. Chúng tôi sẽ gửi tới bạn những bài viết hay nhất mỗi
              tuần.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                value=""
                onChange={() => {}}
                placeholder="Email của bạn"
                className="bg-white/10  text-white border-white/20 placeholder:text-white/60 flex-grow outline-none focus:outline-none"
              />
              <Button className="bg-white text-blue whitespace-nowrap">
                Đăng ký ngay
              </Button>
            </div>
          </div>
          <div className="hidden md:flex justify-center">
            <div className="relative w-48 h-48">
              <Image
                src={bannerBlog2}
                alt="Newsletter Illustration"
                width={200}
                height={200}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      <ReceiveFeedback />
    </div>
  );
};

export default PageView;
