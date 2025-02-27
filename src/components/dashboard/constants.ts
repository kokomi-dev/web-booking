import trendingImg1 from "@/assets/images/trending-danang.jpg";
import trendingImg2 from "@/assets/images/trending-hoian.webp";
import trendingImg3 from "@/assets/images/trending-nhatrang.jpg";
import trendingImg4 from "@/assets/images/trending-hue.jpg";
import trendingImg5 from "@/assets/images/trending-hanoi.jpg";
import trendingImg6 from "@/assets/images/trending-hagiang.jpg";
import {
  Ban,
  Dog,
  Clock,
  XCircle,
  CreditCard,
  Volume2,
  BadgeCheck,
  ShieldCheck,
  Globe,
  Star,
} from "lucide-react";

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
    name: "Hà Nội",
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
      "Trải nghiệm những điều tuyệt vời nhất tại điểm đến với các địa điểm tham quan, tour và nhiều hoạt động khác.",
  },
  {
    icon: CalendarCheck2,
    title: "Nhanh chóng và linh hoạt",
    description:
      "Đặt vé online trong vài phút với lựa chọn hủy miễn phí ở nhiều địa điểm tham quan.",
  },
  {
    icon: PhoneCall,
    title: "Hỗ trợ khách hàng 24/7",
    description:
      "Đội ngũ Dịch vụ Khách hàng toàn cầu của KoKoTravel sẽ luôn có mặt để hỗ trợ bạn 24/7.",
  },
  {
    icon: ShieldCheck,
    title: "Đảm bảo an toàn",
    description:
      "Tất cả chỗ nghỉ và dịch vụ của chúng tôi đều được kiểm duyệt kỹ càng để đảm bảo chất lượng.",
  },
  {
    icon: Globe,
    title: "Mạng lưới toàn cầu",
    description:
      "Hơn 10.000+ khách sạn và khu nghỉ dưỡng trên khắp cả nước sẵn sàng phục vụ bạn.",
  },
  {
    icon: Star,
    title: "Trải nghiệm đáng nhớ",
    description:
      "Dịch vụ chất lượng, giá cả hợp lý, giúp bạn tận hưởng kỳ nghỉ một cách trọn vẹn nhất.",
  },
];

export const RULES_DEMO = [
  {
    title: "Không mang vật nuôi",
    description:
      "Chỗ nghỉ không cho phép mang vật nuôi để đảm bảo vệ sinh và sự thoải mái cho khách.",
    icon: Dog,
  },
  {
    title: "Không hút thuốc",
    description:
      "Các khu vực trong chỗ nghỉ đều cấm hút thuốc để giữ môi trường trong lành.",
    icon: Ban,
  },
  {
    title: "Giờ nhận và trả phòng",
    description:
      "Nhận phòng từ 14:00 và trả phòng trước 12:00. Vui lòng tuân thủ để chỗ nghỉ có thể phục vụ tốt hơn.",
    icon: Clock,
  },
  {
    title: "Hủy đặt phòng",
    description:
      "Miễn phí hủy phòng trước 48 giờ. Hủy sau thời gian này sẽ tính phí 50% giá trị đặt phòng.",
    icon: XCircle,
  },
  {
    title: "Thanh toán",
    description:
      "Chấp nhận thanh toán qua tiền mặt, thẻ tín dụng hoặc chuyển khoản ngân hàng.",
    icon: CreditCard,
  },
  {
    title: "Hạn chế tiếng ồn",
    description:
      "Giữ yên lặng sau 22:00 để đảm bảo giấc ngủ cho tất cả khách lưu trú.",
    icon: Volume2,
  },
  {
    title: "Xuất trình giấy tờ",
    description:
      "Khách phải xuất trình CMND/CCCD hoặc hộ chiếu khi nhận phòng.",
    icon: BadgeCheck,
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
  { value: 0, label: "Đề xuất của chúng tôi" },
  { value: 1, label: "Giá thấp nhất" },
  { value: 2, label: "Đánh giá cao nhất" },
];
export const filterAttraction1 = [
  { label: "attraction", value: "attraction" },
  { label: "thiên nhiên và ngoài trời", value: "1" },
  { label: "bảo tàng nghệ thuật văn hóa", value: "2" },
  { label: "hoạt động giải trí, vé", value: "3" },
  { label: "ăn uống", value: "4" },
  { label: "dịch vụ & cho thuê", value: "5" },
];
export const filterAttraction2 = [
  { label: "Tât cả", value: "0" },
  { label: "0 - 400.000", value: "1" },
  { label: "400.000 - 1.000.000", value: "2" },
  { label: "1.000.000 - 3.000.000", value: "3" },
  { label: "3.000.000 - 5.000.000", value: "4" },
  { label: "trên 5 triệu", value: "5" },
];
export const filterAttraction3 = [
  { label: "tất cả", value: "" },
  { label: "từ 4.5 trở lên", value: "1" },
  { label: "từ 4 trở lên", value: "2" },
  { label: "từ 3.5 trở lên", value: "3" },
  { label: "từ 3 trở lên", value: "4" },
];
export const filterAttraction4 = [
  { label: "Tất cả", value: "" },
  { label: "Dễ", value: "1" },
  { label: "Trung bình", value: "2" },
  { label: "Khó", value: "3" },
];

export const filterHotel1 = [
  { label: "Có", value: "1" },
  { label: "Không", value: "0" },
];
export const filterHotel2 = [
  { label: "Có", value: "1" },
  { label: "Không", value: "0" },
];
