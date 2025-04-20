import Image from "next/image";
import imgBaner from "@/assets/images/banner-home-slogan.jpg";
import { links, stats } from "./constant";

export default function BannerSlogan() {
  return (
    <section className="relative">
      <div className="absolute inset-0">
        <Image
          src={imgBaner}
          alt="Banner background"
          fill
          priority
          quality={80}
          sizes="100vw"
          style={{
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="relative z-10 isolate overflow-hidden py-24 sm:py-32 container">
        <div className="mx-auto w-full h-full">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-white">
              Tận hưởng cuộc sống
            </h2>
            <p className="mt-8 text-pretty text-lg font-medium text-white sm:text-xl/8">
              &quot; Có những cuộc hành trình không đo bằng quãng đường, mà đo
              bằng những trải nghiệm và cảm xúc.&ldquo; - Nguyễn Nhật Ánh
            </p>
          </div>
          <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base/7 font-semibold text-white sm:grid-cols-2 md:flex lg:gap-x-10">
              {links.map((link) => (
                <a key={link.name} href={link.href}>
                  {link.name} <span aria-hidden="true">&rarr;</span>
                </a>
              ))}
            </div>
            <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.name} className="flex flex-col-reverse gap-1">
                  <dt className="text-base/7 text-gray-300">{stat.name}</dt>
                  <dd className="text-4xl font-semibold tracking-tight text-white">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
