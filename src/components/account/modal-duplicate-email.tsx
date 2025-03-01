import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";

const ModalErrDuplicateEmail = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: any;
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[90%] rounded-14 w-full lg:hidden">
        <DialogHeader>
          <DialogTitle>Thông báo</DialogTitle>
          <DialogDescription>
            Email bạn đăng ký đã tồn tại, vui lòng thử lại với email khác
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            type="button"
            className="bg-bg_primary_blue_sub text-white hover:bg-bg_primary_hover"
            onClick={() => {
              setOpen(false);
            }}
          >
            Thoát
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalErrDuplicateEmail;
