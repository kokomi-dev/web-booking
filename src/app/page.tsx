import Intro from "@/components/home/intro";
import ListTrendingTour from "@/components/home/list-trending-tour";
import ListAllTour from "@/components/home/list-all-tour";
import Search from "@/components/home/search";
import { Button } from "@/components/ui/button";
import bannerSearch from "@/assets/images/banner.jpg";
const Home = () => {
  return (
    <main className="w-full h-full flex flex-col items-center justify-between">
      <Search img={bannerSearch} page="tours" currentValue="" />
      <Intro />
      <div className="w-full h-full bg-fixed bg-no-repeat bg-cover bg-[url('../assets/images/banner2.jpg')]">
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
              <p>Hãy trải nghiệm nó một cách trọn vẹn</p>
              <Button className="bg-red-400 text-white mt-2">
                Khám phá bây giờ
              </Button>
            </div>
          </div>
        </div>
        <h3 className="px-20 py-5 text-white underline  ">
          Chỉ cần đăng nhập tài khoản, bạn sẽ sở hữu cho mình nhiều ưu đãi và
          chương trình tri ân cho những khách hàng mới đặc biệt ưu đãi!
        </h3>
      </div>
      {/* list tour in VN */}
      <ListAllTour />
      {/* list tour trending */}
      <ListTrendingTour />
    </main>
  );
};

export default Home;
