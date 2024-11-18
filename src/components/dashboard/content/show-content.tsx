"use client";
import { useSearchParams } from "next/navigation";
import React from "react";

const Page1 = () => {
  return (
    <div>
      <h2>đây là trang 1</h2>
    </div>
  );
};
const Page2 = () => {
  return (
    <div>
      <h2>đây là trang 2</h2>
    </div>
  );
};
const Page3 = () => {
  return (
    <div>
      <h2>đây là trang 3</h2>
    </div>
  );
};
const listPage = [Page1, Page2, Page3];
const ShowContent = () => {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("activeTab");
  return (
    <div>
      {listPage.map((Page, i) => {
        if (Number(activeTab) === i + 1) {
          return <Page />;
        }
      })}
    </div>
  );
};

export default ShowContent;
