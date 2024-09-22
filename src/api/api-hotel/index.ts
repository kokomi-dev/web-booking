export const apiUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;

export async function generateStaticParams() {
  const listHotels = await fetch(`${apiUrl}/hotel`).then((res) => res.json());
  return listHotels.map((hotel: any) => ({
    slug: hotel.slug,
  }));
}
const getAllHotel = async () => {
  const data = await fetch(`${apiUrl}/hotel`);
  const response = await data.json();
  return response;
};
const getDetailHotel = async ({ slug }: { slug: string }) => {
  const data = await fetch(`${apiUrl}/hotel/${slug}`);
  const response = await data.json();
  return response.data;
};
export { getAllHotel, getDetailHotel };
