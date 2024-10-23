"use client";
import { cn } from "@/lib/utils";
import { Bell } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
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
    <div className="w-full text-black text-smallest font-normal ">
      {listNotify.length === 0 ? (
        <span>Chưa có thông báo nào</span>
      ) : (
        <div>
          <h6 className="text-small font-medium">Thông báo</h6>
          <hr />
          <ul className="w-full grid ">
            {listNotify.map((notify, index) => {
              return (
                <li
                  className={cn("rounded-8", "hover:bg-bg_primary_blue_sub2")}
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
                    <h6 className="text-smallest font-medium">
                      {notify.title}
                    </h6>
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
      {user && user ? (
        <Popover>
          <PopoverTrigger className="relative flex items-center justify-center">
            <Bell
              className={cn(
                "size__icon--small hidden lg:block ",
                "hover:text-blue_main_sub  hover:cursor-pointer"
              )}
            />
            <div className="absolute top-[-9px] right-[-10px] bg-yellow_main text-white size-4 rounded-full flex items-center justify-center">
              <span className="text-smallest">{user.notifys.length}</span>
            </div>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            className="bg-white z-[10] rounded-14 text-black text-small shadow-2xl"
          >
            <ListNotify listNotify={user.notifys} id={user._id} />
          </PopoverContent>
        </Popover>
      ) : (
        ""
      )}
    </div>
  );
};

export default Notifycation;
