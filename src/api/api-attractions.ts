import { AttractionData } from "@/utils/types";

export const apiUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;
const getAllAttraction = async () => {
  const data = await fetch(`${apiUrl}/attraction`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await data.json();
  return response;
};
const getAttractionTrending = async () => {
  const data = await fetch(`${apiUrl}/attraction?trending=true`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await data.json();
  return response;
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
        throw new Error("Không tìm thấy địa điểm tham quan");
      }
      throw new Error("Lỗi khi lấy chi tiết địa điểm tham quan");
    }
    const result = await response.json();
    if (!result || !result.data) {
      throw new Error("Dữ liệu không hợp lệ");
    }
    return result.data;
  } catch (error: any) {
    console.error("Error fetching attractions details:", error.message);
  }
};
const getAttractionBooked = async ({ arr }: { arr: string[] | null }) => {
  try {
    const response = await fetch(`${apiUrl}/attraction/getTourBooked`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        arr,
      }),
    });
    if (!response) {
      throw new Error("Failed to fetch attractions booked");
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching attractions booked:", error);
  }
};

export type SearchResult = {
  data: AttractionData[];
};
const searchResult = async ({
  searchParam,
}: {
  searchParam: string | any;
}): Promise<SearchResult> => {
  const data = await fetch(
    `${apiUrl}/attraction/searchresult?address=${searchParam}`,
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
  searchResult,
  getListProvinces,
};
