const apiUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;
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
  const data = await fetch(`${apiUrl}/tour/${slug}`);
  const response = await data.json();
  return response;
};
export type TourData = {
  id: number;
  name: string;
  address: string;
  slug: string;
  images: [string];
  price: [number];
  location: string;
  description: string;
  ratingsQuantity: number;
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
