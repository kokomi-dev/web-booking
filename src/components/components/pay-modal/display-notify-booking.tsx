import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

import { IModalBookingSucess } from "@/types/component-types";
import { useRouter } from "next/navigation";

export default function BookingSuccess({
  model,
  handleClose,
}: IModalBookingSucess) {
  const router = useRouter();
  const handleRedirect = () => {
    handleClose();
    if (model === "attraction") {
      router.push("/attractions");
    } else {
      router.push("/hotels");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center animate-fade-in">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-20 h-20 text-green-500" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800">
          Đặt {model === "attraction" ? "Tour" : "Nơi lưu trú"} Thành Công!
        </h2>

        {/* Message */}
        <p className="text-gray-600 mt-3 leading-relaxed">
          Cảm ơn bạn đã đặt. Chúng tôi sẽ phản hồi bạn sớm nhất qua số điện
          thoại hoặc email.
        </p>

        {/* Action */}
        <Button
          onClick={handleRedirect}
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Xong
        </Button>
      </div>
    </div>
  );
}
