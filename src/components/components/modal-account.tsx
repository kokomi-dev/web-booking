"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormInput from "./form-input";
import { cn } from "@/lib/utils";
import { reqUpdateUser } from "@/api/api-auth";
import { useState } from "react";
import { toast } from "react-toastify";

const ModalAccount = ({
  user,
  open,
  setOpen,
}: {
  user: any;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [firstname, setFirstname] = useState("" || user?.firstname);
  const [lastname, setLastname] = useState("" || user?.lastname);
  const [password, setPassword] = useState("");
  const [passwordNew, setPasswordNew] = useState("");
  const [passwordNewConfirm, setPasswordNewConfirm] = useState("");

  const data = {
    firstname,
    lastname,
    password,
    passwordNew,
    passwordNewConfirm,
  };
  const handleUpdateUser = async () => {
    try {
      if (!passwordNew) {
        return toast.error("Mật khẩu không được để trông");
      }
      if (!passwordNewConfirm) {
        return toast.error("Vui lòng nhập lại mật khẩu mới");
      }
      if (passwordNew !== passwordNewConfirm) {
        return toast.error("Mật khẩu mới không trungg khớp");
      }
      const res = await reqUpdateUser(user._id, data);
      if (res) {
        console.log(res);
      }
    } catch (error) {}
  };
  const handleSignOut = () => {};
  return (
    <Dialog open={open} onOpenChange={() => setOpen(false)}>
      <DialogContent className="bg-bg_black_sub text-black  h-auto w-full">
        <DialogHeader>
          <DialogTitle>Tài khoản của bạn</DialogTitle>
        </DialogHeader>
        <div className="w-full grid gap-2 ">
          <div className="w-full">
            <Label
              htmlFor="email"
              className="text-right text-small font-normal"
            >
              Email
            </Label>
            <Input
              id="email"
              value={user.email}
              className="col-span-3"
              disabled
            />
          </div>
          <h4 className="text-smallest text-blue_main_sub">
            Chúng tôi sẽ gửi mail xác nhận tới email này
          </h4>
          <hr className="hr" />
          <h4 className="text-small font-medium">Đổi thông tin</h4>
          <div
            className={cn(
              "w-full flex flex-col items-start justify-start gap-2",
              "md:flex-row md:justify-between md:items-start"
            )}
          >
            <div className="w-full flex flex-col items-center justify-between gap-2 ">
              <FormInput
                className="text-smallest "
                title="họ"
                value={firstname}
                onChange={(e) => {
                  setFirstname(e.target.value);
                }}
                type="text"
              />
              <FormInput
                className="text-smallest"
                title="tên"
                defaultValue={user.lastname}
                onChange={(e) => {
                  setLastname(e.target.value);
                }}
                value={lastname}
                type="text"
              />
            </div>
            <div className="w-full flex flex-col items-start justify-start gap-2">
              <FormInput
                className="text-smallest"
                title="Mật khẩu hiện tại"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
              />
              {/*  */}
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
            </div>
          </div>
          <Button
            className="bg-bg_primary_blue_sub text-white hover:bg-bg_primary_main"
            onClick={handleUpdateUser}
            disabled={!password}
          >
            Lưu lại
          </Button>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            className="hover:bg-bg_primary_hover border-1 border-black_sub"
          >
            Đăng xuất
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default ModalAccount;
