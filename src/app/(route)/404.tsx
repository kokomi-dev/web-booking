import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

const NotFoundPage = ({ page }: { page: string }) => {
  return (
    <div className="w-full min-h-full flex items-center justify-center bg-gray-100">
      <div className="w-full min-h-[50vh] md:min-h-[40vh] xl:min-h-[35vh] h-full grid gap-x-2 text-center p-6 bg-white rounded-14 shadow-lg">
        <h2 className="text-large font-bold ">
          {page === "attractions" && "Không tìm thấy địa điểm tham quan này !"}
          {page === "hotels" && "Không tìm thấy chỗ nghỉ này !"}
        </h2>
        <p className="text-yellow_main ">
          Rất tiếc, trang mà bạn đang cố gắng truy cập không tồn tại hoặc đã bị
          xóa.
        </p>
        <Link
          href={`/${page}`}
          className="flex items-center justify-center gap-2 text-blue_main_sub underline font-medium cursor-pointer"
        >
          <ArrowLeft className="mr-1" />
          Quay lại Trang chủ
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
