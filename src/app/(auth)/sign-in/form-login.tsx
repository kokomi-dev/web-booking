"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/components/form-input";
import { reqLogin } from "@/api/api-auth";
import Loading from "@/app/loading";
import { useAuthenticatedStore } from "@/store/authencation-store";

const FormLogin = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { setUserLogined, setIsAuthenticated } = useAuthenticatedStore();
  const router = useRouter();
  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await reqLogin(user);
      if (result.token) {
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
  return (
    <form
      action={process.env.NEXT_PUBLIC_API_ENDPOINT + "/auth/login"}
      method="POST"
      className="flex flex-col items-start justify-start gap-4"
    >
      {isLoading && <Loading fix />}
      <FormInput
        title="email"
        value={user.email}
        type="email"
        onChange={(e) => {
          setUser({ ...user, email: e.target.value });
        }}
      />
      <FormInput
        title="Mật khẩu"
        value={user.password}
        type="password"
        onChange={(e) => {
          setUser({ ...user, password: e.target.value });
        }}
      />

      <Button
        disabled={!user.email || !user.password}
        type="submit"
        className="w-full my-4 bg-bg_primary_blue_sub text-white text-normal font-medium"
        onClick={handleLogin}
      >
        Đăng nhập
      </Button>
      <div
        className={cn(
          "text-[0.9rem] w-full flex items-center justify-between ",
          "lg:text-[1rem]"
        )}
      >
        <span
          className={cn(
            "text-blue_main_sub  transition-all duration-300",
            "hover:underline"
          )}
        >
          Quên mật khẩu
        </span>
        <h6>
          <span className="text-gray-400 mr-1">Bạn chưa có tài khoản</span>
          <Link href="/sign-up" className="text-blue_main_sub underline">
            Đăng ký
          </Link>
        </h6>
      </div>
    </form>
  );
};

export default FormLogin;
