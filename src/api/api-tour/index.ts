import { TourData } from "@/constants";

export const apiUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;
const getAllTour = async () => {
  const data = await fetch(`${apiUrl}/tour`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await data.json();
  return response;
};
const getTourTrending = async () => {
  const data = await fetch(`${apiUrl}/tour?trending=true`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await data.json();
  return response;
};
const getDetailTour = async ({ slug }: { slug: string }) => {
  try {
    const response = await fetch(`${apiUrl}/tour/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response) {
      throw new Error("Failed to fetch tour details");
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching tour details:", error);
    throw new Error("Error fetching tour details");
  }
};

const getTourBooked = async ({ arr }: { arr: string[] | null }) => {
  try {
    const response = await fetch(`${apiUrl}/tour/getTourBooked`, {
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

export type SearchResult = {
  data: TourData[];
};
const searchResult = async ({
  searchParam,
}: {
  searchParam: string | any;
}): Promise<SearchResult> => {
  const data = await fetch(
    `${apiUrl}/tour/searchresult?address=${searchParam}`,
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
const getListProvinces = async () => {
  try {
    const data = await fetch("https://esgoo.net/api-tinhthanh/1/0.htm");
    return data.json();
  } catch (error) {
    console.log(error);
  }
};
export {
  getAllTour,
  getTourTrending,
  getDetailTour,
  getTourBooked,
  searchResult,
  getListProvinces,
};
