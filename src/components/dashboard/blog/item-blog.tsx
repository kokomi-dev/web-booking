import { IBlog } from "@/types/blog";
import { BookOpenText } from "lucide-react";
import Link from "next/link";
import React from "react";

const ItemBlog = ({ e }: { e: IBlog }) => {
  return (
    <Link
      href={`/blogs/${e.slug}`}
      className="rounded-lg shadow-lg p-4 bg-white flex flex-col gap-y-1 lg:gap-y-3  justify-start border-0.5 border-[#888]"
    >
      <div className="flex flex-col items-start justify-start lg:gap-y-2 lg:flex-row lg:items-center lg:justify-between ">
        <h3 className="text-normal font-semibold capitalize line-clamp-1">
          {e.title}
        </h3>
        <h4 className="text-smallest text-black_sub font-normal line-clamp-1">
          Tác giả: {e.author}
        </h4>
      </div>
      <div className="flex items-center justify-start gap-x-3">
        <BookOpenText className="size-7 md:size-9 lg:size-11 text-blue_main_sub" />
        <p
          className=" text-small text-black_main line-clamp-2 first-letter:uppercase"
          dangerouslySetInnerHTML={{
            __html: e.content,
          }}
        ></p>
      </div>

      <button className=" text-blue_main text-small text-start underline">
        Đọc thêm
      </button>
    </Link>
  );
};

export default ItemBlog;
