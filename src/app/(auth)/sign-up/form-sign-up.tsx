"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import FormInput from "@/components/components/form-input";
import { reqRegiter } from "@/api/api-auth";
import Loading from "@/app/loading";

const FormSignUp = () => {
  const [user, setUser] = useState<{
    firstname: string;
    lastname: string;
    email: string;
    numberPhone: string;
    password: string;
  }>({
    firstname: "",
    lastname: "",
    email: "",
    numberPhone: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const handlesubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (user.password !== confirmPassword) {
      setIsLoading(false);
      return toast.warning("Mật khẩu không khớp!");
    }
    try {
      const response = await reqRegiter(user);
      if (response) {
        setIsLoading(false);
        toast.success("Tạo tài khoản thành công");
        router.replace("/sign-in");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };
  return (
    <div className="w-full ">
      {isLoading && <Loading fix={true} />}
      <form
        action="/"
        method="POST"
        className="flex flex-col items-start justify-start gap-3"
      >
        <div
          className={cn(
            "w-full grid grid-cols-1 gap-x-2",
            "lg:grid-cols-2 lg:gap-y-3"
          )}
        >
          <FormInput
            title="Họ"
            value={user.firstname}
            type="text"
            placeholder="VD: Nguyen Van"
            onChange={(e) => {
              setUser({ ...user, firstname: e.target.value });
            }}
          />
          <FormInput
            placeholder="VD: A"
            title="Tên"
            value={user.lastname}
            type="text"
            onChange={(e) => {
              setUser({ ...user, lastname: e.target.value });
            }}
          />
        </div>
        <FormInput
          placeholder="VD: email@gmail.com"
          title="Email"
          value={user.email}
          type="email"
          onChange={(e) => {
            setUser({ ...user, email: e.target.value });
          }}
        />
        <FormInput
          placeholder="VD: +8400123123"
          title="Số ĐT"
          value={user.numberPhone}
          type="number"
          onChange={(e) => {
            setUser({ ...user, numberPhone: e.target.value });
          }}
        />
        <span className="text-red-400 text-center block w-full text-[0.9rem] font-light">
          Lưu ý : Mật khẩu phải tối thiểu 8 kí tự, 1 chữ cái, 1 số và 1 kí tự
          đặc biệt
        </span>
        <FormInput
          placeholder="VD: matkhau@1"
          title="Mật khẩu "
          value={user.password}
          type="password"
          onChange={(e) => {
            setUser({ ...user, password: e.target.value });
          }}
        />
        <FormInput
          title="Nhập lại mật khẩu"
          value={confirmPassword}
          type="password"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
        <div className="flex items-center justify-start gap-1">
          <input type="checkbox" id="check_private" onChange={handleChecked} />
          <label
            htmlFor="check_private"
            className="cursor-pointer text-[0.9rem] select-none "
          >
            Đồng ý với điều khoản dịch vụ và quyền riêng tư bảo mật của chúng
            tôi
          </label>
        </div>
        <Button
          className="w-full my-4"
          onClick={handlesubmit}
          disabled={
            !user.lastname ||
            !user.email ||
            !user.firstname ||
            !confirmPassword ||
            !user.password ||
            !user.numberPhone ||
            !checked
          }
        >
          Đăng ký
        </Button>
        <div
          className={cn(
            "text-[0.9rem] w-full flex items-center justify-between ",
            "lg:text-[1rem]"
          )}
        >
          <h6>
            <span className="text-gray-400 mr-1">Bạn đã có tài khoản</span>
            <Link href="/sign-in" className="text-red-400 underline">
              Đăng nhập
            </Link>
          </h6>
        </div>
      </form>
    </div>
  );
};

export default FormSignUp;
