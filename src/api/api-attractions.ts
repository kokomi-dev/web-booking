import axiosClient from "@/configs/axiosClient/axiosClient";
import { SearchResult } from "@/types/attraction.type";

export const apiUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;
interface IGetAllAttractionProp {
  price?: string;
  startDate?: string;
  rating?: string;
  difficulty?: string;
  filterBar?: number;
  address?: string;
}
const getAllAttraction = ({}) => {
  return axiosClient.get(`/attraction`);
};
const getAttractionTrending = async () => {
  return axiosClient.get("/attraction/filter?trending=true");
};
const getDetailAttraction = async ({ slug }: { slug: string }) => {
  try {
    const response = await fetch(`${apiUrl}/attraction/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      if (response.status === 404) {
        console.log("Không tìm thấy địa điểm tham quan");
      }
    }
    const result = await response.json();
    if (!result || !result.data) {
      console.log("Dữ liệu không hợp lệ");
    }
    return result.data;
  } catch (error: any) {
    console.error("Error fetching attractions details:", error.message);
  }
};
const getAttractionBooked = async (id: any) => {
  return axiosClient.get(`/booking/attraction?id=${id}`);
};
const updateStatus = async (data: any) => {
  return axiosClient.put("/attraction/status", data);
};
const getFilterAttractions = ({
  price,
  startDate,
  rating,
  difficulty,
  filterBar,
  address,
}: IGetAllAttractionProp) => {
  return axiosClient.get(
    `/attraction/filter?address=${address}&price=${price}&startDate=${startDate}&rating=${rating}&difficulty=${difficulty}&filterBar=${filterBar}`
  );
};
const getListProvinces = async () => {
  try {
    const listProvinces = await fetch(
      "https://esgoo.net/api-tinhthanh/1/0.htm"
    );
    return listProvinces.json();
  } catch (error) {
    console.log(error);
  }
};

export {
  getAllAttraction,
  getAttractionTrending,
  getDetailAttraction,
  getAttractionBooked,
  getFilterAttractions,
  getListProvinces,
  updateStatus,
};
