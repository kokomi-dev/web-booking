import { Dot, Star } from "lucide-react";
import React from "react";

interface IShowComments {
  type: string;
  comments: [];
  rating: number;
}
const ShowComments: React.FC<IShowComments> = ({ type, comments, rating }) => {
  return (
    <div className="w-full flex flex-col items-start justify-start gap-y-4">
      <h3 className="text-medium font-semibold">Đánh giá của khách</h3>
      <div className="w-auto flex items-center justify-start gap-x-1">
        <Star className="fill-yellow_main text-yellow_main text-medium" />
        <span className="text-normal font-medium">{rating}</span>
        <Dot />
        <span className="text-noraml font-medium">
          {rating > 4.5 ? "Rất tuyệt vời" : rating > 4.0 ? "Tuyệt vời" : "Tốt"}
        </span>
        <span>(0 đánh giá)</span>
      </div>
      <div>
        {comments?.length === 0 && (
          <span className="text-normal font-normal">Chưa có đánh giá nào!</span>
        )}
      </div>
    </div>
  );
};

export default ShowComments;
