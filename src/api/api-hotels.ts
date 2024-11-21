import { HotelData } from "@/utils/types";

export const apiUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;

export async function generateStaticParams() {
  const listHotels = await fetch(`${apiUrl}/hotel`).then((res) => res.json());
  return listHotels.map((hotel: any) => ({
    slug: hotel.slug,
  }));
}

const getAllHotel = async () => {
  const data = await fetch(`${apiUrl}/hotel`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await data.json();
  return response;
};
const getDetailHotel = async ({ slug }: { slug: string }) => {
  try {
    const data = await fetch(`${apiUrl}/hotel/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!data.ok) {
      if (data.status === 404) {
        throw new Error("Không tìm thấy chỗ nghỉ");
      }
      throw new Error("Lỗi khi lấy chỗ nghỉ");
    }
    const response = await data.json();
    if (!response || !response.data) {
      throw new Error("Dữ liệu lỗi");
    }
    return response.data;
  } catch (error: any) {
    console.error("Xảy ra lỗi khi lấy dữ liệu ", error.message);
  }
};
const getHotelOutStanding = async () => {
  const data = await fetch(`${apiUrl}/hotel?fillter=outstanding`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await data.json();
  return response;
};
const searchResultHotel = async ({
  searchParam,
}: {
  searchParam: string | any;
}): Promise<SearchResult> => {
  const data = await fetch(
    `${apiUrl}/hotel/searchresult?address=${searchParam}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const response = await data.json();
  return response;
};
const getHotelBooked = async ({ arr }: { arr: string[] | null }) => {
  try {
    const response = await fetch(`${apiUrl}/hotel/getHotelBooked`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        arr,
      }),
    });
    if (!response) {
      throw new Error("Failed to fetch hotel booked");
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching hotel booked:", error);
  }
};
// type
export type SearchResult = {
  data: HotelData[];
};
// type

export {
  getAllHotel,
  getDetailHotel,
  searchResultHotel,
  getHotelOutStanding,
  getHotelBooked,
};
