"use client";
import React, { useState } from "react";
import SearchDatePicker from "../../components/search/search-date-picker";
import CardText from "../../components/card-text";
import CardBookingTicket from "./card-booking-ticket";

interface IBookingContainer {
  slug: string;
  data: any;
}
const BookingContainer: React.FC<IBookingContainer> = ({ slug, data }) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [hour, setHour] = useState<string>("7h00");
  return (
    <div className="w-full h-fit space-y-3  lg:sticky lg:top-[0.3rem]  rounded-xl ">
      <div className="w-full">
        <h3 className="text-medium font-bold">Chọn ngày</h3>
        <div className="w-full bg-bg_primary_blue_sub2 flex items-center justify-start gap-x-2 p-1 px-2 rounded-14">
          <SearchDatePicker
            date={date}
            setDate={setDate}
            className="w-full  text-black text-normal bg-bg_primary_blue_sub2 "
          />
        </div>
      </div>
      <CardText title="Chọn giờ">
        <div className="flex items-center justify-start gap-x-2">
          <label className="border-blue_main border-1 cursor-pointer transiton-all duration-200 text-smallest font-light text-black hover:opacity-80 rounded-14 p-2">
            <input
              className="button"
              name="picktime"
              type="radio"
              value="7h00"
              checked={hour === "7h00"}
              onChange={(e) => setHour(e.target.value)}
            />
            <span className="ml-1 text-smallest font-medium">7h00</span>
          </label>
          <label className="border-blue_main border-1 cursor-pointer transiton-all duration-200 text-smallest font-light text-black hover:opacity-80 rounded-14 p-2">
            <input
              className="button"
              name="picktime"
              type="radio"
              value="13h00"
              checked={hour === "13h00"}
              onChange={(e) => setHour(e.target.value)}
            />
            <span className="ml-1 text-smallest font-medium">13h00</span>
          </label>
        </div>
      </CardText>
      {/* booking tickets */}
      <div className="w-full">
        <CardBookingTicket
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
