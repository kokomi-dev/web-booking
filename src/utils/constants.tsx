// rating convert
const ratingConvert = (rating: number) => {
  if (rating >= 5) {
    return <span className="font-bold text-smallest ">Rất tuyệt vời</span>;
  }
  if (rating >= 4.5) {
    return <span className="font-bold text-smallest ">Tuyệt</span>;
  }
  if (rating >= 4) {
    return <span className="font-bold text-smallest ">Tốt</span>;
  }

  if (rating > 3) {
    return <span className="font-bold text-smallest ">Chưa tốt</span>;
  }
};
// convert VND
const convertVND = (num: number) => {
  const newNumber = new Intl.NumberFormat("vi-VI", {
    style: "currency",
    currency: "VND",
  }).format(num);
  return newNumber;
};
// navigations
export const NAVIGATIONS: { title: string; url: string; icon: string }[] = [
  {
    title: "Về chúng tôi",
    url: "/home",
    icon: "M13.5 3a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM15 3a3 3 0 1 0-6 0 3 3 0 0 0 6 0zm6 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm1.5 0a3 3 0 1 0-6 0 3 3 0 0 0 6 0zM6 7.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm1.5 0a3 3 0 1 0-6 0 3 3 0 0 0 6 0zM21 15a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm1.5 0a3 3 0 1 0-6 0 3 3 0 0 0 6 0zm-9-3.75a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm1.5 0a3 3 0 1 0-6 0 3 3 0 0 0 6 0zM6 15a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm1.5 0a3 3 0 1 0-6 0 3 3 0 0 0 6 0zm10.066 1.277a7.5 7.5 0 0 1-3.077 2.05.75.75 0 0 0 .498 1.415 9 9 0 0 0 3.693-2.46.75.75 0 1 0-1.114-1.005zm1.798-6.466c.177.922.183 1.869.015 2.792a.75.75 0 1 0 1.476.268c.2-1.106.194-2.24-.019-3.344a.75.75 0 1 0-1.472.284zm-5.337-5.784a7.5 7.5 0 0 1 3.54 2.196.75.75 0 0 0 1.113-1.004 9.002 9.002 0 0 0-4.247-2.636.75.75 0 1 0-.406 1.444zM6.434 6.223a7.5 7.5 0 0 1 3.539-2.196.75.75 0 1 0-.406-1.444A9.001 9.001 0 0 0 5.32 5.219a.75.75 0 0 0 1.114 1.004zM4.636 12.69a7.602 7.602 0 0 1 0-2.878.75.75 0 1 0-1.472-.284 9.102 9.102 0 0 0 0 3.446.75.75 0 0 0 1.472-.284zm4.876 5.639a7.517 7.517 0 0 1-3.035-2.005.75.75 0 0 0-1.106 1.014 9.017 9.017 0 0 0 3.641 2.405.75.75 0 1 0 .5-1.414zM7.31 21.872A1.5 1.5 0 0 0 8.672 24h6.656a1.5 1.5 0 0 0 1.362-2.128l-3.314-8.217c-.361-.785-1.252-1.114-2.005-.767a1.5 1.5 0 0 0-.733.734l-3.343 8.283zm1.377.595l3.328-8.25-.015.033 3.313 8.217.015.033H8.672z",
  },
  {
    title: "Địa điểm du lịch",
    url: "/attractions",
    icon: "M13.5 3a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM15 3a3 3 0 1 0-6 0 3 3 0 0 0 6 0zm6 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm1.5 0a3 3 0 1 0-6 0 3 3 0 0 0 6 0zM6 7.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm1.5 0a3 3 0 1 0-6 0 3 3 0 0 0 6 0zM21 15a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm1.5 0a3 3 0 1 0-6 0 3 3 0 0 0 6 0zm-9-3.75a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm1.5 0a3 3 0 1 0-6 0 3 3 0 0 0 6 0zM6 15a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm1.5 0a3 3 0 1 0-6 0 3 3 0 0 0 6 0zm10.066 1.277a7.5 7.5 0 0 1-3.077 2.05.75.75 0 0 0 .498 1.415 9 9 0 0 0 3.693-2.46.75.75 0 1 0-1.114-1.005zm1.798-6.466c.177.922.183 1.869.015 2.792a.75.75 0 1 0 1.476.268c.2-1.106.194-2.24-.019-3.344a.75.75 0 1 0-1.472.284zm-5.337-5.784a7.5 7.5 0 0 1 3.54 2.196.75.75 0 0 0 1.113-1.004 9.002 9.002 0 0 0-4.247-2.636.75.75 0 1 0-.406 1.444zM6.434 6.223a7.5 7.5 0 0 1 3.539-2.196.75.75 0 1 0-.406-1.444A9.001 9.001 0 0 0 5.32 5.219a.75.75 0 0 0 1.114 1.004zM4.636 12.69a7.602 7.602 0 0 1 0-2.878.75.75 0 1 0-1.472-.284 9.102 9.102 0 0 0 0 3.446.75.75 0 0 0 1.472-.284zm4.876 5.639a7.517 7.517 0 0 1-3.035-2.005.75.75 0 0 0-1.106 1.014 9.017 9.017 0 0 0 3.641 2.405.75.75 0 1 0 .5-1.414zM7.31 21.872A1.5 1.5 0 0 0 8.672 24h6.656a1.5 1.5 0 0 0 1.362-2.128l-3.314-8.217c-.361-.785-1.252-1.114-2.005-.767a1.5 1.5 0 0 0-.733.734l-3.343 8.283zm1.377.595l3.328-8.25-.015.033 3.313 8.217.015.033H8.672z",
  },
  {
    title: "Khách sạn & Nhà nghỉ",
    url: "/hotels",
    icon: "M2.75 12h18.5c.69 0 1.25.56 1.25 1.25V18l.75-.75H.75l.75.75v-4.75c0-.69.56-1.25 1.25-1.25m0-1.5A2.75 2.75 0 0 0 0 13.25V18c0 .414.336.75.75.75h22.5A.75.75 0 0 0 24 18v-4.75a2.75 2.75 0 0 0-2.75-2.75zM0 18v3a.75.75 0 0 0 1.5 0v-3A.75.75 0 0 0 0 18m22.5 0v3a.75.75 0 0 0 1.5 0v-3a.75.75 0 0 0-1.5 0m-.75-6.75V4.5a2.25 2.25 0 0 0-2.25-2.25h-15A2.25 2.25 0 0 0 2.25 4.5v6.75a.75.75 0 0 0 1.5 0V4.5a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 0 1.5 0m-13.25-3h7a.25.25 0 0 1 .25.25v2.75l.75-.75h-9l.75.75V8.5a.25.25 0 0 1 .25-.25m0-1.5A1.75 1.75 0 0 0 6.75 8.5v2.75c0 .414.336.75.75.75h9a.75.75 0 0 0 .75-.75V8.5a1.75 1.75 0 0 0-1.75-1.75z",
  },
  // {
  //   title: "Gói dịch vụ",
  //   url: "/combos",
  //   icon: "M13.5 3a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM15 3a3 3 0 1 0-6 0 3 3 0 0 0 6 0zm6 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm1.5 0a3 3 0 1 0-6 0 3 3 0 0 0 6 0zM6 7.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm1.5 0a3 3 0 1 0-6 0 3 3 0 0 0 6 0zM21 15a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm1.5 0a3 3 0 1 0-6 0 3 3 0 0 0 6 0zm-9-3.75a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm1.5 0a3 3 0 1 0-6 0 3 3 0 0 0 6 0zM6 15a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm1.5 0a3 3 0 1 0-6 0 3 3 0 0 0 6 0zm10.066 1.277a7.5 7.5 0 0 1-3.077 2.05.75.75 0 0 0 .498 1.415 9 9 0 0 0 3.693-2.46.75.75 0 1 0-1.114-1.005zm1.798-6.466c.177.922.183 1.869.015 2.792a.75.75 0 1 0 1.476.268c.2-1.106.194-2.24-.019-3.344a.75.75 0 1 0-1.472.284zm-5.337-5.784a7.5 7.5 0 0 1 3.54 2.196.75.75 0 0 0 1.113-1.004 9.002 9.002 0 0 0-4.247-2.636.75.75 0 1 0-.406 1.444zM6.434 6.223a7.5 7.5 0 0 1 3.539-2.196.75.75 0 1 0-.406-1.444A9.001 9.001 0 0 0 5.32 5.219a.75.75 0 0 0 1.114 1.004zM4.636 12.69a7.602 7.602 0 0 1 0-2.878.75.75 0 1 0-1.472-.284 9.102 9.102 0 0 0 0 3.446.75.75 0 0 0 1.472-.284zm4.876 5.639a7.517 7.517 0 0 1-3.035-2.005.75.75 0 0 0-1.106 1.014 9.017 9.017 0 0 0 3.641 2.405.75.75 0 1 0 .5-1.414zM7.31 21.872A1.5 1.5 0 0 0 8.672 24h6.656a1.5 1.5 0 0 0 1.362-2.128l-3.314-8.217c-.361-.785-1.252-1.114-2.005-.767a1.5 1.5 0 0 0-.733.734l-3.343 8.283zm1.377.595l3.328-8.25-.015.033 3.313 8.217.015.033H8.672z",
  // },
  {
    title: "Liên hệ tư vấn",
    url: "/contact",
    icon: "M9.75 9a2.25 2.25 0 1 1 3 2.122 2.25 2.25 0 0 0-1.5 2.122v1.006a.75.75 0 0 0 1.5 0v-1.006c0-.318.2-.602.5-.708A3.75 3.75 0 1 0 8.25 9a.75.75 0 1 0 1.5 0zM12 16.5a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25.75.75 0 0 0 0 1.5.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5zM22.5 12c0 5.799-4.701 10.5-10.5 10.5S1.5 17.799 1.5 12 6.201 1.5 12 1.5 22.5 6.201 22.5 12zm1.5 0c0-6.627-5.373-12-12-12S0 5.373 0 12s5.373 12 12 12 12-5.373 12-12z",
  },
];
// validate email
function isValidEmail(email: string) {
  // Biểu thức chính quy để kiểm tra email
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Sử dụng phương thức test() để kiểm tra
  return regex.test(email);
}
// convert to slug
export const convertToSlug = (text: string) => {
  text = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  text = text.toLowerCase();
  text = text.replace(/[^a-z0-9\s-]/g, "");
  text = text.trim().replace(/\s+/g, "-");
  return text;
};
const scrollToView = (classe: string, cssActive?: string) => {
  const itemDiversity = document.querySelectorAll(`${classe}`);
  const scroll = new IntersectionObserver((entry) => {
    entry.forEach((e) => {
      const { target } = e;
      target.classList.toggle(`${cssActive}`, e.isIntersecting);
    });
  }, {});
  itemDiversity.forEach((item) => {
    scroll.observe(item);
  });
};

