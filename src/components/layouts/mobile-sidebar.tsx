"use client";
import {
  BadgeDollarSign,
  Book,
  BookLock,
  CircleHelp,
  HousePlug,
  MenuIcon,
  OctagonAlert,
  OctagonPause,
  PackageCheck,
  ShieldBan,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import { useSidebarStore } from "@/store/sidebar-store";
import { cn } from "@/utils/constants";
import { useAuthenticatedStore } from "@/store/authencation-store";
const MobileSidebar = () => {
  const { isOpen, handleClose, handleCloseOrModal } = useSidebarStore();
  const pathname = usePathname();
  const { user, isAuthenticated } = useAuthenticatedStore();
  return (
    <div
      className={cn(
        "w-fit h-full flex items-center justify-center",
        "lg:hidden"
      )}
    >
      <div
        onClick={handleCloseOrModal}
        className="flex items-center justify-center p-1 rounded-8 bg-black/10 backdrop-blur-md ml-2"
      >
        <MenuIcon className="w-7 h-7  text-white hover:cursor-pointer transition-all duration-300" />
      </div>
      <Sheet open={isOpen} onOpenChange={handleClose}>
        <SheetTitle></SheetTitle>
        <SheetDescription></SheetDescription>
        <SheetContent
          onClick={handleClose}
          className="w-[70%] h-full bg-white text-black"
          side="right"
        >
          <div className="w-full h-full overflow-y-auto ">
            <h3 className="text-lg font-bold">Khác</h3>
            <section className="flex items-start justify-start flex-col text-sm  gap-y-4">
              <div className="flex flex-col gap-y-2">
                {!!user && isAuthenticated ? (
                  <Link
                    href={`/genius/${user?._id}`}
                    className="flex items-center justify-start gap-x-1 hover:cursor-pointer p-2 py-3"
                  >
                    <PackageCheck className="size-4" />
                    <span>Chương trình thân thiết</span>
                  </Link>
                ) : (
                  <Link
                    href="/sign-in"
                    className="flex items-center justify-start gap-x-1 hover:cursor-pointer p-2 py-3"
                  >
                    <User className="size-4" />
                    Đăng nhập
                  </Link>
                )}
                <Link
                  href={process.env.NEXT_PUBLIC_HOST_ADMIN || "/"}
                  className="flex items-center justify-start gap-x-1 hover:cursor-pointer p-2 py-3"
                >
                  <HousePlug className="size-4" />
                  <span>Đăng chỗ nghỉ của quý vị</span>
                </Link>
              </div>
              <h4 className="text-lg font-semibold">Trợ giúp</h4>
              <div className="flex flex-col gap-y-2">
                <div className="flex items-center justify-start gap-x-1 hover:cursor-pointer p-2 py-3">
                  <CircleHelp className="size-4" />
                  <span>Liên hệ Dịch vụ khách hàng</span>
                </div>
                <div className="flex items-center justify-start gap-x-1 hover:cursor-pointer p-2 py-3">
                  <ShieldBan className="size-4" />
                  <span>Tranh chấp đối tác</span>
                </div>
              </div>
              <h4 className="text-lg font-semibold">Cảm hứng</h4>
              <div className="flex flex-col gap-y-2">
                <div className="flex items-center justify-start gap-x-1 hover:cursor-pointer p-2 py-3">
                  <BadgeDollarSign className="size-4" />
                  <span>Ưu đãi theo mùa dịp lễ</span>
                </div>
                <Link
                  href="/blogs"
                  className="flex items-center justify-start gap-x-1 hover:cursor-pointer p-2 py-3"
                >
                  <Book className="size-4" />
                  <span>Bài viết về du lịch</span>
                </Link>
              </div>
              <h4 className="text-lg font-semibold">Cài đặt và pháp lý</h4>
              <div className="flex flex-col gap-y-2">
                <div className="flex items-center justify-start gap-x-1 hover:cursor-pointer p-2 py-3">
                  <OctagonAlert className="size-4" />
                  <Link href="/content/privacy">Về KoKoTravel</Link>
                </div>
                <div className="flex items-center justify-start gap-x-1 hover:cursor-pointer p-2 py-3">
                  <BookLock className="size-4" />
                  <Link href="/content/privacy?activeTab=2">
                    Điều khoản và điều kiện
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileSidebar;
