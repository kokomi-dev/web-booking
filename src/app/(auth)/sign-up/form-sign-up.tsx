"use client";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { reqRegiter } from "@/api/api-auth";
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

const FormSignUp: React.FC = () => {
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
  const [checked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const mutationRegister = useMutation({
    mutationFn: reqRegiter,
  });
  const onSubmit = async (data: SignupFormData) => {
    if (checked === false) {
      return toast.warning("Điều khoản dịch vụ của chúng tôi", {
        className: "toast-warning",
      });
    }
    try {
      mutationRegister.mutate(
        { ...data, groupId: ["6"], roles: "custommer" },
        {
          onSuccess: async (res) => {
            if (res.status === 200) {
              console.log(res);
              toast.success("Tạo tài khoản thành công");
              router.push("/sign-in");
            }
          },
          onError: async (err) => {
            toast.error(
              "Lỗi khi tạo tài khoản. Liên hệ quản trị viên qua hotline"
            );
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  if (mutationRegister.isPending) {
    return <LoadingPage />;
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4  w-full "
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
          <span className="text-red-600 font-medium"> Lưu ý:</span> Mật khẩu
          phải tối thiểu 8 kí tự,1 chữ số, 1 chữ cái và 1 kí tự đặc biệt
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
                    placeholder="Mật khẩu"
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nhập lại Mật khẩu</FormLabel>
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
        <div className="flex items-center justify-start gap-x-2">
          <Input
            type="checkbox"
            id="checkBox"
            className="size-4 hover:cursor-pointer"
            onChange={(e) => {
              setChecked(e.target.checked);
            }}
          />
          <Label htmlFor="checkBox" className="text-small hover:cursor-pointer">
            Đồng ý với{" "}
            <Link
              href="/content/privacy?activeTab=3"
              className="text-blue_main_sub underline"
            >
              điều khoản dịch vụ
            </Link>{" "}
            và{" "}
            <Link
              href="/content/privacy?activeTab=2"
              className="text-blue_main_sub underline"
            >
              quyền riêng tư bảo mật
            </Link>{" "}
            của chúng tôi
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
            Bạn đã có tài khoản!
            <Link
              href="/sign-in"
              className="text-blue_main_sub ml-1 underline text-small font-semibold"
            >
              Đăng nhập
            </Link>
          </h4>
        </div>
      </form>
    </Form>
  );
};

export default FormSignUp;
