"use client";
import React, { Suspense, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Bell, UserPen } from "lucide-react";
import { useRouter } from "next/navigation";

import { reqUpdateUser } from "@/api/api-auth";
import FormInput from "@/components/components/form-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/utils/constants";
import { useAuthenticatedStore } from "@/store/authencation-store";
import Loading from "../loading";

const MySetingPage = () => {
  const { user } = useAuthenticatedStore();
  const route = useRouter();
  const [firstname, setFirstname] = useState(user?.firstname);
  const [lastname, setLastname] = useState(user?.lastname);
  const [password, setPassword] = useState("");
  const [passwordNew, setPasswordNew] = useState("");
  const [passwordNewConfirm, setPasswordNewConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFirstname(user?.firstname || "");
    setLastname(user?.lastname || "");
  }, [user]);

  const hasNameChanged = (
    firstname: string | undefined,
    lastname: string | undefined,
    user: any
  ) => {
    if (firstname !== user?.firstname || lastname !== user?.lastname) {
      return true;
    }
    return false;
  };
  const isChanged = hasNameChanged(firstname, lastname, user);
  const data = {
    firstname,
    lastname,
    password,
    passwordNew,
    passwordNewConfirm,
  };
  const handleChangePassword = async () => {
    if (!passwordNew) {
      return toast.error("Mật khẩu không được để trông");
    }
    if (!passwordNewConfirm) {
      return toast.error("Vui lòng nhập lại mật khẩu mới");
    }
    if (passwordNew !== passwordNewConfirm) {
      return toast.error("Mật khẩu mới không trùng khớp");
    }
    setLoading(true);
    try {
      if (user) {
        const res = await reqUpdateUser(user._id, {
          password,
          passwordNew,
          passwordNewConfirm,
        });
        if (res) {
          await route.refresh();
          toast.success("Đổi mật khẩu thành công");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleChangeName = async () => {
    if (!firstname) {
      return toast.error("Họ không được để trống");
    }
    if (!lastname) {
      return toast.error("Tên không được để trông");
    }
    setLoading(true);
    try {
      if (firstname && lastname && user) {
        const res = await reqUpdateUser(user._id, {
          firstname,
          lastname,
        });
        if (res) {
          await route.refresh();
          toast.success("Đổi tên thành công");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <Loading />;
  }

  return (
    <Suspense fallback={<Loading />}>
      <div className={cn("w-full h-full text-small text-black py-4 ")}>
        <div className="w-full flex flex-col items-start justify-start gap-4">
          <div>
            <h1 className="text-large font-bold ">Cài đặt tài khoản</h1>
            <p className="text-black_sub text-small">
              Quản lí trải nhiệm KoKoTravel của bạn
            </p>
          </div>
          <section className="w-full h-full flex flex-col items-start justify-start gap-2 ">
            <div className="text-medium font-semibold flex items-center justify-start gap-1">
              <UserPen className="w-5 h-5" />
              <h3>Thông tin tài khoản</h3>
            </div>
            {user && user.firstname && (
              <div className="w-full grid gap-2 ">
                <div
                  className={cn(
                    "w-full flex flex-col items-start justify-start gap-y-4 border-0.5 border-black_sub rounded-8 p-2",
                    "md:flex-row md:items-start md:justify-between md:gap-x-6 md:p-4"
                  )}
                >
                  <div className="w-full flex flex-col items-start justify-start gap-2">
                    <Label
                      htmlFor="email"
                      className="text-right text-small font-normal"
                    >
                      Email
                    </Label>
                    <Input
                      id="email"
                      readOnly
                      value={user.email}
                      className="col-span-3"
                    />
                    <h4 className="text-smallest text-blue_main_sub my-1">
                      Chúng tôi sẽ gửi mail xác nhận tới email này
                    </h4>
                    <Button
                      disabled
                      className="bg-bg_primary_blue_sub hover:bg-bg_primary_active text-white"
                    >
                      Đổi email
                    </Button>
                  </div>

                  <div className="w-full flex flex-col items-start justify-start gap-2">
                    <Label
                      htmlFor="numberPhone"
                      className="text-right text-small font-normal"
                    >
                      Số điện thoại
                    </Label>
                    <Input
                      readOnly
                      id="numberPhone"
                      value={user.numberPhone}
                      className="col-span-3"
                    />
                    <Button
                      disabled
                      className="bg-bg_primary_blue_sub hover:bg-bg_primary_active text-white"
                    >
                      Đổi Số ĐT
                    </Button>
                  </div>
                </div>
                <div
                  className={cn(
                    "w-full flex flex-col items-start justify-start gap-y-6 border-0.5 border-black_sub rounded-8 p-1",
                    "md:flex-row md:justify-between md:items-start md:p-4 md:gap-x-6"
                  )}
                >
                  <div className="w-full flex flex-col items-center justify-between gap-y-2 p-2 ">
                    <FormInput
                      className="text-smallest "
                      title="họ"
                      onChange={(e) => {
                        setFirstname(e.target.value);
                      }}
                      value={firstname}
                      type="text"
                    />
                    <FormInput
                      className="text-smallest"
                      title="tên"
                      onChange={(e) => {
                        setLastname(e.target.value);
                      }}
                      value={lastname}
                      type="text"
                    />
                    <Button
                      disabled={!isChanged}
                      onClick={handleChangeName}
                      className="w-full text-white text-small font-normal bg-bg_primary_blue_sub hover:bg-bg_primary_active"
                    >
                      <span className="text-white"> Lưu thay đổi</span>
                    </Button>
                  </div>
                  <div className="w-full flex flex-col items-start justify-start gap-y-2 p-2  ">
                    <FormInput
                      className="text-smallest"
                      title="Mật khẩu hiện tại"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      type="password"
                    />
                    <hr className="hr" />
                    <h4 className="text-smallest text-blue_main">
                      Mật khấu phải có 8 kí tự, 1 chữ số, 1 kí tự
                    </h4>
                    <FormInput
                      className="text-smallest"
                      title="Mật khẩu mới"
                      value={passwordNew}
                      onChange={(e) => {
                        setPasswordNew(e.target.value);
                      }}
                      type="password"
                    />
                    <FormInput
                      className="text-smallest"
                      title="Nhập lại"
                      value={passwordNewConfirm}
                      onChange={(e) => {
                        setPasswordNewConfirm(e.target.value);
                      }}
                      type="password"
                    />
                    <Button
                      className="bg-bg_primary_blue_sub text-white hover:bg-bg_primary_main w-full text-small font-normal"
                      onClick={handleChangePassword}
                      disabled={
                        !password || !passwordNew || !passwordNewConfirm
                      }
                    >
                      <span className="text-white"> Đổi mật khẩu</span>
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </section>

          <section className="w-full h-full flex flex-col items-start justify-start gap-2 border-0.5 border-black_sub rounded-8 p-1 md:p-4">
            <div className="text-medium font-semibold flex items-center justify-start gap-1">
              <Bell className="w-5 h-5" />
              <h3>Thông báo tài khoản</h3>
            </div>
            <div className="w-full flex flex-col items-start justify-start gap-1 p-2">
              <div className="flex items-center justify-start gap-x-2">
                <input type="checkbox" id="checkox-send-email" />
                <label
                  htmlFor="checkox-send-email"
                  className="text-small text-black font-normal cursor-pointer"
                >
                  Gửi thông báo về email của bạn
                </label>
              </div>
              <div className="flex items-center justify-start gap-x-2">
                <input type="checkbox" id="checkox-send-notify" />
                <label
                  htmlFor="checkox-send-notify"
                  className="text-small text-black font-normal cursor-pointer"
                >
                  Nhận thông báo về thiết bị của bạn về thông tin mới của chúng
                  tôi
                </label>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Suspense>
  );
};

export default MySetingPage;
