import Baner from "@/components/home/baner";
import Intro from "@/components/home/intro";
import Trending from "@/components/home/trending";
import Search from "@/components/home/search";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import preview from "../assets/images/preview.jpg";
export default function Home() {
  return (
    <main className="w-full h-full flex  flex-col items-center justify-between  ">
      <Search />
      {/* <Baner /> */}
      <Intro />
      <div className="w-full h-full bg-fixed   bg-no-repeat bg-cover bg-[url('../assets/images/banner2.jpg')]">
        <div className="p-20 text-white">
          <h1 className="title_home !mb-2">Ưu đãi</h1>
          <p className="mb-2">
            Khuyến mãi giảm giá đặc biệt dành riêng cho bạn
          </p>
          <div className="w-full h-auto flex items-center justify-between bg-white p-4 text-black_sub rounded-md">
            <div>
              <h4>
                Vi vu tận hưởng không khí mùa hè cùng các địa điểm du lịch nổi
                tiếng của chúng tôi
              </h4>
              <p>Hãy trải nhiệm nó một cách trọn vẹn</p>
              <Button className="bg-red-400 text-white mt-2">
                Khám phá bây giờ
              </Button>
            </div>
            <Image
              src={preview}
              alt="img_preview"
              className="min-w-[18%] min-h-[80%] w-[25%] h-[100%] object-cover rounded-md"
            />
          </div>
        </div>
        <h3 className="px-20 py-5 text-white">
          Chỉ cần đăng nhập tài khoản, bạn sẽ sở hữu cho mình nhiều ưu đãi và
          chương trình chi ân cho những khách hàng mới đặc biệt ưu đãi!
        </h3>
      </div>
      <Trending />
    </main>
  );
}
