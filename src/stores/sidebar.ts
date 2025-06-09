import { create } from "zustand";

interface StoreState {
  isOpen: boolean;
}

interface StoreFunctions {
  openSidebar: () => void;
  closeSidebar: () => void;
}

type Store = StoreState & StoreFunctions;

const initialState: StoreState = {
  isOpen: window.innerWidth > 1023,
};

export const useSidebarStore = create<Store>()((set) => ({
  isOpen: initialState.isOpen,
  openSidebar: () => set({ isOpen: true }),
  closeSidebar: () => set({ isOpen: false }),
  resetSidebarStore: () => set({ ...initialState }),
}));
