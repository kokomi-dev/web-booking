"use client";
import React, { useEffect, useState } from "react";

import { useAuthenticatedStore } from "@/store/authencation-store";

import { getAttractionBooked } from "@/api/api-attractions";
import { checkOrderPayment } from "@/api/api-payment";
import { AttractionData } from "@/utils/types";
import Loading from "@/app/loading";
import { Accordion } from "@/components/ui/accordion";
import ItemBooked from "./item-booked";

const BookedAttractions = () => {
  const { user } = useAuthenticatedStore();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AttractionData[]>([]);
  const [statuses, setStatuses] = useState<number[]>([]);

  let arr: string[] = [];
  let arrOrderId: string[] = [];

  useEffect(() => {
    if (!user || !user.bookedAttractions) {
      return;
    } else {
      if (user.bookedAttractions.length < 1) {
        arr = [];
        arrOrderId = [];
      } else {
      }
      user.bookedAttractions.forEach((item) => {
        arr.push(item.tripId);
        arrOrderId.push(item.orderId);
      });
    }

    const fetchBookings = async () => {
      setLoading(true);
      try {
        const result = await getAttractionBooked({ arr });
        setData(result);
        await fetchOrderStatuses(arrOrderId);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchOrderStatuses = async (orderIds: string[]) => {
      const statusArray = [];
      for (const orderId of orderIds) {
        try {
          const result = await checkOrderPayment({ orderId });
          statusArray.push(result.result.return_code);
        } catch (error) {}
      }
      setStatuses(statusArray);
    };
    fetchBookings();
  }, [user]);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="w-full h-full py-4">
      <h3 className="text-normal+ font-medium text-black">
        Địa điểm tham quan đã đặt chỗ
      </h3>
      <div className="w-full h-full overflow-x-auto">
        <Accordion type="single" collapsible className="w-full">
          {user &&
          user.bookedAttractions &&
          user.bookedAttractions.length > 0 ? (
            data.map((item, i) => {
              return (
                <ItemBooked
                  index={i}
                  booked={user.bookedAttractions}
                  key={i}
                  data={item}
                  status={statuses}
                />
              );
            })
          ) : (
            <span className="text-small">
              Chưa có địa điểm tham quan nào được đặt
            </span>
          )}
        </Accordion>
      </div>
    </div>
  );
};

export default BookedAttractions;
