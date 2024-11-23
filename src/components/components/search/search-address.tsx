import { getListProvinces } from "@/api/api-attractions";
import { useEffect, useRef, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Button } from "../../ui/button";
import { cx } from "class-variance-authority";
import { MapPinned } from "lucide-react";
import { Input } from "../../ui/input";
import { cn } from "@/lib/utils";
import { DataAddressProps, SearchAddressProps } from "@/utils/types/search";

const SearchAddress = ({
  value,
  setValue,
  error,
  className,
}: SearchAddressProps) => {
  const [valueSearch, setValueSearch] = useState("");
  const [data, setData] = useState<DataAddressProps[]>([]);
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const fetchProvinces = async () => {
      const { data, error } = await getListProvinces();
      if (data && error === 0) {
        const filteredData = data.filter((item: any) => {
          return (
            item.name.toLowerCase().includes(valueSearch.toLowerCase()) ||
            item.name_en.toLowerCase().includes(valueSearch.toLowerCase())
          );
        });
        setData(filteredData);
      }
    };

    if (valueSearch) {
      fetchProvinces();
    }
  }, [valueSearch]);
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);
  return (
    <Popover
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
      }}
    >
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cx(
            "w-full h-[40px] justify-start text-left font-normal bg-bg_primary_white px-2 py-1 shadow-none mt-2",
            className
          )}
        >
          <MapPinned className="size-5 text-black_main " />
          <span className="ml-2 text-small font-medium">
            {value === "" || value === null ? "Chọn nơi bạn muốn đến" : value}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="center"
        className="min-w-[160px] z-[20]  p-0 bg-bg_primary_white text-black"
      >
        <Input
          type="text"
          placeholder="Nhập tên tỉnh thành !"
          ref={inputRef}
          className={cn(
            "min-w-max w-full h-[36px] text-small font-normal shadow-none justify-between bg-bg_primary_white text-black border-none outline-none placeholder-black transition-all duration-300",
            "lg:text-small "
          )}
          value={valueSearch}
          onChange={(e: any) => {
            setValueSearch(e.target.value);
          }}
        />
        <div className="w-full max-h-[300px]  h-full overflow-y-auto bg-white rounded-8">
          {data && data.length > 0 ? (
            data.map((item, index) => (
              <div
                key={index}
                className=" px-4 py-3  border-b-1 last:border-none transition-all duration-300 hover:text-blue_main_sub hover:cursor-pointer"
                onClick={() => {
                  setValue(item.name);
                  setValueSearch(item.name);
                  setOpen(false);
                }}
              >
                <span className="text-small font-medium">{item.name}</span>
              </div>
            ))
          ) : (
            <div className="p-2 text-small font-normal">
              {valueSearch ? (
                <span>Nhập chính xác tên tỉnh thành !</span>
              ) : (
                <span></span>
              )}
            </div>
          )}
        </div>
        {error && (
          <div className="absolute bottom-[-75%] shadow-xl rounded-md px-3 left-0 right-0 bg-red-700 py-2 text-white text-small">
            Chọn nơi bạn muốn đến!
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
export default SearchAddress;
