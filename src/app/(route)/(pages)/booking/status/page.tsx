"use client";
import { getInfoBooked } from "@/api/api-booking";
import Loading from "@/app/loading";
import { Button } from "@/components/ui/button";
import QUERY_KEY_BOOKING from "@/services/queryKeyStore/bookingQueyKeyStore";
import { IHotelRoom } from "@/types/hotel.type";
import { useQuery } from "@tanstack/react-query";
import {
  Calendar,
  CheckCircle,
  Mail,
  MapPin,
  Ticket,
  User,
  XCircle,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Fragment } from "react";

const BookingSuccess = () => {
  const router = useRouter();
  const params = useSearchParams();
  const { apptransid, category, status } = Object.fromEntries(params.entries());
  const { data: dataBooked, isLoading } = useQuery({
    queryKey: [QUERY_KEY_BOOKING.GET_INFO_BOOKED],
    queryFn: async () => {
      const res = await getInfoBooked({ id: apptransid, category });
      return res?.status === 200 ? res.data.data : {};
    },
    enabled: !!category && !!apptransid,
    retry: 3,
    retryDelay: 1000,
  });
  if (isLoading) {
    return <Loading />;
  }
  const checkCategory = category === "attraction" ? true : false;
  return (
    <Fragment>
      {Number(status) == 1 ? (
        <div className="posing-vertical-2 flex items-center flex-col min-h-screen text-center p-6 bg-bg_primary_white rounded-14">
          <CheckCircle className="text-green-600 w-20 h-20 mb-4" />
          <h1 className="text-3xl font-bold text-green-700">
            {checkCategory
              ? "Đặt vé tham quan thành công!"
              : "Đặt nơi lưu trú thành công !"}
          </h1>
          <p className="text-gray-700 mt-2">
            Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.
          </p>
          <p className="text-black mt-2">
            Chúng tôi sẽ gửi phản hồi một lần nữa vào email của bạn, vui lòng
            chú ý theo dõi!
          </p>

          {/* Card thông tin đặt vé */}
          <div className="w-full mt-6 bg-white shadow-lg rounded-lg p-6 ">
            <h2 className="text-xl font-semibold mb-4 text-blue_main_sub">
              Thông tin đơn đặt
            </h2>
            <div className="space-y-2 text-left text-black_main">
              <p className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 flex-shrink-0 text-black_sub" />{" "}
                <b>Ngày đặt:</b>{" "}
                {new Date(dataBooked?.bookedDate).toLocaleString("vi-VN")}
              </p>
              {category === "attraction" && (
                <p className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 flex-shrink-0 text-black_sub" />{" "}
                  <b>Ngày khởi hành:</b>{" "}
                  {new Date(dataBooked?.dateStart).toLocaleDateString("vi-VN")}
                </p>
              )}
              {checkCategory ? (
                <p className="flex items-center">
                  <Ticket className="w-5 h-5 mr-2 flex-shrink-0 text-black_sub" />{" "}
                  <b>Vé:</b> {dataBooked?.numberOfTicketsBooked.adult} người
                  lớn, {dataBooked?.numberOfTicketsBooked.children} trẻ em
                </p>
              ) : (
                <p className="flex items-center">
                  <Ticket className="w-5 h-5 mr-2 flex-shrink-0 text-black_sub" />{" "}
                  <b>Số lượng người:</b>{" "}
                  {dataBooked?.numberOfTicketsBooked.adult} người lớn,{" "}
                  {dataBooked?.numberOfTicketsBooked.children} trẻ em
                </p>
              )}
              <p className="flex items-center text-blue_main_sub">
                <b>Tổng tiền:</b> {dataBooked?.totalBooked.toLocaleString()} VND
              </p>
              <p className="flex items-center">
                <b>Phương thức thanh toán:</b> {dataBooked?.paymentMethod}
              </p>
            </div>
          </div>

          {/* Card thông tin người đặt */}
          <div className="w-full flex flex-col posing-vertical-3 lg:space-y-0 lg:space-x-4 lg:flex-row items-stretch lg:justify-between ">
            <div className="h-full bg-white shadow-lg rounded-lg p-6 w-full flex-grow ">
              <h2 className="text-xl font-semibold mb-4 text-blue_main_sub">
                Thông tin khách hàng
              </h2>
              <p className="flex items-center">
                <User className="w-5 h-5 mr-2 flex-shrink-0 text-black_sub" />{" "}
                <b>Mã đơn:</b> {dataBooked?._id}
              </p>
              <p className="flex items-center text-blue_main_sub">
                <Mail className="w-5 h-5 mr-2 flex-shrink-0 text-black_sub" />{" "}
                <b>Email:</b> {dataBooked?.infoUser?.email}
              </p>
            </div>
            {/* Card thông tin tour */}
            {checkCategory ? (
              <div className="h-full bg-white shadow-lg rounded-lg p-6 w-full flex-grow ">
                <h2 className="text-xl font-semibold mb-4 text-blue_main_sub">
                  Thông tin tour
                </h2>
                <p className="flex items-center">
                  <b>Tên tour:</b> {dataBooked?.infoAttraction?.name}
                </p>
                <p className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 flex-shrink-0 text-black_sub" />{" "}
                  <b>Địa điểm:</b> {dataBooked?.infoAttraction?.address}
                </p>
              </div>
            ) : (
              <div className="h-full bg-white shadow-lg rounded-lg p-6 w-full flex-row ">
                <h2 className="text-xl font-semibold mb-4 text-blue_main_sub">
                  Thông tin lưu trú
                </h2>
                <p className="flex items-center">
                  <b>Tên nơi lưu trú: </b> {dataBooked?.infoHotel?.name}
                </p>
                <p className="flex items-center">
                  <b>Địa điểm: </b> {dataBooked?.infoHotel?.address}
                </p>
                {dataBooked.infoHotelRoom.map(
                  (room: IHotelRoom, index: number) => {
                    return (
                      <div key={index}>
                        <p className="flex items-center">
                          <b>Tên phòng: </b> {room.name}
                        </p>
                        <p className="flex items-center">
                          <b>Số phòng đã đặt: </b> {room.numberBooked}
                        </p>
                      </div>
                    );
                  }
                )}
              </div>
            )}
          </div>
          {/* Nút điều hướng */}
          <Button
            className="bg-bg_primary_main text-white hover:bg-bg_primary_active w-full text-center max-w-lg"
            onClick={() => router.push("/")}
          >
            Quay lại Trang Chủ
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen bg-bg_primary_white rounded-14 text-center p-6 posing-vertical-3">
          <XCircle className="text-red-600 w-20 h-20 " />
          <h1 className="text-large font-bold text-red-600">
            Đặt thất bại | Hoặc xảy ra lỗi giao dịch thanh toán trực tuyến
          </h1>
          <p className="text-black_main mt-2">
            Có lỗi xảy ra khi xử lý đơn của bạn.
          </p>
          <p>
            Liên hệ với quản trị viên của chúng tôi để giải quyết vấn đề của bạn
            ngay lập tức. Chúng tôi đảm bảo về quyền lợi của bạn
          </p>
          <div className="flex flex-col lg:flex-row lg:space-x-3 space-y-2 lg:space-y-0">
            <a href="mailTo:nguyenthean12062002@gmail.com">
              <strong>Email: </strong>nguyenthean12062002@gmail.com
            </a>
            <a href="tel:09723457444">
              <strong>Hotline: </strong>0972345744
            </a>
          </div>
          <Button
            className="bg-bg_primary_main text-white hover:bg-bg_primary_active "
            onClick={() => router.push("/")}
          >
            Quay lại Trang Chủ
          </Button>
        </div>
      )}
    </Fragment>
  );
};

export default BookingSuccess;
