"use client";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import { Fragment, useEffect, useState, useMemo } from "react";

import { getDetailAttraction } from "@/api/api-attractions";
import BreadcrumbHead from "@/components/components/breadcrumb";
import IconRequired from "@/components/components/icon-required";
import { formatPrice } from "@/components/components/item-component";
import { LoadingPage } from "@/components/components/loading";
import PayListWrap from "@/components/components/pay-list";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuthenticatedStore } from "@/store/authencation-store";
import { AttractionData } from "@/types/attraction.type";
import { cn } from "@/utils/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronRight, CircleAlert, MapPin, Star } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "@/components/ui/textarea";

const infoBooking = z.object({
  lastname: z.string().min(2, "Vui lòng nhập tên"),
  firstname: z.string().min(2, "Vui lòng nhập họ"),
  numberphone: z
    .string()
    .max(10, "Sai định dạng số ĐT")
    .min(10, "Chưa đúng định dạng số ĐT"),
  email: z.string().email("Vui lòng nhập đúng email"),
  note: z.optional(z.string()),
  pickUpPoint: z.string({ message: "Chọn địa điểm đón bạn" }),
  address: z.optional(z.string().min(5, "Địa chỉ không hợp lệ")),
  specialRequests: z.optional(z.string()),
  nationality: z.string().min(2, "Vui lòng nhập quốc tịch"),
  passportNumber: z.optional(z.string().min(8, "Số hộ chiếu không hợp lệ")),
});
type InfoBooking = z.infer<typeof infoBooking>;

