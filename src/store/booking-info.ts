import { create } from "zustand";

interface IBookingInfo {
  bookingInfo: {
    chooseInput: number[];
  };
  setBookingInfo: (data: any) => void;
  clearBookingInfo: () => void;
}
export const useBookingInfoStore = create<IBookingInfo>()((set) => ({
  bookingInfo: {
    chooseInput: [],
  },
  setBookingInfo: (data) =>
    set((state) => ({
      bookingInfo: { ...data, chooseInput: data.chooseInput },
    })),
  clearBookingInfo: () =>
    set(() => ({
      bookingInfo: {
        chooseInput: [],
      },
    })),
}));
