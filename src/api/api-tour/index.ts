import { TourData } from "@/constants";

export const apiUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;
const getAllTour = async () => {
  const data = await fetch(`${apiUrl}/tour`);
  const response = await data.json();
  return response;
};
const getTourTrending = async () => {
  const data = await fetch(`${apiUrl}/tour?trending=true`);
  const response = await data.json();
  return response;
};
const getDetailTour = async ({ slug }: { slug: string }) => {
  try {
    const response = await fetch(`${apiUrl}/tour/${slug}`);
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

export type SearchResult = {
  data: TourData[];
};
const searchResult = async ({
  searchParam,
}: {
  searchParam: string | any;
}): Promise<SearchResult> => {
  const data = await fetch(
    `${apiUrl}/tour/searchresult?address=${searchParam}`
  );
  const response = await data.json();
  return response;
};
export { getAllTour, getTourTrending, getDetailTour, searchResult };
