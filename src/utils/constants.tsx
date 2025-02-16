import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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
const convertVND = (num: number) => {
  const newNumber = new Intl.NumberFormat("vi-VI", {
    style: "currency",
    currency: "VND",
  }).format(num);
  return newNumber;
};
export const NAVIGATIONS: { title: string; url: string; icon: string }[] = [
  {
    title: "Về chúng tôi",
    url: "/home",
    icon: "M12 3l-9 8h3v9h6v-6h2v6h6v-9h3l-9-8z",
  },
  {
    title: "Địa điểm du lịch",
    url: "/attractions",
    icon: "M12 2C8.13 2 5 5.13 5 9c0 4.42 4.92 9.69 6.61 11.46a1 1 0 0 0 1.39 0C14.08 18.69 19 13.42 19 9c0-3.87-3.13-7-7-7zm0 15.3C10.23 15.04 7 11.15 7 9a5 5 0 0 1 10 0c0 2.15-3.23 6.04-5 8.3zM12 6a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  },
  {
    title: "Lưu trú",
    url: "/hotels",
    icon: "M4 10V7c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v3h1v9h-2v-2H5v2H3v-9h1zm6-2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm10 2h-6v3h6v-3z",
  },
  {
    title: "Bài viết",
    url: "/blogs",
    icon: "M6 2C4.34 2 3 3.34 3 5v14c0 1.66 1.34 3 3 3h12a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H7c-.55 0-1-.45-1-1s.45-1 1-1h11a1 1 0 0 0 1-1V5c0-1.66-1.34-3-3-3H6zm0 2h10c.55 0 1 .45 1 1v10H7c-1.1 0-2 .9-2 2s.9 2 2 2h10v1H6c-.55 0-1-.45-1-1V5c0-.55.45-1 1-1z",
  },
  {
    title: "Liên hệ tư vấn",
    url: "/contact",
    icon: "M14.44 15a.62.62 0 0 0 0-.85.58.58 0 0 0-.83 0c-.367.33-.847.506-1.34.49a1.9 1.9 0 0 1-1.34-.49.58.58 0 0 0-.83 0 .61.61 0 0 0 0 .85c.58.57 1.367.88 2.18.86a3 3 0 0 0 2.16-.86m7.17-6.49a2 2 0 0 0-.22 0l-.14-.32C19.245 3.091 13.487.583 8.388 2.588A9.92 9.92 0 0 0 2.67 8.5h-.28a2.16 2.16 0 0 0-2.16 2.17v2.82a2.16 2.16 0 0 0 4.32 0v-2.82A2.2 2.2 0 0 0 4 9.27a8.41 8.41 0 0 1 15.85-.45l.17.39a2 2 0 0 0-.59 1.46v2.82c.002.466.157.92.44 1.29a8.4 8.4 0 0 1-5.29 5.06 2.63 2.63 0 0 0-4.715 2.332 2.63 2.63 0 0 0 4.965-.822 10 10 0 0 0 6.32-5.75q.218.048.44.05a2.16 2.16 0 0 0 2.16-2.16v-2.82a2.16 2.16 0 0 0-2.14-2.16m-18.56 5a.66.66 0 0 1-1.32 0v-2.84a.66.66 0 0 1 1.32 0zm9.2 8.65a1.13 1.13 0 0 1 0-2.26 1.13 1.13 0 0 1 1.13 1.1 1.14 1.14 0 0 1-1.13 1.14zm10-8.65a.66.66 0 0 1-1.32 0v-2.84a.67.67 0 0 1 .66-.66.66.66 0 0 1 .66.66zM7.33 8.88c-.21.21-.328.494-.33.79.002.224.068.443.19.63.124.186.302.329.51.41.205.088.431.112.65.07.215-.049.412-.156.57-.31.16-.157.268-.36.31-.58.04-.218.02-.443-.06-.65a1.13 1.13 0 0 0-1.84-.36m7.88 0a1.12 1.12 0 0 0-.14 1.42 1.14 1.14 0 0 0 1.15.48 1.17 1.17 0 0 0 .58-.31c.153-.16.258-.362.3-.58.04-.222.006-.45-.1-.65a1.1 1.1 0 0 0-.41-.5 1.2 1.2 0 0 0-.59-.19c-.297 0-.581.119-.79.33",
  },
  {
    title: "Điều khoản điều kiện",
    url: "/content/privacy",
    icon: "M9.75 9a2.25 2.25 0 1 1 3 2.122 2.25 2.25 0 0 0-1.5 2.122v1.006a.75.75 0 0 0 1.5 0v-1.006c0-.318.2-.602.5-.708A3.75 3.75 0 1 0 8.25 9a.75.75 0 1 0 1.5 0M12 16.5a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25.75.75 0 0 0 0 1.5.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5M22.5 12c0 5.799-4.701 10.5-10.5 10.5S1.5 17.799 1.5 12 6.201 1.5 12 1.5 22.5 6.201 22.5 12m1.5 0c0-6.627-5.373-12-12-12S0 5.373 0 12s5.373 12 12 12 12-5.373 12-12",
  },
];
function isValidEmail(email: string) {
  // Biểu thức chính quy để kiểm tra email
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Sử dụng phương thức test() để kiểm tra
  return regex.test(email);
}
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
const removeEmptyLines = (text: string) => {
  return text
    .split("\n")
    .filter((line) => line.trim() !== "")
    .join("\n");
};
const timeListBooking = [
  {
    value: "0",
    label: "Tôi chưa rõ",
  },
  {
    value: "01.00 - 05.00",
    label: "01.00 - 05.00",
  },
  {
    value: "05.00 - 07.00",
    label: "05.00 - 07.00",
  },
  {
    value: "07.00 - 10.00",
    label: "07.00 - 10.00",
  },
  {
    value: "10.00 - 13.00",
    label: "10.00 - 13.00",
  },
  {
    value: "13.00 - 15.00",
    label: "13.00 - 15.00",
  },
  {
    value: "15.00 - 17.00",
    label: "15.00 - 17.00",
  },
  {
    value: "17.00 - 20.00",
    label: "17.00 - 20.00",
  },
  {
    value: "20.00 - 24.00",
    label: "20.00 - 24.00",
  },
];
const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
const removeDots = (numberStr: string) => {
  return numberStr.replace(/\./g, "");
};
const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
const formatDate = (date: Date | string): string => {
  if (!date) return "";

  const parsedDate = new Date(date);
  return parsedDate.toLocaleDateString("vi-VN");
};

export {
  ratingConvert,
  convertVND,
  isValidEmail,
  scrollToView,
  removeEmptyLines,
  timeListBooking,
  cn,
  removeDots,
  capitalizeFirstLetter,
  formatDate,
};
