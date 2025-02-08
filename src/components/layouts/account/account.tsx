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
import { Fragment, Suspense, useEffect, useState } from "react";
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
            bookedAttractions: [],
            bookedHotels: [],
            isNewbie: true,
            isActive: true,
            groupId: ["6"],
            roles: "custommer",
          });
        } else if (userId) {
          mutaionDataUser.mutate(userId, {
            onSuccess: async (res) => {
              const userData = res.data.user;
              setUserLogined({ ...userData });
              setIsAuthenticated();
            },
            onError: async (error) => {
              console.log(error);
            },
          });
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    getCurrentUser();
  }, [isSignedIn]);

  const handleLogout = async () => {
    localStorage.removeItem("accessToken");
    Cookies.remove("userId");
    Cookies.remove("refreshToken");
    setLogout();
    if (typeof window === undefined) {
      window.location.reload();
    }
    toast.success("Đăng xuất thành công!");
  };

  if (loading || !isLoaded || mutaionDataUser.isPending) {
    return <LoadingComponentAccount />;
  }
  return (
    <Fragment>
      {isAuthenticated && user ? (
        <Suspense fallback={<LoadingComponentAccount />}>
          <DropdownMenu open={open} onOpenChange={() => setOpen(false)}>
            <DropdownMenuTrigger asChild>
              <Button
                className={cn(
                  "w-fit h-full flex items-center justify-center gap-2 p-1 shadow-none rounded-lg text-white",
                  "cursor-pointer",
                  "md:p-1 md:px-2",
                  "bg-bg_primary_active hover:bg-bg_primary_blue_sub"
                )}
                onClick={() => setOpen(!open)}
              >
                <div
                  className={cn(
                    "w-7 h-7 lg:w-8 lg:h-8 border-1 border-yellow_main rounded-full flex items-center justify-center overflow-hidden"
                  )}
                >
                  <CircleUser className="text-white" />
                </div>
                <div className="w-auto h-auto hidden flex-col items-start justify-center lg:flex ">
                  <div
                    className={cn(
                      " flex items-center justify-start gap-x-1 text-white font-bold text-smallest select-none"
                    )}
                  >
                    <span className="capitalize text-white">
                      {user.firstname}
                    </span>
                    <span className="capitalize text-white">
                      {user.lastname}
                    </span>
                  </div>
                  <div className="text-start">
                    <span className="text-[0.7rem] text-yellow_main selec">
                      Genius Cấp 1
                    </span>
                  </div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 h-auto bg-white text-black rounded-14 p-0 ">
              <DropdownMenuGroup className="w-full">
                <DropdownMenuItem
                  onClick={() => setOpen(false)}
                  className="cursor-pointer p-2 py-3 hover:bg-bg_primary_hover"
                >
                  <Link
                    className="w-full flex items-center justify-start"
                    href={`/account/mysetting/${user._id}?do=manage-account`}
                  >
                    <UserRound className="w-5 h-5 mr-2" />
                    <span>Quản lí tài khoản</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setOpen(false)}
                  className="cursor-pointer p-2 py-3 hover:bg-bg_primary_hover"
                >
                  <Link
                    className="w-full flex items-center justify-start"
                    href={`/account/manage-booking/${user._id}?do=booking`}
                  >
                    <CalendarCheck className="w-5 h-5 mr-2" />
                    <span>Đặt chỗ & chuyến đi</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setOpen(false)}
                  className="cursor-pointer p-2 py-3 hover:bg-bg_primary_hover"
                >
                  <Link
                    className="w-full flex items-center justify-start"
                    href={`/account/saved/${user._id}`}
                  >
                    <BookmarkCheck className="w-5 h-5 mr-2" />
                    <span>Đã lưu</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setOpen(false)}
                  className="cursor-pointer p-2 py-3 hover:bg-bg_primary_hover"
                >
                  <Link
                    className="w-full flex items-center justify-start"
                    href={`home/genius/${user._id}`}
                  >
                    <BadgeDollarSign className="w-5 h-5 mr-2" />
                    <span>Ưu đãi của bạn</span>
                  </Link>
                </DropdownMenuItem>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <div className="flex items-center justify-start w-full cursor-pointer px-[0.65rem] py-3 hover:bg-bg_primary_hover">
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
                      <AlertDialogCancel
                        onClick={() => setOpen(false)}
                        className="bg-bg_primary_blue_sub text-white hover:bg-bg_primary_active"
                      >
                        Hủy
                      </AlertDialogCancel>
                      {isSignedIn && user.source === "clerk" ? (
                        <AlertDialogAction
                          onClick={async () => {
                            try {
                              Promise.all([setLogout(), signOut()]).then(() => {
                                toast.success("Đăng xuất thành công");
                              });
                            } catch (error) {
                              toast.error("Lỗi khi đăng nhập" + error);
                            }
                          }}
                          className="bg-bg_black_sub text-black_sub hover:text-black"
                        >
                          Đăng xuất
                        </AlertDialogAction>
                      ) : (
                        <AlertDialogAction
                          onClick={handleLogout}
                          className="bg-bg_black_sub text-black_sub hover:text-black"
                        >
                          Đăng xuất
                        </AlertDialogAction>
                      )}
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
            <Button className="ml-4 text-small text-white bg-bg_primary_blue_sub hover:bg-bg_primary_active">
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
