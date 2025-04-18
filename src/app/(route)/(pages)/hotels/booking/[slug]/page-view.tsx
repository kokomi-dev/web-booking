"use client";
import { Check, ChevronRight, CircleUser, Star, UserRound } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import { Fragment, useEffect, useMemo, useState } from "react";

import { getDetailHotel } from "@/api/api-hotels";
import Loading from "@/app/loading";
import { Button } from "@/components/ui/button";
import { useAuthenticatedStore } from "@/store/authencation-store";
import {
  cn,
  convertVND,
  formatDateToISOString,
  timeListBooking,
} from "@/utils/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import BreadcrumbHead from "@/components/components/breadcrumb";
import IconRequired from "@/components/components/icon-required";
import PayListWrap from "@/components/components/pay-list";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { IHotel } from "@/types/hotel.type";

const infoBooking = z.object({
  lastname: z.string().min(2, "Vui lòng nhập tên"),
  firstname: z.string().min(2, "Vui lòng nhập họ"),
  numberphone: z
    .string()
    .max(10, "Sai định dạng số ĐT")
    .min(10, "Sai định dạng số ĐT"),
  email: z.string().email("Vui lòng nhập đúng email"),
  note: z.optional(z.string()),
  expectedTime: z.string({ message: "Chọn thời gian có thể nhận phòng" }),
});
type InfoBooking = z.infer<typeof infoBooking>;

