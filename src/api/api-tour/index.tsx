const apiUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;
const getAllTour = async () => {
  const data = await fetch(`${apiUrl}/tour`);
  const response = await data.json();
  return response;
};
export { getAllTour };
