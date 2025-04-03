import imgGenius from "@/assets/images/banner-genius.jpg";
import imgQua from "@/assets/images/img-qua.png";
import BreadcrumbHead from "@/components/components/breadcrumb";
import ListLevel from "@/components/dashboard/genius/list-level";
import ListItemBooked from "@/components/dashboard/genius/list-number-booked";
import ListVoucher from "@/components/dashboard/genius/list-voucher";
import Image from "next/image";

const TrangVoucher = () => {
  return (
    <div className="w-full min-h-screen container-spacing">
      {/* Banner */}
      <div className="hidden md:block md:mt-[-3rem] relative w-full md:h-[35vh] lg:h-[50vh] overflow-hidden  shadow-lg">
        <Image
          width={1200}
          height={800}
          src={imgGenius}
          priority={true}
          alt="banner-genius"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-3xl lg:text-4xl font-extrabold">Genius</h1>
            <p className="text-lg lg:text-xl font-light mt-2">
              Ưu đãi đặc biệt cho khách hàng thân thiết
            </p>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <BreadcrumbHead
        className="mt-4"
        items={[
          { label: "Trang chủ", href: "/home" },
          { label: "Chương trình thân thiết" },
        ]}
      />

      {/* Section: Tiết kiệm khi đặt chuyến đi */}
      <div className="container xl:px-0 section-spacing">
        <h2 className="text-xl lg:text-2xl font-bold text-black mb-4">
          Tiết kiệm khi đặt chuyến đi
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg shadow-md">
            <Image
              width={40}
              height={40}
              alt="img-qua"
              src={imgQua}
              className="w-[40px] h-[40px]"
            />
            <div>
              <h4 className="text-base font-semibold text-blue-600">
                Giảm giá Genius
              </h4>
              <p className="text-sm text-black_sub">
                Tận hưởng kỳ lưu trú và các điểm du lịch trên khắp Việt Nam.
              </p>
            </div>
          </div>
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-md">
            <h4 className="text-base font-semibold text-green-600">
              Giảm giá 10%
            </h4>
            <p className="text-sm text-black_sub">
              Áp dụng cho giá trước thuế và phí.
            </p>
          </div>
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-md">
            <h4 className="text-base font-semibold text-green-600">
              Giảm giá 15%
            </h4>
            <p className="text-sm text-black_sub">
              Áp dụng cho giá trước thuế và phí.
            </p>
          </div>
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-md">
            <h4 className="text-base font-semibold text-green-600">
              Giảm giá 20%
            </h4>
            <p className="text-sm text-black_sub">
              Áp dụng cho giá trước thuế và phí.
            </p>
          </div>
        </div>
      </div>

      {/* Section: Dễ dàng tiết kiệm */}
      <div className="section-spacing container xl:px-0">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="text-left">
            <h3 className="text-xl lg:text-2xl font-bold mb-2">
              Dễ dàng tiết kiệm
            </h3>
            <p className="text-base text-black_sub mb-2">
              Nhận diện các ưu đãi Genius với nhãn màu xanh dương. Tất cả giảm
              giá và tặng thưởng đều được áp dụng tự động khi đặt.
            </p>
            <p className="text-base text-black_sub">
              Quá đơn giản, chỉ có thể là Genius.
            </p>
          </div>
          <Image
            width={600}
            height={400}
            alt="banner-genius-sale"
            className="object-cover rounded-lg shadow-md"
            src="https://cf.bstatic.com/psb/capla/static/media/how-to.fb2b5d7a.svg"
          />
        </div>
      </div>

      <div className="container xl:px-0 section-spacing">
        {" "}
        <ListLevel />
        <ListVoucher />
      </div>
    </div>
  );
};

export default TrangVoucher;