//
// hidden search in route
export const HIDDEN_SEARCH = ["booking", "pay"];
//
//
export const ADDRESS_TRENDING = [
  {
    name: "Đà nẵng",
    img: "https://q-xx.bstatic.com/xdata/images/city/533x300/688844.jpg?k=02892d4252c5e4272ca29db5faf12104004f81d13ff9db724371de0c526e1e15&o=",
    slug: "da-nang",
  },
  {
    name: "Hội an",
    img: "https://q-xx.bstatic.com/xdata/images/city/533x300/688872.jpg?k=d0eb773fecb09bba40b98866ca0efd153ad51091f128ef93d1298e4d2c48df8d&o=",
    slug: "hoi-an",
  },
  {
    name: "nha trang",
    img: "https://q-xx.bstatic.com/xdata/images/city/533x300/688907.jpg?k=8a219233969467d9f7ff828918cce2a53b4db6f1da1039d27222441ffb97c409&o=",
    slug: "nha-trang",
  },
  {
    name: "Huê",
    img: "https://q-xx.bstatic.com/xdata/images/city/533x300/688888.jpg?k=e66838f3f1a5e26b31a01fa5284cff8ebfb9d186203bf516f72ce8b476d8dcc4&o=",
    slug: "hue",
  },
  {
    name: "Hà nội",
    img: "https://q-xx.bstatic.com/xdata/images/city/533x300/688861.jpg?k=69489591c3adcc2571361d7b6be1b284f4ad5573b4544767d4ce1426ef33af30&o=",
    slug: "ha-noi",
  },
  {
    name: "TP.Hồ Chí Minh ",
    img: "https://q-xx.bstatic.com/xdata/images/city/533x300/688895.jpg?k=cbd714092f2cdd284db903badf316a7cf6b5ac73fd08b6cafee6e58c16f7d6b5&o=",
    slug: "tp-ho-chi-minh",
  },
];
//
//
// type
export interface AttractionData {
  _id: string;
  slug: string;
  name: string;
  description: string;
  location: {
    province: object;
    district: object;
    detail: string;
  };
  rating: number;
  duration: number;
  images: string[];
  schedule: string[];
  included: string[];
  price: [number, number];
  city: string;
  cancelFree: boolean;
}
export type HotelData = {
  _id: string;
  slug: string;
  name: string;
  details: string;
  location: {
    detail: string;
    province_id: string;
    district_id: string;
    commun_id: string;
  };
  listRooms: [
    {
      name: string;
      numberPeople: number;
      details: string[];
      price: number;
      sale: number;
      isAddchildren: boolean;
    }
  ];
  rating: number;
  images: string[];
  city: string;
  type: number;
  highlights: [string];
  includes: [string];
  comments: [{}];
};
//
export { ratingConvert, convertVND, isValidEmail, scrollToView };
