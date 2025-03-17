import { cn } from "@/utils/constants";
import { titles, footerItemList } from "../constant";
import Link from "next/link";
interface FooterItemProps {
  title: string;
  arrItem: { label: string; path: string | null }[];
}

const FooterItem: React.FC<FooterItemProps> = ({ title, arrItem }) => {
  return (
    <li className="w-full flex items-start justify-start flex-col gap-2">
      <div className="w-full">
        <a className="capitalize text-small font-semibold">{title}</a>
      </div>
      <ul className="w-full text-smallest font-medium flex items-start justify-start flex-wrap gap-x-1 ">
        {arrItem.map((item, index) => {
          return item.path !== null ? (
            <Link
              key={index}
              className="py-[0.25rem]  text-smallest font-normal file:capitalize hover:text-blue_main_sub transiton-all duration-150 first-letter:uppercase"
              href={item.path}
            >
              {item.label}
            </Link>
          ) : (
            <li
              className="w-full py-[0.25rem] first-letter:uppercase"
              key={index}
            >
              <span className="text-smallest font-normal first:capitalize">
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
              <FooterItem
                title={title}
                key={index}
                arrItem={footerItemList[index]}
              />
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
      <div className="px-0 md:px-5 ld:px-10 xl:px-20 py-5">
        <h6 className="pb-5 text-black text-center text-small">
          Bản quyền sáng tạo thuộc về <strong> AnTenDev</strong>. Liên hệ
          <a
            href="mailto: nguyenthean12062002@gmail.com"
            className="text-blue_main_sub font-medium"
          >
            {" "}
            nguyenthean12062002@gmail.com
          </a>
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
