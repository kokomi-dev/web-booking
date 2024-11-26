"use client";

import { DisplayDoc } from "@/utils/types/component-types";
import React, { useRef, useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Minimize2, MoveDiagonal } from "lucide-react";
import { removeEmptyLines } from "@/utils/constants";

const DisplayDocs: React.FC<DisplayDoc> = ({ docs }) => {
  const pRef = useRef<HTMLParagraphElement>(null);
  const [isOverflow, setIsOverflow] = useState(false);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    if (pRef.current) {
      setIsOverflow(pRef.current.scrollHeight > 290);
    }
  }, [docs]);

  return (
    <div className="w-full">
      <div
        className={`relative overflow-hidden ${
          showMore ? "max-h-none" : "max-h-[290px]"
        }`}
      >
        <p
          ref={pRef}
          className="text-normal text-justify transition-all duration-300 whitespace-pre-wrap"
        >
          {removeEmptyLines(docs)}
        </p>
      </div>
      {isOverflow && (
        <Button
          variant="ghost"
          onClick={() => setShowMore((prev) => !prev)}
          className=" mb-2  hover:underline !text-small text-blue_main_sub flex items-center justify-start gap-x-2 "
        >
          {showMore ? "Thu gọn" : "Xem thêm"}
          {showMore ? (
            <Minimize2 className="size-4" />
          ) : (
            <MoveDiagonal className="size-4" />
          )}
        </Button>
      )}
    </div>
  );
};

export default DisplayDocs;
