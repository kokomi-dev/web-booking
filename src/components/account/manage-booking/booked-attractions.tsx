"use client";

import { useAuthenticatedStore } from "@/store/authencation-store";

import { getAttractionBooked } from "@/api/api-attractions";
import { formatPrice } from "@/components/components/item-component";
import QUERY_KEY_ATTRACTION from "@/services/queryKeyStore/attractionQueryKeyStore";
import { IBookedItem } from "@/types/attraction.type";
import { checkOverDate, cn, formatDate } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import { Check, UserRound, UsersRound } from "lucide-react";
import { LoadingShowBooked } from "@/components/components/loading";
import { useRouter } from "next/navigation";

const BookedAttractions = () => {
  const { user } = useAuthenticatedStore();

  const { data: listBooked, isLoading } = useQuery({
    queryKey: [QUERY_KEY_ATTRACTION.GET_BOOKED_LIST, user?._id],
    queryFn: async () => {
      try {
        const res = await getAttractionBooked(user?._id);
        if (res?.status === 200) {
          return res.data.data;
        } else return [];
      } catch (error) {}
    },
    retry: 3,
    retryDelay: 1000,
    enabled: !!user && !!user._id,
  });
  const router = useRouter();
  return (
    <div className="w-full h-full py-4 section-spacing">
      <h3 className="text-lg font-semibold text-black">
        Địa điểm tham quan đã đặt
      </h3>
      <div className=" grid gap-y-4 md:gap-y-5 lg:gap-y-6 gap-x-3 md:grid-cols-2">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => <LoadingShowBooked key={i} />)
        ) : listBooked.length === 0 ? (
          <div className="flex flex-col items-start justify-start gap-y-2 lg:flex-row lg:items-center lg:justify-between">
            <p>Chưa có địa điểm tham quan nào được đặt</p>
            <span
              onClick={() => {
                router.push("/attractions");
              }}
              className="text-blue_sub underline"
            >
              Xem thêm
            </span>
          </div>
        ) : (
          listBooked.map((booking: IBookedItem, index: number) => {
            const isWentSuccess = checkOverDate(booking.dateStart);
            return (
              <div
                key={index}
                className={cn(
                  "bg-white rounded-2xl shadow-lg p-3 md:p-4 lg:p-6 list-spacing border border-gray-200 relative",
                  !isWentSuccess ? "border-green" : "border-yellow"
                )}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div className="text-left space-y-1">
                    <h2 className="text-lg font-bold text-black">
                      {booking.infoAttraction.name}
                    </h2>
                    <p className="text-sm text-black_sub">
                      {booking.infoAttraction.address}
                    </p>
                  </div>
                  <div className="text-sm text-black_sub">
                    <span className="font-medium">Ngày đặt vé:</span>{" "}
                    {formatDate(booking.bookedDate)}
                  </div>
                </div>

                <div className="flex flex-col items-start justify-start gap-y-2 lg:gap-y-0 lg:gap-x-2 lg:flex-row lg:items-center lg:justify-between">
                  {/* Ngày khởi hành và vé */}
                  <div className="space-y-2">
                    <p className="text-base font-semibold text-blue_sub">
                      Ngày khởi hành: {formatDate(booking.dateStart)}
                    </p>
                    <div className="text-sm text-black_sub list-spacing">
                      <p className="flex items-center justify-start gap-x-1">
                        <UserRound className="size-4" />
                        Vé người lớn:{" "}
                        <strong>{booking.numberOfTicketsBooked.adult}</strong>
                      </p>
                      <p className="flex items-center justify-start gap-x-1">
                        <UsersRound className="size-4" />
                        Vé trẻ em:{" "}
                        <strong>
                          {booking.numberOfTicketsBooked.children}
                        </strong>
                      </p>
                      <div className="text-sm text-black_blur font-medium">
                        Email:{" "}
                        <span className="underline">
                          {booking.infoUser.email}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Giá tiền và trạng thái */}
                  <div className="text-left sm:text-right space-y-1">
                    <p className="text-lg font-bold">
                      Giá tiền:{" "}
                      <span className="text-blue_sub">
                        {formatPrice(booking.totalBooked)}
                      </span>{" "}
                      VND
                    </p>
                    <p className="text-sm">
                      Phương thức thanh toán:{" "}
                      <span className="text-blue_sub font-medium">
                        {booking.paymentMethod}
                      </span>
                    </p>
                    {booking.isSuccess ? (
                      <div className="inline-flex items-center gap-2 bg-green-100 text-green px-3 py-1 rounded-lg text-sm">
                        <Check className="w-4 h-4" />
                        Đã thanh toán
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-3 py-1 rounded-lg text-sm">
                        ❌ Chưa thanh toán
                      </div>
                    )}
                  </div>
                </div>
                <div className="absolute -top-[1.9rem] left-3">
                  <div
                    className={cn(
                      "!text-white rounded-8 p-1 px-2 text-xs",
                      isWentSuccess ? "bg-yellow" : "bg-green_main"
                    )}
                  >
                    {!isWentSuccess ? "Đã xong" : "Sắp diễn ra"}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default BookedAttractions;
