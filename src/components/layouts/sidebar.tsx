import Navigation from "./Nav";
import { cn } from "@/lib/utils";
const Sidebar = () => {
  return (
    <div className={cn("hidden", "lg:block lg:w-full")}>
      <Navigation />
    </div>
  );
};

export default Sidebar;
