"use client";
import React, { Fragment, useEffect, useState } from "react";
import { Check, Star, UserRound } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import Image from "next/image";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import Loading from "@/app/loading";
import { Button } from "@/components/ui/button";
import { sendEmailConfirm } from "@/api/api-email";
import { HotelData } from "@/utils/types";
import { convertVND, timeListBooking } from "@/utils/constants";
import { useAuthenticatedStore } from "@/store/authencation-store";
import { getDetailHotel } from "@/api/api-hotels";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useBookingInfoStore } from "@/store/booking-info";
import ModalConfirmCode from "@/components/components/modal-code";

const BookingHotel = () => {
  const { slug } = useParams<{
    slug: string;
  }>();
  const { user, isAuthenticated } = useAuthenticatedStore();
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
    if (user) {
      form.reset({
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        email: user.email || "",
        numberphone: user.numberPhone || "",
        special: "",
      });
    }
  }, [slug, user]);

  const [openModal, setOpenModal] = useState(false);
  const [confirm, setConfirm] = useState({
    idEmail: "",
    code: "",
  });
  const [value, setValue] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const param = useSearchParams();

  const dateFrom = param.get("date-from");
  const dateTo = param.get("date-to");
  const total = param.get("price");

  const handleSendEmailConfirm = async (email: string) => {
    try {
      const data = await sendEmailConfirm(email);
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
  const { bookingInfo } = useBookingInfoStore();
  const num = bookingInfo?.chooseInput.reduce((arrg, item) => {
    return arrg + item;
  }, 0);
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
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/hotels">Lưu trú</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/hotels/${data.slug}`}>
                  {data.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Đặt nơi lưu trú</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div
            className={cn(
              "w-full flex flex-col items-start justify-start gap-2"
            )}
          ></div>
          {/* body */}
          <div
            className={cn(
              "w-full grid grid-cols-1 gap-y-5  ",
              "lg:grid-cols-layout-3  lg:gap-x-5 lg:gap-y-0 lg:h-full "
            )}
          >
            {/* info */}
            <div className={cn("w-full h-fit grid gap-y-3  ")}>
              <div
                className={cn(
                  "w-full h-full flex items-start justify-start gap-2 border-[0.4px] border-[#999] p-3 rounded-8"
                )}
              >
                {/* <Image
                  priority
                  alt="img-booking"
                  src={data.images[0]}
                  width={900}
                  height={600}
                  sizes="50"
                  className="min-w-[8rem] w-full h-[8rem] rounded-lg"
                /> */}
                <div className="grid text-small font-normal p-1 gap-y-1">
                  <h4 className="text-medium font-semibold">{data.name}</h4>
                  <span className="flex items-center justify-start gap-x-1 text-small">
                    <Star className="size-4 text-yellow_main fill-yellow_main" />
                    {data.rating}
                  </span>
                  <span className=" text-smallest text-black_sub">
                    {data.comments.length} bình luận
                  </span>
                  <address className="text-smallest text-green_main">
                    {data.location.detail}
                  </address>
                  <ul className="w-full flex flex-wrap gap-x-2">
                    {data.includes.map((include: string, index: number) => {
                      return (
                        <li
                          className="text-smallest flex items-center justify-start gap-x-1 "
                          key={index}
                        >
                          <Check className="size-3 text-green_main" />
                          {include}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <div className="w-full h-full border-[#999] border-0.5 rounded-8 flex flex-col items-start justify-start gap-4 p-2">
                <h4 className="text-normal font-semibold">
                  Chi tiết đặt phòng của bạn
                </h4>
                <div className="w-full grid grid-cols-2 gap-x-2 text-normal font-medium">
                  <div className="text-center">
                    <h4 className="text-smallest font-medium">Nhận phòng</h4>
                    <span className="text-small font-semibold">{dateFrom}</span>
                  </div>
                  <div className="text-center border-l-[0.4px] border-[#999]">
                    <h4 className="text-smallest font-medium">Trả phòng</h4>
                    <span className="text-small font-semibold">{dateTo}</span>
                  </div>
                </div>
                <div className="w-full flex flex-col items-start justify-start gap-2 text-[1rem]">
                  <h4 className="text-small font-medium">
                    Tổng thời gian lưu trú:
                  </h4>
                  <span className="text-small font-semibold">1</span>
                </div>
                <div className="w-full flex items-center justify-between gap-2 border-t-[0.4px] border-[#999]">
                  <h4 className="text-small font-medium">Bạn đã chọn</h4>
                  <span className="text-small font-semibold">{num} phòng</span>
                </div>
              </div>
              <div className="w-full h-full border-[#999] border-0.5 rounded-8 flex flex-col items-start justify-start gap-4 ">
                <div className="p-2">
                  <h4 className="text-normal font-semibold">
                    Giá bạn phải thanh toán:
                  </h4>
                </div>
                <div className="w-full grid grid-cols-2 gap-x-2 text-normal font-medium bg-bg_primary_hover text-black">
                  <h2 className="text-large font-bold p-2">Tổng cộng </h2>
                  <span className="text-blue_main_sub  flex items-center font-bold text-medium underline">
                    VNĐ {convertVND(Number(total))}
                  </span>
                </div>
              </div>
              <div className="w-full h-full border-[#999] border-0.5 rounded-8 flex flex-col items-start justify-start gap-4 p-2">
                <h4 className="text-normal font-semibold">
                  Đơn này sẽ được tính
                </h4>
                <p className="text-smallest text-black_sub">
                  Chỗ nghỉ, vé máy bay, xe thuê, taxi hay vé tham quan, mỗi đơn
                  đặt hoàn tất đều được tính vào tiến trình Genius của bạn.
                </p>

                <div className="w-full flex items-center justify-between gap-2 border-t-[0.4px] border-[#999]">
                  <span className="text-small font-semibold">
                    Chương trình khách hàng thân thiết của KoKoTravel
                  </span>
                </div>
              </div>
            </div>
            {/* infoc customer */}
            <div
              className={cn(
                "w-full flex flex-col items-start justify-start gap-3 "
              )}
            >
              <div className="w-full flex flex-col items-start justify-start gap-2">
                {user && isAuthenticated && (
                  <div className="w-full h-auto flex items-center justify-start gap-x-2 p-3 border-0.5 border-[#999] rounded-8">
                    <div
                      className={cn(
                        "w-[2.2rem] h-[2.2rem] border-1 border-yellow_main rounded-full flex items-center justify-center",
                        "md:w-[2.8rem] md:h-[2.8rem]"
                      )}
                    >
                      <Image
                        src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
                        width={600}
                        height={600}
                        alt="avatar-user"
                        className=" rounded-full object-contain"
                      />
                    </div>
                    <div>
                      <h4 className="text-normal font-semibold ">
                        Bạn đã được đăng nhập
                      </h4>
                      <span className="text-small font-normal text-black_sub">
                        {user.email}
                      </span>
                    </div>
                  </div>
                )}
                <h3 className={cn("text-medium font-semibold")}>
                  Nhập thông tin chi tiết của bạn
                </h3>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleButton)}
                    className="space-y-3 w-full  "
                  >
                    <div className="w-full p-3 border-0.5 border-[#999] rounded-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2">
                        <FormField
                          control={form.control}
                          name="firstname"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Họ</FormLabel>
                              <FormControl>
                                <Input
                                  type="text"
                                  placeholder="Họ"
                                  {...field}
                                />
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
                                <Input
                                  type="text"
                                  placeholder="Tên"
                                  {...field}
                                />
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
                              <Input
                                type="text"
                                placeholder="Số ĐT"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="w-full p-3 border-0.5 border-[#999] rounded-8">
                      <h3 className={cn("text-medium font-semibold")}>
                        Thông tin thêm
                      </h3>
                      <h4 className="text-small font-medium">
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
                            className="cursor-pointer text-small"
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
                            className="cursor-pointer text-small"
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
                            className="cursor-pointer text-small"
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
                    </div>
                    <div className="w-full p-3 border-0.5 border-[#999] rounded-8">
                      <div className="py-2">
                        <h4 className="text-small font-medium  ">
                          Bạn đặt phòng cho ai (không bắt buộc)
                        </h4>
                        <div className="w-full">
                          <div className="flex items-center justify-start my-1">
                            <input
                              className={cn("size-5 mr-2", "lg:size-4")}
                              type="radio"
                              value="0"
                              id="0"
                              name="booking_for_who"
                            />
                            <label
                              className="cursor-pointer text-small"
                              htmlFor="0"
                            >
                              Tôi là khách lưu trú chính
                            </label>
                          </div>
                          <div className="flex items-center justify-start my-1">
                            <input
                              className={cn("size-5 mr-2", "lg:size-4")}
                              id="1"
                              type="radio"
                              value="1"
                              name="booking_for_who"
                            />
                            <label
                              className="cursor-pointer text-small"
                              htmlFor="1"
                            >
                              Đặt phòng này là cho người khác
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="py-2">
                        <h4 className="text-normal font-semibold ">
                          Thời gian đến dự kiến của bạn
                        </h4>
                        <div className="w-full grid gap-y-2 mt-2">
                          <div className="flex items-center justify-start gap-x-1 font-normal text-small">
                            <span>
                              <Check className="text-green_main size-4" />
                            </span>
                            Các phòng của bạn sẽ sẵn sàng nhận vào 7h00 hoặc
                            14h00{" "}
                          </div>
                          <div className="flex items-center justify-start gap-x-1 font-normal text-small">
                            <span>
                              <Check className="text-green_main size-4" />
                            </span>
                            Lễ tân sẵn sàng phục vụ bạn{" "}
                          </div>
                          <div className="grid gap-y-1">
                            <h5 className="text-small font-medium">
                              Thêm thời gian đến dự kiến của bạn
                            </h5>
                            <Popover open={open} onOpenChange={setOpen}>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  className="w-[200px] justify-between font-normal"
                                >
                                  {value
                                    ? timeListBooking.find(
                                        (time) => time.value === value
                                      )?.label
                                    : "Vui lòng chọn..."}
                                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-[200px] bg-white rounded-8 p-0">
                                <Command>
                                  <CommandList>
                                    <CommandEmpty>No time found.</CommandEmpty>
                                    <CommandGroup>
                                      {timeListBooking.map((time) => (
                                        <CommandItem
                                          className="hover:cursor-pointer hover:bg-bg_primary_white"
                                          key={time.value}
                                          value={time.value}
                                          onSelect={(currentValue) => {
                                            setValue(
                                              currentValue === value
                                                ? ""
                                                : currentValue
                                            );
                                            setOpen(false);
                                          }}
                                        >
                                          {time.label}
                                          <CheckIcon
                                            className={cn(
                                              "ml-auto h-4 w-4",
                                              value === time.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                            )}
                                          />
                                        </CommandItem>
                                      ))}
                                    </CommandGroup>
                                  </CommandList>
                                </Command>
                              </PopoverContent>
                            </Popover>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full p-3 border-0.5 border-[#999] rounded-8">
                      <h4 className="text-black  text-medium font-semibold">
                        Các phòng đã đặt
                      </h4>
                      <div className="grid gap-y-3">
                        {bookingInfo.chooseInput.map((item, index) => {
                          const room = data.listRooms[index];
                          if (item > 0) {
                            return (
                              <div
                                key={index}
                                className="font-normal text-small"
                              >
                                <h4 className="text-normal font-bold">
                                  {room.name}
                                </h4>
                                <div className="ml-2">
                                  <ul>
                                    {room.details.map((detailItem, index) => {
                                      return (
                                        <li
                                          key={index}
                                          className="flex items-center justify-start text-smallest py-1"
                                        >
                                          <Check className="text-green_main size-3" />
                                          <span className="ml-1">
                                            {detailItem}
                                          </span>
                                        </li>
                                      );
                                    })}
                                  </ul>
                                  <div className="flex items-center justify-statr gap-x-1">
                                    <UserRound className="size-4" />
                                    <h5 className="font-semibold">Khách:</h5>
                                    <span>{room.numberPeople}</span>
                                    <span> người lớn</span>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                        })}
                      </div>
                    </div>
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
                    totalBooking={total}
                    code={confirm?.code}
                    lastName={user ? user.lastname : ""}
                    email={user ? user.email : ""}
                    tripId={data._id}
                    category="hotel"
                    img={data.images[0]}
                  />
                </DialogContent>
              </Dialog>
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
