"use client";
import React, { useEffect, useRef } from "react";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";
import { reqCurrentUser } from "@/api/api-auth";
import { useUser } from "@clerk/clerk-react";
import { useAuthenticatedStore } from "@/store/authencation-store";

const AuthMiddleWare = () => {
  const { isSignedIn, user: userClerk } = useUser();
  const { setUserLogined, setIsAuthenticated, user, isAuthenticated } =
    useAuthenticatedStore();
  const userId = Cookies.get("userId");
  const mutationDataUser = useMutation({ mutationFn: reqCurrentUser });

  useEffect(() => {
    if (!user) {
      const fetchUser = async () => {
        if (isSignedIn && userClerk) {
          setUserLogined({
            source: "clerk",
            _id: userClerk.id,
            token: null,
            firstname: userClerk.firstName || "",
            lastname: userClerk.lastName || "",
            email: userClerk.emailAddresses[0]?.emailAddress || "",
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
          setIsAuthenticated();
        } else if (userId) {
          mutationDataUser.mutate(userId, {
            onSuccess: (res) => {
              const userData = res.data.user;
              setUserLogined({ ...userData });
              setIsAuthenticated();
            },
            onError: (error) => {
              console.error("Error fetching user:", error);
            },
          });
        }
      };
      fetchUser();
    }
    return;
  }, [isSignedIn, userId]);

  return null;
};

export default AuthMiddleWare;
