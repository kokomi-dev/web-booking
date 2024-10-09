"use client";
import React, { Fragment, useEffect, useState } from "react";
import { ChevronLeft, Dot } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import Loading from "@/app/loading";
import FormInput from "@/components/components/form-input";
import { formatPrice } from "@/components/components/item-component";
import { Button } from "@/components/ui/button";
import ModalConfirmCode from "@/components/dashboard/modal-code";
import { sendEmailConfirm } from "@/api/api-email";
import { HotelData } from "@/constants";
import { useAuthenticatedStore } from "@/store/authencation-store";
import { getDetailHotel } from "@/api/api-hotel";

const BookingHotel = () => {
  const { slug } = useParams<{
    slug: string;
  }>();
  const { user } = useAuthenticatedStore();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<HotelData | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const hotel = await getDetailHotel({ slug });
        setData(hotel);
      } catch (error) {
        console.error("Failed to fetch hotel details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (slug) {
      fetchData();
    }
  }, [slug]);

  const router = useRouter();
  const [lastName, setLastName] = useState<string>(user?.lastname || "");
  const [firstName, setFirstName] = useState<string>(user?.firstname || "");
  const [numberphone, setNumberphone] = useState<number>(
    user?.numberPhone || 0
  );
  const [email, setEmail] = useState<string>(user?.email || "");
  const [confirm, setConfirm] = useState({
    idEmail: "",
    code: "",
  });

  const [emailError, setEmailError] = useState<string>("");
  const [firstnameError, setFirstnameError] = useState<string>("");
  const [lastnameError, setLastnameError] = useState<string>("");
  const [phoneError, setPhoneError] = useState<string>("");

  const param = useSearchParams();

  const dateFrom = param.get("date-from");
  const dateTo = param.get("date-to");
  const numberAdults = param.get("numberAdults");
  const numberChildren = param.get("numberChildren");
  const numberRoom = param.get("numberRoom");
  const numberRoomDouble = param.get("numberRoomDouble");

  const totalBooking = () => {
    if (data) {
      return formatPrice(
        Number(numberRoom) * data.price[0] +
          Number(numberRoomDouble) * data.price[1]
      );
    }
  };

  const validateEmail = (email: string) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(email)) {
      setEmailError("Email không hợp lệ");
    } else {
      setEmailError("");
    }
  };
  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, type } = event.target;

    if (type === "email") {
      setEmail(value);
      validateEmail(value);
    }
  };

  const handleChangeFirstname = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFirstName(value);
    if (value.length <= 0) {
      setFirstnameError("Vui lòng nhập họ");
    } else {
      setFirstnameError("");
    }
  };

  const handleChangeLastname = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLastName(value);
    if (value.length <= 0) {
      setLastnameError("Vui lòng nhập tên");
    } else {
      setLastnameError("");
    }
  };

  const validatePhoneNumber = (phoneNumber: string) => {
    const regex = /^0[3-9]\d{8}$/;

    if (!regex.test(phoneNumber)) {
      setPhoneError("Vui lòng nhập đúng số điện thoại");
    } else {
      setPhoneError("");
    }
  };
  const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNumberphone(Number(value));
    validatePhoneNumber(value);
  };

  const handleChangeSpecial = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const handleSendEmailConfirm = async () => {
    try {
      const data = await sendEmailConfirm(user ? user.email : email);
      if (data) {
        setConfirm(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Fragment>
      {isLoading ? (
        <Loading />
      ) : data ? (
        <div
          className={cn(
            "w-full h-full  flex flex-col items-start justify-start gap-2"
          )}
        >
          {/* head */}
          <div
            className={cn(
              "w-full flex flex-col items-start justify-start gap-2"
            )}
          >
            <div
              className={cn(
                "w-[30%] flex  items-center justify-start transition-all duration-300 cursor-pointer hover:underline",
                "lg:w-[10%]"
              )}
              onClick={() => router.back()}
            >
              <ChevronLeft className="text-yellow_main" />
              <span className="ml-2 text-small">Loại lưu trú</span>
            </div>
            <div className="text-smallest">
              <span className="text-blue_main_sub">Bước 1/2</span>
            </div>
            <div className={cn("text-medium font-bold", "lg:text-large")}>
              <h1>{data?.name}</h1>
            </div>
            <p className="text-small text-black_sub">
              Được đảm bảo chất lượng về mọi mặt
            </p>
          </div>
          {/* body */}
          <div
            className={cn(
              "w-full flex flex-col-reverse items-center justify-center gap-y-5  ",
              "lg:flex-row lg:justify-between lg:gap-x-10 lg:items-start lg:gap-y-0 lg:h-full "
            )}
          >
            <div
              className={cn(
                "w-[100%] flex flex-col items-start justify-start gap-3 "
              )}
            >
              <h3 className={cn("text-medium font-semibold")}>
                Thông tin của bạn
              </h3>
              <div className="w-full flex flex-col items-start justify-start gap-2">
                <div
                  className={cn(
                    "w-full flex flex-col items-start justify-start gap-2",
                    "lg:flex-row"
                  )}
                >
                  <FormInput
                    type="text"
                    title="Tên"
                    isImportant
                    value={user ? user.lastname : lastName}
                    error={!!lastnameError}
                    errorTitle={lastnameError}
                    disable={user}
                    onChange={handleChangeLastname}
                  />
                  <FormInput
                    type="text"
                    title="Họ"
                    isImportant
                    value={user ? user.firstname : firstName}
                    onChange={handleChangeFirstname}
                    disable={user}
                    error={!!firstnameError}
                    errorTitle={firstnameError}
                  />
                </div>
                <FormInput
                  type="email"
                  title="Địa chỉ email"
                  isImportant
                  value={user ? user.email : email}
                  onChange={handleChangeEmail}
                  error={!!emailError}
                  errorTitle={emailError}
                  disable={user}
                />
                <span className="font-normal text-small text-blue_main_sub">
                  Chúng tôi sẽ gửi thông tin xác nhận tới email của bạn
                </span>
                <FormInput
                  type="number"
                  title="Số điện thoại (ưu tiên số di động)"
                  isImportant
                  value={user ? user.numberPhone : numberphone}
                  error={!!phoneError}
                  errorTitle={phoneError}
                  disable={user}
                  onChange={handleChangePhone}
                />
              </div>
              <h3 className={cn("text-medium font-semibold")}>
                Thông tin thêm
              </h3>
              {/* <h5 className="text-normal">Vui lòng chọn địa điểm đón khách</h5>
              <div className="w-full">
                <div className="flex items-center justify-start my-1">
                  <input
                    className={cn("size-5 mr-2", "lg:size-4")}
                    type="radio"
                    value="0"
                    name="address_choose"
                    id="0"
                  />
                  <label className="cursor-pointer text-[0.95rem]" htmlFor="0">
                    Gặp nhà điều hành tour tại điểm khởi hành
                  </label>
                </div>
                <div className="flex items-center justify-start my-1">
                  <input
                    className={cn("size-5 mr-2", "lg:size-4")}
                    id="1"
                    type="radio"
                    value="1"
                    name="address_choose"
                  />
                  <label className="cursor-pointer text-[0.95rem]" htmlFor="1">
                    Chọn địa điểm
                  </label>
                </div>
                <div className="flex items-center justify-start my-1">
                  <input
                    className={cn("size-5 mr-2", "lg:size-4")}
                    type="radio"
                    value="2"
                    id="2"
                    name="address_choose"
                  />
                  <label className="cursor-pointer text-[0.95rem]" htmlFor="2">
                    Tự liên hệ nhà điều hành tour (bạn sẽ nhận thông tin liên hệ
                    trên voucher của mình)
                  </label>
                </div>
              </div> */}
              <FormInput
                type="text"
                title="Bạn có yêu cầu đặc biệt cho nơi lưu trú không"
                value=""
                onChange={handleChangeSpecial}
              />
              <p className={cn("text-[0.90rem]", "lg:text-[0.95rem]")}>
                Bằng việc nhấn "Chi tiết thanh toán" và hoàn tất đơn đặt, bạn
                đồng ý với
                <span className="text-blue_main_sub">
                  điều khoản và điều kiện
                </span>
                của KokoTravel.com cũng như chính sách bảo mật của NtAnn.
                <br />
                Vui lòng xem Chính sách Bảo mật để hiểu cách chúng tôi sử dụng
                và bảo vệ thông tin cá nhân của bạn.
                <br />
                <span className="text-blue_main_sub">Chính sách bảo mật</span>
              </p>
              <Dialog>
                <DialogTrigger className="w-full" asChild>
                  <Button
                    className="bg-bg_primary_blue_sub text-white w-full py-6 "
                    disabled={
                      user
                        ? false
                        : !firstName || !lastName || !email || !numberphone
                    }
                    onClick={handleSendEmailConfirm}
                  >
                    Chi tiết thanh toán
                  </Button>
                </DialogTrigger>
                <DialogContent
                  aria-describedby={undefined}
                  className="bg-bg_black_sub"
                >
                  <ModalConfirmCode
                    totalBooking={totalBooking}
                    success={!!confirm?.idEmail}
                    code={confirm?.code}
                    lastName={user ? user.lastname : lastName}
                    email={user ? user.email : email}
                    tripId={data._id}
                    category="hotel"
                  />
                </DialogContent>
              </Dialog>
            </div>
            <div
              className={cn(
                "w-[100%]  flex flex-col gap-2 items-start justify-start ",
                "lg:sticky lg:top-[2rem]"
              )}
            >
              <div
                className={cn(
                  "w-full h-full flex items-start justify-start gap-2 border-b-[0.4px] border-[#999] py-4"
                )}
              >
                {data?.images.map((img, index) => {
                  if (index === 0) {
                    return (
                      <Image
                        priority
                        key={index}
                        alt="img-booking"
                        src={img}
                        width={900}
                        height={600}
                        sizes="50"
                        className="w-[8rem] h-[8rem] rounded-lg"
                      />
                    );
                  }
                })}
                <span className="font-bold text-[1.1rem]">{data?.name}</span>
              </div>
              <div className="w-full h-full border-b-[0.4px] border-[#999] flex flex-col items-start justify-start gap-4 py-2">
                <div className="flex items-center justify-start gap-x-2">
                  <span>Thời gian: </span>
                  <span className="underline flex items-center justify-start gap-1">
                    Từ {dateFrom}
                    <Dot />
                    {dateTo}
                  </span>
                </div>
                <div className="w-full flex flex-col items-start justify-start gap-2 text-[1rem]">
                  {numberRoom !== "0" && (
                    <div className="w-full flex items-center justify-between gap-2">
                      <div>
                        <span className="font-medium text-[1rem]">
                          {numberRoom}
                        </span>
                        <span className="font-semibold text-[1rem]">
                          * Phòng đơn
                        </span>
                      </div>
                      <div>{data && formatPrice(data.price[0])} VNĐ</div>
                    </div>
                  )}
                  {numberRoomDouble !== "0" && (
                    <div className="w-full flex items-center justify-between gap-2">
                      <div>
                        <span className="font-medium text-[1rem]">
                          {numberRoomDouble}
                        </span>
                        <span className="font-semibold text-[1rem]">
                          * Phòng đôi
                        </span>
                      </div>
                      <div>{data && formatPrice(data.price[1])} VNĐ</div>
                    </div>
                  )}
                </div>
                <div className="w-full flex items-center justify-between gap-2">
                  <span className="font-semibold">Tổng tiền:</span>
                  <div>
                    <span className="font-semibold">{totalBooking()} VNĐ</span>
                  </div>
                </div>
                <div>
                  <span className="text-black_sub">Đã bao gồm thuế và phí</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>Không tìm thấy dữ liệu</div>
      )}
    </Fragment>
  );
};

export default BookingHotel;
