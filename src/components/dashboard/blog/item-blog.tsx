import { IBlog } from "@/types/blog";
import { BookOpenText } from "lucide-react";
import Link from "next/link";
import React from "react";

const ItemBlog = ({ e }: { e: IBlog }) => {
  return (
    <Link
      href={`/blogs/${e.slug}`}
      className="group block rounded-lg overflow-hidden shadow-lg border border-gray-200 bg-white transition-transform transform hover:-translate-y-[0.1rem] hover:shadow-xl"
    >
      <div className="p-2 lg:p-4 flex flex-col  posing-vertical-5">
        <h3 className="text-normal font-bold text-black_main group-hover:text-blue_main_sub truncate">
          {e.title}
        </h3>
        <h4 className="text-small text-black_main_blur">Tác giả: {e.author}</h4>

        <div className="flex items-start gap-x-4">
          <BookOpenText className="w-10 h-10 text-blue_main flex-shrink-0" />
          <p
            className="text-small text-black_main_blur leading-relaxed line-clamp-2"
            dangerouslySetInnerHTML={{ __html: e.content }}
          ></p>
        </div>

        <button className="mt-3 text-blue_main_sub text-smallest font-medium underline-offset-4 group-hover:underline">
          Đọc thêm
        </button>
      </div>
    </Link>
  );
};

export default ItemBlog;
