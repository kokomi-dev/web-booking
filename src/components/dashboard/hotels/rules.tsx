import Icon from "@/components/components/icon";
import { RULES_HOTEL } from "../constants";
import img from "@/assets/images/banner-hotel-bg.jpeg";
const Rules = () => {
  return (
    <section
      className="w-full h-full  relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${img.src})`,
      }}
    >
      <div className="absolute inset-0 bg-black/50 z-10 container"></div>

      <div className="relative z-10 isolate overflow-hidden py-24 sm:py-32 container">
        <div className="mx-auto max-w-7xl px-0 md:px-3 lg:px-8  w-full h-full">
          <p className="w-full mt-8  text-center text-xl md:text-2xl font-semibold text-white sm:text-xl/8">
            Uy tín - Chất lượng - Tiện lợi cho mọi chuyến đi
          </p>
          <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
            <div className="w-full">
              <ul className="grid grid-cols-1 gap-6 lg:gap-8 my-2 md:grid-cols-2  lg:grid-cols-3 ">
                {RULES_HOTEL.map((rule, index) => (
                  <li
                    key={index}
                    className="flex flex-col items-start gap-2 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="text-green w-6 h-6">
                        <rule.icon />
                      </Icon>

                      <h4 className="text-black text-base lg:text-lg font-semibold">
                        {rule.title}
                      </h4>
                    </div>
                    {/* <p className="text-black_blur text-xs lg:text-sm font-light lg:font-normal">
                {rule.description}
              </p> */}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Rules;
