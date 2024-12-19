import trendingImg1 from "@/assets/images/trending-danang.jpg";
import trendingImg2 from "@/assets/images/trending-hoian.webp";
import trendingImg3 from "@/assets/images/trending-nhatrang.jpg";
import trendingImg4 from "@/assets/images/trending-hue.jpg";
import trendingImg5 from "@/assets/images/trending-hanoi.jpg";
import trendingImg6 from "@/assets/images/trending-hagiang.jpg";

import { BookmarkCheck, CalendarCheck2, PhoneCall } from "lucide-react";
export const ADDRESS_TRENDING = [
  {
    name: "Đà Nẵng",
    img: trendingImg1,
    slug: "da-nang",
  },
  {
    name: "Hội An",
    img: trendingImg2,
    slug: "hoi-an",
  },
  {
    name: "Khánh Hòa",
    img: trendingImg3,
    slug: "khanh-hoa",
  },
  {
    name: "Huế",
    img: trendingImg4,
    slug: "hue",
  },
  {
    name: "Hà nội",
    img: trendingImg5,
    slug: "ha-noi",
  },
  {
    name: "Hà Giang",
    img: trendingImg6,
    slug: "ha-giang",
  },
];
export const RULES_HOTEL = [
  {
    icon: BookmarkCheck,
    title: "Chỗ nghỉ hàng đầu",
    description:
      "Trải nghiệm những điều tuyệt vời nhất tại điểm đến với các địa điểm tham quan, tour và nhiều hoạt động khác",
  },
  {
    icon: CalendarCheck2,
    title: "Nhanh chóng và linh hoạt",
    description:
      "Đặt vé online trong vài phút với lựa chọn hủy miễn phí ở nhiều địa điểm quan tham",
  },
  {
    icon: PhoneCall,
    title: "Được trợ giúp khi bạn cần",
    description:
      "Đội ngũ Dịch vụ Khách hàng toàn cầu của KoKoTravel.com sẽ luôn có mặt để hỗ trợ bạn 24/7",
  },
];
export const RULES_DEMO = [
  {
    title: "Không mang vật nuôi",
    description:
      "Chỗ nghỉ không cho phép mang vật nuôi để đảm bảo vệ sinh và sự thoải mái cho khách.",
  },
  {
    title: "Không hút thuốc",
    description:
      "Các khu vực trong chỗ nghỉ đều cấm hút thuốc để giữ môi trường trong lành.",
  },
  {
    title: "Giờ nhận và trả phòng",
    description:
      "Nhận phòng từ 14:00 và trả phòng trước 12:00. Vui lòng tuân thủ để chỗ nghỉ có thể phục vụ tốt hơn.",
  },
  {
    title: "Hủy đặt phòng",
    description:
      "Miễn phí hủy phòng trước 48 giờ. Hủy sau thời gian này sẽ tính phí 50% giá trị đặt phòng.",
  },
];

export const LIST_QUESTION_HOTELS = [
  "Họ có phục vụ bữa sáng không",
  "có chỗ đỗ xe không",
  "Có wifi miễn phí không",
  "có dịch vụ đưa đón sân bay miễn phi không",
  "có cho mang thú nuôi không",
  "Chỗ nghỉ có spa không",
  "ở đây có phòng dịch vụ không",
  "Họ có phục vụ bữa sáng không",
];
export const filterBar = [
  { value: "suggest", label: "Đề xuất của chúng tôi" },
  { value: "hightest-price", label: "Giá cao nhất" },
  { value: "lowest-price", label: "Giá thấp nhất" },
  { value: "rating-best", label: "Đánh giá cao nhất" },
];
export const filter1 = [
  "attraction",
  "thiên nhiên và ngoài trời",
  "bảo tàng nghệ thuật văn hóa",
  "hoạt động giải trí, vé",
  "ăn uống",
  "dịch vụ & cho thuê",
];
export const filter2 = [
  "0 - 400.000",
  "400.000 - 1.000.000",
  "1.000.000 - 3.000.000",
  " trên 3 triệu",
];
export const filter3 = [
  "từ 4.5 trở lên",
  "từ 4 trở lên",
  "từ 3.5 trở lên",
  "từ 3 trở lên",
];
