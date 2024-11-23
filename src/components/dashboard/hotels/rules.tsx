import { cn } from "@/lib/utils";

import React from "react";
import { RULES_HOTEL } from "../constants";
import Icon from "@/components/components/icon";

const Rules = () => {
  return (
    <div className="w-full h-full flex flex-col items-start justify-start gap-y-2">
      <div className="w-full h-full">
        <h2 className="text-large font-bold">
          Bạn cứ vô tư khám phá, những thứ khác chúng tôi lo
        </h2>
      </div>
      <div className="w-full">
        <ul
          className={cn(
            "w-full grid grid-cols-1 gap-y-6 my-2",
            "md:grid-cols-2 lg:grid-cols-3"
          )}
        >
          {RULES_HOTEL.map((rule, index) => {
            return (
              <li
                key={index}
                className="flex flex-col items-start justify-start gap-1"
              >
                <div className="flex items-start justify-center gap-x-3">
                  <Icon>
                    <rule.icon className="text-green_main" />
                  </Icon>
                  <h4 className="text-black_main text-normal font-semibold">
                    {rule.title}
                  </h4>
                </div>
                <p className="text-small font-normal mt-1 ml-1">
                  {rule.description}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Rules;
