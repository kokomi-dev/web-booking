"use client";
import { reqCurrentUser } from "@/api/api-auth";
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
import { useClerk, useUser, useAuth } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";
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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, Suspense, useCallback, useState } from "react";
import { toast } from "react-toastify";

const Account = () => {
  const mutaionDataUser = useMutation({ mutationFn: reqCurrentUser });

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

  if (!isLoaded || mutaionDataUser.isPending) {
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
                  "bg-bg_primary_active hover:bg-bg_primary_blue_sub select-none"
                )}
                onClick={() => setOpen(!open)}
              >
                <div className="w-7 h-7 lg:w-9 lg:h-9 border-1 border-yellow_main rounded-full flex items-center justify-center overflow-hidden">
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
                <div className="w-auto h-auto hidden flex-col items-start justify-center lg:flex">
                  <div className="flex items-center gap-x-1 text-white font-bold text-smallest">
                    <span className="capitalize">
                      {user.firstname.length > 11
                        ? user.firstname.slice(0, 11) + "..."
                        : user.firstname}
                    </span>
                    <span className="capitalize">{user.lastname}</span>
                  </div>
                  <span className="text-[0.7rem] text-yellow_main">
                    Genius Cấp 1
                  </span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white text-black  lg:font-normal rounded-14 ">
              <DropdownMenuGroup className="posing-vertical-4 p-0">
                <DropdownMenuItem onSelect={() => setOpen(false)}>
                  <Link
                    className="w-full flex items-center p-2"
                    href={`/account/mysetting/${user._id}?do=manage-account`}
                  >
                    <UserRound className="size-4 lg:w-5 lg:h-5 mr-2 text-black_sub" />
                    Quản lí tài khoản
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setOpen(false)}>
                  <Link
                    className="w-full flex items-center p-2"
                    href={`/account/manage-booking/${user._id}?do=booking`}
                  >
                    <CalendarCheck className="size-4 lg:w-5 lg:h-5 mr-2 text-black_sub" />
                    Đặt chỗ & chuyến đi
                  </Link>
                </DropdownMenuItem>
                {/* <DropdownMenuItem onSelect={() => setOpen(false)}>
                  <Link
                    className="w-full flex items-center p-2"
                    href={`/account/saved/${user._id}`}
                  >
                    <BookmarkCheck className="size-[1.18rem] lg:w-5 lg:h-5 mr-2 text-black_sub" />
                    Đã lưu
                  </Link>
                </DropdownMenuItem> */}
                <DropdownMenuItem onSelect={() => setOpen(false)}>
                  <Link
                    className="w-full flex items-center p-2"
                    href={`/genius/${user._id}`}
                  >
                    <BadgeDollarSign className="size-4 lg:w-5 lg:h-5 mr-2 text-black_sub" />
                    Ưu đãi của bạn
                  </Link>
                </DropdownMenuItem>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <div className="flex items-center w-full cursor-pointer px-[0.65rem] py-3 hover:bg-bg_primary_hover pl-[1.22rem]">
                      <LogOut className="size-4 lg:w-5 lg:h-5 mr-[0.3rem] text-black_sub" />
                      <span className="text-smallest">Đăng xuất</span>
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent
                    tabIndex={-1}
                    className="bg-bg_black_sub text-black rounded-14"
                  >
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Bạn chắc chắn muốn Đăng Xuất?
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-black_sub text-smallest">
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
                        className="bg-bg_primary_blue_sub text-white hover:bg-bg_primary_active  focus-visible:ring-0"
                      >
                        Hủy
                      </AlertDialogCancel>
                      <AlertDialogAction
                        autoFocus={false}
                        onClick={handleLogout}
                        className="bg-bg_black_sub text-black_sub hover:bg-bg_primary_hover"
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
          <Link href={"/sign-in"} className="hidden lg:block">
            <Button className="ml-4 text-small text-white bg-bg_primary_blue_sub hover:bg-bg_primary_active hover:text-white">
              Đăng nhập
            </Button>
          </Link>
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
              <Link href="/sign-in" className="text-smallest font-normal">
                Đăng nhập
              </Link>
            </HoverCardContent>
          </HoverCard>
        </div>
      )}
    </Fragment>
  );
};

export default Account;
