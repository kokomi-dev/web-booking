import { cn } from "@/lib/utils";

const FooterDashboard = () => {
  return (
    <footer className="w-full h-full footer bg-sub py-5  ">
      <ul
        className={cn(
          "grid grid-cols-5 gap-2 px-4 text-black py-2",
          "lg:px-20 lg:py-2"
        )}
      >
        <li>
          <a className="text-small font-semibold">Tài khoản của bạn</a>
        </li>
        <li>
          <a className="text-small font-semibold">
            Thay đổi lịch đi của bạn trực tuyến
          </a>
        </li>
        <li>
          <a className="text-small font-semibold">Dịch vụ khách hàng</a>
        </li>
        <li>
          <a className="text-small font-semibold">
            Trở thành đối tác phân phối
          </a>
        </li>
        <li>
          <a className="text-small font-semibold">KoKo Travel for Business</a>
        </li>
      </ul>
      <div
        className={cn(
          "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-4  text-[0.85rem] text-[#555] border-b-0.5 border-blue_main",
          "lg:p-10 lg:px-20 "
        )}
      >
        <ul>
          <li>Việt Nam</li>
          <li>Khu vực</li>
          <li>Thành phố</li>
          <li>Quận / Huyện</li>
          <li>Địa điểm được quan tâm</li>
        </ul>
        <ul>
          <li>Nhà</li>
          <li>Căn hộ</li>
          <li>Các resort</li>
          <li>Các biệt thự</li>
          <li>Các nhà nghỉ</li>
        </ul>{" "}
        <ul>
          <li>Những chỗ nghỉ độc đáo</li>
          <li>Tất cả các điểm đến</li>
          <li>Đánh giá của khách hàng</li>
          <li>Ưu đãi theo mùa và dịp lễ</li>
          <li>Tất cả địa điểm cho thuê xe</li>
          <li>Khám phá lưu trú theo tháng</li>
          <li>Bài viết về du lịch</li>
        </ul>{" "}
        <ul>
          <li>Dịch vụ khách hàng</li>
          <li>Trợ giúp đối tác</li>
          <li>Du lịch bền vững</li>
          <li>Truyền thông</li>
          <li>Trung tâm thông tin bảo mật</li>
          <li>Điều khoản điều kiện</li>
          <li>Thông báo về bảo mật và Cookie</li>
          <li>Liên hệ công ty</li>
          <li>Hướng dẫn và báo cáo nội dung</li>
          <li>Về Koko Travel</li>
        </ul>
      </div>
      <div className="px-20 py-5">
        <h6 className="pb-5 text-black text-center text-small">
          Bản quyền sáng tạo thuộc về KokoMi Dev. Liên hệ
          nguyenthean12062002@gmail.com
        </h6>
        <p className="text-center text-smallest">
          KoKo Travel là một website thương mại điện tử liên quan đến lĩnh vực
          du lịch và những phục vụ xoay quanh nó.
        </p>
      </div>
    </footer>
  );
};

export default FooterDashboard;
