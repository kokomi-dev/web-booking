import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { IModalPayBankTransfer } from "@/types/component-types";
import { CheckCircle, Clipboard } from "lucide-react";
import { useState } from "react";

export default function ModalBankTransfer({
  open,
  setOpen,
}: IModalPayBankTransfer) {
  const [copied, setCopied] = useState(false);
  const accountNumber = "3912321391238";
  const accountName = "Nguyen The An";
  const bankName = "Techcombank";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTitle hidden></DialogTitle>
      <DialogDescription aria-describedby={undefined}></DialogDescription>
      <DialogContent className="min-w-[96vw] lg:min-w-[60vw] w-full max-h-[95vh] lg:max-h-[90vh]">
        <Card className="w-full border-none shadow-none  bg-white p-1  rounded-2xl  ">
          <CardContent className="list-spacing p-0">
            <h2 className="text-xl font-semibold text-center mb-4">
              Chuyển khoản ngân hàng
            </h2>
            <div className="list-spacing text-black">
              <p>
                <strong>Ngân hàng:</strong> {bankName}
              </p>
              <p>
                <strong>Tên tài khoản:</strong> {accountName}
              </p>
              <p className="flex items-center justify-between">
                <span>
                  <strong>Số tài khoản:</strong> {accountNumber}
                </span>
                <button
                  onClick={copyToClipboard}
                  className="text-blue_sub hover:text-blue-800"
                >
                  {copied ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <Clipboard className="w-5 h-5" />
                  )}
                </button>
              </p>
            </div>
            <div className="mt-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-900 text-sm">
              <p>
                <strong>Lưu ý khi chuyển khoản:</strong>
              </p>
              <ul className="list-disc text-sm list-inside">
                <li>Nhập đúng số tài khoản và tên người nhận.</li>
                <li>
                  Ghi rõ nội dung chuyển khoản để chúng tôi xác nhận nhanh
                  chóng.
                </li>
                <li>
                  Thời gian xử lý có thể mất từ 5-10 phút, vui lòng kiên nhẫn.
                </li>
              </ul>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              <p>
                <strong className="text-black">Điều khoản & Điều kiện:</strong>
              </p>
              <p>
                Chúng tôi cam kết bảo mật thông tin và xử lý thanh toán an toàn.
                Nếu có bất kỳ sự cố nào, vui lòng liên hệ bộ phận hỗ trợ để được
                giải quyết nhanh nhất.
              </p>
            </div>
            <p className="font-semibold text-black">
              Chúng tôi sẽ xác nhận và phản hồi với bạn qua email, số điện thoại
            </p>
            <p className="font-semibold text-xs text-red-500">
              Nếu bạn đã thanh toán thành công, sau 1-2 tiếng chưa thấy người
              liên hệ lại. Vui lòng liên hệ hotline:{" "}
              <a href="tel:096151231">096151231</a>
            </p>
            <div className="flex items-center justify-center">
              <Button
                type="button"
                className="w-[100%] lg:w-[40%] text-center bg-blue_sub hover:bg-blue_active"
                onClick={() => setOpen(false)}
              >
                Hoàn tất
              </Button>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
