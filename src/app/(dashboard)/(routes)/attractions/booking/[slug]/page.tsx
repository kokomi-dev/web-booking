"use client";
import React, { Fragment, useEffect, useState } from "react";
import { ChevronLeft, Dot } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import Loading from "@/app/loading";
import { formatPrice } from "@/components/components/item-component";
import { Button } from "@/components/ui/button";
import ModalConfirmCode from "@/components/dashboard/modal-code";
import { sendEmailConfirm } from "@/api/api-email";
import { HotelData } from "@/constants";
import { useAuthenticatedStore } from "@/store/authencation-store";
import { getDetailHotel } from "@/api/api-hotels";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getDetailAttraction } from "@/api/api-attractions";

const BookingHotel = () => {
  const { slug } = useParams<{
    slug: string;
  }>();
  const { user } = useAuthenticatedStore();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<HotelData | null>(null);
  const infoBooking = z.object({
    lastname: z.string().min(2, "Vui lòng nhập tên"),
    firstname: z.string().min(2, "Vui lòng nhập họ"),
    numberphone: z.string().max(10, "Sai định dạng số ĐT"),
    email: z.string().email("Vui lòng nhập email"),
    special: z.optional(z.string()),
  });
  type InfoBooking = z.infer<typeof infoBooking>;
  const form = useForm<InfoBooking>({
    resolver: zodResolver(infoBooking),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      numberphone: "",
      special: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const attraction = await getDetailAttraction({ slug });
        setData(attraction);
      } catch (error) {
        console.error("Failed to fetch attraction details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (slug) {
      fetchData();
    }
    if (user) {
      form.reset({
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        email: user.email || "",
        numberphone: user.numberPhone || "",
        special: "",
      });
    }
  }, [slug, user, form]);

  const router = useRouter();

  const [openModal, setOpenModal] = useState(false);
  const [confirm, setConfirm] = useState({
    idEmail: "",
    code: "",
  });

  const param = useSearchParams();

  const hour = param.get("hour");
  const date = param.get("date");
  const adult = param.get("adult");
  const children = param.get("children");

  const totalBooking = () => {
    if (data) {
      return formatPrice(
        Number(adult) * data.price[0] + Number(children) * data.price[1]
      );
    }
  };
  const handleSendEmailConfirm = async (email: string) => {
    try {
      const data = await sendEmailConfirm(user ? user.email : email);
      if (data) {
        setConfirm(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleButton = (value: InfoBooking) => {
    setOpenModal(true);
    handleSendEmailConfirm(value.email);
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
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleButton)}
                    className="space-y-3"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2">
                      <FormField
                        control={form.control}
                        name="firstname"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Họ</FormLabel>
                            <FormControl>
                              <Input type="text" placeholder="Họ" {...field} />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastname"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tên</FormLabel>
                            <FormControl>
                              <Input type="text" placeholder="Tên" {...field} />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="numberphone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Số ĐT</FormLabel>
                          <FormControl>
                            <Input type="text" placeholder="Số ĐT" {...field} />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                    <h3 className={cn("text-medium font-semibold")}>
                      Thông tin thêm
                    </h3>
                    <h4 className="text-small">
                      Vui lòng chọn địa điểm đón khách
                    </h4>
                    <div className="w-full">
                      <div className="flex items-center justify-start my-1">
                        <input
                          className={cn("size-5 mr-2", "lg:size-4")}
                          type="radio"
                          value="0"
                          name="address_choose"
                          id="0"
                        />
                        <label
                          className="cursor-pointer text-[0.95rem]"
                          htmlFor="0"
                        >
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
                        <label
                          className="cursor-pointer text-[0.95rem]"
                          htmlFor="1"
                        >
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
                        <label
                          className="cursor-pointer text-[0.95rem]"
                          htmlFor="2"
                        >
                          Tự liên hệ nhà điều hành tour (bạn sẽ nhận thông tin
                          liên hệ trên voucher của mình)
                        </label>
                      </div>
                    </div>
                    <FormField
                      control={form.control}
                      name="special"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Bạn có yêu cầu đặc biệt nào không
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="...aaa" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <p className={cn("text-[0.90rem]", "lg:text-[0.95rem]")}>
                      Bằng việc nhấn &qout; Thanh toán &ldquo; và hoàn tất đơn
                      đặt, bạn đồng ý với
                      <span className="text-blue_main_sub">
                        điều khoản và điều kiện
                      </span>
                      của KokoTravel.com cũng như chính sách bảo mật của NtAnn.
                      <br />
                      Vui lòng xem Chính sách Bảo mật để hiểu cách chúng tôi sử
                      dụng và bảo vệ thông tin cá nhân của bạn.
                      <br />
                      <span className="text-blue_main_sub">
                        Chính sách bảo mật
                      </span>
                    </p>
                    <Button
                      type="submit"
                      className="bg-bg_primary_blue_sub text-white w-full py-6"
                    >
                      Thanh toán ngay
                    </Button>
                  </form>
                </Form>
              </div>
              <Dialog
                open={openModal}
                onOpenChange={() => {
                  setOpenModal(false);
                }}
              >
                <DialogContent
                  aria-describedby={undefined}
                  className="bg-bg_black_sub"
                >
                  <ModalConfirmCode
                    totalBooking={totalBooking}
                    code={confirm?.code}
                    lastName={user ? user.lastname : ""}
                    email={user ? user.email : ""}
                    tripId={data._id}
                    category="hotel"
                  />
                </DialogContent>
              </Dialog>
            </div>
            <div
              className={cn(
                "w-[100%]  grid gap-y-3 ",
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
                <div className="flex items-center justify-start gap-x-2 text-normal font-medium">
                  <span>Thời gian: </span>
                  <span className="underline ">
                    {hour} ngày {date}
                  </span>
                </div>
                <div className="w-full flex flex-col items-start justify-start gap-2 text-[1rem]">
                  {adult !== "0" && (
                    <div className="w-full flex items-center justify-between gap-2">
                      <div>
                        <span className="font-medium text-[1rem]">{adult}</span>
                        <span className="font-semibold text-[1rem]">
                          {" "}
                          * Người lớn
                        </span>
                      </div>
                      <div>{data && formatPrice(data.price[0])} VNĐ</div>
                    </div>
                  )}{" "}
                  {children !== "0" && (
                    <div className="w-full flex items-center justify-between gap-2">
                      <div>
                        <span className="font-medium text-[1rem]">
                          {children}
                        </span>
                        <span className="font-semibold text-[1rem]">
                          * Trẻ em
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
