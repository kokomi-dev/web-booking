import { create } from "zustand";
export interface SidebarStoreProps {
  isOpen: boolean;
  handleCloseOrModal: () => void;
  handleClose: () => void;
}
export const useSidebarStore = create<SidebarStoreProps>()((set) => ({
  isOpen: false,
  handleCloseOrModal: () =>
    set((state) => ({
      ...state,
      isOpen: !state.isOpen,
    })),
  handleClose: () =>
    set((state) => ({
      ...state,
      isOpen: false,
    })),
}));
