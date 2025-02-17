"use client";

import { DisplayDoc } from "@/types/component-types";
import { removeEmptyLines } from "@/utils/constants";
import { Minimize2, MoveDiagonal } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const DisplayDocs: React.FC<DisplayDoc> = ({ docs }) => {
  const pRef = useRef<HTMLParagraphElement>(null);
  const [isOverflow, setIsOverflow] = useState(false);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    if (pRef.current) {
      setIsOverflow(pRef.current.scrollHeight > 200);
    }
  }, [docs]);
  return (
    <div className="w-full">
      <div
        className={`relative overflow-hidden transition-all ${
          showMore ? "max-h-none" : "max-h-[200px]"
        }`}
      >
        <p
          ref={pRef}
          className="text-small tracking-[0.016rem] text-black_main font-light lg:font-normal text-justify transition-all duration-300 whitespace-pre-wrap"
        >
          {removeEmptyLines(docs)}
        </p>
        {isOverflow && (
          <button
            onClick={() => setShowMore((prev) => !prev)}
            className=" hover:underline w-[100px] h-[40px]  !text-small text-blue_main_sub flex items-center justify-start gap-x-2 "
          >
            {showMore ? "Thu gọn" : "Xem thêm"}
            {showMore ? (
              <Minimize2 className="size-4" />
            ) : (
              <MoveDiagonal className="size-4" />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default DisplayDocs;
