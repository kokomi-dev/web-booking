import { MapPinned } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { getListProvinces } from "@/api/api-attractions";
import { Button } from "@/components/ui/button";
import { DataAddressProps, SearchAddressProps } from "@/types/search";
import { cn } from "@/utils/constants";
import SearchAddressLG from "./search-address/search-address-lg";

const SearchAddress = ({
  value,
  setValue,
  error,
  className,
}: SearchAddressProps) => {
  const [valueSearch, setValueSearch] = useState("");
  const [data, setData] = useState<DataAddressProps[]>([]);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

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
    <section className="flex flex-col items-center justify-start w-full">
      <Button
        variant="ghost"
        className={cn(
          "hidden items-center w-full h-[44px] rounded-[4px] z-[40] gap-x-1  justify-start font-normal bg-white px-2 py-1 shadow-none hover:cursor-pointer transiton-all duration-150 select-none",
          error && "border-2 border-red-600",
          "md:hidden xl:hidden"
        )}
        onClick={(e) => {
          e.preventDefault();
          setOpen2(!open2);
        }}
      >
        <MapPinned className="size-[1.2rem] text-black_sub" />
        <span className="ml-1 text-base font-light">
          {value === "" || value === null ? "Chọn nơi bạn muốn đến ?" : value}
        </span>
      </Button>
      <SearchAddressLG
        data={data}
        value={value}
        valueSearch={valueSearch}
        setValue={setValue}
        setValueSearch={setValueSearch}
        open={open}
        setOpen={setOpen}
        error={error}
        className={className}
      />
      {/* <SearchAddressSM
        data={data}
        value={value}
        valueSearch={valueSearch}
        setValue={setValue}
        setValueSearch={setValueSearch}
        open2={open2}
        setOpen2={setOpen2}
        error={error}
      /> */}
    </section>
  );
};
export default SearchAddress;
