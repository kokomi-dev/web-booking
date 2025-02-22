import axiosClient from "@/configs/axiosClient/axiosClient";

const sendReqBooked = (data: any) => {
  return axiosClient.post("/booking/create", data);
};
const getInfoBooked = ({ id, category }: { id: string; category: string }) => {
  return axiosClient.get("/booking/get-info/" + id + "?category=" + category);
};
export { sendReqBooked, getInfoBooked };
