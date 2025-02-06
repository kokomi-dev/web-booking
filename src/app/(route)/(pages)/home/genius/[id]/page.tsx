"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { LoadingPage } from "@/components/components/loading";
import Image from "next/image";
import imgGenius from "@/assets/images/banner-genius.jpg";
import imgQua from "@/assets/images/img-qua.png";
import { useAuthenticatedStore } from "@/store/authencation-store";
import { cn } from "@/utils/constants";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
const TrangVoucher = () => {
  const [vouchers, setVouchers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filteredVouchers, setFilteredVouchers] = useState([
    {
      title: "voucher1",
      key: "voucher1",
      id: 1,
      category: "hotel",
      description: "mô tả",
      expiryDate: "20/1/2025",
    },
  ]);

  //   useEffect(() => {
  //     const fetchVouchers = async () => {
  //       try {
  //         const response = await axios.get('/api/user/vouchers'); // API endpoint lấy danh sách voucher
  //         setVouchers(response.data);
  //         setFilteredVouchers(response.data);
  //       } catch (error) {
  //         console.error("Lỗi khi lấy danh sách voucher:", error);
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     };
  //     fetchVouchers();
  //   }, []);

  //   useEffect(() => {
  //     const filter = vouchers.filter((voucher) =>
  //       voucher.title.toLowerCase().includes(search.toLowerCase())
  //     );
  //     setFilteredVouchers(filter);
  //   }, [search, vouchers]);
  const { user } = useAuthenticatedStore();

  const levelGenius = [
    { name: "123", des: "giảm giá ác" },
    { name: "456", des: "giảm giá sâu hơn nữa" },
    { name: "456", des: "giảm giá sâu hơn nữa" },
  ];
  return (
    <div className="w-full min-h-screen flex items-center justify-start flex-col gap-y-4 ">
      <div className="min-w-full h-full text-center relative -mt-4 px-[-10rem] no-container-padding">
        <Image
          width={1200}
          height={1200}
          src={imgGenius}
          alt="banner-gennius"
          className="w-full h-full min-h-[25vh] lg:min-h-auto object-cover "
        />
        <div className="absolute top-[40%] left-[36%] lg:left-[30%] translate-x-[-50%] translate-y-[-50%] text-white text-left ">
          <h4 className="font-bold text-medium lg:text-large font-mono">
            Mọi chuyến đi đều đáng giá
          </h4>
          <h1 className="text-[2.5rem] lg:text-[3rem] font-extrabold">
            Genius
          </h1>
          <p className="text-normal+ font-normal hidden lg:block">
            Chương trình khách hàng thân thiết và ưu đãi người mới của
            KoKoTravel
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-y-4 shadow-2xl p-3 rounded-8">
        <div className="flex items-center justify-center gap-x-1 gap-y-3 text-large font-bold ">
          <h3 className="capitalize text-center">{user?.lastname} </h3>
          <span>ơi,</span>
          {user?.isNewbie ? "bạn là người mới! " : "bạn đang ở cấp 1"}
        </div>
        <p>
          Hoàn tất 5 đơn đặt trong vòng 2 năm để mở khóa các giảm giá và tặng
          thưởng ở Cấp 2 - mọi đơn đặt đều được tính!
        </p>
        <div className="flex items-center justify-center gap-x-2">
          <div className="w-[50px] h-[50px] lg:w-[100px] lg:h-[100px] rounded-full bg-bg_black_sub border-dotted	border-1 border-black_sub "></div>
          <div className="w-[50px] h-[50px] lg:w-[100px] lg:h-[100px] rounded-full bg-bg_black_sub border-dotted	border-1 border-black_sub "></div>
          <div className="w-[50px] h-[50px] lg:w-[100px] lg:h-[100px] rounded-full bg-bg_black_sub border-dotted	border-1 border-black_sub "></div>
          <div className="w-[50px] h-[50px] lg:w-[100px] lg:h-[100px] rounded-full bg-bg_black_sub border-dotted	border-1 border-black_sub "></div>
          <div className="w-[50px] h-[50px] lg:w-[100px] lg:h-[100px] rounded-full bg-bg_black_sub border-dotted	border-1 border-black_sub "></div>
        </div>
        <div
          className={cn(
            "hidden p-2 rounded-lg transition-all duration-300",
            "lg:block hover:bg-bg_primary_hover hover:cursor-pointer hover:text-blue_main"
          )}
        >
          <h3 className={cn("text-small font-medium text-blue_main_sub ")}>
            Cách thăng cấp trong Genius
          </h3>
        </div>
      </div>
      <div className="w-full mx-auto flex flex-col gap-y-4">
        <h1 className="text-large font-bold text-black_main">
          Tiết kiệm khi đặt chuyến đi tiếp theo
        </h1>
        <p className="text-normal mb-4 text-gray-700">
          Chào mừng bạn đến với nền tảng đặt vé và ưu đãi hàng đầu của chúng
          tôi! Trang web cung cấp các tiện ích đặt vé nhanh chóng, giao diện
          thân thiện, và nhiều ưu đãi đặc biệt dành cho bạn. Đối với người dùng
          mới, chúng tôi có các chương trình giảm giá hấp dẫn, giúp bạn trải
          nghiệm dịch vụ với chi phí thấp nhất. Hãy khám phá ngay hôm nay!
        </p>
        <div className="flex flex-col gap-y-3 shadow-2xl p-3 rounded-8">
          <div className="flex  items-center justify-start gap-2">
            <Image
              width={120}
              height={120}
              alt="img-qua"
              src={imgQua}
              className="w-[40px] h-[40px]"
            />
            <div className="text-left">
              <h4 className="text-normal font-semibold">
                Giảm giá Genius cho chỗ nghỉ
              </h4>
              <p className="text-smallest font-light">
                Tận hưởng kỳ lưu trú và các điểm du lịch trên khắp đất nước Việt
                Nam.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3 border-0.5 border-black_sub rounded-8">
              <h4 className="text-small font-semibold">Giảm giá 10%</h4>
              <p className="text-smallest font-light text-black_sub">
                Áp dụng cho giá trước thuế và phí
              </p>
            </div>
            <div className="p-3 border-0.5 border-black_sub rounded-8">
              <h4 className="text-small font-semibold">Giảm giá 15%</h4>
              <p className="text-smallest font-light text-black_sub">
                Áp dụng cho giá trước thuế và phí
              </p>
            </div>
            <div className="p-3 border-0.5 border-black_sub rounded-8">
              <h4 className="text-small font-semibold">Giảm giá 20%</h4>
              <p className="text-smallest font-light text-black_sub">
                Áp dụng cho giá trước thuế và phí
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-y-3">
          <div className="text-left">
            <h3 className="text-large font-bold">Dễ dàng tiết kiệm</h3>
            <p className="text-black_sub text-normal font-light">
              Bạn sẽ nhận ra các xe và chỗ nghỉ có trong chương trình nhờ nhãn
              Genius màu xanh dương. Tất cả giảm giá và tặng thưởng đều được áp
              dụng tự động khi đặt – bạn không cần thao tác gì thêm.
            </p>
            <p className="text-black_sub text-normal font-light">
              Quá đơn giản, chỉ có thể là Genius.
            </p>
          </div>
          <img
            className="object-cover"
            src="https://cf.bstatic.com/psb/capla/static/media/how-to.fb2b5d7a.svg"
          />
        </div>
        <div className="flex-col flex gap-y-3">
          <h3 className="text-large font-bold">
            Khám phá các cấp độ tăng thưởng du lịch mới
          </h3>
          <p className="text-normal font-normal text-black_sub">
            Mỗi đơn đặt đều được tính vào chương trình. Bạn sẽ được tận hưởng
            giảm giá và tặng thưởng du lịch trọn đời sau khi mở khóa. Bạn sẽ đi
            đâu tiếp theo nào?
          </p>
          <Carousel>
            <CarouselContent>
              {levelGenius.map((item, id) => {
                return (
                  <CarouselItem
                    key={id}
                    className="basis-[66.67%] md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="p-2 rounded-8 flex flex-col gap-y-2 border-0.5 border-black_sub  ">
                      <div className="text-normal+ text-blue_main font-bold">
                        Genius Cấp 1
                      </div>
                      <hr className="hr" />
                      <div>
                        <p className="text-small text-black_sub">
                          Mở khóa giảm giá tức thì cho một số chỗ nghỉ và xe
                          thuê trên khắp thế giới ngay khi đăng nhập.
                        </p>
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
          </Carousel>
        </div>
        <Input
          placeholder="Tìm kiếm voucher..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-6"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredVouchers.map((voucher) => (
            <Card key={voucher.id} className="shadow-md bg-white">
              <CardHeader>
                <h2 className="text-xl font-semibold text-blue_main_sub">
                  {voucher.title}
                </h2>
                <Badge className="bg-blue-100 text-blue-700">
                  {voucher.category}
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{voucher.description}</p>
                <p className="text-gray-500 text-sm">
                  Hết hạn: {new Date(voucher.expiryDate).toLocaleDateString()}
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => console.log(`Sử dụng voucher ${voucher.id}`)}
                  disabled={new Date(voucher.expiryDate) < new Date()}
                  className={
                    new Date(voucher.expiryDate) < new Date()
                      ? "bg-gray-300 text-gray-500"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }
                >
                  {new Date(voucher.expiryDate) < new Date()
                    ? "Đã hết hạn"
                    : "Sử dụng"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrangVoucher;
