"use client";
import { LoadingComponentAccount } from "@/components/components/loading";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useAuthenticatedStore } from "@/store/authencation-store";
import { cn } from "@/utils/constants";
import { useAuth, useUser } from "@clerk/nextjs";
import Cookies from "js-cookie";
import {
  BadgeDollarSign,
  CalendarCheck,
  CircleUser,
  CircleUserIcon,
  LogOut,
  UserRound,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Fragment, Suspense, useState } from "react";
import { toast } from "react-toastify";

const Account = () => {
  const { signOut } = useAuth();
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { user, isAuthenticated, setLogout } = useAuthenticatedStore();
  const handleLogout = async () => {
    try {
      if (isSignedIn) {
        await signOut();
      }
      localStorage.removeItem("accessToken");
      Cookies.remove("userId");
      Cookies.remove("refreshToken");
      Cookies.remove("accessToken");
      setLogout();

      toast.success("Đăng xuất thành công!");
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
      toast.error("Đăng xuất thất bại. Vui lòng thử lại!");
    }
  };
  if (!isLoaded) {
    return <LoadingComponentAccount />;
  }
  return (
    <Fragment>
      {isAuthenticated && user ? (
        <Suspense fallback={<LoadingComponentAccount />}>
          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger
              asChild
              className="border-none outline-none border-transparent focus:outline-none"
            >
              <Button
                autoFocus={false}
                className={cn(
                  "w-fit h-full flex items-center justify-center gap-2 p-1 shadow-none rounded-lg text-white focus:outline-none border-none border-transparent focus-visible:ring-0",
                  "cursor-pointer",
                  "md:p-1 md:px-2",
                  "bg-blue_active hover:bg-blue_sub select-none"
                )}
                onClick={() => setOpen(!open)}
              >
                <div className="w-7 h-7 lg:w-9 lg:h-9 border-1 border-yellow rounded-full flex items-center justify-center overflow-hidden">
                  {user?.images ? (
                    <Image
                      src={user.images}
                      width={80}
                      height={80}
                      className="object-cover"
                      alt="avatar-image-google"
                    />
                  ) : (
                    <CircleUser className="text-white size-6 !w-6 !h-6" />
                  )}
                </div>
                <div className="size-auto hidden flex-col items-start justify-center lg:flex">
                  <div className="flex items-center gap-x-1 text-white font-bold text-xs">
                    <span className="capitalize">
                      {user.firstname.length > 11
                        ? user.firstname.slice(0, 11) + "..."
                        : user.firstname}
                    </span>
                    <span className="capitalize">{user.lastname}</span>
                  </div>
                  <span className="text-xs text-yellow">Genius Cấp 1</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              sideOffset={4} // Điều chỉnh khoảng cách giữa dropdown và trigger
              alignOffset={0}
              align="end"
              className="w-56 bg-white text-black  lg:font-normal rounded-14 "
            >
              <DropdownMenuGroup className="grid gap-2 p-2">
                <DropdownMenuItem
                  className="w-full flex items-center p-2 hover:cursor-pointer"
                  onClick={() => {
                    setOpen(false),
                      router.push(
                        `/account/mysetting/${user._id}?do=manage-account`
                      );
                  }}
                >
                  <UserRound className="size-4 lg:w-5 lg:h-5 mr-2 text-black_sub" />
                  Cài đặt tài khoản
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="w-full flex items-center p-2 hover:cursor-pointer"
                  onSelect={() => {
                    setOpen(false),
                      router.push(
                        `/account/manage-booking/${user._id}?do=booking`
                      );
                  }}
                >
                  <CalendarCheck className="size-4 lg:w-5 lg:h-5 mr-2 text-black_sub" />
                  Đặt chỗ & chuyến đi
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="w-full flex items-center p-2 hover:cursor-pointer"
                  onSelect={() => {
                    setOpen(false), router.push(`/genius/${user._id}`);
                  }}
                >
                  <BadgeDollarSign className="size-4 lg:w-5 lg:h-5 mr-2 text-black_sub" />
                  Ưu đãi của bạn
                </DropdownMenuItem>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <div className="flex items-center w-full cursor-pointer px-[0.65rem] py-2 hover:bg-blue_hover ">
                      <LogOut className="size-4 lg:w-5 lg:h-5 mr-[0.3rem] text-black_sub" />
                      <span className="text-sm">Đăng xuất</span>
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent
                    tabIndex={-1}
                    className="bg-black_sub text-black rounded-14"
                  >
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Bạn chắc chắn muốn Đăng Xuất?
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-black_sub text-xs">
                        Mọi thông tin sẽ được lưu trữ lại phục vụ cho lần đăng
                        nhập tiếp theo.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter
                      autoFocus={false}
                      className="flex flex-col gap-y-3 lg:flex-row"
                    >
                      <AlertDialogCancel
                        autoFocus={false}
                        className="bg-blue_sub text-white hover:bg-blue_active  focus-visible:ring-0"
                      >
                        Hủy
                      </AlertDialogCancel>
                      <AlertDialogAction
                        autoFocus={false}
                        onClick={handleLogout}
                        className="bg-black_sub text-black_sub hover:bg-blue_hover"
                      >
                        Đăng xuất
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </Suspense>
      ) : (
        <div className="flex items-center justify-center">
          <Button
            onClick={() => router.push("/sign-in")}
            className="hidden lg:block ml-4 text-sm text-white bg-blue_sub hover:bg-blue_active hover:text-white"
          >
            Đăng nhập
          </Button>
          <HoverCard>
            <HoverCardTrigger>
              <CircleUserIcon
                onClick={() => router.push("/sign-in")}
                className="w-7 h-7 text-white block lg:hidden hover:cursor-pointer"
              />
            </HoverCardTrigger>
            <HoverCardContent
              align="end"
              className="bg-black block lg:hidden text-white border-none p-1 px-2 w-full shadow-2xl z-10"
            >
              <Button
                onClick={() => router.push("/sign-in")}
                className="text-xs font-normal"
              >
                Đăng nhập
              </Button>
            </HoverCardContent>
          </HoverCard>
        </div>
      )}
    </Fragment>
  );
};

export default Account;
