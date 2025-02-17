"use client";

import { getAllBlog } from "@/api/api-blog";
import bannerBlog from "@/assets/images/banner-blog.jpg";
import BreadcrumbHead from "@/components/components/breadcrumb";
import InputDebounce from "@/components/components/input-debounce";
import ItemBlog from "@/components/dashboard/blog/item-blog";
import { LoadingPage } from "@/components/components/loading";
import QUERY_KEY_BLOG from "@/services/queryKeyStore/blogQueryKeyStore";
import { IBlog } from "@/types/blog";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useMemo, useState } from "react";

const ListBlogPage = () => {
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
  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <div className="flex flex-col gap-y-4">
      <section className="min-w-full h-full text-center relative -mt-4 px-[-10rem] no-container-padding">
        <Image
          alt="imng-banner-blog"
          width={1600}
          height={1000}
          src={bannerBlog}
          className="w-full h-full min-h-[30vh] lg:max-h-[65vh] object-cover"
        />
      </section>
      <BreadcrumbHead
        items={[{ label: "Trang chủ", href: "/home" }, { label: "Bài viết" }]}
      />
      <div className="flex flex-col justify-between items-start gap-y-3">
        <h1 className="text-large font-bold">
          Khám phá những bài viết hấp dẫn
        </h1>
        <p className="text-black_main font-light lg:font-normal text-normal ">
          Chào mừng bạn đến với kho tàng bài viết về du lịch và lưu trú! Tại
          đây, bạn sẽ tìm thấy những thông tin hữu ích, địa điểm thú vị và mẹo
          vặt giúp chuyến đi của bạn trở nên trọn vẹn hơn.
        </p>
        <p className="text-black_main font-light lg:font-normal ">
          Hãy cùng chúng tôi khám phá những vùng đất mới, trải nghiệm các nền
          văn hóa đặc sắc, tìm hiểu về những khách sạn và khu nghỉ dưỡng đẳng
          cấp, hay đơn giản là những quán ăn ngon trên khắp mọi miền.
        </p>
        <p className="text-black_main font-light lg:font-normal ">
          Không chỉ có những bài viết chia sẻ kinh nghiệm, chúng tôi còn mang
          đến cho bạn những câu chuyện thú vị, những review chân thực nhất để
          bạn có thể lựa chọn hành trình phù hợp với mình.
        </p>
        <p className="text-black_main font-light lg:font-normal ">
          Đừng quên sử dụng thanh tìm kiếm để nhanh chóng tìm thấy những bài
          viết phù hợp với nhu cầu của bạn nhé!
        </p>
        <InputDebounce
          autoFocus={false}
          type="text"
          placeholder="Nhập tên bài viết..."
          className="border p-2 rounded max-w-[400px] text-normal"
          value={filterBlog.title}
          debounceTime={400}
          onChange={(e: any) =>
            setFilterBlog((pre) => ({
              ...pre,
              title: e.target.value,
            }))
          }
        />
      </div>
      <h1 className="text-large font-bold">Xem các bài viết của chúng tôi</h1>
      <section className="grid grid-cols-1 md/grid-cols-2 xl:grid-cols-3 gap-6">
        {_dataListBlog.length > 0 ? (
          _dataListBlog.map((e: IBlog, i: number) => {
            return <ItemBlog key={i} e={e} />;
          })
        ) : (
          <div>Không tìm thấy bài viết phù hợp</div>
        )}
      </section>
    </div>
  );
};

export default ListBlogPage;
