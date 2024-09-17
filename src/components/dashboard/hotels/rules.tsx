import { cn } from "@/lib/utils";
import { BookmarkCheck, CalendarCheck2, PhoneCall } from "lucide-react";
import React from "react";

const Rules = () => {
  return (
    <div className="w-full h-full flex flex-col items-start justify-start gap-y-2">
      <div className="w-full h-full">
        <h2 className="text-large font-bold">
          Bạn cứ vô tư khám phá, những thứ khác chúng tôi lo
        </h2>
      </div>
      <div className="w-full">
        <ul
          className={cn(
            "w-full flex flex-col items-center justify-start gap-2",
            "md:flex-row"
          )}
        >
          <li className="w-full">
            <div className="w-full flex items-center justify-start gap-1 text-small font-medium">
              <BookmarkCheck className="text-green_main text-large" />
              <h4 className="text-small">
                Khám phá các địa điểm tham quan hàng đầu
              </h4>
            </div>
            <p className="text-smallest font-light">
              Trải nghiệm những điều tuyệt vời nhất tại điểm đến với các địa
              điểm tham quan, tour và nhiều hoạt động khác
            </p>
          </li>
          <li className="w-full">
            <div className="w-full flex items-center justify-start gap-1 text-small font-medium">
              <CalendarCheck2 className="text-green_main text-large" />
              <h4 className="text-small">Nhanh chóng và linh hoạt</h4>
            </div>
            <p className="text-smallest font-light">
              Đặt vé online trong vài phút với lựa chọn hủy miễn phí ở nhiều địa
              điểm quan tham
            </p>
          </li>
          <li className="w-full">
            <div className="w-full flex items-center justify-start gap-1 text-small font-medium">
              <PhoneCall className="text-green_main text-large" />
              <h4 className="text-small">Được trợ giúp khi bạn cần</h4>
            </div>
            <p className="text-smallest font-light">
              Đội ngũ Dịch vụ Khách hàng toàn cầu của KoKoTravel.com sẽ luôn có
              mặt để hỗ trợ bạn 24/7
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Rules;
