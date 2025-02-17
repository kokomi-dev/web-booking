"use client";
import React, { useEffect, useState } from "react";
import { useAuthenticatedStore } from "@/store/authencation-store";

import { checkOrderPayment } from "@/api/api-payment";
import Loading from "@/app/loading";
import { getHotelBooked } from "@/api/api-hotels";
import { Accordion } from "@/components/ui/accordion";
import ItemBooked from "./item-booked";
import { IHotel } from "@/types/hotel.type";

const BookedAttractions = () => {
  const { user } = useAuthenticatedStore();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IHotel[]>([]);
  const [statuses, setStatuses] = useState<number[]>([]);

  let arr: string[] = [];
  let arrOrderId: string[] = [];

  // useEffect(() => {
  //   if (!user || !user.bookedHotels) {
  //     return;
  //   }
  //   const fetchBookedList = async () => {
  //     if (user.bookedHotels.length < 1) {
  //       arr = [];
  //       arrOrderId = [];
  //     } else {
  //       await user.bookedHotels.forEach((item) => {
  //         arr.push(item.tripId);
  //         arrOrderId.push(item.orderId);
  //       });
  //     }
  //   };
  //   fetchBookedList();
  //   const fetchBookings = async () => {
  //     setLoading(true);
  //     try {
  //       const result = await getHotelBooked({ arr });
  //       setData(result);
  //       await fetchOrderStatuses(arrOrderId);
  //     } catch (error) {
  //       console.error("Error fetching bookings:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   const fetchOrderStatuses = async (orderIds: string[]) => {
  //     const statusArray = [];
  //     for (const orderId of orderIds) {
  //       try {
  //         const result = await checkOrderPayment({ orderId });
  //         statusArray.push(result.result.return_code);
  //       } catch (error) {}
  //     }
  //     setStatuses(statusArray);
  //   };
  //   fetchBookings();
  // }, [user]);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="w-full h-full py-4">
      <h3 className="text-normal+ font-medium text-black">
        Nơi lưu trú đã đặt chỗ
      </h3>
      {/* <div className="w-full h-full grid gap-y-4">
        <Accordion type="single" collapsible className="w-full">
          {user && user.bookedHotels && user.bookedHotels.length > 0 ? (
            data.map((item, i) => {
              return (
                <ItemBooked
                  index={i}
                  booked={user.bookedHotels}
                  key={i}
                  data={item}
                  status={statuses}
                />
              );
            })
          ) : (
            <span className="text-small">
              Chưa có địa điểm lưu trú nào được đặt
            </span>
          )}
        </Accordion>
      </div> */}
    </div>
  );
};

export default BookedAttractions;
