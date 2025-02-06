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
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { NAVIGATIONS } from "@/utils/constants";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
import { useSidebarStore } from "@/store/sidebar-store";
import { cn } from "@/utils/constants";
const MobileSidebar = () => {
  const { isOpen, handleClose, handleCloseOrModal } = useSidebarStore();
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "w-fit h-full flex items-center justify-center",
        "lg:hidden"
      )}
    >
      <MenuIcon
        onClick={handleCloseOrModal}
        className="w-7 h-7 ml-2  text-white hover:cursor-pointer transition-all duration-300"
      />
      <Sheet open={isOpen} onOpenChange={handleClose}>
        <SheetTitle></SheetTitle>
        <SheetDescription></SheetDescription>
        <SheetContent
          onClick={handleClose}
          className="w-[85%] h-full bg-bg_primary_white text-black_main"
          side="right"
        >
          <div className="w-full h-full overflow-y-auto scrollbar-hide">
            <h3 className="text-medium font-bold">Khác</h3>
            <section className="flex items-start justify-start flex-col text-small font-light gap-y-4">
              <div className="flex flex-col gap-y-2">
                <div className="flex items-center justify-start gap-x-1 hover:cursor-pointer p-2 py-3">
                  <PackageCheck className="size-4" />
                  <span>Chương trình thân thiết</span>
                </div>
                <div className="flex items-center justify-start gap-x-1 hover:cursor-pointer p-2 py-3">
                  <HousePlug className="size-4" />
                  <span>Đăng chỗ nghỉ của quý vị</span>
                </div>
              </div>
              <h4 className="text-normal+ font-semibold">Trợ giúp</h4>
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
              <h4 className="text-normal+ font-semibold">Cảm hứng</h4>
              <div className="flex flex-col gap-y-2">
                <div className="flex items-center justify-start gap-x-1 hover:cursor-pointer p-2 py-3">
                  <BadgeDollarSign className="size-4" />
                  <span>Ưu đãi theo mùa dịp lễ</span>
                </div>
                <div className="flex items-center justify-start gap-x-1 hover:cursor-pointer p-2 py-3">
                  <Book className="size-4" />
                  <span>Bài viết về du lịch</span>
                </div>
              </div>
              <h4 className="text-normal+ font-semibold">Cài đặt và pháp lý</h4>
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
                <div className="flex items-center justify-start gap-x-1 hover:cursor-pointer p-2 py-3">
                  <OctagonPause className="size-4" />
                  <span>Cơ hội trở thành đối tác</span>
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
