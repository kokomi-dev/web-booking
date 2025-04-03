import { IBlog } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ItemBlog = ({ e }: { e: IBlog }) => {
  return (
    <Link
      href={`/blogs/${e.slug}`}
      className="group block bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      {/* Image Section */}
      <div className="relative w-full h-[200px]">
        <Image
          src={e.imgBanner}
          alt="ảnh banner bài viết"
          width={700}
          height={300}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content Section */}
      <div className="w-100 p-2 md:p-3 lg:p-3">
        {/* Title */}
        <h3 className="text-base font-semibold text-black line-clamp-2 truncate group-hover:text-blue-500 transition-colors duration-300">
          {e.title}
        </h3>
        {/* Author */}
        <h4 className="text-sm text-black_sub mt-2">Tác giả: {e.author}</h4>

        {/* Description */}
        <p
          className="text-xs text-black_sub_2 mt-1 line-clamp-1"
          dangerouslySetInnerHTML={{ __html: e.content }}
        ></p>

        {/* Read More */}
        <span className="text-blue text-xs font-medium mt-2 block hover:underline">
          Đọc thêm
        </span>
      </div>
    </Link>
  );
};

export default ItemBlog;
