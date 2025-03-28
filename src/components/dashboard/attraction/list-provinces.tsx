import { getListProvinces } from "@/api/api-attractions";
import { cn } from "@/utils/constants";
import Link from "next/link";

const convertToSlug = (text: string) => {
  return text.toLowerCase().replace(/ /g, "-");
};

const ListProvinces = async () => {
  const { data } = await getListProvinces();
  return (
    <section className="w-full h-auto posing-vertical-2">
      <h3 className="text-large font-semibold">
        Khám phá thêm nhiều điểm đến khác
      </h3>
      <p className="text-small font-normal text-black_sub">
        Tìm địa điểm tham quan tại các Tỉnh (Thành phố) của Việt Nam
      </p>
      <div
        className={cn(
          "w-full grid grid-cols-5 gap-1 mt-2  ",
          "md:grid-cols-6 md:gap-y-3",
          "lg:gap-x-2 lg:gap-y-4 lg:grid-cols-8"
        )}
      >
        {data &&
          data.map((province: any, index: number) => {
            return (
              <Link
                key={index}
                href={`/attractions/all?address=${province.name}`}
                className="flex items-center justify-center text-small font-normal p-1 rounded-8 bg-bg_black_sub text-center transition-all duration-300 hover:bg-bg_primary_hover"
              >
                <span className="text-smallest text-black_main font-light lg:font-normal flex items-center justify-center">
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
