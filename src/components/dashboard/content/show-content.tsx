"use client";
import { Printer } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React from "react";
const printContent = () => {
  const content = document.querySelector(".grid.gap-4");
  if (content) {
    const newWindow = window.open("", "_blank", "width=800,height=600");
    newWindow &&
      newWindow.document.write(`
    <html>
      <head>
        <title>In nội dung</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
          }
        </style>
      </head>
      <body>
        ${content.innerHTML}
      </body>
    </html>
  `);
    newWindow?.document.close();
    newWindow?.print();
  }
};

const Page1 = () => {
  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-large font-medium">Về KoKoTravel</h2>
        <div
          className="hide-print flex items-center justify-start gap-1 hover:opacity-85 hover: cursor-pointer p-2  text-blue_main_sub text-normal font-medium"
          onClick={printContent}
        >
          <Printer className="size-4" />
          In
        </div>
      </div>
      <div className="grid gap-3">
        <p className="text-small font-normal">
          Đây là trang web thuơng mại dịch vụ phát triển dựa trên Booking.com
        </p>
        <p className="text-small font-normal">
          Bằng cách đầu tư vào công nghệ giúp loại bỏ những phiền toái khi du
          lịch, KoKoTravel.com kết nối hàng triệu du khách với các trải nghiệm
          đáng nhớ, nhiều lựa chọn vận chuyển và các chỗ nghỉ tuyệt vời - từ
          dạng nhà ở cho đến khách sạn và nhiều hơn nữa. Là một trong những thị
          trường du lịch của Việt Nam cho cả những thương hiệu lớn và doanh
          nghiệp ở mọi quy mô, KoKoTravel.com giúp các chỗ nghỉ trên khắp thế
          giới kết nối với khách hàng toàn cầu và phát triển doanh nghiệp của
          họ.
        </p>
      </div>
    </div>
  );
};
const Page2 = () => {
  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-large font-medium">Thông tin Pháp lý</h2>
        <div
          className="flex items-center justify-start hover:opacity-85 hover: cursor-pointer p-2  gap-1 text-blue_main_sub text-normal font-medium"
          onClick={printContent}
        >
          <Printer className="size-4" />
          In
        </div>
      </div>
      <div className="grid gap-3">
        <p className="text-small font-normal">
          Trang web{" "}
          <a
            href=" https://web-booking-anten.vercel.app/"
            className="text-blue_main_sub"
          >
            KoKoTravel {""}
          </a>
          được vận hành bởi AnTenDev. Tất cả các quyền và nghĩa vụ pháp lý liên
          quan đến việc sử dụng trang web này được quy định rõ ràng trong các
          điều khoản dưới đây.
        </p>
        <p className="text-small font-normal">
          <strong>1. Trách nhiệm pháp lý:</strong> Chúng tôi không chịu trách
          nhiệm cho bất kỳ tổn thất hoặc thiệt hại nào phát sinh trực tiếp hoặc
          gián tiếp từ việc sử dụng hoặc không thể sử dụng trang web này. Chúng
          tôi không bảo đảm rằng trang web sẽ không có lỗi hoặc bị gián đoạn.
        </p>
        <p className="text-small font-normal">
          <strong>2. Quyền sở hữu trí tuệ:</strong> Tất cả nội dung trên trang
          web bao gồm nhưng không giới hạn ở văn bản, hình ảnh, video, đồ họa,
          mã nguồn đều thuộc quyền sở hữu của AnTenDev hoặc được cấp phép sử
          dụng hợp pháp. Việc sao chép, phân phối hoặc sử dụng nội dung mà không
          có sự cho phép là vi phạm pháp luật.
        </p>
        <p className="text-small font-normal">
          <strong>3. Quyền riêng tư:</strong> Chúng tôi cam kết bảo vệ thông tin
          cá nhân của người dùng và tuân thủ tất cả các quy định liên quan đến
          bảo mật thông tin. Vui lòng tham khảo Chính sách Bảo mật để biết thêm
          chi tiết về cách chúng tôi thu thập, sử dụng và bảo vệ dữ liệu cá nhân
          của bạn.
        </p>
        <p className="text-small font-normal">
          <strong>4. Điều kiện sử dụng:</strong> Người dùng phải tuân thủ tất cả
          các quy định hiện hành khi sử dụng trang web này. Nghiêm cấm các hành
          vi lợi dụng trang web để phát tán thông tin sai lệch, thực hiện các
          hoạt động lừa đảo, gây ảnh hưởng tiêu cực đến các người dùng khác.
        </p>
        <p className="text-small font-normal">
          <strong>5. Liên kết bên thứ ba:</strong> Trang web có thể chứa các
          liên kết đến các trang web của bên thứ ba. Chúng tôi không chịu trách
          nhiệm về nội dung, chính sách bảo mật, hoặc bất kỳ hành vi nào của các
          trang web đó. Người dùng chịu trách nhiệm khi truy cập các liên kết
          này.
        </p>
        <p className="text-small font-normal">
          <strong>6. Thay đổi và cập nhật:</strong> Chúng tôi có quyền sửa đổi
          và cập nhật thông tin pháp lý này bất cứ lúc nào mà không cần thông
          báo trước. Người dùng được khuyến khích kiểm tra trang pháp lý định kỳ
          để cập nhật các thay đổi mới nhất.
        </p>
        <p className="text-small font-normal">
          <strong>7. Luật áp dụng:</strong> Các điều khoản pháp lý này được điều
          chỉnh và giải thích theo luật pháp của Việt Nam. Mọi tranh chấp phát
          sinh sẽ được giải quyết tại tòa án có thẩm quyền tại Việt Nam.
        </p>
        <p className="text-small font-normal">
          <strong>8. Liên hệ:</strong> Nếu bạn có bất kỳ câu hỏi hoặc yêu cầu
          nào liên quan đến thông tin pháp lý này, vui lòng liên hệ với chúng
          tôi qua <strong>Email:</strong>
          <a
            href="mailto:nguyenthean12062002@gmail.com"
            className="text-blue_main_sub"
          >
            nguyenthean12062002@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
};
const Page3 = () => {
  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-large font-medium">Điều khoản và điều kiện</h2>
        <div
          className="flex items-center justify-start hover:opacity-85 hover: cursor-pointer p-2  gap-1 text-blue_main_sub text-normal font-medium"
          onClick={printContent}
        >
          <Printer className="size-4" />
          In
        </div>
      </div>
      <div className="grid gap-3">
        <p className="text-smallest font-normal text-black_sub">
          Cập nhật ngày 18/11/2024
        </p>
        <p className="text-small font-normal">
          Cùng với các Điều khoản trên trang này, còn có hai tài liệu khác cùng
          nhau hợp thành hợp đồng giữa chúng tôi với bạn:
        </p>
        <ul className="text-small font-normal">
          <li>
            Trang Chúng tôi hoạt động như thế nào giúp bạn sử dụng Nền tảng của
            chúng tôi và hiểu về các đánh giá, xếp hạng, gợi ý của chúng tôi,
            cách chúng tôi kiếm tiền và những vấn đề khác nữa.
          </li>
          <li>
            Tiêu chuẩn và Hướng dẫn về Nội dung giúp chúng tôi duy trì mọi nội
            dung trên Nền tảng sao cho liên quan và phù hợp với người truy cập
            toàn cầu mà không hạn chế tự do ngôn luận. Tài liệu đó cho biết cách
            chúng tôi quản lý nội dung và các hành động khi có nội dung không
            phù hợp.
          </li>
        </ul>
        <p className="text-small font-normal">
          Khi đồng ý với các Điều khoản của chúng tôi, bạn đồng ý với tất cả nội
          dung trong cả ba tài liệu. Nếu bạn không chấp nhận bất kỳ Điều khoản
          nào trong các Điều khoản này, vui lòng không sử dụng Nền tảng của
          chúng tôi.
        </p>{" "}
        <p className="text-small font-normal">
          Tất cả thông tin này (cùng email xác nhận đơn đặt và mọi thông tin
          được cung cấp trong giai đoạn tiền hợp đồng trước khi bạn đặt chỗ) đều
          quan trọng vì chúng quy định các điều khoản pháp lý mà căn cứ trên đó
          các Nhà cung cấp Dịch vụ cung cấp Trải nghiệm Du lịch thông qua Nền
          tảng của chúng tôi.
        </p>{" "}
        <p className="text-small font-normal">
          Nếu xảy ra vấn đề với Trải nghiệm Du lịch của bạn, Mục A15 trong các
          Điều khoản này sẽ giải thích những gì bạn có thể làm để giải quyết vấn
          đề đó. Điều đó bao gồm khiếu nại với chúng tôi, đưa ra tòa và (trong
          một số trường hợp) sử dụng dịch vụ giải quyết tranh chấp trực tuyến.
        </p>{" "}
        <p className="text-small font-normal">
          Nếu bạn muốn kháng nghị quyết định kiểm duyệt hoặc báo cáo bất kỳ nội
          dung nào trên Nền tảng của chúng tôi thì Tiêu chuẩn và Hướng dẫn về
          Nội dung sẽ giải thích cách kháng nghị hoặc báo cáo, cũng như cách
          chúng tôi quản lý các yêu cầu này.
        </p>{" "}
        <p className="text-small font-normal">
          Bản tóm tắt này không nằm trong các Điều khoản của chúng tôi hay một
          tài liệu pháp lý nào cả. Đây chỉ là phần giải thích đơn giản về các
          Điều khoản của chúng tôi. Chúng tôi khuyến khích bạn đọc toàn bộ nội
          dung của từng tài liệu. Một số từ trong bản tóm tắt này có ý nghĩa rất
          cụ thể, vì vậy vui lòng kiểm tra “Từ điển KoKoTravel.com” ở phần cuối
          các Điều khoản này.
        </p>
      </div>
      <div className="grid gap-3">
        <p className="text-small font-normal">
          Chào mừng bạn đến với {""}
          <a
            href=" https://web-booking-anten.vercel.app/"
            className="text-blue_main_sub"
          >
            KoKoTravel
          </a>
          . Khi sử dụng dịch vụ của chúng tôi, bạn đồng ý với các điều khoản và
          điều kiện dưới đây. Vui lòng đọc kỹ trước khi sử dụng trang web.
        </p>
        <p className="text-small font-normal">
          <strong>1. Chấp nhận Điều khoản:</strong> Bằng cách truy cập và sử
          dụng trang web này, bạn đồng ý tuân thủ các điều khoản và điều kiện sử
          dụng. Nếu bạn không đồng ý với bất kỳ phần nào trong điều khoản này,
          vui lòng ngừng sử dụng trang web.
        </p>
        <p className="text-small font-normal">
          <strong>2. Quyền sở hữu trí tuệ:</strong> Toàn bộ nội dung trên trang
          web bao gồm nhưng không giới hạn ở văn bản, hình ảnh, video, và mã
          nguồn đều thuộc sở hữu của AnTenDev hoặc bên thứ ba được cấp phép.
          Việc sao chép, chỉnh sửa, phân phối hoặc sử dụng nội dung cho mục đích
          thương mại mà không có sự cho phép rõ ràng bằng văn bản là vi phạm
          luật bản quyền.
        </p>
        <p className="text-small font-normal">
          <strong>3. Dịch vụ và Sản phẩm:</strong> Trang web này cung cấp dịch
          vụ đặt tour du lịch tại Việt Nam. Chúng tôi cam kết mang lại thông tin
          chính xác và dịch vụ tốt nhất, nhưng không đảm bảo rằng dịch vụ sẽ
          không có lỗi hoặc bị gián đoạn. AnTen có quyền thay đổi hoặc ngừng
          cung cấp dịch vụ bất cứ lúc nào mà không cần báo trước.
        </p>
        <p className="text-small font-normal">
          <strong>4. Chính sách đặt chỗ và hủy bỏ:</strong> Khi đặt tour, bạn sẽ
          nhận được email xác nhận. Nếu bạn không nhận được xác nhận, vui lòng
          liên hệ với chúng tôi. Chính sách hủy bỏ và hoàn tiền sẽ được áp dụng
          theo từng điều kiện cụ thể của từng tour và được nêu rõ trong phần chi
          tiết của từng gói tour.
        </p>
        <p className="text-small font-normal">
          <strong>5. Trách nhiệm người dùng:</strong> Người dùng phải tuân thủ
          tất cả các quy định và luật pháp liên quan đến việc sử dụng trang web.
          Bạn không được sử dụng trang web này để phát tán thông tin sai lệch,
          gây tổn hại cho hệ thống, hoặc thực hiện các hành vi vi phạm pháp
          luật.
        </p>
        <p className="text-small font-normal">
          <strong>6. Bảo mật thông tin:</strong> Thông tin cá nhân của bạn sẽ
          được bảo mật theo Chính sách Bảo mật của chúng tôi. Chúng tôi cam kết
          không chia sẻ thông tin của bạn cho bên thứ ba mà không có sự đồng ý
          của bạn, ngoại trừ những trường hợp pháp luật yêu cầu.
        </p>
        <p className="text-small font-normal">
          <strong>7. Giới hạn trách nhiệm:</strong> AnTen không chịu trách nhiệm
          về bất kỳ thiệt hại nào phát sinh từ việc sử dụng trang web này, bao
          gồm nhưng không giới hạn ở mất dữ liệu, thiệt hại kinh tế, hoặc gián
          đoạn dịch vụ.
        </p>
        <p className="text-small font-normal">
          <strong>8. Điều chỉnh và Thay đổi:</strong> Chúng tôi có quyền thay
          đổi nội dung Điều khoản và Điều kiện bất kỳ lúc nào. Mọi thay đổi sẽ
          được công bố trên trang web và có hiệu lực ngay khi được cập nhật.
        </p>
        <p className="text-small font-normal">
          <strong>9. Luật áp dụng:</strong> Các điều khoản này được điều chỉnh
          và giải thích theo luật pháp của Việt Nam. Mọi tranh chấp phát sinh sẽ
          được giải quyết tại tòa án có thẩm quyền tại Việt Nam.
        </p>
        <p className="text-small font-normal">
          <strong>10. Liên hệ:</strong> Nếu bạn có bất kỳ câu hỏi nào về Điều
          khoản và Điều kiện này, vui lòng liên hệ với chúng tôi qua{" "}
          <a
            href="mailto:nguyenthean12062002@gmail.com"
            className="text-blue_main_sub"
          >
            nguyenthean12062002@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
};
const Page4 = () => {
  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-large font-medium">Liên hệ với chúng tôi</h2>
        <div
          className="flex items-center justify-start hover:opacity-85 hover: cursor-pointer p-2  gap-1 text-blue_main_sub text-normal font-medium"
          onClick={printContent}
        >
          <Printer className="size-4" />
          In
        </div>
      </div>
      <div className="grid gap-3">
        <p className="text-small font-normal">
          Chúng tôi luôn sẵn sàng lắng nghe phản hồi và giải đáp thắc mắc của
          bạn. Hãy liên hệ với chúng tôi thông qua các phương thức sau:
        </p>
        <div className="grid gap-2">
          <p className="text-small font-normal">
            <strong>Email:</strong>{" "}
            <a
              href="mailto:nguyenthean12062002@gmail.com"
              className="text-blue_main_sub"
            >
              nguyenthean12062002@gmail.com
            </a>
          </p>
          <p className="text-small font-normal">
            <strong>Số điện thoại:</strong>{" "}
            <a href="tel:+84123456789" className="text-blue_main_sub">
              +0961564888
            </a>
          </p>
          <p className="text-small font-normal">
            <strong>Địa chỉ:</strong> 783 Tam Trinh, Yên Sở, Hoàng Mai, Hà Nội
          </p>
          <p className="text-small font-normal">
            <strong>Thời gian làm việc:</strong> Thứ Hai - Thứ Sáu, 8:00 - 17:00
          </p>
        </div>
        <p className="text-small font-normal">
          Để biết thêm chi tiết hoặc hỗ trợ khẩn cấp, vui lòng truy cập phần{" "}
          <strong>Hỗ trợ khách hàng</strong> trên trang web của chúng tôi.
        </p>
      </div>
    </div>
  );
};
const Page5 = () => {
  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-large font-medium">Trở thành Đối tác Phân phối</h2>
        <div
          className="flex items-center justify-start  hover:opacity-85 hover: cursor-pointer p-2 gap-1 text-blue_main_sub text-normal font-medium"
          onClick={printContent}
        >
          <Printer className="size-4" />
          In
        </div>
      </div>
      <div className="grid gap-3">
        <p className="text-small font-normal">
          Chúng tôi luôn tìm kiếm những đối tác đáng tin cậy để cùng hợp tác
          phát triển dịch vụ du lịch toàn diện hơn và mang lại trải nghiệm tốt
          nhất cho khách hàng. Hãy tham gia mạng lưới đối tác của chúng tôi và
          tận dụng các lợi ích mà KoKoTravel mang lại.
        </p>
        <h3 className="text-medium font-semibold">
          Lợi ích khi trở thành đối tác của chúng tôi
        </h3>
        <ul className="list-disc pl-5">
          <li className="text-small font-normal">
            Tiếp cận với hàng triệu khách hàng tiềm năng trong và ngoài nước.
          </li>
          <li className="text-small font-normal">
            Công cụ quản lý và hỗ trợ đối tác mạnh mẽ, dễ sử dụng.
          </li>
          <li className="text-small font-normal">
            Chính sách hợp tác minh bạch và hấp dẫn.
          </li>
          <li className="text-small font-normal">
            Đội ngũ hỗ trợ đối tác chuyên nghiệp và tận tâm.
          </li>
        </ul>
        <h3 className="text-medium font-semibold">Cách thức tham gia</h3>
        <p className="text-small font-normal">
          Để trở thành đối tác phân phối của KoKoTravel, vui lòng thực hiện các
          bước sau:
        </p>
        <ol className="list-decimal pl-5">
          <li className="text-small font-normal">
            Điền vào <strong>form đăng ký đối tác</strong> tại{" "}
            <a href="/partnership-form" className="text-blue_main_sub">
              đây
            </a>
            .
          </li>
          <li className="text-small font-normal">
            Chờ xác nhận từ đội ngũ của chúng tôi trong vòng 3-5 ngày làm việc.
          </li>
          <li className="text-small font-normal">
            Hoàn thành các thủ tục cần thiết và bắt đầu hợp tác.
          </li>
        </ol>
        <h3 className="text-medium font-semibold">Liên hệ</h3>
        <p className="text-small font-normal">
          Nếu bạn có bất kỳ câu hỏi nào hoặc cần thêm thông tin, vui lòng liên
          hệ với đội ngũ phát triển đối tác của chúng tôi qua:
        </p>
        <p className="text-small font-normal">
          <strong>Email:</strong>{" "}
          <a
            href="mailto:nguyenthean12062002@gmail.com"
            className="text-blue_main_sub"
          >
            nguyenthean12062002@gmail.com
          </a>
        </p>
        <p className="text-small font-normal">
          <strong>Số điện thoại:</strong>{" "}
          <a href="tel:+84123456789" className="text-blue_main_sub">
            +0961563888
          </a>
        </p>
      </div>
    </div>
  );
};
const listPage = [Page1, Page2, Page3, Page4, Page5];
const ShowContent = () => {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("activeTab");
  // border-l-1 border-black_sub border-t-1 rounded-tl-14
  return (
    <div className="h-full  p-3">
      {listPage.map((Page, i) => {
        if (Number(activeTab) === i + 1) {
          return <Page key={i} />;
        }
      })}
    </div>
  );
};

export default ShowContent;
