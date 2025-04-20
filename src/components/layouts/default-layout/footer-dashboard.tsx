import { cn } from "@/utils/constants";
import { titles, footerItemList } from "../constant";
import Link from "next/link";
interface FooterItemProps {
  title: string;
  arrItem: { label: string; path: string | null }[];
}
import iconLogo from "@/assets/icons/favicon.png";
import Image from "next/image";

const FooterItem: React.FC<FooterItemProps> = ({ title, arrItem }) => {
  return (
    <li className="w-full flex items-start justify-start flex-col gap-2">
      <div className="w-full">
        <a className="capitalize text-sm font-semibold text-yellow">{title}</a>
      </div>
      <ul className="w-full text-xs font-medium flex items-start justify-start flex-wrap gap-x-1 ">
        {arrItem.map((item, index) => {
          return item.path !== null ? (
            <Link
              key={index}
              className="py-[0.3rem] lg:py-[0.5rem]  text-xs font-normal file:capitalize hover:shadow-lg transiton-all duration-150 first-letter:uppercase"
              href={item.path}
            >
              {item.label}
            </Link>
          ) : (
            <li
              className="w-full py-[0.6rem] first-letter:uppercase"
              key={index}
            >
              <span className="text-xs   font-normal first:capitalize">
                {item.label}
              </span>
            </li>
          );
        })}
      </ul>
    </li>
  );
};

const FooterDashboard = () => {
  return (
    <footer className="w-full h-full  bg-blue-linear text-white py-5 ">
      <div className="container">
        <div className="flex flex-wrap items-center justify-between gap-x-2 mb-5">
          <Link
            href="/home"
            className="text-lg md:text-2xl font-bold relative z-10 hover:text-blue-200 flex items-center justify-start gap-x-2 group"
          >
            <Image
              alt="icon__logo__kokotravel"
              width={150}
              height={150}
              priority
              src={iconLogo.src}
              className="size-16"
              quality={100}
            />
            <div className="flex flex-col items-start leading-none text-2xl">
              <span className="font-sans font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
                KoKo
              </span>
              <span className="text-xl text-blue-100 font-medium tracking-wider">
                Travel
              </span>
            </div>
          </Link>
          <div className="text-center">
            <div className="text-2xl font-semibold text-white">
              Công ty Du lịch & Thương mại AnTenDev
            </div>
            <div className="w-1/2 h-[2px] bg-white mx-auto mt-2"></div>
          </div>
        </div>
        <ul
          className={cn(
            "grid grid-cols-2 gap-2  text-white py-2 ",
            "md:grid-cols-3",
            "lg:grid-cols-5"
          )}
        >
          {titles.map((title, index) => {
            return (
              <FooterItem
                title={title}
                key={index}
                arrItem={footerItemList[index]}
              />
            );
          })}
        </ul>

        <div className="px-0 md:px-5 ld:px-10 xl:px-20 py-5">
          <h6 className="pb-5 text-yellow text-center text-sm">
            Bản quyền sáng tạo thuộc về <strong> AnTenDev</strong>. Liên hệ
            <a
              href="mailto: nguyenthean12062002@gmail.com"
              className="text-white font-medium"
            >
              {" "}
              nguyenthean12062002@gmail.com
            </a>
          </h6>
          <p className="text-center text-xs">
            KoKo Travel là một website thương mại điện tử liên quan đến lĩnh vực
            du lịch và những phục vụ xoay quanh nó.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterDashboard;
