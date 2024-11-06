"use client";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { reqLogin } from "@/api/api-auth";
import { useRouter } from "next/navigation";
import { useAuthenticatedStore } from "@/store/authencation-store";
import { LoadingPage } from "@/components/components/loading";
import { toast } from "react-toastify";

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

const FormLogin: React.FC = () => {
  const form = useForm<SignupFormData>({
    resolver: zodResolver(signInBody),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
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
      }
      if (result.token) {
        toast.success("Đăng nhập thành công");
        router.replace("/attractions");
        setIsAuthenticated();
        setUserLogined(result);
        localStorage.setItem("token", result.token);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) {
    <LoadingPage />;
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
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
              <FormLabel>Mật khẩu</FormLabel>
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
          <span className="text-white text-normal font-medium"> Đăng nhập</span>
        </Button>
        <div className="w-full flex items-center justify-between">
          <h4 className="text-small ">
            Bạn chưa có tài khoản{" "}
            <Link
              href="/sign-up"
              className="text-blue_main_sub ml-1 underline "
            >
              Đăng ký
            </Link>
          </h4>
          <h4 className="text-small underline hover:cursor-pointer">
            Quên mật khẩu
          </h4>
        </div>
      </form>
    </Form>
  );
};

export default FormLogin;
