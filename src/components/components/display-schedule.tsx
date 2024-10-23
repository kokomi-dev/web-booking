import { AttractionData } from "@/constants";

interface ScheduleDisplayProps {
  data: AttractionData;
}
const ScheduleDisplay = ({ data }: ScheduleDisplayProps) => {
  return (
    <div className="w-full h-full flex flex-col flex-grow">
      {data.schedule.length > 0 ? (
        data.schedule.map((sche: string, index: number) => {
          return (
            <div key={index} className="w-full ">
              <h4 className="underline text-normal font-semibold">
                Ngày <span>{index + 1}</span>
              </h4>
              <textarea
                readOnly
                className="w-full min-h-[40vh] text-normal resize-none box-border border-none outline-none mt-1 text-justify"
                value={sche}
              ></textarea>
            </div>
          );
        })
      ) : (
        <textarea
          readOnly
          className="w-full min-h-[30vh] resize-none box-border border-none outline-none mt-1 text-justify"
          value={data.schedule[0]}
        ></textarea>
      )}
    </div>
  );
};
export default ScheduleDisplay;
