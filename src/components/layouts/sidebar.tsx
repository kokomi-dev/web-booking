import Navigation from "./navigation/navigation";
import { cn } from "@/lib/utils";
const Sidebar = () => {
  return (
    <div className={cn("hidden", "lg:block lg:w-full")}>
      <Navigation />
    </div>
  );
};

export default Sidebar;
