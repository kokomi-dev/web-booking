const apiUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;

const createRequestPayment = async () => {
  const bodyData = new URLSearchParams({
    amount: "100000", // giá trị amount cần thiết
    bankCode: "NCB", // mã ngân hàng (ví dụ)
    orderDescription: "Payment for order #123", // miêu tả đơn hàng
    orderType: "billpayment", // loại đơn hàng
    language: "vn", // ngôn ngữ (mặc định là "vn")
  });

  const result = await fetch(apiUrl + "/pay/create-payment-url", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: bodyData.toString(),
  });
  const data = await result.json();
  console.log(data);
};

export { createRequestPayment };
