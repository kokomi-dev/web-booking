const apiUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;
import axiosClient from "@/configs/axiosClient/axiosClient";
import { reqLoginProp, reqRegisterProp, reqUpdateProp } from "@/types/auth";

const reqRegiter = async (data: reqRegisterProp) => {
  return axiosClient.post("/auth/register", data);
};

const reqLogin = async (data: reqLoginProp) => {
  return axiosClient.post("/auth/login", data);
};
const reqCurrentUser = async (userId: string) => {
  return axiosClient.post("/auth/get-current-user", { userId });
};
const reqUpdateUser = async (id: string | number, data: reqUpdateProp) => {
  try {
    const response = await fetch(apiUrl + "/auth/update/" + id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data, id }),
    });

    return await response.json();
  } catch (error) {
    return error;
  }
};
const reqLogout = async () => {
  try {
    const response = await fetch(apiUrl + "/auth/logout");
    return await response.json();
  } catch (error) {
    return error;
  }
};

export { reqRegiter, reqLogin, reqCurrentUser, reqUpdateUser, reqLogout };
