import imgBaner from "@/assets/images/banner-blog-bg.jpeg";
import Link from "next/link";

export default function BannerBlog() {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${imgBaner.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute container inset-0 bg-black/50 z-10"></div>

      {/* Content */}
      <div className="relative z-20 isolate overflow-hidden py-24 sm:py-32 container">
        <div className="mx-auto w-full h-full">
          <div className="mx-auto max-w-2xl lg:mx-0 text-center lg:text-left">
            {/* Title */}
            <h2 className="text-2xl lg:text-4xl xl:text-5xl font-semibold tracking-tight text-white">
              Việt Nam qua từng bài viết !
            </h2>

            {/* Subtitle */}
            <p className="mt-8 text-base lg:text-lg font-medium text-white sm:text-xl/8">
              &quot; Mỗi bài viết là một kinh nghiệm, câu chuyện, một góc nhìn,
              và một hành trình khám phá đầy cảm hứng. &ldquo;
            </p>

            {/* Call to Action */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                href="/blogs"
                className="bg-blue hover:bg-blue-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg text-sm md:text-base lg:text-lg font-medium shadow-lg transition-all duration-300"
              >
                Khám phá bài viết
              </Link>
              <Link
                href="/attractions"
                className="bg-transparent border border-white text-white px-4 md:px-6 py-2 md:py-3 rounded-lg text-sm md:text-base lg:text-lg font-medium hover:bg-white hover:text-black transition-all duration-300"
              >
                Tìm hiểu thêm
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
