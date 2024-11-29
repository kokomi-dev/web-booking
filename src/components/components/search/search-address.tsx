import { getListProvinces } from "@/api/api-attractions";
import { Fragment, useEffect, useRef, useState } from "react";

import { DataAddressProps, SearchAddressProps } from "@/utils/types/search";

import SearchAddressSM from "./search-address/search-address-sm";
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
    <Fragment>
      <SearchAddressLG
        inputRef={inputRef}
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
    </Fragment>
  );
};
export default SearchAddress;
