"use client";
import {
  ChevronDownIcon,
  PhoneOutgoingIcon,
  UserCircleIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  reqCheckUpdateUserPass,
  reqUpdateUser,
  reqUserSendOtp,
} from "@/api/api-auth";
import BreadcrumbHead from "@/components/components/breadcrumb";
import Checkbox from "@/components/components/form/input/Checkbox";
import Input from "@/components/components/form/input/InputField";
import Radio from "@/components/components/form/input/Radio";
import TextArea from "@/components/components/form/input/TextArea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuthenticatedStore } from "@/store/authencation-store";
import Loading from "../loading";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { LoadingSpin } from "@/components/components/loading";
import { validatePasword } from "@/utils/constants";

const MySetingPage = () => {
  const { user } = useAuthenticatedStore();
  const route = useRouter();
  const [firstname, setFirstname] = useState(user?.firstname);
  const [lastname, setLastname] = useState(user?.lastname);
  const [password, setPassword] = useState("");
  const [passwordNew, setPasswordNew] = useState("");
  const [passwordNewConfirm, setPasswordNewConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [checkPass, setCheckPassword] = useState({
    pass: false,
    code: false,
  });
  useEffect(() => {
    setFirstname(user?.firstname || "");
    setLastname(user?.lastname || "");
  }, [user]);

  const handleCheckPassword = async () => {
    try {
      setLoading(true);
      if (user) {
        if (!validatePasword(passwordNew)) {
          setLoading(false);
          return toast.error("Mật khẩu mới chưa đủ điều kiện");
        }
        const checkPass = await reqCheckUpdateUserPass({
          id: user._id,
          pass: password,
        });
        if (checkPass?.data && checkPass?.data?.code !== 200) {
          toast.error("Mật khẩu hiện tại không đúng");
          return;
        } else {
          const reqSendOtp = await reqUserSendOtp(user?.email);
          setCheckPassword({ pass: true, code: false });
          if (otp === reqSendOtp?.data?.code) {
            setCheckPassword({ pass: true, code: false });
          }
          setLoading(false);
        }
      }
    } catch (error) {
      setLoading(false);
      return toast.error("Xảy ra lỗi khi thực hiện!");
    }
  };

  const handleChangePassword = async (e: any) => {
    e.preventDefault();
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
          route.refresh();
          toast.success("Đổi mật khẩu thành công");
        }
      }
    } catch (error) {
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
          window.location.reload();
          toast.success("Đổi tên thành công");
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="section-spacing w-full h-full">
      <BreadcrumbHead
        items={[
          { label: "Trang chủ", href: "/home" },
          { label: "Quản lí tài khoản" },
        ]}
      />
      <form className="container-spacing container xl:px-0">
        <div className="">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-lg font-semibold text-black">
              Thông tin cá nhân
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <Label
                  htmlFor="first-name"
                  className="block text-sm/6 font-medium text-black"
                >
                  Họ
                </Label>
                <div className="mt-2">
                  <Input
                    id="first-name"
                    name="first-name"
                    type="text"
                    defaultValue={user?.firstname}
                    onChange={(e) => {
                      setFirstname(e.target.value);
                    }}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <Label
                  htmlFor="last-name"
                  className="block text-sm/6 font-medium text-black"
                >
                  Tên
                </Label>
                <div className="mt-2">
                  <Input
                    id="last-name"
                    name="last-name"
                    type="text"
                    defaultValue={user?.lastname}
                    onChange={(e) => {
                      setLastname(e.target.value);
                    }}
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              <div className="sm:col-span-4 flex items-center justify-start gap-x-3">
                <Button className="btn" size={"sm"} onClick={handleChangeName}>
                  Đổi tên
                </Button>
                {loading && <LoadingSpin />}
              </div>
              <div className="sm:col-span-4">
                <Label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-black"
                >
                  Địa chỉ email
                </Label>
                <div className="mt-2">
                  <Input
                    defaultValue={user?.email}
                    id="email"
                    name="email"
                    type="email"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
              {/* đổi mật khẩu */}
              <div className="sm:col-span-6 w-full h-full border-1 p-4 rounded-md grid gap-3">
                <div className="sm:col-span-4">
                  <Label
                    htmlFor="password"
                    className="block text-sm/6 font-medium text-black"
                  >
                    Mật khẩu hiện tại
                  </Label>
                  <div className="mt-2">
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      className="block w-full rounded-md bg-white px-3 text-base text-black outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <Label
                    htmlFor="passwordNew"
                    className="block text-sm/6 font-medium text-black"
                  >
                    Mật khẩu mới
                  </Label>
                  <div className="mt-2">
                    <Input
                      onChange={(e) => {
                        setPasswordNew(e.target.value);
                      }}
                      id="passwordNew"
                      name="passwordNew"
                      type="password"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-4">
                  <Label
                    htmlFor="passwordNewConfirm"
                    className="block text-sm/6 font-medium text-black"
                  >
                    Xác nhận mật khẩu mới
                  </Label>
                  <div className="mt-2">
                    <Input
                      onChange={(e) => {
                        setPasswordNewConfirm(e.target.value);
                      }}
                      id="passwordNewConfirm"
                      name="passwordNewConfirm"
                      type="password"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>
                <p className="sm:col-span-6 text-sm text-blue">
                  Nhận mã xác thực qua Email để đổi mật khẩu tài khoản của bạn!
                </p>

                {checkPass.pass !== true && (
                  <div className="flex items-center justify-start gap-x-3 sm:col-span-4">
                    <Button
                      type="button"
                      className="btn mr-3"
                      size={"sm"}
                      onClick={handleCheckPassword}
                    >
                      Xác minh mật khẩu
                    </Button>
                    {loading && <LoadingSpin />}
                  </div>
                )}
              </div>
              <div className="sm:col-span-6 border-1 p-4 rounded-md grid gap-3">
                <div className="sm:col-span-4">
                  <Label
                    htmlFor="passwordNewConfirm"
                    className="block text-sm/6 font-medium text-black"
                  >
                    Nhập mã xác thực
                  </Label>
                </div>
                {checkPass.pass === true && (
                  <div>
                    <div>
                      <div className="mt-4 text-center flex flex-col items-start justify-center gap-3">
                        <Label
                          htmlFor="otp"
                          className="block text-sm font-medium text-black"
                        >
                          Mã OTP
                        </Label>
                        <InputOTP
                          maxLength={6}
                          value={otp}
                          onChange={(value) => setOtp(value)}
                        >
                          <InputOTPGroup>
                            {Array.from({ length: 6 }).map((_, index) => (
                              <InputOTPSlot key={index} index={index} />
                            ))}
                          </InputOTPGroup>
                        </InputOTP>
                        <div className="flex items-center justify-between text-xs gap-4">
                          <span>Mã xác minh hết hạn sau 60s</span>

                          <span className="text-blue underline">
                            Gửi lại mã
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {checkPass.pass == true && (
                  <div className="sm:col-span-4 flex items-center justify-start gap-x-3">
                    <Button
                      type="button"
                      className="btn mr-3"
                      size={"sm"}
                      onClick={() => {
                        setCheckPassword({
                          pass: false,
                          code: false,
                        });
                      }}
                    >
                      Hủy
                    </Button>
                    <Button
                      type="button"
                      className="btn mr-3"
                      size={"sm"}
                      onClick={handleChangePassword}
                    >
                      Đổi mật khẩu
                    </Button>
                    {loading && <LoadingSpin />}
                  </div>
                )}
              </div>

              <div className="sm:col-span-6 border-1 p-4 rounded-md grid gap-3">
                <div className="sm:col-span-3">
                  <Label
                    htmlFor="country"
                    className="block text-sm/6 font-medium text-black"
                  >
                    Quê quán
                  </Label>
                  <div className="mt-2 grid grid-cols-1">
                    <select
                      id="country"
                      name="country"
                      autoComplete="country-name"
                      className="col-start-1 row-start-1 border-1  w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-black  outline-1 -outline-offset-1 outline-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    >
                      <option>Miền Bắc</option>
                      <option>Miền Trung</option>
                      <option>Miền Nam</option>
                    </select>
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                    />
                  </div>
                </div>
                <div className="col-span-full">
                  <Label
                    htmlFor="street-address"
                    className="block text-sm/6 font-medium text-black"
                  >
                    Đường / Số nhà
                  </Label>
                  <div className="mt-2">
                    <Input
                      id="street-address"
                      name="street-address"
                      type="text"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2 sm:col-start-1">
                  <Label
                    htmlFor="city"
                    className="block text-sm/6 font-medium text-black"
                  >
                    Thành phố
                  </Label>
                  <div className="mt-2">
                    <Input
                      id="city"
                      name="city"
                      type="text"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <Label
                    htmlFor="region"
                    className="block text-sm/6 font-medium text-black"
                  >
                    Tỉnh / Thành phố
                  </Label>
                  <div className="mt-2">
                    <Input
                      id="region"
                      name="region"
                      type="text"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <Label
                    htmlFor="postal-code"
                    className="block text-sm/6 font-medium text-black"
                  >
                    Mã Zip
                  </Label>
                  <div className="mt-2">
                    <Input
                      id="postal-code"
                      name="postal-code"
                      type="text"
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border-b border-gray-900/10 pb-12 mt-10">
            <h2 className="text-lg font-semibold text-black">
              Trang tài khoản
            </h2>
            <p className="mt-1 text-sm/6 text-gray-600">
              Thông tin này sẽ được hiển thị công khai nên hãy cẩn thận khi chia
              sẻ.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <Label
                  htmlFor="username"
                  className="block text-sm/6 font-medium text-black"
                >
                  Tên
                </Label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">
                      workcation.com/
                    </div>
                    <Input
                      id="username"
                      name="username"
                      type="text"
                      placeholder="janesmith"
                      className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-black placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <Label
                  htmlFor="about"
                  className="block text-sm/6 font-medium text-black"
                >
                  Thông tin
                </Label>
                <div className="mt-2">
                  <TextArea
                    rows={3}
                    className="block w-full rounded-md bg-white  px-3 py-1.5 text-base text-black outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
                <p className="mt-3 text-sm/6 text-gray-600">
                  Viết về bản thân bạn
                </p>
              </div>

              <div className="col-span-full">
                <Label
                  htmlFor="photo"
                  className="block text-sm/6 font-medium text-black"
                >
                  Ảnh
                </Label>
                <div className="mt-2 flex items-center gap-x-3">
                  <UserCircleIcon
                    aria-hidden="true"
                    className="size-12 text-gray-300"
                  />
                  <Button
                    type="button"
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-black ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50"
                  >
                    Thay đổi
                  </Button>
                </div>
              </div>

              <div className="col-span-full">
                <Label
                  htmlFor="cover-photo"
                  className="block text-sm/6 font-medium text-black"
                >
                  Thêm ảnh khác
                </Label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <PhoneOutgoingIcon
                      aria-hidden="true"
                      className="mx-auto size-12 text-gray-300"
                    />
                    <div className="mt-4 flex text-sm/6 text-gray-600">
                      <Label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500"
                      >
                        <span>Tải lên ảnh</span>
                        <Input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                        />
                      </Label>
                      <p className="pl-1">hoặc thả vào đây</p>
                    </div>
                    <p className="text-xs/5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-lg font-semibold text-black">Thông báo</h2>
            <p className="mt-1 text-sm/6 text-gray-600">
              Chúng tôi sẽ luôn thông báo cho bạn về những thay đổi quan trọng,
              nhưng bạn có thể chọn những thông tin khác mà bạn muốn biết.
            </p>

            <div className="mt-10 space-y-10">
              <fieldset>
                <legend className="text-sm/6 font-semibold text-black">
                  Qua Email
                </legend>
                <div className="mt-6 space-y-6">
                  <div className="flex gap-3">
                    <div className="flex h-6 shrink-0 items-center">
                      <div className="group grid size-4 grid-cols-1">
                        <Checkbox
                          checked={false}
                          onChange={() => {}}
                          className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                        />
                        <svg
                          fill="none"
                          viewBox="0 0 14 14"
                          className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                        >
                          <path
                            d="M3 8L6 11L11 3.5"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="opacity-0 group-has-checked:opacity-100"
                          />
                          <path
                            d="M3 7H11"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="opacity-0 group-has-indeterminate:opacity-100"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="text-sm/6">
                      <Label
                        htmlFor="comments"
                        className="font-medium text-black"
                      >
                        Chung
                      </Label>
                      <p id="comments-description" className="text-gray-500">
                        Đưa tôi thông báo về các địa điểm, lưu trú mới
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex h-6 shrink-0 items-center">
                      <div className="group grid size-4 grid-cols-1">
                        <Checkbox
                          checked={false}
                          onChange={() => {}}
                          className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                        />
                        <svg
                          fill="none"
                          viewBox="0 0 14 14"
                          className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                        >
                          <path
                            d="M3 8L6 11L11 3.5"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="opacity-0 group-has-checked:opacity-100"
                          />
                          <path
                            d="M3 7H11"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="opacity-0 group-has-indeterminate:opacity-100"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="text-sm/6">
                      <Label
                        htmlFor="candidates"
                        className="font-medium text-black"
                      >
                        Bài viết
                      </Label>
                      <p id="candidates-description" className="text-gray-500">
                        Gửi thông báo về các bài viết mới
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex h-6 shrink-0 items-center">
                      <div className="group grid size-4 grid-cols-1">
                        <Checkbox
                          checked={false}
                          onChange={() => {}}
                          className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                        />
                        <svg
                          fill="none"
                          viewBox="0 0 14 14"
                          className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                        >
                          <path
                            d="M3 8L6 11L11 3.5"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="opacity-0 group-has-checked:opacity-100"
                          />
                          <path
                            d="M3 7H11"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="opacity-0 group-has-indeterminate:opacity-100"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="text-sm/6">
                      <Label
                        htmlFor="offers"
                        className="font-medium text-black"
                      >
                        Ưu đãi
                      </Label>
                      <p id="offers-description" className="text-gray-500">
                        Nhận thông báo các ưu đãi dành riêng cho bạn
                      </p>
                    </div>
                  </div>
                </div>
              </fieldset>

              <fieldset>
                <legend className="text-sm/6 font-semibold text-black">
                  Thông báo trên Web
                </legend>
                <p className="mt-1 text-sm/6 text-gray-600">
                  Hiển thị qua nội dung thông báo
                </p>
                <div className="mt-6 space-y-6">
                  <Radio
                    checked={false}
                    id="push-all"
                    label="Tât cả"
                    name="push-all"
                    value={""}
                    onChange={() => {}}
                  />

                  <Radio
                    label="Đại điểm mới"
                    id="push-email"
                    checked={false}
                    value={""}
                    onChange={() => {}}
                    name="push-notifications"
                  />

                  <Radio
                    label="Không thông báo"
                    id="push-nothing"
                    name="push-notifications"
                    checked={false}
                    value={""}
                    onChange={() => {}}
                  />
                </div>
              </fieldset>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Button
            type="button"
            variant={"ghost"}
            className="text-sm/6 font-semibold text-black border-1"
          >
            Hủy
          </Button>
          <Button
            type="submit"
            className="rounded-md bg-blue px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue_active focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Lưu tất cả
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MySetingPage;
