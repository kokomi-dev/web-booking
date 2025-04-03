import { CreditCard, MessageSquareText, ShieldCheck, Star } from "lucide-react";

const TravelBenefitsSection = () => {
  const benefits = [
    {
      icon: <ShieldCheck className="text-green w-8 h-8 flex-shrink-0" />,
      text: "Đảm bảo an toàn và hỗ trợ 24/7 trong suốt hành trình.",
    },
    {
      icon: <Star className="text-yellow w-8 h-8 flex-shrink-0" />,
      text: "Các tour du lịch được thiết kế riêng theo yêu cầu.",
    },
    {
      icon: <CreditCard className="text-blue w-8 h-8 flex-shrink-0" />,
      text: "Bảo hiểm du lịch toàn diện.",
    },
  ];

  return (
    <section className="section-spacing container xl:px-0">
      {/* Payment & Quality Section */}
      <section className="list-spacing">
        <h2 className="text-lg lg:text-2xl font-semibold text-start">
          Thanh toán & Cam kết chất lượng
        </h2>
        <div className="list-spacing text-black_sub mt-4">
          <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg shadow-sm">
            <CreditCard className="w-8 h-8 text-blue flex-shrink-0" />
            <p className="text-sm lg:text-base">
              Nhiều phương thức thanh toán linh hoạt: thẻ tín dụng, chuyển
              khoản, ví điện tử.
            </p>
          </div>
          <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg shadow-sm">
            <MessageSquareText className="w-8 h-8 text-green flex-shrink-0" />
            <p className="text-sm lg:text-base">
              Hướng dẫn viên chuyên nghiệp, lịch trình chi tiết.
            </p>
          </div>
        </div>
        <a
          href="/privacy"
          className="inline-block mt-4 text-blue rounded-lg text-sm font-medium hover:underline hover:text-blue_sub transition-all"
        >
          Xem chi tiết chính sách
        </a>
      </section>

      {/* Travel Benefits */}
      <section className="list-spacing ">
        <h2 className="text-lg lg:text-2xl font-semibold text-start">
          Quyền lợi của khách du lịch
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6 mt-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                {benefit.icon}
              </div>
              <span className="text-sm lg:text-base text-black_sub">
                {benefit.text}
              </span>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};

export default TravelBenefitsSection;
