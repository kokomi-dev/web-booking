"use client";

import { DisplayDoc } from "@/types/component-types";
import { removeEmptyLines } from "@/utils/constants";
import { Minimize2, MoveDiagonal } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const MAX_HEIGHT = 200; // Chiều cao tối đa trước khi cắt

const DisplayDocs: React.FC<DisplayDoc> = ({ docs }) => {
  const pRef = useRef<HTMLParagraphElement>(null);
  const [isOverflow, setIsOverflow] = useState(false);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    if (pRef.current) {
      const isTextOverflowing = pRef.current.scrollHeight > MAX_HEIGHT;
      setIsOverflow(isTextOverflowing);
    }
  }, [docs]);

  return (
    <div className="w-full relative">
      {/* Nội dung văn bản */}
      <div
        className={`transition-all ${
          showMore ? "max-h-none" : "overflow-hidden"
        }`}
        style={{ maxHeight: showMore ? "none" : MAX_HEIGHT }}
      >
        <p
          ref={pRef}
          className="text-sm text-black_sub text-justify transition-all duration-300 whitespace-pre-wrap leading-relaxed"
        >
          {removeEmptyLines(docs)}
        </p>
      </div>

      {/* Nút "Xem thêm" */}
      {isOverflow && !showMore && (
        <button
          onClick={() => setShowMore(true)}
          className="mt-2 text-blue_sub hover:underline flex items-center gap-x-2 text-sm"
        >
          Xem thêm <MoveDiagonal className="size-4" />
        </button>
      )}

      {/* Nút "Thu gọn" */}
      {showMore && (
        <button
          onClick={() => setShowMore(false)}
          className="mt-2 text-blue_sub hover:underline flex items-center gap-x-2 text-sm"
        >
          Thu gọn <Minimize2 className="size-4" />
        </button>
      )}
    </div>
  );
};

export default DisplayDocs;
