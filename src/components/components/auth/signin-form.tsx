"use client";

import { reqLogin } from "@/api/api-auth";
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
import { useAuthenticatedStore } from "@/store/authencation-store";
import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import Checkbox from "../form/input/Checkbox";
import Input from "../form/input/InputField";
import SuccessModal from "../success-modal";

const signInBody = z
  .object({
    email: z.string().email("Vui lòng nhập email"),
    password: z
      .string()
      .min(6, "Mật khẩu không được để trống")
      .max(100, "Mật khẩu không quá 100 kí tự"),
  })
  .strict();
type SignupFormData = z.infer<typeof signInBody>;

export default function SignInForm() {
  const form = useForm<SignupFormData>({
    resolver: zodResolver(signInBody),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();
  const { setIsAuthenticated, setUserLogined } = useAuthenticatedStore();
  const mutationLogin = useMutation({
    mutationFn: reqLogin,
  });
  const onSubmit = async (data: SignupFormData) => {
    try {
      if (data.email === "" || data.password === "") {
        toast.warning("Vui lòng nhập đầy đủ thông tin!");
      }
      mutationLogin.mutate(data, {
        onSuccess: async (res) => {
          if (res?.status === 200) {
            if (res.data.code === 403) {
              return toast.warning(res.data.message);
            }
            const userData = res.data.user;
            setIsAuthenticated();
            setUserLogined({
              id: userData._id,
              name: userData.firstname + " " + userData.lastname,
              accessToken: res.data.accessToken,
              refreshToken: res.data.refreshToken,
              ...userData,
            });
            Cookies.set("accessToken", res.data.accessToken);
            Cookies.set("refreshToken", res.data.refreshToken);
            Cookies.set("userId", userData._id);
            Cookies.set("roles", userData.roles);

            // Hiển thị modal
            setIsModalOpen(true);

            // Tự động chuyển hướng sau khi modal đóng
            setTimeout(() => {
              router.push("/home");
            }, 1700);
          } else {
            toast.error("Sai email hoặc mật khẩu!");
          }
        },
        onError: async (err) => {
          toast.error("Lỗi khi đăng nhập. Liên hệ quản trị viên!");
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  if (mutationLogin.isPending) {
    return <LoadingPage />;
  }
  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full px-0 sm:px-2 lg:px-8 py-6 lg:py-10">
      <SuccessModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Đăng nhập thành công!"
        message="Chào mừng bạn quay lại!"
      />
      <div className="w-full max-w-md mx-auto">
        <Link
          href="/home"
          className="inline-flex items-center text-sm text-black_sub transition-colors underline"
        >
          <ChevronLeftIcon />
          Quay lại
        </Link>
      </div>
      <div className="flex flex-col mt-5 lg:mt-0 lg:justify-center flex-1 w-full max-w-md mx-auto ">
        <div className="bg-white p-3 md:p-4 lg:p-6 rounded-lg shadow-md">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-black mb-2">
              Đăng Nhập
            </h1>
            <p className="text-sm text-black_sub">
              Nhập email và mật khẩu để đăng nhập!
            </p>
          </div>
          <div>
            <SignIn.Root>
              <SignIn.Step name="start">
                <div className="w-full grid grid-cols-2 gap-x-4">
                  <Clerk.Connection
                    lang="vi-VN"
                    name="google"
                    className="flex items-center gap-x-3 justify-center  font-light text-sm border shadow-sm py-1.5 px-2.5 rounded-md"
                  >
                    <Clerk.Icon className="size-4" />
                    Google
                  </Clerk.Connection>

                  <Clerk.Connection
                    lang="vi-VN"
                    name="facebook"
                    className="flex items-center gap-x-3 justify-center  font-light text-sm border shadow-sm py-1.5 px-2.5 rounded-md"
                  >
                    <Clerk.Icon className="size-4" />
                    Facebook
                  </Clerk.Connection>
                </div>
              </SignIn.Step>
            </SignIn.Root>
            <div className="relative py-3 sm:py-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="p-2 text-gray-400 bg-white dark:bg-gray-900 sm:px-5 sm:py-2">
                  Or
                </span>
              </div>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-normal">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="text-base"
                          placeholder="Email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red_main" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-normal">
                        Mật khẩu
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Nhập mật khẩu"
                            {...field}
                            className="text-base"
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

                <Button
                  type="submit"
                  size={"lg"}
                  className="w-full bg-blue_sub hover:bg-blue_active"
                >
                  <span className="text-white text-base font-medium">
                    Đăng nhập
                  </span>
                </Button>
                <div className="w-full flex items-center justify-between">
                  <div
                    className="flex items-center gap-x-1 cursor-pointer"
                    onClick={() => setRemember(!remember)}
                  >
                    <Checkbox
                      checked={remember}
                      onChange={(e) => setRemember(e)}
                      id="check-remember"
                    />
                    <Label
                      htmlFor="check-remember"
                      className="select-none text-sm cursor-pointer"
                    >
                      Nhớ tài khoản!
                    </Label>
                  </div>
                  <h4 className="text-xs underline cursor-pointer text-blue_sub">
                    Quên mật khẩu
                  </h4>
                </div>
              </form>
            </Form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-black_sub">
                Bạn chưa có tài khoản?{" "}
                <Link
                  href="/sign-up"
                  className="text-sm text-blue hover:text-blue_main_sub"
                >
                  Đăng ký
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
