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
    if (!response) {
      throw new Error("Failed to fetch attractions details");
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching attractions details:", error);
    throw new Error("Error fetching attractions details");
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
  data: any;
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
