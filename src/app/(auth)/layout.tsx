import GridShape from "@/components/layouts/common/grid-shape";
import { AuthLayoutProp } from "@/types/auth";
import bannerLayoutAuth from "@/assets/images/banner-layout-auth.webp";
export default function AuthLayout({ children }: AuthLayoutProp) {
  return (
    <div className="relative p-6 bg-white z-1 sm:p-0">
      <div className="relative flex lg:flex-row w-full min-h-screen  justify-center flex-col sm:p-0">
        {children}
        <div
          style={{
            backgroundImage: `url(${bannerLayoutAuth.src})`,
          }}
          className="lg:w-1/2 w-full lg:grid items-center hidden bg-center bg-cover  "
        >
          <div className="relative w-full h-full  items-center justify-center  flex z-1">
            <GridShape />
            <div className="flex flex-col items-center max-w-xs">
              <p className="text-center text-white font-bold title-font-auth animate-glow-wave ">
                KoKoTravel !<br />{" "}
                <span className="text-nowrap">Chào mừng bạn</span>
              </p>
            </div>
          </div>
        </div>
        <div className="fixed bottom-6 right-6 z-50 hidden sm:block"></div>
      </div>
    </div>
  );
}
