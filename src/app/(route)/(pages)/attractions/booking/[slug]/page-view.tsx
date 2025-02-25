"use client";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

import { getDetailAttraction } from "@/api/api-attractions";
import BreadcrumbHead from "@/components/components/breadcrumb";
import IconRequired from "@/components/components/icon-required";
import { formatPrice } from "@/components/components/item-component";
import { LoadingPage } from "@/components/components/loading";
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
import { useAuthenticatedStore } from "@/store/authencation-store";
import { AttractionData } from "@/types/attraction.type";
import { cn } from "@/utils/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleAlert } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
const BookingAttraction = () => {
  const { slug } = useParams<{
    slug: string;
  }>();
  const { user } = useAuthenticatedStore();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<AttractionData | null>(null);
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

  const param = useSearchParams();

  const hour = param.get("hour") ?? "";
  const date = param.get("date");
  const adult = Number(param.get("adult")) ?? 0;
  const children = Number(param.get("children")) ?? 0;

  const totalBooking = (): string => {
    if (data) {
      return formatPrice(
        Number(adult) * data.price[0] + Number(children) * data.price[1]
      );
    }
    return "";
  };

  return (
    <Fragment>
      {isLoading ? (
        <LoadingPage />
      ) : data ? (
        <div
          className={cn("w-full h-full posing-vertical-1 mt-[1rem] lg:mt-0")}
        >
          {/* head */}
          <BreadcrumbHead
            items={[
              { label: "Trang chủ", href: "/home" },
              { label: "Các địa điểm du lịch", href: "/attractions" },
              { label: `${data.name}`, href: `/attractions/${data.slug}` },
              { label: `Đặt chỗ` },
            ]}
          />

          <div className={cn("text-medium font-bold ", "lg:text-large")}>
            <h1>{data?.name}</h1>
            <p className="text-small text-black_sub font-normal">
              Đảm bảo an toàn về quyền lợi khách hàng
            </p>
          </div>
          <div
            className={cn(
              "w-full flex flex-col-reverse items-center justify-center posing-vertical-2 ",
              "lg:flex-row lg:justify-between lg:gap-x-10 lg:items-start lg:gap-y-0 lg:h-full "
            )}
          >
            <div className="w-[100%] posing-vertical-3 ">
              <h3 className="text-medium font-semibold mt-2 lg:mt-0">
                Thông tin của bạn
              </h3>
              <Form {...form}>
                <form
                  // onSubmit={form.handleSubmit(handleButton)}
                  className="posing-vertical-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2">
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
                              className="capitalize border-black_main border-0.5"
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
                              className="capitalize border-black_main border-0.5"
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
                            className="border-0.5 border-black_main"
                            type="email"
                            placeholder="Email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  <div className="text-smallest text-black_sub">
                    Chúng tôi sẽ gửi email xác nhận tới{" "}
                    <span className="font-semibold text-small text-black_main">
                      {user && user.email}
                    </span>
                  </div>
                  <FormField
                    control={form.control}
                    name="numberphone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Số điện thoại (ưu tiên số điện thoại đi động)
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="border-0.5 border-black_main"
                            type="text"
                            placeholder="Số ĐT"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                  <h3 className="!mt-5 !mb-3 text-medium font-semibold flex items-center justify-start gap-x-2">
                    Thông tin thêm <CircleAlert className="size-6" />
                  </h3>
                  <h4 className="text-small font-medium">
                    Vui lòng chọn địa điểm đón khách
                  </h4>
                  <div className="w-full">
                    <div className="grid grid-cols-[10%,90%] lg:grid-cols-[5%,93%] items-center my-1 text-small">
                      <input
                        className={cn("size-5 mr-2", "lg:size-4")}
                        type="radio"
                        value="0"
                        name="address_choose"
                        id="0"
                        checked={true}
                      />
                      <label className="cursor-pointer text-small" htmlFor="0">
                        Gặp nhà điều hành tour tại điểm khởi hành
                      </label>
                    </div>
                    <div className="grid grid-cols-[10%,90%] lg:grid-cols-[5%,93%] items-center my-1 text-small">
                      <input
                        className={cn("size-5 mr-2", "lg:size-4")}
                        id="1"
                        type="radio"
                        value="1"
                        name="address_choose"
                      />
                      <label className="cursor-pointer text-small" htmlFor="1">
                        Chọn địa điểm
                      </label>
                    </div>
                    <div className="grid grid-cols-[10%,90%] lg:grid-cols-[5%,93%] items-center my-1 text-small">
                      <input
                        className={cn("size-5 mr-2", "lg:size-4")}
                        type="radio"
                        value="2"
                        id="2"
                        name="address_choose"
                      />
                      <label className="cursor-pointer text-small" htmlFor="2">
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
                        <FormLabel>Bạn có yêu cầu đặc biệt nào không</FormLabel>
                        <FormControl>
                          <Input
                            className="border-0.5 border-black_main"
                            placeholder="...aaa"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <hr className="hr !mt-4" />
                  <p className={cn("text-smallest !mt-4", "lg:text-small")}>
                    Bằng việc nhấn &quot; Chọn phương thức thanh toán &ldquo; và
                    hoàn tất đơn đặt, bạn đồng ý với {""}
                    <Link
                      href="/content/privacy?activeTab=3"
                      className="text-blue_main_sub"
                    >
                      điều khoản và điều kiện
                    </Link>{" "}
                    của KokoTravel.com cũng như chính sách bảo mật của chúng
                    tôi.
                    <br />
                    Vui lòng xem{" "}
                    <Link
                      className="text-blue_main_sub text-small"
                      href="/content/privacy?activeTab=2"
                    >
                      Chính sách bảo mật
                    </Link>{" "}
                    để hiểu cách chúng tôi sử dụng và bảo vệ thông tin cá nhân
                    của bạn.
                    <br />
                  </p>
                  <PayListWrap
                    category="attraction"
                    data={data}
                    totalBooking={totalBooking()}
                    hour={hour}
                    childrenNumber={children}
                    adult={adult}
                  />
                </form>
              </Form>
            </div>
            <div
              className={cn(
                "w-full lg:w-[80%] posing-vertical-3 !mt-0 lg:!mt-auto ",
                "lg:sticky lg:top-[2rem]"
              )}
            >
              <div
                className={cn(
                  "w-full h-full flex items-start justify-start gap-2 border-b-[0.4px] border-[#999] py-4"
                )}
              >
                <Image
                  alt="img-booking"
                  src={data?.images[0]}
                  width={900}
                  height={600}
                  sizes="50"
                  className="w-[8rem] h-[8rem] rounded-lg"
                />
                <div>
                  <h4 className="font-bold text-normal">{data?.name}</h4>
                  <address className="text-smallest text-black_sub">
                    {data?.location.detail}
                  </address>
                </div>
              </div>
              <div className="w-full h-full border-b-[0.4px] border-[#999] posing-vertical-4 py-2">
                <div className="flex items-center justify-start gap-x-2 text-normal font-medium">
                  <span>Thời gian: </span>
                  <span className="underline text-blue_main_sub font-semibold">
                    {hour} ngày {date}
                  </span>
                </div>
                <div className="w-full posing-vertical-5 text-[1rem]">
                  {adult !== 0 && (
                    <div className="w-full flex items-center justify-between gap-2">
                      <div>
                        <span className="font-medium text-[1rem]">{adult}</span>
                        <span className="font-semibold text-[1rem]">
                          {" "}
                          <span className="text-yellow_main">*</span> Người lớn
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
                          <span className="text-yellow_main">*</span> Trẻ em
                        </span>
                      </div>
                      <div>{data && formatPrice(data.price[1])} VNĐ</div>
                    </div>
                  )}
                </div>
                <div className="w-full flex items-center justify-between gap-2 text-blue_main_sub">
                  <span className="font-semibold text-medium">Tổng tiền:</span>
                  <div>
                    <span className="font-bold text-medium">
                      {totalBooking()} VNĐ
                    </span>
                  </div>
                </div>
                <div>
                  <span className="text-black_sub text-small">
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
