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
import { Input } from "@/components/ui/input";
import { useAuthenticatedStore } from "@/store/authencation-store";
import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const signInBody = z
  .object({
    email: z.string().email("Vui lòng nhập email"),
    password: z
      .string()
      .min(6, "Nhập đúng mật khẩu")
      .max(100, "Mật khẩu không quá 100 kí tự"),
  })
  .strict();
type SignupFormData = z.infer<typeof signInBody>;

export default function SignInPage() {
  const form = useForm<SignupFormData>({
    resolver: zodResolver(signInBody),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { setIsAuthenticated, setUserLogined } = useAuthenticatedStore();
  const mutationLogin = useMutation({
    mutationFn: reqLogin,
  });
  const onSubmit = async (data: SignupFormData) => {
    try {
      mutationLogin.mutate(data, {
        onSuccess: async (res) => {
          if (res?.status === 200) {
            const userData = res.data.user;
            setIsAuthenticated();
            setUserLogined({
              id: userData._id,
              name: userData.firstname + " " + userData.lastname,
              accessToken: res.data.accessToken,
              refreshToken: res.data.refreshToken,
              ...userData,
            }),
              Cookies.set("accessToken", res.data.accessToken);
            Cookies.set("refreshToken", res.data.refreshToken);
            Cookies.set("userId", userData._id);
            Cookies.set("roles", userData.roles);
            const previousUrl = document.referrer || "/home";
            router.push(
              previousUrl.includes(window.location.origin)
                ? previousUrl
                : "/home",
              { scroll: true }
            );

            toast.success("Đăng nhập thành công!");
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
    <div className="w-full flex items-center justify-center">
      <div className="w-full md:w-[80%] lg:w-[60%]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 w-full h-full "
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-normal">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" className="" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-normal">Mật khẩu</FormLabel>
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
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-bg_primary_blue_sub hover:bg-bg_primary_active"
            >
              <span className="text-white text-normal font-medium">
                Đăng nhập
              </span>
            </Button>
            <div className="w-full flex items-center justify-between">
              <div
                className="w-auto flex items-center justify-start gap-x-1 hover:cursor-pointer"
                onClick={() => {
                  setRemember(!remember);
                }}
              >
                <Input
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  type="checkbox"
                  id="check-remember"
                  className="size-4 hover:cursor-pointer select-none"
                />
                <Label
                  htmlFor="check-remember "
                  className="select-none text-small hover:cursor-pointer"
                >
                  Nhớ tài khoản !
                </Label>
              </div>
              <h4 className="text-smallest underline hover:cursor-pointer text-blue_main_sub">
                Quên mật khẩu
              </h4>
            </div>
          </form>
        </Form>
        <span className="text-center block my-4 relative h-[24px] ">
          <span className="absolute z-[5] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full h-[1px] bg-black"></span>
          <span className="z-[10] px-3 absolute  top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-bg_black_sub rounded-8 text-black">
            hoặc
          </span>
        </span>
        <SignIn.Root>
          <SignIn.Step name="start">
            <div className="grid grid-cols-2 gap-x-4">
              <Clerk.Connection
                lang="vi-VN"
                name="google"
                className="flex items-center gap-x-3 justify-center font-medium border shadow-sm py-1.5 px-2.5 rounded-md"
              >
                <Clerk.Icon className="size-4" />
                Google
              </Clerk.Connection>

              <Clerk.Connection
                lang="vi-VN"
                name="facebook"
                className="flex items-center gap-x-3 justify-center font-medium border shadow-sm py-1.5 px-2.5 rounded-md"
              >
                <Clerk.Icon className="size-4" />
                Facebook
              </Clerk.Connection>
            </div>
          </SignIn.Step>
        </SignIn.Root>
        <h4 className="text-small mt-4 ">
          Bạn chưa có tài khoản!{" "}
          <Link
            href="/sign-up"
            className="text-blue_main_sub ml-1 underline font-semibold "
          >
            Đăng ký
          </Link>
        </h4>
      </div>
    </div>
  );
}
