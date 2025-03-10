import { SearchDatePickerProps } from "@/types/search";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import React, { useEffect, useState } from "react";
import { cn } from "@/utils/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";
const getDates = (startDate: Date, count: number): Date[] => {
  const dates = [];
  for (let i = 0; i < count; i++) {
    const newDate = new Date(startDate);
    newDate.setDate(startDate.getDate() + i);
    dates.push(newDate);
  }
  return dates;
};

const formatDate = (date: Date) => ({
  day: date.getDate(),
  month: date.toLocaleString("vi-VN", { month: "2-digit" }),
  weekday: date.toLocaleString("vi-VN", { weekday: "short" }),
});

const CarouselDate: React.FC<SearchDatePickerProps> = ({
  date,
  setDate,
  className,
}) => {
  const currentDate = new Date();
  const [currentStartDate, setCurrentStartDate] = useState(new Date());
  const [dates, setDates] = useState(getDates(currentStartDate, 5));

  const handleNext = () => {
    const nextStartDate = new Date(dates[dates.length - 1]);
    nextStartDate.setDate(nextStartDate.getDate() + 1);
    setCurrentStartDate(nextStartDate);
    setDates(getDates(nextStartDate, 5));
  };

  const handlePrevious = () => {
    const prevStartDate = new Date(currentStartDate);
    prevStartDate.setDate(prevStartDate.getDate() - 5);
    setCurrentStartDate(prevStartDate);
    setDates(getDates(prevStartDate, 5));
  };
  const isAtStart =
    currentStartDate.toDateString() === new Date().toDateString();
  const nextDay = new Date();
  nextDay.setDate(nextDay.getDate() + 1);
  useEffect(() => {
    setDate(nextDay);
  }, []);
  const isSameDate = (date1: Date, date2: Date | undefined) => {
    return (
      date1.getFullYear() === date2?.getFullYear() &&
      date1.getMonth() === date2?.getMonth() &&
      date1.getDate() === date2?.getDate()
    );
  };
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className=" select-none"
    >
      <CarouselContent>
        {dates.map((day, index) => {
          const { day: dateDay, month, weekday } = formatDate(day);
          const hiddenDayNow = isSameDate(day, currentDate);
          return (
            <CarouselItem
              key={index}
              className="basis-1/4  lg:basis-1/3 xl:basis-1/4 my-3   "
            >
              <div
                onClick={() => {
                  if (hiddenDayNow) {
                    return;
                  } else {
                    setDate(day);
                  }
                }}
                className={cn(
                  "transition-all text-black duration-200  border border-black_sub rounded-8  w-auto ",
                  isSameDate(day, date) &&
                    "bg-bg_primary_hover text-black border-2 border-blue_main_sub rounded-8 shadow-lg",
                  hiddenDayNow &&
                    "bg-bg_black_sub opacity-30 cursor-no-drop hover:cursor-no-drop z-[30] "
                )}
              >
                <div
                  className={cn(
                    " flex flex-col items-center justify-center p-4 hover:cursor-pointer",
                    hiddenDayNow && "visible cursor-no-drop"
                  )}
                >
                  <span
                    className={cn("text-sm", hiddenDayNow && "cursor-no-drop ")}
                  >
                    {weekday}
                  </span>
                  <span
                    className={cn(
                      "text-medium md:text-2xl lg:text-3xl font-semibold hover:cursor-pointer",
                      hiddenDayNow && "!cursor-no-drop "
                    )}
                  >
                    {dateDay}
                  </span>{" "}
                  <span
                    className={cn(
                      "text-sm ",
                      hiddenDayNow && "cursor-no-drop "
                    )}
                  >
                    {month}
                  </span>
                  {hiddenDayNow && (
                    <span className="absolute bg-black z-10 bottom-[0px] text-smallest text-white px-[0.4rem] rounded-8 cursor-no-drop">
                      Hôm nay
                    </span>
                  )}
                  {isSameDate(day, nextDay) && (
                    <span className="absolute bg-bg_primary_blue_sub bottom-0 text-smallest text-white px-[0.4rem] rounded-8">
                      Ngày mai
                    </span>
                  )}
                </div>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      {!isAtStart ? (
        <div
          className="bg-bg_primary_white shadow-2xl rounded-full p-3 md:p-2 absolute  left-[3%] lg:-left-[0%]  top-[50%] translate-y-[0%] translate-x-[-50%] md:translate-y-[-50%] hover:cursor-pointer"
          onClick={handlePrevious}
        >
          <ChevronLeft className="size-6" />
        </div>
      ) : (
        <div></div>
      )}

      <div
        className="bg-bg_primary_white absolute -right-[9%] lg:-right-[10%] top-[50%] translate-x-[-50%]  translate-y-[0%] md:translate-y-[-50%] shadow-2xl rounded-full p-3 md:p-2 hover:cursor-pointer"
        onClick={handleNext}
      >
        <ChevronRight className="siz-6" />
      </div>
    </Carousel>
  );
};

export default CarouselDate;