const BookingHotel = () => {
  const { slug } = useParams<{
    slug: string;
  }>();
  const { user, isAuthenticated } = useAuthenticatedStore();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<IHotel | null>(null);
  const [infoBoookingUser, setInfoBookingUser] = useState<any>({
    firstname: "",
    lastname: "",
    email: "",
    numberphone: "",
    note: "",
    expectedTime: "0",
  });
  const form = useForm<InfoBooking>({
    resolver: zodResolver(infoBooking),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      numberphone: "",
      note: "",
      expectedTime: "0",
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
        note: "",
      });
    }
  }, [user, form, slug]);

  const [listRoomBooked, setListRoomBooked] = useState<any>([]);
  const param = useSearchParams();

  const dateFrom: string = param.get("date-from") ?? "";
  const dateTo: string = param.get("date-to") ?? "";
  const childrenNumber = Number(param.get("numberChildren")) ?? 0;
  const adult = Number(param.get("numberAdults")) ?? 0;
  const numberRoom = Number(param.get("numberRoom")) ?? 0;

  const total: string = param.get("price") ?? "";
  const roomBooked = param.get("roomBooked") ?? "";
  const bookingInfo: number[] = roomBooked.split(",").map(Number);
  const [isValidate, setIsValidate] = useState(false);
  const num = useMemo(
    () =>
      bookingInfo?.reduce((arrg, item) => {
        return arrg + item;
      }, 0),
    [bookingInfo]
  );
  const memoizedListRooms = useMemo(() => data?.listRooms || [], [data]);
  useEffect(() => {
    if (data) {
      const roomsBooked = bookingInfo
        .map((item, index) => {
          const room = memoizedListRooms[index];
          if (item > 0) {
            return {
              name: room.name,
              id: room._id,
              numberBooked: item,
            };
          }
          return null;
        })
        .filter(Boolean);

      if (JSON.stringify(roomsBooked) !== JSON.stringify(listRoomBooked)) {
        setListRoomBooked(roomsBooked);
      }
    }
  }, [bookingInfo, memoizedListRooms, data, listRoomBooked]);
  const onSubmit = (data: InfoBooking) => {
    if (data) {
      setInfoBookingUser({ ...data, idUser: user?._id });
      setIsValidate(!isValidate);
    } else return;
  };
  return (
    <Fragment>
      {isLoading ? (
        <Loading />
      ) : data ? (
        <div className={cn(" section-spacing ")}>
          {/* head */}
          <BreadcrumbHead
            items={[
              {
                label: "Trang chủ",
                href: "/home",
              },
              {
                label: "Lưu trú",
                href: "/hotels",
              },
              {
                href: `/hotels/${data.slug}`,
                label: `${data.name}`,
              },
              {
                label: "Đặt nơi lưu trú",
              },
            ]}
          />
          {/* body */}
          <div
            className={cn(
              "container xl:px-0  grid grid-cols-1 gap-y-5 ",
              "lg:grid-cols-layout-3  lg:gap-x-5 lg:gap-y-0 lg:h-full "
            )}
          >
            {/* info */}
            <div className={cn("w-full h-fit container-spacing  ")}>
              <div
                className={cn(
                  "w-full h-full flex items-start justify-start gap-2 border-[0.4px] border-[#999] p-3 rounded-8"
                )}
              >
                <div className=" text-sm font-normal p-1 list-spacing">
                  <h4 className="text-xl lg:text-2xl font-semibold">
                    {data.name}
                  </h4>
                  <span className="flex items-center justify-start gap-x-1 text-sm">
                    <Star className="size-4 text-yellow fill-yellow" />
                    {data.rating}
                  </span>
                  <span className=" text-xs text-black_sub">
                    {data.comments.length} bình luận
                  </span>
                  <address className="text-xs text-green">
                    {data.location.detail}
                  </address>
                  <ul className="w-full flex flex-wrap gap-x-2">
                    {data.includes.map((include: string, index: number) => {
                      return (
                        <li
                          className="text-xs flex items-center justify-start gap-x-1 "
                          key={index}
                        >
                          <Check className="size-3 text-green flex-shrink-0" />
                          <span className="first-letter:uppercase text-black">
                            {include}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <div className="w-full h-full border-[#999] border-0.5 rounded-8 list-spacing p-2">
                <h4 className="text-base font-semibold">
                  Chi tiết đặt phòng của bạn
                </h4>
                <div className="w-full grid grid-cols-2 gap-x-2 text-base font-medium">
                  <div className="text-center">
                    <h4 className="text-xs font-semibold text-blue_sub">
                      Nhận phòng
                    </h4>
                    <span className="text-sm font-semibold">{dateFrom}</span>
                  </div>
                  <div className="text-center border-l-[0.4px] border-[#999]">
                    <h4 className="text-xs font-semibold text-blue_sub">
                      Trả phòng
                    </h4>
                    <span className="text-sm font-semibold">{dateTo}</span>
                  </div>
                </div>
                <div className="w-full flex flex-col items-start justify-start gap-2 text-[1rem]">
                  <h4 className="text-sm font-medium">
                    Tổng thời gian lưu trú:
                  </h4>
                  <span className="text-sm font-semibold ">1</span>
                </div>
                <div className="w-full flex items-center justify-between gap-2 border-t-[0.4px] border-[#999] py-2 pt-3">
                  <h4 className="text-sm font-medium">Bạn đã chọn</h4>
                  <span className="text-sm font-semibold">{num} phòng</span>
                </div>
              </div>
              <div className="w-full h-full border-[#999] border-0.5 rounded-8 flex flex-col items-start justify-start gap-4 ">
                <div className="p-2">
                  <h4 className="text-base font-semibold">
                    Tổng tiền phải thanh toán:
                  </h4>
                </div>
                <div className="w-full grid grid-cols-2 gap-x-2 text-base font-medium bg-blue_hover text-black">
                  <h2 className="text-2xl md:text-3xl font-bold p-2">
                    Tổng cộng{" "}
                  </h2>
                  <span className="text-blue_sub  flex items-center font-bold text-lg underline">
                    VNĐ {convertVND(Number(total))}
                  </span>
                </div>
              </div>
              <div className="w-full h-full border-[#999] border-0.5 rounded-8 flex flex-col items-start justify-start gap-4 p-2">
                <h4 className="text-base font-semibold">
                  Đơn này sẽ được tính
                </h4>
                <p className="text-xs text-black_sub">
                  Chỗ nghỉ, vé máy bay, xe thuê, taxi hay vé tham quan, mỗi đơn
                  đặt hoàn tất đều được tính vào tiến trình Genius của bạn.
                </p>

                <div className="w-full flex items-center justify-between gap-2 border-t-[0.4px] border-[#999]">
                  <span className="text-sm font-normal text-black">
                    Chương trình khách hàng thân thiết của KoKoTravel
                  </span>
                </div>
              </div>
            </div>
            {/* info customer */}
            <div className={cn("w-full container-spacing ")}>
              <div className="w-full container-spacing">
                {user && isAuthenticated && (
                  <div className="w-full h-auto flex items-center justify-start gap-x-2 p-3 border-0.5 border-[#999] rounded-8">
                    <div
                      className={cn(
                        "w-[2.2rem] h-[2.2rem] border-1 border-yellow rounded-full flex items-center justify-center",
                        "md:w-[2.8rem] md:h-[2.8rem]"
                      )}
                    >
                      <CircleUser className="text-blue_sub size-8" />
                    </div>
                    <div>
                      <h4 className="text-base font-semibold ">
                        Bạn đã được đăng nhập
                      </h4>
                      <span className="text-sm font-normal text-black_sub">
                        {user.email}
                      </span>
                    </div>
                  </div>
                )}
                <h3 className={cn("text-lg font-semibold")}>
                  Nhập thông tin chi tiết của bạn
                </h3>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="container-spacing w-full  "
                  >
                    <div className="w-full p-2 lg:p-3 border-0.5 border-[#999] rounded-8 container-spacing">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 lg:gap-y-0 md:gap-x-2">
                        <FormField
                          control={form.control}
                          name="firstname"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Họ <IconRequired />
                              </FormLabel>
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
                              <FormLabel>
                                Tên <IconRequired />
                              </FormLabel>
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
                            <FormLabel>
                              Email <IconRequired />
                            </FormLabel>
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
                            <FormLabel>
                              Số ĐT <IconRequired />
                            </FormLabel>
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
                    <div className="w-full p-2 lg:p-3 border-0.5 border-[#999] rounded-8 list-spacing">
                      <h3 className={cn("text-lg font-semibold")}>
                        Thông tin thêm
                      </h3>
                      <FormField
                        control={form.control}
                        name="note"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="!text-base">
                              Ghi chú thêm
                            </FormLabel>
                            <FormControl>
                              <Textarea placeholder="...aaa" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <div className="list-spacing">
                        <h4 className="text-sm font-semibold ">
                          Thời gian đến dự kiến của bạn
                        </h4>
                        <div className="w-full grid gap-y-2 mt-2">
                          <div className="flex items-center justify-start gap-x-1 font-normal text-sm">
                            <span>
                              <Check className="text-green size-4" />
                            </span>
                            Các phòng của bạn sẽ sẵn sàng nhận vào 7h00 hoặc
                            14h00{" "}
                          </div>
                          <div className="flex items-center justify-start gap-x-1 font-normal text-sm">
                            <span>
                              <Check className="text-green size-4" />
                            </span>
                            Lễ tân sẵn sàng phục vụ bạn{" "}
                          </div>
                        </div>
                        <div>
                          <FormField
                            control={form.control}
                            name="expectedTime"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-semibold">
                                  Vui lòng chọn thời gian nhận phòng{" "}
                                  <IconRequired />
                                </FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Chọn thời gian phù hợp" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {timeListBooking.map((item, index) => (
                                      <SelectItem
                                        key={index}
                                        value={item.value}
                                      >
                                        {item.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="w-full p-3 border-0.5 border-[#999] rounded-8">
                      <h4 className="text-black  text-lg font-semibold mb-2">
                        Các phòng đã đặt
                      </h4>
                      <div className="grid gap-y-3 lg:gap-y-4">
                        {bookingInfo.map((item, index) => {
                          const room = data.listRooms[index];
                          if (item > 0) {
                            return (
                              <div key={index} className="font-normal text-sm">
                                <h4 className="text-base font-bold">
                                  <span className="text-blue_sub text-base font-semibold">
                                    {" "}
                                    {item}
                                  </span>{" "}
                                  x {room.name}
                                </h4>
                                <div className="ml-2">
                                  {Array.isArray(room.details) ? (
                                    <ul className="flex flex-wrap">
                                      {room.details?.map(
                                        (detailItem, index) => {
                                          return (
                                            <li
                                              key={index}
                                              className="flex items-center justify-start text-xs p-1"
                                            >
                                              <Check className="text-green size-3" />
                                              <span className="ml-1">
                                                {detailItem}
                                              </span>
                                            </li>
                                          );
                                        }
                                      )}
                                    </ul>
                                  ) : (
                                    <p>{room.details}</p>
                                  )}
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
                    {!isValidate && (
                      <Button
                        type="submit"
                        className="bg-blue_sub hover:bg-blue_active mt-4 text-white w-full py-6"
                      >
                        Tiếp tục <ChevronRight className="size-5" />
                      </Button>
                    )}
                    {isValidate && (
                      <PayListWrap
                        infoBookingUser={infoBoookingUser}
                        open={isValidate}
                        setOpen={setIsValidate}
                        category="hotel"
                        data={data}
                        roomHotelBooking={listRoomBooked}
                        totalBooking={total}
                        childrenNumber={childrenNumber}
                        adult={adult}
                        numberRoom={numberRoom}
                        dateFrom={formatDateToISOString(dateFrom)}
                        dateTo={formatDateToISOString(dateTo)}
                      />
                    )}
                  </form>
                </Form>
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
