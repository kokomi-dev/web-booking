import React from "react";
import SidebarContent from "@/components/dashboard/content/sidebar";
import ShowContent from "@/components/dashboard/content/show-content";
const ContentPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[20%,80%] gap-4">
      <SidebarContent />
      <div>
        <ShowContent />
      </div>
    </div>
  );
};

export default ContentPage;
