const apiUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;

interface ICreatePayment {
  amount: number;
  userId: string | number | undefined;
  tripId: string;
  category: string;
  img: string;
  unitCode: string;
  numberTicketAdult: number | null | undefined;
  numberTicketChildren: number | null | undefined;
  startDate?: Date;
  hour?: string | undefined | null;
}
const createRequestPayment = async ({
  amount,
  userId,
  tripId,
  category,
  img,
  unitCode,
  numberTicketAdult,
  numberTicketChildren,
  hour,
  startDate,
}: ICreatePayment) => {
  try {
    const result = await fetch(apiUrl + "/pay/create-payment-url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        userId,
        tripId,
        category,
        img,
        unitCode,
        numberTicketAdult,
        numberTicketChildren,
        hour,
        startDate,
      }),
    });
    return result.json();
  } catch (error) {
    console.log(error);
  }
};
const checkOrderPayment = async ({ orderId }: { orderId: string }) => {
  try {
    const result = await fetch(apiUrl + "/pay/checkorder-payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderId }),
    });
    return result.json();
  } catch (error) {
    console.log(error);
  }
};
const checkOrderPaymentHotel = async ({ orderId }: { orderId: string }) => {
  try {
    const result = await fetch(apiUrl + "/pay/checkorder-payment-hotel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ orderId }),
    });
    return result.json();
  } catch (error) {
    console.log(error);
  }
};
export { createRequestPayment, checkOrderPayment, checkOrderPaymentHotel };
