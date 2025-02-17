import axiosClient from "@/configs/axiosClient/axiosClient";

const sendReqBooked = (data: any) => {
  return axiosClient.post("/booking/create", data);
};
export { sendReqBooked };
