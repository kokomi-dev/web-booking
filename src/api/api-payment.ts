const apiUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;

interface ICreatePayment {
  amount: number;
  infoUser: {
    idUser: string | number | undefined;
    email: string | undefined;
    name: string | undefined;
  };
  tripId: string;
  category: string;
  img: string;
  unitCode: string;
  numberTicketAdult?: number | null | undefined;
  numberTicketChildren?: number | null | undefined;
  startDate?: Date;
  hour?: string | undefined | null;
  numberRoom?: any;
  dateFrom?: any;
  dateTo?: any;
  infoAttraction?: {
    name: string;
    address: string;
  };
  infoHotel?: {
    name: string;
    address: string;
  };
  infoHotelRoom?: [
    {
      id: string;
      name: string;
    }
  ];
  pickUpPoint?: string;
  expectedTime?: string;
  note?: string;
}
const createRequestPayment = async ({
  amount,
  infoUser,
  tripId,
  category,
  img,
  unitCode,
  numberTicketAdult,
  numberTicketChildren,
  hour,
  startDate,
  numberRoom,
  dateFrom,
  dateTo,
  infoAttraction,
  infoHotel,
  infoHotelRoom,
  pickUpPoint,
  note,
  expectedTime,
}: ICreatePayment) => {
  try {
    const result = await fetch(apiUrl + "/pay/create-payment-url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        infoUser,
        tripId,
        category,
        img,
        unitCode,
        numberTicketAdult,
        numberTicketChildren,
        hour,
        startDate,
        numberRoom,
        dateFrom,
        dateTo,
        infoAttraction,
        infoHotelRoom,
        infoHotel,
        pickUpPoint,
        note,
        expectedTime,
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
