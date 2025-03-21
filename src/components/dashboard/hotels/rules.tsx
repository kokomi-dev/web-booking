import Icon from "@/components/components/icon";
import { RULES_HOTEL } from "../constants";

const Rules = () => {
  return (
    <div className="w-full h-full posing-vertical-3">
      <div className="w-full h-full text-center mb-6">
        <h2 className="text-medium lg:text-large  font-bold text-gray-900">
          "Bạn cứ vô tư khám phá, những thứ khác đã có{" "}
          <span className="text-blue_main_sub">KoKoTravel</span> lo!"
        </h2>
        <p className="text-gray-600 mt-2 text-sm lg:text-base">
          Uy tín - Chất lượng - Tiện lợi cho mọi chuyến đi 🌍
        </p>
      </div>
      {/* Danh sách lợi ích */}
      <div className="w-full">
        <ul className="grid grid-cols-1 gap-6 lg:gap-8 my-2 md:grid-cols-2  lg:grid-cols-3 ">
          {RULES_HOTEL.map((rule, index) => (
            <li
              key={index}
              className="flex flex-col items-start gap-2 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-3">
                <Icon className="text-green-600 w-6 h-6">
                  <rule.icon />
                </Icon>

                <h4 className="text-black_main text-lg font-semibold">
                  {rule.title}
                </h4>
              </div>
              <p className="text-black_main_blur text-smallest lg:text-small font-light lg:font-normal">
                {rule.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Rules;
