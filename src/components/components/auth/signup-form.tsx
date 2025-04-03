"use client";
import { reqRegiter } from "@/api/api-auth";
import ButtonShowPassWord from "@/components/auth/button-show-password";
import { LoadingPage } from "@/components/components/loading";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { useMutation } from "@tanstack/react-query";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import Checkbox from "../form/input/Checkbox";
import Input from "../form/input/InputField";

const signUpBody = z
  .object({
    firstname: z.string().min(6, "Vui lòng nhập họ, tên đệm ").max(100),
    lastname: z.string().min(2, "Vui lòng nhập tên").max(100),
    numberPhone: z.string().min(9, "Nhập đúng số ĐT").max(11),
    email: z.string().email("Vui lòng nhập email"),
    password: z
      .string()
      .min(8, "Mật khẩu phải đủ 8 kí tự")
      .max(100, "Mật khẩu không quá 100 kí tự")
      .regex(/[a-zA-Z]/, "Mật khẩu phải chứa ít nhất 1 chữ cái")
      .regex(/\d/, "Mật khẩu phải chứa ít nhất 1 chữ số")
      .regex(/[^a-zA-Z0-9]/, "Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt"),

    confirmPassword: z
      .string()
      .min(8, "Nhập đúng mật khẩu")
      .max(100, "Mật khẩu không quá 100 kí tự"),
  })
  .strict()
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Mật khẩu không khớp",
        path: ["confirmPassword"],
      });
    }
  });

type SignupFormData = z.infer<typeof signUpBody>;

const SignUpForm: React.FC = () => {
  const form = useForm<SignupFormData>({
    resolver: zodResolver(signUpBody),
    defaultValues: {
      firstname: "",
      lastname: "",
      numberPhone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const mutationRegister = useMutation({
    mutationFn: reqRegiter,
  });

  const onSubmit = async (data: SignupFormData) => {
    if (!checked) {
      return toast.warning("Vui lòng đồng ý với điều khoản dịch vụ", {
        className: "toast-warning",
      });
    }
    try {
      mutationRegister.mutate(
        { ...data, groupId: ["6"], roles: "custommer" },
        {
          onSuccess: (res) => {
            if (res?.status === 200 && res.data.code == 409) {
              return toast.warning("Email đã tồn tại. Vui lòng thử email khác");
            }
            if (res?.status === 201) {
              toast.success("Tạo tài khoản thành công!");
              router.push("/sign-in");
            }
          },
          onError: (err: any) => {
            if (err?.response) {
              const { code, message } = err.response.data;
              if (code === 400) {
                toast.error("Dữ liệu nhập vào không hợp lệ.");
              } else {
                toast.error(message || "Đã xảy ra lỗi. Vui lòng thử lại sau.");
              }
            } else {
              toast.error("Không thể kết nối đến server.");
            }
          },
        }
      );
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("Đã xảy ra lỗi không xác định.");
    }
  };

  if (mutationRegister.isPending) {
    return <LoadingPage />;
  }

  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full h-full px-4 sm:px-6 lg:px-8 py-6 lg:py-10 bg-gray-50">
      <div className="w-full max-w-md mx-auto">
        <Link
          href="/sign-in"
          className="inline-flex items-center text-sm text-black_sub transition-colors"
        >
          <ChevronLeftIcon />
          Đăng nhập
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold text-black mb-4">Đăng ký</h1>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
              noValidate
            >
              {/* Họ và Tên */}
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Họ</FormLabel>
                      <FormControl>
                        <Input placeholder="VD: Nguyễn Văn" {...field} />
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
                      <FormLabel>Tên</FormLabel>
                      <FormControl>
                        <Input placeholder="VD: A" {...field} />
                      </FormControl>
                      <FormMessage className="text-red_main" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="VD: email@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage className="text-red_main" />
                  </FormItem>
                )}
              />

              {/* Số điện thoại */}
              <FormField
                control={form.control}
                name="numberPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số điện thoại</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="VD: +840123456789"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red_main" />
                  </FormItem>
                )}
              />

              {/* Mật khẩu */}
              <h5 className="text-sm text-blue_sub font-normal">
                <span className="text-red-600 font-medium">Lưu ý:</span> Mật
                khẩu phải tối thiểu 8 kí tự, 1 chữ số, 1 chữ cái và 1 kí tự đặc
                biệt.
              </h5>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mật khẩu</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Nhập mật khẩu"
                          {...field}
                        />
                        <ButtonShowPassWord
                          show={showPassword}
                          setShow={setShowPassword}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red_main" />
                  </FormItem>
                )}
              />

              {/* Nhập lại mật khẩu */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nhập lại mật khẩu</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Nhập lại mật khẩu"
                          {...field}
                        />
                        <ButtonShowPassWord
                          show={showPassword}
                          setShow={setShowPassword}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red_main" />
                  </FormItem>
                )}
              />

              {/* Điều khoản */}
              <div className="flex items-center gap-2">
                <Checkbox
                  id="checkBox"
                  checked={checked}
                  onChange={(e) => setChecked(e)}
                />
                <Label
                  htmlFor="checkBox"
                  className="text-sm hover:cursor-pointer"
                >
                  Đồng ý với{" "}
                  <Link
                    href="/content/privacy?activeTab=3"
                    className="text-blue_sub underline"
                  >
                    điều khoản dịch vụ
                  </Link>{" "}
                  và{" "}
                  <Link
                    href="/content/privacy?activeTab=2"
                    className="text-blue_sub underline"
                  >
                    quyền riêng tư bảo mật
                  </Link>{" "}
                  của chúng tôi.
                </Label>
              </div>

              {/* Nút đăng ký */}
              <Button
                type="submit"
                size={"lg"}
                className="w-full bg-blue_sub hover:bg-blue_active"
              >
                <span className="text-white text-base font-medium">
                  Đăng ký
                </span>
              </Button>

              {/* Đã có tài khoản */}
              <div className="text-center mt-4">
                <p className="text-sm">
                  Bạn đã có tài khoản?{" "}
                  <Link
                    href="/sign-in"
                    className="text-blue_sub underline font-medium"
                  >
                    Đăng nhập
                  </Link>
                </p>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
