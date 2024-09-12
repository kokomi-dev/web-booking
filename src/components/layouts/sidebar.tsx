"use client";

import Nav from "./nav";
import { cn } from "@/lib/utils";
const Sidebar = () => {
  return (
    <div className={cn("hidden", "lg:block lg:w-full")}>
      <Nav />
    </div>
  );
};

export default Sidebar;
