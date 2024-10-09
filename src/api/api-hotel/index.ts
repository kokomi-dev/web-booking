import { HotelData } from "@/constants";

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
  const data = await fetch(`${apiUrl}/hotel/${slug}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await data.json();
  return response.data;
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
      throw new Error("Failed to fetch tour booked");
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching tour booked:", error);
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
