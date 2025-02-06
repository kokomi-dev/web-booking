import React from "react";
import BookingHotel from "./page-view";
import { PropsGenerateMetaData } from "@/types";
import { Metadata } from "next";
import { apiUrl } from "@/api/api-hotels";

export async function generateMetadata({
  params,
}: PropsGenerateMetaData): Promise<Metadata> {
  const slug = (await params).slug;
  try {
    const attraciton = await fetch(`${apiUrl}/hotel/${slug}`);
    const data = await attraciton.json();
    if (data.data) {
      return {
        title: "Đặt phòng" + " - " + data.data.name,
        description: data.data.description,
      };
    }
    return {};
  } catch (error) {
    throw new Error("Lỗi khi generateMetadata");
  }
}
const page = () => {
  return <BookingHotel />;
};

export default page;
