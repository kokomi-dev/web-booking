import React from "react";
import { Metadata } from "next";

import BookingAttraction from "./page-view";
import { PropsGenerateMetaData } from "@/utils/types";
import { apiUrl } from "@/api/api-attractions";

export async function generateMetadata({
  params,
}: PropsGenerateMetaData): Promise<Metadata> {
  const slug = (await params).slug;
  try {
    const attraciton = await fetch(`${apiUrl}/attraction/${slug}`);
    const data = await attraciton.json();
    if (data.data) {
      return {
        title: "Đặt vé" + " - " + data.data.name,
        description: data.data.description,
      };
    }
    return {};
  } catch (error) {
    throw new Error("Lỗi khi generateMetadata");
  }
}

const page = () => {
  return <BookingAttraction />;
};

export default page;
