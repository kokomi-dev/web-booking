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
import { AttractionData } from "@/utils/types";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Loading from "@/app/loading";
import { formatPrice } from "@/components/components/item-component";

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
  const checkStatusBtn = (status: number, index: number) => {
    if (status === 1) {
      return (
        <Button className="bg-bg_primary_blue_sub text-white p-2 cursor-default">
          Đã thanh toán
        </Button>
      );
    } else if (status === 2) {
      return (
        <div className="flex flex-col gap-y-2 w-fit">
          <Button className="w-[70px] bg-bg_primary_yellow text-white p-2">
            Hết hạn
          </Button>
          <Button className="w-[70px] bg-bg_primary_green text-white p-2 ">
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
        Địa điểm tham quan đã đặt chỗ
      </h3>
      <div className="w-full h-full overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-12 sm:w-16">STT</TableHead>
              <TableHead className="w-[100px] ">Ảnh</TableHead>
              <TableHead className="min-w-[120px] sm:min-w-[200px]">
                Tên
              </TableHead>
              <TableHead className="text-right min-w-[100px] sm:w-32">
                Giá-VNĐ
              </TableHead>
              <TableHead className="text-right min-w-[120px] sm:w-40">
                Ngày đặt
              </TableHead>
              <TableHead className="text-right min-w-[100px] sm:w-32">
                Trạng thái
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {user &&
            user.bookedAttractions &&
            user.bookedAttractions.length > 0 ? (
              data?.map((item, index) => (
                <TableRow key={index}>
                  {/* STT */}
                  <TableCell className="text-center">{index + 1}</TableCell>
                  {/* Ảnh */}
                  <TableCell className="flex justify-center">
                    <Image
                      src={item.images[0]}
                      alt="attraction booked"
                      width={64}
                      height={64}
                      className="rounded-8 object-cover w-16 h-16 md:w-20 md:h-20"
                    />
                  </TableCell>
                  {/* Tên */}
                  <TableCell className="text-small sm:text-normal text-blue_main font-semibold">
                    {item.name}
                  </TableCell>
                  {/* Giá */}
                  <TableCell className="text-right text-yellow_main font-medium underline">
                    {formatPrice(user?.bookedAttractions[index].amount)}
                  </TableCell>
                  {/* Ngày đặt */}
                  <TableCell className="text-right text-small sm:text-normal">
                    {format(
                      user?.bookedAttractions[index].bookingDate,
                      "dd/MM/yyyy",
                      { locale: vi }
                    )}
                  </TableCell>
                  {/* Trạng thái */}
                  <TableCell className="text-end  text-small sm:text-normal ">
                    {checkStatusBtn(statuses[index], index) || "Checking..."}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center text-black font-normal"
                >
                  Chưa có điểm tham quan nào được đặt
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default BookedAttractions;
