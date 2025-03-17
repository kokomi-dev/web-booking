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
import ListBlogView from "@/components/dashboard/blog/list-blogs";

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

  return (
    <div className="posing-vertical-1">
      <section className="min-w-full h-full text-center relative -mt-4 px-[-10rem] no-container-padding">
        <Image
          alt="imng-banner-blog"
          width={1400}
          height={300}
          priority={true}
          src={bannerBlog}
          className="w-full h-full max-h-[300px] object-cover"
        />
        <div className="w-full absolute top-[50%] left-[50%]  translate-x-[-50%] translate-y-[-50%] text-white text-left flex items-center justify-start">
          <div className="container-padding">
            <h6 className="text-normal+ lg:text-medium xl:text-large font-semibold tracking-[0.1rem]">
              Tin tức
            </h6>
            <p className="text-smallest lg:text-small font-normal">
              Cập nhật tin tức du lịch qua KoKoTravel
            </p>
          </div>
        </div>
      </section>
      <BreadcrumbHead
        items={[{ label: "Trang chủ", href: "/home" }, { label: "Bài viết" }]}
      />
      <div className="posing-vertical-2 ">
        <h1 className="text-large font-bold">
          Khám phá những bài viết hấp dẫn
        </h1>
        <p className="text-black_main font-normal text-normal ">
          Chào mừng bạn đến với kho tàng bài viết về du lịch và lưu trú! Tại
          đây, bạn sẽ tìm thấy những thông tin hữu ích, địa điểm thú vị và mẹo
          vặt giúp chuyến đi của bạn trở nên trọn vẹn hơn.
        </p>
        <p className="text-black_main font-normal ">
          Hãy cùng chúng tôi khám phá những vùng đất mới, trải nghiệm các nền
          văn hóa đặc sắc, tìm hiểu về những khách sạn và khu nghỉ dưỡng đẳng
          cấp, hay đơn giản là những quán ăn ngon trên khắp mọi miền.
        </p>
        <p className="text-black_main font-normal ">
          Không chỉ có những bài viết chia sẻ kinh nghiệm, chúng tôi còn mang
          đến cho bạn những câu chuyện thú vị, những review chân thực nhất để
          bạn có thể lựa chọn hành trình phù hợp với mình.
        </p>
        <p className="text-black_main font-normal ">
          Đừng quên sử dụng thanh tìm kiếm để nhanh chóng tìm thấy những bài
          viết phù hợp với nhu cầu của bạn nhé!
        </p>
        <InputDebounce
          autoFocus={false}
          type="text"
          placeholder="Nhập tên bài viết..."
          className=" border-0.5 p-2 rounded max-w-[400px] text-normal !h-[38px]"
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
      <ListBlogView _dataListBlog={_dataListBlog} />
    </div>
  );
};

export default PageView;
