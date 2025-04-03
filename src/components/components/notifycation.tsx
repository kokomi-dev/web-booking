"use client";
import { cn } from "@/utils/constants";
import { Bell } from "lucide-react";
import React from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { useAuthenticatedStore } from "@/store/authencation-store";
import Image from "next/image";
import Link from "next/link";
const ListNotify = ({
  listNotify,
  id,
}: {
  id: string | number;
  listNotify: {
    title: string;
    img: string;
    content: string;
    time: string;
  }[];
}) => {
  return (
    <div className="w-full text-black text-xs font-normal rounded-14 ">
      {listNotify.length === 0 ? (
        <span>Chưa có thông báo nào</span>
      ) : (
        <div>
          <h6 className="text-sm font-medium">Thông báo</h6>
          <hr />
          <ul className="w-full grid ">
            {listNotify.map((notify, index) => {
              return (
                <li
                  className={cn("rounded-8", "hover:bg-blue_sub2")}
                  key={notify.title + index}
                >
                  <Link
                    href={`/account/manage-booking/${id}?do=booking`}
                    className="flex items-center justify-start  gap-x-2 py-2 px-1 rounded-8"
                  >
                    <Image
                      src={notify.img}
                      alt="img-notify"
                      width={150}
                      height={150}
                      className="size-8 rounded-8"
                    />
                    <div className="flex flex-col">
                      <h6 className="text-xs font-medium">{notify.title}</h6>
                      <span className="text-xs text-black_sub pl-1s">
                        {format(notify.time, "dd/MM/yyyy", { locale: vi })}
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
const Notifycation = () => {
  const { user } = useAuthenticatedStore();
  return (
    <div>
      <div className="font-medium text-sm hidden lg:block">Thông báo</div>
      {/* {user && user.notifys ? (
        <Popover>
          <PopoverTrigger className="relative flex items-center justify-center">
            <Bell
              className={cn(
                "size__icon--small hidden lg:block ",
                "hover:text-blue_sub  hover:cursor-pointer"
              )}
            />
            <div className="absolute hidden lg:flex top-[-9px] right-[-10px] bg-yellow text-white size-4 rounded-full  items-center justify-center">
              <span className="text-xs">{user.notifys.length}</span>
            </div>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            className="bg-white h-[300px] overflow-y-auto z-[70] rounded-14 text-black text-sm shadow-2xl"
          >
            <ListNotify listNotify={user.notifys} id={user._id} />
          </PopoverContent>
        </Popover>
      ) : (
        ""
      )} */}
    </div>
  );
};

export default Notifycation;
