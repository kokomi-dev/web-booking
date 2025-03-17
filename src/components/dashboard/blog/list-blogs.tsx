"use client";

import { LoadingItemBlog } from "@/components/components/loading";
import ItemBlog from "@/components/dashboard/blog/item-blog";
import { IBlog } from "@/types/blog";
import { Suspense } from "react";

const ListBlogView = ({ _dataListBlog }: { _dataListBlog: any }) => {
  return (
    <div className="posing-vertical-5 pb-3">
      <h1 className="text-large font-bold">Xem các bài viết của chúng tôi</h1>
      <section className="grid grid-cols-1 lg:grid-cols-2  gap-6">
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
  );
};

export default ListBlogView;
