"use client";

import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { DayPicker } from "react-day-picker";
import { isAfter } from "date-fns";
import { vi } from "date-fns/locale";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = false,
  ...props
}: CalendarProps) {
  const today = new Date();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      locale={{
        ...vi,
      }}
      fromMonth={today}
      disabled={(date) => !isAfter(date, today)}
      className={cn(
        "p-2 w-full h-full flex items-center justify-center text-center ",
        props.mode === "range" ? "grid grid-cols-2 gap-4" : "",
        className
      )}
      classNames={{
        months:
          "w-full flex flex-col sm:flex-row space-y-1 sm:space-x-2 sm:space-y-0",
        month: "space-y-4",
        caption: "w-full flex justify-center pt-1 relative items-center",
        caption_label: "text-normal lg:text-small font-semibold",
        nav: "space-x-2 text-[1.4rem] lg:text-[1.1rem] flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full h-full border-collapse space-y-1",
        head_row: "flex border-t-1 border-blue_main_sub py-1",
        head_cell: "w-full text-small lg:text-small font-medium rounded-md w-8",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 w-full text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-white [&:has([aria-selected].day-outside)]:bg-white/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-2 font-normal  aria-selected:opacity-100 aria-selected:font-semibold"
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-bg_black_sub  hover:bg-bg_yellow_main focus:bg-primary focus:text-primary-foreground text-blue_main_sub font-semibold border-2 border-blue_main_sub",
        day_today: "bg-white text-black",
        day_outside:
          "day-outside text-muted-foreground opacity-50  aria-selected:bg-white/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-10 cursor-none",
        day_range_middle:
          "aria-selected:bg-white aria-selected:text-white-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => (
          <ChevronLeftIcon className="size-6 lg:size-5" />
        ),
        IconRight: ({ ...props }) => (
          <ChevronRightIcon className="size-6 lg:size-5" />
        ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
