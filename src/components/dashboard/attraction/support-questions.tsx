import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const SupportQuestions = () => {
  return (
    <div className="w-full">
      <h3 className="text-xl lg:text-2xl font-semibold">
        Các câu hỏi thường gặp
      </h3>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="text-sm font-normal">
            Làm sao để đặt vé?
          </AccordionTrigger>
          <AccordionContent>
            <ul>
              <li className="text-xs font-light py-1">Chọn ngày giờ.</li>
              <li className="text-xs font-light py-1">Chọn số lượng vé.</li>
              <li className="text-xs font-light py-1">
                Nhấn sang trang tiếp theo và nhập thông tin cá nhân.
              </li>
              <li className="text-xs font-light py-1">
                Sau khi nhập thông tin cá nhân, chọn phương thức thanh toán và
                nhập chi tiết thanh toán của bạn.
              </li>
              <li className="text-xs font-light py-1">
                Sau khi nhập chi tiết thanh toán thành công, bạn sẽ được điều
                hướng đến trang vé, nơi bạn có thể kiểm tra trạng thái và thông
                tin của đơn đặt.
              </li>
              <li className="text-xs font-light py-1">
                Bạn sẽ nhận email xác nhận sau khi bên vận hành điểm tham quan
                xác nhận đơn đặt. Tùy vào nhà cung cấp, việc này có thể cần thời
                gian.
              </li>
              <li className="text-xs font-light py-1">
                Bạn có thể xem vé của mình trong email xác nhận hoặc ở mục
                &qout; Đặt chỗ & Chuyến đi &ldqou; trong tài khoản.
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className="text-sm font-normal">
            Khi nào tôi sẽ thanh toán?
          </AccordionTrigger>
          <AccordionContent>
            <p>
              KoKoTravel sẽ thu tiền thanh toán thay cho nhà cung cấp dịch vụ
              tham quan / hoạt động trải nghiệm khi bạn đặt vé.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger className="text-sm font-normal">
            Sử dụng vé điện tử như nào?
          </AccordionTrigger>
          <AccordionContent>
            <ul>
              <li className="text-xs font-light py-1">
                Mỗi vé điện tử đều có mã riêng biệt, thường là mã QR hoặc mã số.
                Tuy nhiên, mã cũng có thể ở định dạng khác được tìm thấy trên vé
                hoặc tập tin PDF đã gửi cho bạn.
              </li>
              <li className="text-xs font-light py-1">
                Nếu vé điện tử có mã vạch hoặc mã QR, hãy đưa cho nhân viên tại
                cổng soát vé ở địa điểm tham quan hoặc điểm đổi vé để họ quét
                mã.
              </li>
              <li className="text-xs font-light py-1">
                Đối với mã số, bạn chỉ cần xuất trình vé cho nhân viên để xác
                nhận.
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger className="text-sm text-start font-normal">
            Tôi có thể hủy hoặc chỉnh sửa vé của mình không?
          </AccordionTrigger>
          <AccordionContent>
            <ul>
              <li className="text-xs font-light py-1">
                Bạn sẽ cần kiểm tra chính sách trên vé cụ thể mà bạn đặt. Các
                đơn đặt phút chót có thể không được hủy miễn phí.
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger className="text-sm text-start font-normal">
            Khi nào tôi được hoàn tiền theo chính sách hủy miễn phí?
          </AccordionTrigger>
          <AccordionContent>
            <ul>
              <li className="text-xs font-light py-1">
                Sau khi bạn hủy, chúng tôi sẽ ngay lập tức tiến hành hoàn trả
                toàn bộ số tiền. Tùy vào ngân hàng hoặc nhà cung cấp dịch vụ
                thanh toán của bạn, việc hoàn tiền vào phương thức thanh toán
                ban đầu của bạn có thể mất từ 3-10 ngày.
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default SupportQuestions;
