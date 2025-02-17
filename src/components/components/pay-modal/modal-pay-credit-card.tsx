import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { IModalPayCreditCard } from "@/types/component-types";
import { Clipboard, CheckCircle, CreditCard, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { FaTruckFieldUn } from "react-icons/fa6";

export default function ModalPayCreditCard({
  open,
  setOpen,
}: IModalPayCreditCard) {
  const [copied, setCopied] = useState(false);
  const accountNumber = "3912321391238";
  const accountName = "Nguyen The An";
  const bankName = "Techcombank";
  const cardNumber = "1234 5678 9012 3456";
  const cardHolder = "Nguyen The An";
  const expiryDate = "12/28";
  const cvv = "123";

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTitle></DialogTitle>
      <DialogContent className="max-w-[90%] lg:max-w-[60%] min-h-[80vh] border-none">
        <div className="flex flex-col items-center justify-center  p-6">
          <Card className="w-full max-w-md bg-white p-6 shadow-lg rounded-2xl mt-6">
            <CardContent>
              <h2 className="text-xl font-semibold text-center mb-4 flex items-start justify-center">
                <CreditCard className="w-7 h-7 mr-2 text-blue_main_sub" /> Thanh
                toán qua Thẻ Tín Dụng/Ghi Nợ
              </h2>
              <div className="space-y-4 text-gray-700">
                <label className="block">
                  <span className="text-gray-700">Chủ thẻ</span>
                  <Input type="text" placeholder="Nguyen The An" />
                </label>
                <label className="block">
                  <span className="text-gray-700">Số thẻ</span>
                  <Input type="text" placeholder="1234 5678 9012 3456" />
                </label>
                <div className="flex space-x-4">
                  <label className="block w-1/2">
                    <span className="text-gray-700">Hạn sử dụng</span>
                    <Input type="text" placeholder="MM/YY" />
                  </label>
                  <label className="block w-1/2">
                    <span className="text-gray-700">CVV</span>
                    <Input type="text" placeholder="123" />
                  </label>
                </div>
              </div>
              <Button className="w-full mt-4 bg-blue-600 text-white">
                Thanh toán
              </Button>
            </CardContent>
          </Card>

          <div className="w-full max-w-md bg-white p-4 mt-6 text-gray-700 text-sm rounded-lg shadow-md flex items-center">
            <ShieldCheck className="w-6 h-6 text-green-500 mr-2" />
            <p>
              Thông tin thanh toán của bạn được bảo vệ an toàn và mã hóa theo
              tiêu chuẩn quốc tế.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
