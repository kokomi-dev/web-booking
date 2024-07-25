import React from "react";

const CardText = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="w-full  my-3">
      <h3 className="title_home">{title}</h3>
      <div className="pl-3">{children}</div>
    </div>
  );
};

export default CardText;
