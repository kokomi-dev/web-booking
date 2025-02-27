import axiosClient from "@/configs/axiosClient/axiosClient";
import { IHotel } from "@/types/hotel.type";

export const apiUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;
interface IGetFilterHotelProp {
  price?: string;
  rating?: string;
  cancelFree?: string;
  filterBar?: number;
  address?: string;
  isFavorite?: string;
}
export async function generateStaticParams() {
  const listHotels = await fetch(`${apiUrl}/hotel`).then((res) => res.json());
  return listHotels.map((hotel: any) => ({
    slug: hotel.slug,
  }));
}

const getAllHotel = async () => {
  return axiosClient.get("/hotel");
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

const getFilterHotel = ({
  price,
  rating,
  cancelFree,
  filterBar,
  address,
  isFavorite,
}: IGetFilterHotelProp) => {
  return axiosClient.get(
    `/hotel/filter?address=${address}&price=${price}&rating=${rating}&cancelFree=${cancelFree}&filterBar=${filterBar}&isFavorite=${isFavorite}`
  );
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
  data: IHotel[];
};
// type

export { getAllHotel, getDetailHotel, getFilterHotel, getHotelBooked };
