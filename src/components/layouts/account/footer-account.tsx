import { cn } from "@/utils/constants";

const titles = [
  "Thay đổi lịch đi của bạn trực tuyến",
  "Dịch vụ khách hàng",
  "Trở thành đối tác phân phối",
  "KoKo Travel for Business",
  "về chúng tôi",
];
const arr1 = [
  ["Việt nam", "khu vực", "quận / huyện", "địa điểm được quan tâm"],
  [
    "thay đổi lịch trình trực tuyến của bạn",
    "dịch vụ khách hàng",
    "trở thành đối tác phân phối",
    "KokoTravel for Business",
  ],
  ["Nhà", "Căn hộ", "Các resort", "Các biệt thự", "Các nhà nghỉ"],
  [
    "Những chỗ nghỉ độc đáo",
    "Tất cả các điểm đến",
    "Đánh giá của khách hàng",
    "Ưu đãi theo mùa và dịp lễ",
    "Tất cả địa điểm cho thuê xe",
    "Khám phá lưu trú theo tháng",
    "Bài viết về du lịch",
  ],
  [
    "Dịch vụ khách hàng",
    "Trợ giúp đối tác",
    "Du lịch bền vững",
    "Truyền thông",
    "Trung tâm thông tin bảo mật",
    "Điều khoản điều kiện",
    "Thông báo về bảo mật và Cookie",
    "Liên hệ công ty",
    "Hướng dẫn và báo cáo nội dung",
    "Về Koko Travel",
  ],
];

interface FooterItemProps {
  title: string;
  arrItem: string[];
}
const FooterItem: React.FC<FooterItemProps> = ({ title, arrItem }) => {
  return (
    <li className="w-full flex items-start justify-start flex-col gap-2 ">
      <div className="w-full">
        <a className="capitalize text-small font-semibold">{title}</a>
      </div>
      <ul className="w-full text-smallest font-medium">
        {arrItem.map((item, index) => {
          return (
            <li className="w-full  " key={index}>
              <a>
                <span className="text-smallest font-normal capitalize">
                  {item}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </li>
  );
};

const FooterAccount = () => {
  return (
    <footer className="w-full h-full  bg-sub py-5 container-padding  ">
      <div>
        <ul
          className={cn(
            "grid grid-cols-2 gap-2  text-black py-2 ",
            "md:grid-cols-3",
            "lg:grid-cols-5"
          )}
        >
          {titles.map((title, index) => {
            return (
              <FooterItem title={title} key={index} arrItem={arr1[index]} />
            );
          })}
        </ul>
      </div>

      <div
        className={cn(
          "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-4  text-[0.8rem] text-black_sub border-b-0.5 border-blue_main",
          "  "
        )}
      >
        <ul></ul>
        <ul></ul> <ul></ul> <ul></ul>
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

export default FooterAccount;
