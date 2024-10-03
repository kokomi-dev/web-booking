"use client";
import { TourData } from "@/constants";
import useAutoResizeTextarea from "@/hook/useAutoResizeTextarea";

interface ScheduleDisplayProps {
  data: TourData;
}
const ScheduleDisplay = ({ data }: ScheduleDisplayProps) => {
  return (
    <div className="w-full h-full flex flex-col flex-grow">
      {data.schedule.length > 0 ? (
        data.schedule.map((sche: string, index: number) => {
          const textareaRef = useAutoResizeTextarea(sche);
          return (
            <div key={index}>
              <h4 className="underline text-normal font-semibold">
                Ngày <span>{index + 1}</span>
              </h4>
              <textarea
                readOnly
                ref={textareaRef}
                className="w-full text-normal resize-none box-border border-none outline-none mt-1 text-justify"
                value={sche}
              ></textarea>
            </div>
          );
        })
      ) : (
        <textarea
          readOnly
          ref={useAutoResizeTextarea(data.schedule[0])}
          className="w-full resize-none box-border border-none outline-none mt-1 text-justify"
          value={data.schedule[0]}
        ></textarea>
      )}
    </div>
  );
};
export default ScheduleDisplay;
