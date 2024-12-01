import { useEffect, useRef, useState } from "react";
import { MapPinned } from "lucide-react";

import { DataAddressProps, SearchAddressProps } from "@/utils/types/search";
import { getListProvinces } from "@/api/api-attractions";
import SearchAddressSM from "./search-address/search-address-sm";
import SearchAddressLG from "./search-address/search-address-lg";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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
          "flex items-center w-full h-[40px] z-[40] gap-x-1  justify-start font-normal bg-white px-2 py-1 shadow-none hover:cursor-pointer transiton-all duration-150 select-none",
          error && "border-2 border-red-600",
          "md:hidden xl:hidden"
        )}
        onClick={() => {
          setOpen2(!open2);
        }}
      >
        <MapPinned className="size-4 text-black_main" />
        <span className="ml-2 text-small font-medium">
          {value === "" || value === null ? "Chọn nơi bạn muốn đến" : value}
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
      <SearchAddressSM
        data={data}
        value={value}
        valueSearch={valueSearch}
        setValue={setValue}
        setValueSearch={setValueSearch}
        open2={open2}
        setOpen2={setOpen2}
        error={error}
      />
    </section>
  );
};
export default SearchAddress;
