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
import { useClerk, useUser } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import {
  BadgeDollarSign,
  BookmarkCheck,
  CalendarCheck,
  CircleUserIcon,
  LogOut,
  UserRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, Suspense, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CircleUser } from "lucide-react";

const Account = () => {
  const mutaionDataUser = useMutation({ mutationFn: reqCurrentUser });

  const { signOut } = useClerk();
  const { isLoaded, isSignedIn, user: userClerk } = useUser();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const userId = Cookies.get("userId");
  const {
    setUserLogined,
    user,
    setIsAuthenticated,
    isAuthenticated,
    setLogout,
  } = useAuthenticatedStore();
  useEffect(() => {
    const getCurrentUser = async () => {
      if (!isSignedIn && !userId) return;
      setLoading(true);
      try {
        if (isSignedIn) {
          setUserLogined({
            source: "clerk",
            _id: userClerk.id,
            token: null,
            firstname: userClerk.firstName || "",
            lastname: userClerk.lastName || "",
            email: userClerk.emailAddresses[0].emailAddress,
            numberPhone: "",
            hasImge: userClerk.hasImage,
            images: userClerk.imageUrl,
            isNewbie: true,
            isActive: true,
            groupId: ["6"],
            roles: "customer",
            idCode: "",
          });
        } else if (userId) {
          mutaionDataUser.mutate(userId, {
            onSuccess: (res) => {
              const userData = res.data.user;
              setUserLogined({ ...userData });
              setIsAuthenticated();
            },
            onError: (error) => console.error("Error fetching user:", error),
          });
        }
      } catch (error) {
        console.error("Unexpected error:", error);
      } finally {
        setLoading(false);
      }
    };

    getCurrentUser();
  }, [isSignedIn, userId]);

  const handleLogout = useCallback(async () => {
    localStorage.removeItem("accessToken");
    Cookies.remove("userId");
    Cookies.remove("refreshToken");
    setLogout();
    window.location.reload();
    toast.success("Đăng xuất thành công!");
  }, []);

  if (loading || !isLoaded || mutaionDataUser.isPending) {
    return <LoadingComponentAccount />;
  }
  return (
    <Fragment>
      {isAuthenticated && user ? (
        <Suspense fallback={<LoadingComponentAccount />}>
          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                className={cn(
                  "w-fit h-full flex items-center justify-center gap-2 p-1 shadow-none rounded-lg text-white",
                  "cursor-pointer",
                  "md:p-1 md:px-2",
                  "bg-bg_primary_active hover:bg-bg_primary_blue_sub select-none"
                )}
                onClick={() => setOpen(!open)}
              >
                <div className="w-7 h-7 lg:w-9 lg:h-9 border-1 border-yellow_main rounded-full flex items-center justify-center overflow-hidden">
                  <CircleUser className="text-white size-6 !w-6 !h-6" />
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
            <DropdownMenuContent className="w-56 bg-white text-black rounded-14 p-0">
              <DropdownMenuGroup>
                <DropdownMenuItem onSelect={() => setOpen(false)}>
                  <Link
                    className="w-full flex items-center"
                    href={`/account/mysetting/${user._id}?do=manage-account`}
                  >
                    <UserRound className="w-5 h-5 mr-2" />
                    Quản lí tài khoản
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setOpen(false)}>
                  <Link
                    className="w-full flex items-center"
                    href={`/account/manage-booking/${user._id}?do=booking`}
                  >
                    <CalendarCheck className="w-5 h-5 mr-2" />
                    Đặt chỗ & chuyến đi
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setOpen(false)}>
                  <Link
                    className="w-full flex items-center"
                    href={`/account/saved/${user._id}`}
                  >
                    <BookmarkCheck className="w-5 h-5 mr-2" />
                    Đã lưu
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setOpen(false)}>
                  <Link
                    className="w-full flex items-center"
                    href={`/home/genius/${user._id}`}
                  >
                    <BadgeDollarSign className="w-5 h-5 mr-2" />
                    Ưu đãi của bạn
                  </Link>
                </DropdownMenuItem>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <div className="flex items-center w-full cursor-pointer px-[0.65rem] py-3 hover:bg-bg_primary_hover">
                      <LogOut className="w-5 h-5 mr-[0.3rem]" />
                      <span className="text-smallest">Đăng xuất</span>
                    </div>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-bg_black_sub text-black rounded-14">
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Bạn chắc chắn muốn Đăng Xuất?
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-black_sub text-smallest">
                        Mọi thông tin sẽ được lưu trữ lại phục vụ cho lần đăng
                        nhập tiếp theo.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex flex-col gap-y-3 lg:flex-row">
                      <AlertDialogCancel className="bg-bg_primary_blue_sub text-white hover:bg-bg_primary_active">
                        Hủy
                      </AlertDialogCancel>
                      <AlertDialogAction
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
