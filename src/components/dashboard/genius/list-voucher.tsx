"use client";
import InputDebounce from "@/components/components/input-debounce";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { IVoucherProp } from "@/types/component-types";
import { DollarSign } from "lucide-react";
import { useMemo, useState } from "react";

const ListVoucher = () => {
  const [search, setSearch] = useState("");
  const [filteredVouchers, setFilteredVouchers] = useState([
    {
      title: "Ưu đãi Resort Sang Trọng",
      key: "giảm 15%",
      idCode: "",
      quanlity: 5,
      category: "resort",
      description: "Ưu đãi đặc biệt cho khách đặt trước",
      expiryDate: "15/2/2025",
    },
    {
      title: "Giảm Giá Khách Sạn Cao Cấp",
      key: "giảm 20%",
      idCode: "",
      quanlity: 3,
      category: "hotel",
      description: "Giảm giá cho khách hàng thân thiết",
      expiryDate: "10/3/2025",
    },
    {
      title: "Ưu Đãi Villa Nhóm Bạn",
      key: "giảm 12%",
      idCode: "",
      quanlity: 10,
      category: "villa",
      description: "Ưu đãi khi đặt nhóm từ 4 người",
      expiryDate: "5/4/2025",
    },
    {
      title: "Homestay Giá Tốt Dài Ngày",
      key: "giảm 8%",
      idCode: "",
      quanlity: 7,
      category: "homestay",
      description: "Ưu đãi cho khách đặt dài ngày",
      expiryDate: "25/5/2025",
    },
    {
      title: "Bungalow Cuối Tuần Giảm Sâu",
      key: "giảm 18%",
      idCode: "",
      quanlity: 4,
      category: "bungalow",
      description: "Giảm giá cho kỳ nghỉ cuối tuần",
      expiryDate: "30/6/2025",
    },
  ]);
  const [filter, setFilter] = useState({
    title: "",
  });
  const _dataListVoucher = useMemo(() => {
    if (!filteredVouchers) return [];
    if (filteredVouchers.length > 0) {
      return filteredVouchers.filter((item) => {
        return Object.keys(filter).every((key) => {
          const filterValue = filter[key as keyof { title: string }];
          const itemValue = item[key as keyof IVoucherProp];
          return itemValue
            ?.toString()
            .toLowerCase()
            .includes(filterValue.toString().toLowerCase());
        });
      });
    }
  }, [filter]);
  return (
    <div className="space-y-3">
      <h3 className="text-large font-bold">
        Lựa chọn các ưu đãi hấp dẫn dành cho bạn
      </h3>
      <InputDebounce
        autoFocus={false}
        placeholder="Tìm kiếm voucher..."
        value={filter.title}
        onChange={(e: any) =>
          setFilter((pre) => ({ ...pre, title: e.target.value }))
        }
        debounceTime={400}
        className=" max-w-[280px] text-normal"
      />
      <Carousel>
        <CarouselContent>
          {_dataListVoucher?.map((item, i) => {
            return (
              <CarouselItem
                key={i}
                className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
              >
                <div className="min-h-[120px] p-2 rounded-8 flex flex-col gap-y-2 border-1 border-blue_main_sub  ">
                  <h5 className="font-bold text-normal flex items-start justify-between ">
                    {item.title}{" "}
                    <DollarSign className="size-4 text-blue_main_sub mt-1 flex-shrink-0 gap-x-2" />
                  </h5>
                  <p className="text-small line-clamp-2">{item.description}</p>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselNext />
        <CarouselPrevious />
      </Carousel>
    </div>
  );
};

export default ListVoucher;
