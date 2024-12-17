"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "react-toastify";
import { reqLogin } from "@/api/api-auth";
import { useAuthenticatedStore } from "@/store/authencation-store";
import { useRouter } from "next/navigation";
import { LoadingPage } from "@/components/components/loading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Label } from "@radix-ui/react-label";

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
      email: localStorage.getItem("email-remember") ?? "",
      password: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [remember, setRemember] = useState(false);
  const router = useRouter();
  const { setIsAuthenticated, setUserLogined } = useAuthenticatedStore();

  const onSubmit = async (data: SignupFormData) => {
    try {
      setIsLoading(true);
      const result = await reqLogin(data);

      if (result.code === 404) {
        toast.error(result.message, {
          className: "toast-error",
        });
        return;
      }
      if (result.token) {
        toast.success("Đăng nhập thành công");
        setIsAuthenticated();
        setUserLogined(result);
        localStorage.setItem("token", result.token);
        if (remember) {
          localStorage.setItem("email-remember", result.user.email);
        } else {
          localStorage.removeItem("email-remember");
        }
        router.replace("/home");
      }
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra, vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
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
                    <Input type="password" placeholder="Mật khẩu" {...field} />
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
                name="google"
                className="flex items-center gap-x-3 justify-center font-medium border shadow-sm py-1.5 px-2.5 rounded-md"
              >
                <Clerk.Icon className="size-4" />
                Google
              </Clerk.Connection>

              <Clerk.Connection
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