const BookingAttraction = () => {
  const { slug } = useParams<{
    slug: string;
  }>();
  const { user } = useAuthenticatedStore();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<AttractionData | null>(null);
  const [addressPickUpPoint, setAddressPickUpPoint] = useState("");
  const [infoBoookingUser, setInfoBookingUser] = useState<any>({
    firstname: "",
    lastname: "",
    email: "",
    numberphone: "",
    note: "",
    pickUpPoint: "1",
  });
  const form = useForm<InfoBooking>({
    resolver: zodResolver(infoBooking),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      numberphone: "",
      note: "",
      pickUpPoint: "1",
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
        note: "",
        pickUpPoint: "1",
      });
    }
  }, [slug, user, form]);

  const param = useSearchParams();

  const hour = param.get("hour") ?? "";
  const date = param.get("date");
  const adult = Number(param.get("adult")) ?? 0;
  const children = Number(param.get("children")) ?? 0;
  const [isValidate, setIsValidate] = useState(false);
  const totalBooking = useMemo(() => {
    if (data) {
      return formatPrice(
        Number(adult) * data.price[0] + Number(children) * data.price[1]
      );
    }
    return "";
  }, [data, adult, children]);

  const onSubmit = (data: InfoBooking) => {
    if (data) {
      if (data.pickUpPoint === "1") {
        data.pickUpPoint = "Gặp tại địa điểm của nhà điều hành tour";
      } else if (data.pickUpPoint === "2") {
        data.pickUpPoint = "Liên hệ riêng để chọn địa điểm đón";
      } else {
        data.pickUpPoint = addressPickUpPoint;
      }
      setInfoBookingUser({ ...data, idUser: user?._id });
      setIsValidate(!isValidate);
    }
  };

  return (
    <Fragment>
      {isLoading ? (
        <LoadingPage />
      ) : data ? (
        <div className={cn("container-spacing")}>
          {/* head */}
          <BreadcrumbHead
            items={[
              { label: "Trang chủ", href: "/home" },
              { label: "Các địa điểm du lịch", href: "/attractions" },
              { label: `${data.name}`, href: `/attractions/${data.slug}` },
              { label: `Đặt chỗ` },
            ]}
          />
          <div className="container-spacing container xl:px-0">
            <div
              className={cn("text-lg font-bold text-black", "lg:text-3xl ]")}
            >
              <h1>
                {data?.name} -<span className="text-blue_sub"> ( Đặt vé )</span>
              </h1>
              <p className="text-sm text-black_sub font-normal">
                Đảm bảo an toàn về quyền lợi khách hàng
              </p>
            </div>
          </div>
          <div
            className={cn(
              "container xl:px-0 flex flex-col-reverse items-center justify-center gap-y-7",
              "lg:flex-row lg:justify-between lg:gap-x-10 lg:items-start lg:gap-y-0 lg:h-full"
            )}
          >
            <div className="w-[100%] container-spacing shadow-none lg:shadow-md rounded-lg p-0 lg:p-6">
              <h3 className="text-lg font-semibold text-black_sub">
                Thông tin của bạn
              </h3>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="container-spacing"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 lg:gap-y-0 md:gap-x-4 lg:gap-x-7">
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
                              className="capitalize border-gray-300 border-0.5"
                              type="text"
                              placeholder="Họ"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red_main" />
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
                              className="capitalize border-gray-300 border-0.5"
                              type="text"
                              placeholder="Tên"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red_main" />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
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
                              className="border-0.5 border-gray-300"
                              type="email"
                              placeholder="Email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red_main" />
                        </FormItem>
                      )}
                    />
                    <div className="text-xs text-black_sub_2 mt-2">
                      Chúng tôi sẽ gửi email xác nhận tới email này
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="numberphone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Số điện thoại (ưu tiên số điện thoại đi động){" "}
                          <IconRequired />
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="border-0.5 border-gray-300"
                            type="text"
                            placeholder="Số ĐT"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red_main" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Địa chỉ</FormLabel>
                        <FormControl>
                          <Input
                            className="border-0.5 border-gray-300"
                            type="text"
                            placeholder="Nhập địa chỉ của bạn"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red_main" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="nationality"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Quốc tịch <IconRequired />
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="border-0.5 border-gray-300"
                            type="text"
                            placeholder="Nhập quốc tịch của bạn"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red_main" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="passportNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Số hộ chiếu</FormLabel>
                        <FormControl>
                          <Input
                            className="border-0.5 border-gray-300"
                            type="text"
                            placeholder="Nhập số hộ chiếu (nếu có)"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red_main" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="specialRequests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Yêu cầu đặc biệt</FormLabel>
                        <FormControl>
                          <Textarea
                            className="border-0.5 border-gray-300"
                            placeholder="Nhập yêu cầu đặc biệt (nếu có)"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div className="border-0.5 border-gray-300 rounded-lg p-4 mt-4">
                    <h3 className="text-lg font-semibold text-black_sub flex items-center gap-x-2 heading-spacing">
                      Thông tin thêm <CircleAlert className="size-6" />
                    </h3>
                    <FormField
                      control={form.control}
                      name="pickUpPoint"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="!text-base !font-medium text-black_sub_2 ">
                            Vui lòng chọn địa điểm đón <IconRequired />
                          </FormLabel>
                          <FormControl className="!mt-4">
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-3"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="1" />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">
                                  Gặp tại địa điểm của nhà điều hành tour
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="2" />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">
                                  Liên hệ riêng để chọn địa điểm đón
                                </FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="3" />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">
                                  Chọn địa điểm
                                </FormLabel>
                              </FormItem>
                              {field.value === "3" && (
                                <Input
                                  placeholder="Nhập địa điểm"
                                  value={addressPickUpPoint}
                                  onChange={(e) => {
                                    setAddressPickUpPoint(e.target.value);
                                  }}
                                />
                              )}
                            </RadioGroup>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <p className="text-xs text-black_sub_2 mt-4">
                    Bằng việc nhấn &quot;Tiếp tục&quot; và hoàn tất đơn đặt, bạn
                    đồng ý với{" "}
                    <Link
                      href="/content/privacy?activeTab=3"
                      className="text-blue-500"
                    >
                      điều khoản và điều kiện
                    </Link>{" "}
                    của KokoTravel.com cũng như chính sách bảo mật của chúng
                    tôi.
                  </p>
                  {!isValidate && (
                    <Button
                      type="submit"
                      className="bg-blue hover:bg-blue_active mt-4 text-white w-full py-4"
                    >
                      Tiếp tục <ChevronRight className="size-5" />
                    </Button>
                  )}
                  {isValidate && (
                    <PayListWrap
                      open={isValidate}
                      setOpen={setIsValidate}
                      category="attraction"
                      data={data}
                      totalBooking={totalBooking}
                      hour={hour}
                      childrenNumber={children}
                      adult={adult}
                      infoBookingUser={infoBoookingUser}
                    />
                  )}
                </form>
              </Form>
            </div>
            <div
              className={cn(
                "w-full lg:w-[100%] shadow-none lg:shadow-md rounded-lg p-0 lg:p-6 ",
                "lg:sticky lg:top-[2rem] lg:h-auto"
              )}
            >
              <div
                className={cn(
                  "w-full h-full flex items-start justify-start gap-2 border-b-[0.4px] border-[#999] py-4 "
                )}
              >
                <Image
                  alt="img-booking"
                  src={data?.images[0]}
                  width={300}
                  height={200}
                  sizes="50"
                  className="w-[8rem] h-[8rem] md:w-[10rem] md:h-[10rem] rounded-lg object-cover object-center"
                />
                <div className="flex flex-col gap-y-2 lg:gap-y-3">
                  <h4 className="font-bold text-base lg:text-lg">
                    {data?.name}
                  </h4>
                  <address className="text-xs text-blue_sub flex items-center justify-start gap-x-1 ">
                    <MapPin className="size-4" /> {data?.location.detail}
                  </address>
                  <p className="text-xs md:text-sm text-black_blur line-clamp-3">
                    {data?.description}
                  </p>
                </div>
              </div>
              <div className="list-spacing text-xs lg:text-sm py-3 md:py-4 lg:py-5 ">
                <h6 className="flex items-center justify-start gap-x-1">
                  {" "}
                  <Star className="size-4 fill-yellow text-yellow flex-shrink-0" />
                  {data.rating}
                </h6>
                {data.cancelFree && (
                  <h6 className="text-green flex items-center justify-start gap-x-1">
                    <Check className="size-4 flex-shrink-0" />
                    Hủy miễn phí
                  </h6>
                )}
              </div>
              <hr className="hr" />
              <div className="w-full h-full border-b-[0.4px] border-[#999] list-spacing py-3 md:py-4 lg:py-5">
                <div className="flex items-center justify-start gap-x-2 text-base font-medium">
                  <span>Thời gian: </span>
                  <span className="underline text-blue_sub font-semibold">
                    {hour} ngày {date}
                  </span>
                </div>
                <div className="w-full list-spacing text-[1rem]">
                  {adult !== 0 && (
                    <div className="w-full flex items-center justify-between gap-2">
                      <div>
                        <span className="font-medium text-[1rem]">{adult}</span>
                        <span className="font-semibold text-[1rem]">
                          {" "}
                          <span className="text-yellow">*</span> Người lớn
                        </span>
                      </div>
                      <div>{data && formatPrice(data.price[0])} VNĐ</div>
                    </div>
                  )}{" "}
                  {children !== 0 && (
                    <div className="w-full flex items-center justify-between gap-2">
                      <div>
                        <span className="font-medium text-[1rem]">
                          {children}
                        </span>
                        <span className="font-semibold text-[1rem]">
                          {" "}
                          <span className="text-yellow">*</span> Trẻ em
                        </span>
                      </div>
                      <div>{data && formatPrice(data.price[1])} VNĐ</div>
                    </div>
                  )}
                </div>
                <div className="w-full flex items-center justify-between gap-2 text-blue_sub">
                  <span className="font-semibold text-lg">Tổng tiền:</span>
                  <div>
                    <span className="font-bold text-lg">
                      {totalBooking} VNĐ
                    </span>
                  </div>
                </div>
                <div>
                  <span className="text-black_sub text-sm">
                    Đã bao gồm thuế và phí
                  </span>
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

export default BookingAttraction;
