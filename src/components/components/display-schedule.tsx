import { AttractionData } from "@/utils/types";
import DisplayDocs from "./display-docs";

interface ScheduleDisplayProps {
  data: AttractionData;
}
const ScheduleDisplay = ({ data }: ScheduleDisplayProps) => {
  return (
    <div className="w-full h-full flex flex-col flex-grow mt-2">
      {data.schedule.length > 0 ? (
        data.schedule.map((sche: string, index: number) => {
          if (sche.length > 7) {
            return (
              <div key={index} className="w-full ">
                <h4 className="underline text-normal font-semibold">
                  Ngày <span>{index + 1}</span>
                </h4>
                <DisplayDocs docs={sche} />
              </div>
            );
          }
        })
      ) : (
        <div>
          <h4>Chưa có lịch trình cụ thể</h4>
        </div>
      )}
    </div>
  );
};
export default ScheduleDisplay;
