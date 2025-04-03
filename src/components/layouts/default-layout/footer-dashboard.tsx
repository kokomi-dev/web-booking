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
        <a className="capitalize text-sm font-semibold text-blue_sub">
          {title}
        </a>
      </div>
      <ul className="w-full text-xs font-medium flex items-start justify-start flex-wrap gap-x-1 ">
        {arrItem.map((item, index) => {
          return item.path !== null ? (
            <Link
              key={index}
              className="py-[0.3rem] lg:py-[0.6rem]  text-xs font-normal file:capitalize hover:text-blue_sub transiton-all duration-150 first-letter:uppercase"
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
    <footer className="w-full h-full  bg-bg_footer py-5 ">
      <div className="container">
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

        <div className="px-0 md:px-5 ld:px-10 xl:px-20 py-5">
          <h6 className="pb-5 text-black text-center text-sm">
            Bản quyền sáng tạo thuộc về <strong> AnTenDev</strong>. Liên hệ
            <a
              href="mailto: nguyenthean12062002@gmail.com"
              className="text-blue_sub font-medium"
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
