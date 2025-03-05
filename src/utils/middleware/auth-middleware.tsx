"use client";
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";
import { reqCurrentUser } from "@/api/api-auth";
import { useUser } from "@clerk/clerk-react";
import { useAuthenticatedStore } from "@/store/authencation-store";
import { useRouter, usePathname } from "next/navigation";

const AuthMiddleWare = () => {
  const router = useRouter();
  const pathname = usePathname();
  const userId = Cookies.get("userId");
  const resfreshToken = Cookies.get("refreshToken");
  const mutaionDataUser = useMutation({ mutationFn: reqCurrentUser });
  const { isLoaded, isSignedIn, user: userClerk } = useUser();
  const { setUserLogined, setIsAuthenticated } = useAuthenticatedStore();

  useEffect(() => {
    const getCurrentUser = async () => {
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
          isActive: true,
          groupId: ["6"],
          roles: "customer",
          idCode: "",
          numberOfBooked: {
            attraction: 0,
            hotel: 0,
          },
        });

        if (pathname === "/sign-in" || pathname === "/sign-up") {
          router.push("/home");
        }
      } else if (userId) {
        mutaionDataUser.mutate(userId, {
          onSuccess: (res) => {
            const userData = res.data.user;
            setUserLogined({ ...userData });
            setIsAuthenticated();
            if (pathname === "/sign-in" || pathname === "/sign-up") {
              router.push("/home");
            }
          },
          onError: (error) => console.error("Error fetching user:", error),
        });
      }
    };

    getCurrentUser();
  }, [isSignedIn, userId, pathname]);

  return null;
};

export default AuthMiddleWare;
