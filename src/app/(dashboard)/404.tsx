import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-100">
      <div className="text-center p-6 bg-white rounded shadow-lg">
        <h1 className="text-4xl font-bold text-red-500">404</h1>
        <h2 className="text-2xl font-semibold my-4">
          Trang bạn tìm kiếm không tồn tại
        </h2>
        <p className="text-gray-600 mb-8">
          Rất tiếc, trang mà bạn đang cố gắng truy cập không tồn tại hoặc đã bị
          xóa.
        </p>
        <Link
          href="/attractions"
          className="flex items-center justify-center gap-2 text-red-500 underline font-medium cursor-pointer"
        >
          <ArrowLeft className="mr-1" />
          Quay lại Trang chủ
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
