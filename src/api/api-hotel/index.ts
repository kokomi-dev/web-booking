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

// type
export type SearchResult = {
  data: HotelData[];
};
// type

export { getAllHotel, getDetailHotel, searchResultHotel, getHotelOutStanding };
