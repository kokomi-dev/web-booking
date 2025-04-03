import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { IModalPayCreditCard } from "@/types/component-types";
import { CreditCard, ShieldCheck } from "lucide-react";

export default function ModalPayCreditCard({
  open,
  setOpen,
}: IModalPayCreditCard) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTitle hidden></DialogTitle>
      <DialogDescription aria-describedby={undefined}></DialogDescription>

      <DialogContent className="max-w-[97%] lg:max-w-[60%] min-h-[80vh] border-none p-2">
        <div className="w-full  flex flex-col items-center justify-center p-0  lg:p-6">
          <Card className="w-full bg-white p-1 lg:p-6 shadow-lg rounded-2xl mt-6 py-4">
            <CardContent className="w-full">
              <h2 className="text-xl font-semibold text-center mb-4 flex items-start justify-center">
                <CreditCard className="w-7 h-7 mr-2 text-blue_sub" /> Thanh toán
                qua Thẻ Tín Dụng/Ghi Nợ
              </h2>
              <div className="space-y-4 text-gray-700">
                <label className="block">
                  <span className="text-black font-semibold">Chủ thẻ</span>
                  <Input type="text" placeholder="Nguyen The An" />
                </label>
                <label className="block">
                  <span className="text-black font-semibold">Số thẻ</span>
                  <Input type="text" placeholder="1234 5678 9012 3456" />
                </label>
                <div className="flex space-x-4">
                  <label className="block w-1/2">
                    <span className="text-black font-semibold">
                      Hạn sử dụng
                    </span>
                    <Input type="text" placeholder="MM/YY" />
                  </label>
                  <label className="block w-1/2">
                    <span className="text-black font-semibold">CVV</span>
                    <Input type="text" placeholder="123" />
                  </label>
                </div>
              </div>
              <Button className="w-full mt-4 bg-blue_main_sub text-white">
                Thanh toán
              </Button>
            </CardContent>
          </Card>

          <div className="w-full max-w-md bg-white p-4 mt-6  text-sm rounded-lg shadow-md flex items-center">
            <ShieldCheck className="w-6 h-6 text-green-500 mr-2" />
            <p className="text-black_sub">
              Thông tin thanh toán của bạn được bảo vệ an toàn và mã hóa theo
              tiêu chuẩn quốc tế.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
