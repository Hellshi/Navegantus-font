import { create } from "zustand";

interface StoreState {
  filter: string;
}

interface StoreFunctions {
  setFilter: (value: string) => void;
}

type Store = StoreState & StoreFunctions;

const initialState: StoreState = {
  filter: "",
};

export const useFilterStore = create<Store>()((set) => ({
  filter: initialState.filter,
  setFilter: (value: string) => set({ filter: value }),
  resetFilterStore: () => set({ ...initialState }),
}));
