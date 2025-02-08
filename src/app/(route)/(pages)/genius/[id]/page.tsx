import imgGenius from "@/assets/images/banner-genius.jpg";
import imgQua from "@/assets/images/img-qua.png";
import ListLevel from "@/components/dashboard/genius/list-level";
import ListItemBooked from "@/components/dashboard/genius/list-number-booked";
import ListVoucher from "@/components/dashboard/genius/list-voucher";
import Image from "next/image";
const TrangVoucher = () => {
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
      <ListItemBooked />
      <div className="w-full mx-auto space-y-6 lg:space-y-8">
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
        <ListLevel />
        <ListVoucher />
      </div>
    </div>
  );
};

export default TrangVoucher;
