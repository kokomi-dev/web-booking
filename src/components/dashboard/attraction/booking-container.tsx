"use client";
import React, { useState } from "react";
import CardText from "../../components/card-text";
import CardBookingTicket from "./card-booking-ticket";
import CarouselDate from "./carousel-date";

interface IBookingContainer {
  slug: string;
  data: any;
}
const BookingContainer: React.FC<IBookingContainer> = ({ slug, data }) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [hour, setHour] = useState<string>("7h00");
  return (
    <div className="w-full h-fit space-y-3  lg:sticky lg:-top-[4rem]  rounded-xl lg:pl-3 ">
      <div className="w-full">
        <h3 className="text-medium font-bold">Chọn ngày</h3>
        <div className="max-w-fit w-auto">
          <CarouselDate date={date} setDate={setDate} />
        </div>
      </div>
      <CardText title="Chọn giờ">
        <div className="flex items-center justify-start gap-x-2">
          <div className="border-blue_main flex items-center justify-center border-1 cursor-pointer transiton-all duration-200 text-smallest font-light text-black hover:opacity-80 rounded-14 p-2">
            <input
              className="button hover:cursor-pointer"
              name="picktime"
              type="radio"
              value="7h00"
              checked={hour === "7h00"}
              onChange={(e) => setHour(e.target.value)}
            />
            <label className="ml-1 text-smallest font-medium hover:cursor-pointer">
              7h00
            </label>
          </div>

          <div className="border-blue_main flex items-center justify-center border-1 cursor-pointer transiton-all duration-200 text-smallest font-light text-black hover:opacity-80 rounded-14 p-2">
            <input
              className="button hover:cursor-pointer"
              name="picktime"
              type="radio"
              value="13h00"
              checked={hour === "13h00"}
              onChange={(e) => setHour(e.target.value)}
            />
            <label className="ml-1 text-smallest font-medium hover:cursor-pointer">
              13h00
            </label>
          </div>
        </div>
      </CardText>
      {/* booking tickets */}
      <div className="w-full">
        <CardBookingTicket
          name={data.name}
          slug={slug}
          hour={hour}
          date={date}
          duration={data.duration}
          price={data.price}
        />
      </div>
    </div>
  );
};

export default BookingContainer;
