"use client";

import Image from "next/image";
import React, { useState } from "react";
import ShowImages from "./show-images";

const ImagesDetail = ({ data }: { data: any }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="grid grid-cols-2 gap-2 rounded-8 overflow-hidden">
      <div className="col-span-1">
        <Image
          width={500}
          height={600}
          src={data.images[0]}
          className="object-cover w-full h-full cursor-pointer img"
          alt={`Ảnh chính của tour du lịch ${data.name}`}
          onClick={() => {
            setOpen(true);
          }}
        />
      </div>
      <div className="grid grid-cols-2 grid-rows-2 gap-2 col-span-1">
        {data.images.slice(1, 5).map((img: string, index: number) => (
          <Image
            key={index + 1}
            width={250}
            height={300}
            src={img}
            className="object-cover w-full h-full img cursor-pointer"
            onClick={() => {
              setOpen(true);
            }}
            alt={`Ảnh giới thiệu về tour du lịch ${data.name}`}
          />
        ))}
      </div>
      <ShowImages open={open} data={data} setOpen={setOpen} />
    </div>
  );
};

export default ImagesDetail;
