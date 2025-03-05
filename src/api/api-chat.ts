import axiosClient from "@/configs/axiosClient/axiosClient";

const sendMessages = (messages: any) => {
  return axiosClient.post("/chat/send-message", messages);
};
export { sendMessages };
