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
type TourData = {
  // Định nghĩa các thuộc tính mà API trả về, ví dụ:
  id: number;
  name: string;
  address: string;
  // ... các thuộc tính khác
};

type SearchResult = {
  data: TourData[];
};
const searchResult = async ({
  searchParam,
}: {
  searchParam: string;
}): Promise<SearchResult> => {
  const data = await fetch(
    `${apiUrl}/tour/searchresult?address=${searchParam}`
  );
  const response = await data.json();
  return response;
};
export { getAllTour, getTourTrending, getDetailTour, searchResult };
