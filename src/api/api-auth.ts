const apiUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;

interface reqRegisterProp {
  firstname: string;
  lastname: string;
  email: string;
  numberPhone: string;
  password: string;
}
interface reqLoginProp {
  email: string;
  password: string;
}

const reqRegiter = async (data: reqRegisterProp) => {
  try {
    const response = await fetch(apiUrl + "/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

const reqLogin = async (data: reqLoginProp) => {
  try {
    const response = await fetch(apiUrl + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
const reqCurrentUser = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(apiUrl + "/auth/get-current-user", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Lỗi HTTP! status: ${response.status}`);
    }

    // Chuyển đổi phản hồi thành JSON
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Lỗi khi lấy thông tin người dùng hiện tại:", error);
  }
};

export { reqRegiter, reqLogin, reqCurrentUser };
