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
import { reqLogin, reqRegiter } from "@/api/api-auth";
import { useRouter } from "next/navigation";
import { useAuthenticatedStore } from "@/store/authencation-store";
import { LoadingPage } from "@/components/components/loading";
import { toast } from "react-toastify";
import { Label } from "@radix-ui/react-label";

const signUpBody = z
  .object({
    firstname: z.string().min(6, "Vui lòng nhập họ, tên đệm ").max(100),
    lastname: z.string().min(2, "Vui lòng nhập tên").max(100),
    numberPhone: z.string().min(9, "Nhập đúng số ĐT").max(11),
    email: z.string().email("Vui lòng nhập email"),
    password: z
      .string()
      .min(6, "Nhập đúng mật khẩu")
      .max(100, "Mật khẩu không quá 100 kí tự"),
    confirmPassword: z
      .string()
      .min(6, "Nhập đúng mật khẩu")
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

const FormLogin: React.FC = () => {
  const form = useForm<SignupFormData>({
    resolver: zodResolver(signUpBody),
    defaultValues: {
      firstname: "",
      lastname: "",
      numberPhone: undefined,
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  const router = useRouter();

  const onSubmit = async (data: SignupFormData) => {
    if (checked === false) {
      return toast.warning("Điều khoản dịch vụ của chúng tôi", {
        className: "toast-warning",
      });
    }
    setIsLoading(true);
    try {
      const result = await reqRegiter(data);
      if (result.code === 401) {
        toast.error("Lỗi đi tạo mới tài khoản", {
          className: "toast-error",
        });
      }
      if (result) {
        toast.success("Tạo tài khoản thành công", {
          className: "toast-success",
        });
        router.replace("/sign-in");
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4  w-full"
        noValidate
      >
        <div className="w-full grid gap-x-4 md:grid-cols-2 md:gap-x-2">
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Họ</FormLabel>
                <FormControl>
                  <Input placeholder="VD: Nguyen Van" {...field} />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />{" "}
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên</FormLabel>
                <FormControl>
                  <Input placeholder="VD:A" {...field} />
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
                <Input placeholder="VD:email@gmail.com" {...field} />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="numberPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Số ĐT</FormLabel>
              <FormControl>
                <Input type="number" placeholder="VD:+8400476486" {...field} />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <h5 className="text-small text-blue_main_sub font-normal">
          Lưu ý: Mật khẩu phải tối thiểu 8 kí tự,1 chữ số, 1 chữ cái và 1 kí tự
          đặc biệt
        </h5>
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nhập lại Mật khẩu</FormLabel>
              <FormControl>
                <Input type="password" placeholder="" {...field} />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-start gap-x-2">
          <Input
            type="checkbox"
            id="checkBox"
            className="size-4"
            onChange={(e) => {
              setChecked(e.target.checked);
            }}
          />
          <Label htmlFor="checkBox" className="text-small hover:cursor-pointer">
            Đồng ý vơi điều khoản dịch vụ và quyền riêng tư bảo mật của chúng
            tôi
          </Label>
        </div>
        <Button
          type="submit"
          className="w-full bg-bg_primary_blue_sub hover:bg-bg_primary_active"
        >
          <span className="text-white text-normal font-medium"> Đăng ký</span>
        </Button>
        <div className="w-full flex items-center justify-between">
          <h4 className="text-small ">
            Bạn đã có tài khoản
            <Link
              href="/sign-in"
              className="text-blue_main_sub ml-1 underline "
            >
              Đăng nhập
            </Link>
          </h4>
        </div>
      </form>
    </Form>
  );
};

export default FormLogin;
