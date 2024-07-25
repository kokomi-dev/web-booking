const apiUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;
const getAllHotel = async () => {
  const data = await fetch(`${apiUrl}/hotel`);
  const response = await data.json();
  return response;
};

export { getAllHotel };
