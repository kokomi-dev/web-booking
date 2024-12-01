import { Button } from "@/components/ui/button";

export default function ButtonEnd({
  onClick,
}: {
  onClick: React.MouseEventHandler;
}) {
  return (
    <Button
      onClick={onClick}
      className="absolute left-[50%] top-[95%] translate-x-[-50%] translate-y-[-50%]  w-[95%] flex items-center justify-center text-normal font-medium bg-bg_primary_blue_sub text-white rounded-8 mb-8"
    >
      Xong
    </Button>
  );
}
