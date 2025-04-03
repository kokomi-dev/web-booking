import React from "react";
import { Metadata } from "next";

import SidebarContent from "@/components/dashboard/content/sidebar";
import ShowContent from "@/components/dashboard/content/show-content";
import BreadcrumbHead from "@/components/components/breadcrumb";

export const metadata: Metadata = {
  title: "Điều khoản - KoKoTravel",
};

const ContentPage = () => {
  return (
    <div className="section-spacing ">
      <BreadcrumbHead
        items={[
          { label: "Trang chủ", href: "/home" },
          { label: "Điều khoản điều kiện" },
        ]}
      />
      <div className="container xl:px-0 grid grid-cols-1 md:grid-cols-[20%,80%] gap-4 ">
        <SidebarContent />
        <ShowContent />
      </div>
    </div>
  );
};

export default ContentPage;
