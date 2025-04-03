import { getListProvinces } from "@/api/api-attractions";
import { cn } from "@/utils/constants";
import Link from "next/link";

const convertToSlug = (text: string) => {
  return text.toLowerCase().replace(/ /g, "-");
};

const ListProvinces = async () => {
  const { data } = await getListProvinces();
  return (
    <section className="container xl:px-0 h-auto list-spacing">
      <h3 className="text-lg md:text-2xl font-semibold text-center">
        Khám phá thêm nhiều điểm đến khác
      </h3>
      <p className="text-sm font-normal text-black_sub text-center mt-2">
        Tìm địa điểm tham quan tại các Tỉnh (Thành phố) của Việt Nam
      </p>
      <div
        className={cn(
          "w-full grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4",
          "md:grid-cols-4 md:gap-3",
          "lg:grid-cols-6 lg:gap-4"
        )}
      >
        {data &&
          data.map((province: any, index: number) => {
            return (
              <Link
                key={index}
                href={`/attractions/all?address=${province.name}`}
                className="flex items-center justify-center text-sm font-light p-2 rounded-lg bg-gray-100 text-center shadow-sm transition-all duration-300 hover:bg-gray-200 "
              >
                <span className="text-xs lg:text-sm flex items-center justify-center">
                  {province.name.replace("Tỉnh ", "").replace("Thành phố ", "")}
                </span>
              </Link>
            );
          })}
      </div>
    </section>
  );
};

export default ListProvinces;
