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
import { TourData } from "@/constants";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Loading from "@/app/loading";
import { formatPrice } from "@/components/components/item-component";

const BookedAttractions = () => {
  const { user } = useAuthenticatedStore();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TourData[]>([]);
  const [statuses, setStatuses] = useState<number[]>([]);

  const arr: string[] = [];
  const arrOrderId: string[] = [];

  useEffect(() => {
    if (!user || !user.booked) {
      return;
    }

    user.booked.forEach((item) => {
      if (item.category === "tour") {
        arr.push(item.tripId);
        arrOrderId.push(item.orderId);
      }
    });

    const fetchBookings = async () => {
      setLoading(true);
      try {
        const result = await getAttractionBooked({ arr }); // Chỉ gọi API khi arr có giá trị
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
          statusArray.push(result.result.return_code); // Điều chỉnh theo API response
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

  return (
    <div className="w-full h-full py-4">
      {user && user.booked && user.booked.length > 0 ? (
        <section className="w-full h-full grid gap-y-4">
          <div>
            <h3 className="text-medium font-semibold text-black">
              Địa điểm tham quan đã đặt chỗ
            </h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>STT</TableHead>
                  <TableHead>Ảnh</TableHead>
                  <TableHead>Tên</TableHead>
                  <TableHead className="text-right">Giá</TableHead>
                  <TableHead className="text-right">Ngày đặt</TableHead>
                  <TableHead className="text-right">Trạng thái</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Image
                        src={item.images[0]}
                        alt="Tour"
                        width={300}
                        height={300}
                        className="size-16"
                      />
                    </TableCell>
                    <TableCell className="text-small font-medium">
                      {item.name}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatPrice(user.booked[index].amount)} VNĐ
                    </TableCell>
                    <TableCell className="text-right">
                      {format(user.booked[index].bookingDate, "dd/MM/yyyy", {
                        locale: vi,
                      })}
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
        <TableRow>Chưa có điểm tham quan nào được đặt</TableRow>
      )}
    </div>
  );
};

export default BookedAttractions;
