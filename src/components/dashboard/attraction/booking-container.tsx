"use client";
import React, { useState } from "react";
import CardText from "../../components/card-text";
import CardBookingTicket from "./card-booking-ticket";
import CarouselDate from "./carousel-date";
import { IBookingContainer } from "@/types/attraction.type";
import { useQuery } from "@tanstack/react-query";
import { getDetailAttraction } from "@/api/api-attractions";
import QUERY_KEY_ATTRACTION from "@/services/queryKeyStore/attractionQueryKeyStore";

const BookingContainer: React.FC<IBookingContainer> = ({ slug, data }) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [hour, setHour] = useState<string>("7h00");
  const { data: numberTickets, isLoading } = useQuery({
    queryKey: [QUERY_KEY_ATTRACTION.GET_NUMBEROFTICKETS, slug],
    queryFn: async () => {
      const res = await getDetailAttraction({ slug });
      if (res) {
        return res.numberOfTickets;
      }
    },
    retry: 3,
    retryDelay: 1000,
    enabled: !!slug,
  });
  return (
    <div className="w-full h-fit list-spacing  lg:sticky lg:-top-[4rem] xl:-top-[7rem] 2xl:top-[2rem] rounded-xl lg:pl-3 ">
      <div className="w-full">
        <h3 className="text-lg font-bold">Chọn ngày</h3>
        <div className="max-w-fit w-auto">
          <CarouselDate date={date} setDate={setDate} />
        </div>
      </div>
      <CardText title="Chọn giờ">
        <div className="flex items-center justify-start gap-x-2">
          <label
            htmlFor="time1"
            className="select-none border-blue flex items-center justify-center border-1 cursor-pointer transiton-all duration-200 text-xs  text-black hover:opacity-80 rounded-14 p-3 lg:p-2"
          >
            <input
              id="time1"
              className="button hover:cursor-pointer"
              name="picktime"
              type="radio"
              value="7h00"
              checked={hour === "7h00"}
              onChange={(e) => setHour(e.target.value)}
            />
            <span className="ml-1 text-xs font-medium hover:cursor-pointer">
              7:00
            </span>
          </label>
          <label
            htmlFor="time2"
            className="select-none border-blue flex items-center justify-center border-1 cursor-pointer transiton-all duration-200 text-xs  text-black hover:opacity-80 rounded-14 p-3 lg:p-2"
          >
            <input
              id="time2"
              className="button hover:cursor-pointer"
              name="picktime"
              type="radio"
              value="13h00"
              checked={hour === "13h00"}
              onChange={(e) => setHour(e.target.value)}
            />
            <span className="ml-1 text-xs font-medium hover:cursor-pointer">
              13h00
            </span>
          </label>
        </div>
      </CardText>
      {/* booking tickets */}
      <div className="w-full">
        <CardBookingTicket
          isLoading={isLoading}
          name={data.name}
          slug={slug}
          hour={hour}
          date={date}
          duration={data.duration}
          price={data.price}
          numberOfTickets={numberTickets}
        />
      </div>
    </div>
  );
};

export default BookingContainer;
