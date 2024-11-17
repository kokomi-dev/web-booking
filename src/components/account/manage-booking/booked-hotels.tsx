"use client";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import Link from "next/link";

import { useAuthenticatedStore } from "@/store/authencation-store";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAttractionBooked } from "@/api/api-attractions";
import { checkOrderPayment } from "@/api/api-payment";
import { HotelData } from "@/utils/constants";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Loading from "@/app/loading";
import { formatPrice } from "@/components/components/item-component";
import { getHotelBooked } from "@/api/api-hotels";

const BookedAttractions = () => {
  const { user } = useAuthenticatedStore();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<HotelData[]>([]);
  const [statuses, setStatuses] = useState<number[]>([]);

  let arr: string[] = [];
  let arrOrderId: string[] = [];

  useEffect(() => {
    if (!user || !user.bookedHotels) {
      return;
    }
    const fetchBookedList = async () => {
      if (user.bookedHotels.length < 1) {
        arr = [];
        arrOrderId = [];
      } else {
        await user.bookedHotels.forEach((item) => {
          arr.push(item.tripId);
          arrOrderId.push(item.orderId);
        });
      }
    };
    fetchBookedList();
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const result = await getHotelBooked({ arr });
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
  const checkStatusBtn = (status: number, index: number) => {
    if (status === 1) {
      return (
        <Button className="bg-bg_primary_blue_sub text-white p-2 cursor-default">
          Đã thanh toán
        </Button>
      );
    } else if (status === 2) {
      return (
        <div className="">
          <Button className="bg-bg_primary_yellow text-white p-2">
            Hết hạn thanh toán
          </Button>
          <Button className="bg-bg_primary_green text-white p-2 ml-2">
            <Link href={`/attractions/${data[index].slug}`}>Đặt lại</Link>
          </Button>
        </div>
      );
    } else {
      return (
        <Button className="bg-bg_primary_blue_sub2 text-black p-2">
          Chưa thanh toán
        </Button>
      );
    }
  };
  if (loading) {
    return <Loading />;
  }
  console.log(data);
  return (
    <div className="w-full h-full py-4">
      <h3 className="text-medium font-semibold text-black">
        Nơi lưu trú đã đặt chỗ
      </h3>
      {user && user.bookedHotels && user.bookedHotels.length > 0 ? (
        <section className="w-full h-full grid gap-y-4">
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>STT</TableHead>
                  <TableHead>Ảnh</TableHead>
                  <TableHead>Tên</TableHead>
                  <TableHead className="text-right">Giá-VNĐ</TableHead>
                  <TableHead className="text-right">Ngày đặt</TableHead>
                  <TableHead className="text-right">Trạng thái</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Image
                        src={item.images[0]}
                        alt="attraction booked"
                        width={300}
                        height={300}
                        className="size-16 rounded-8"
                      />
                    </TableCell>
                    <TableCell className="text-small text-blue_main font-semibold">
                      {item.name}
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="text-yellow_main font-medium underline">
                        {formatPrice(user.bookedHotels[index].amount)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      {format(
                        user.bookedHotels[index].bookingDate,
                        "dd/MM/yyyy",
                        {
                          locale: vi,
                        }
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {checkStatusBtn(statuses[index], index) || "Checking..."}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>
      ) : (
        <TableRow className="text-black font-normal">
          Chưa có nơi lưu trú nào được đặt
        </TableRow>
      )}
    </div>
  );
};

export default BookedAttractions;
