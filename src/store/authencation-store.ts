import { create } from "zustand";

export interface User {
  _id: number;
  token: string;
  firstname: string;
  lastname: string;
  email: string;
  numberPhone: string;
  booked: [
    {
      tripId: string;
      category: string;
      orderId: string;
      bookingDate: Date;
      amount: number;
    }
  ];
}

interface AuthenticatedStoreProps {
  isAuthenticated: boolean;
  user: User | null;
  setUserLogined: (userData: User) => void;
  setIsAuthenticated: () => void;
  setLogout: () => void;
}

export const useAuthenticatedStore = create<AuthenticatedStoreProps>()(
  (set) => ({
    isAuthenticated: false,
    user: null,
    setIsAuthenticated: () =>
      set((state) => ({
        ...state,
        isAuthenticated: true,
      })),
    setUserLogined: (userData) =>
      set((state) => ({
        ...state,
        user: userData,
        isAuthenticated: true,
      })),
    setLogout: () =>
      set((state) => ({
        ...state,
        isAuthenticated: false,
        user: null,
      })),
  })
);
