"use client";

import { DisplayDoc } from "@/types/component-types";
import { removeEmptyLines } from "@/utils/constants";
import { Minimize2, MoveDiagonal } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const MAX_HEIGHT = 200; // Chiều cao tối đa trước khi cắt

const DisplayDocs: React.FC<DisplayDoc> = ({ docs }) => {
  const pRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [isOverflow, setIsOverflow] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [btnPosition, setBtnPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (pRef.current) {
      const isTextOverflowing = pRef.current.scrollHeight > MAX_HEIGHT;
      setIsOverflow(isTextOverflowing);

      if (isTextOverflowing) {
        // Lấy vị trí cuối cùng của đoạn văn bản bị cắt
        const range = document.createRange();
        const textNode = pRef.current.childNodes[0];

        if (textNode) {
          range.setStart(textNode, 0);
          range.setEnd(textNode, Math.min(textNode.textContent!.length, 200)); // Giới hạn ký tự
          const rects = range.getBoundingClientRect();

          setBtnPosition({
            top: rects.bottom - pRef.current.getBoundingClientRect().top,
            left: rects.right - pRef.current.getBoundingClientRect().left + 8,
          });
        }
      }
    }
  }, [docs]);

  return (
    <div className="w-full relative">
      <div
        className={`transition-all ${
          showMore ? "max-h-none" : "overflow-hidden"
        }`}
        style={{ maxHeight: showMore ? "none" : MAX_HEIGHT }}
      >
        <p
          ref={pRef}
          className="text-small tracking-[0.016rem] text-black_main font-light lg:font-normal text-justify transition-all duration-300 whitespace-pre-wrap"
        >
          {removeEmptyLines(docs)}
        </p>
      </div>

      {isOverflow && !showMore && (
        <button
          ref={btnRef}
          onClick={() => setShowMore(true)}
          className=" text-blue_main_sub hover:underline flex items-center gap-x-2 text-small"
          style={{ top: btnPosition.top, left: btnPosition.left }}
        >
          Xem thêm <MoveDiagonal className="size-4" />
        </button>
      )}

      {showMore && (
        <button
          onClick={() => setShowMore(false)}
          className="text-blue_main_sub hover:underline flex items-center gap-x-2 text-small mt-2"
        >
          Thu gọn <Minimize2 className="size-4" />
        </button>
      )}
    </div>
  );
};

export default DisplayDocs;
