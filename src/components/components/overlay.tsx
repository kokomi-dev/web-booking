import React from "react";

const Overlay = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="overlay fixed left-0 right-0 bottom-0 top-0 z-[30] bg-[rgba([0,0,0,0.5])]">
      {children}
    </div>
  );
};

export default Overlay;
