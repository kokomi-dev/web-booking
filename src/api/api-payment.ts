const apiUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;

interface ICreatePayment {
  amount: number;
}
const createRequestPayment = async ({ amount }: ICreatePayment) => {
  try {
    const result = await fetch(apiUrl + "/pay/create-payment-url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: amount }),
    });
    return result.json();
  } catch (error) {
    console.log(error);
  }
};

export { createRequestPayment };
