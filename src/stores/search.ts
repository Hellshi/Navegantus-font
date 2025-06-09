import { create } from "zustand";

export interface SearchProps {
  query_string: string;
  fields?: string[];
}
interface StoreState {
  search: SearchProps[];
  searchLaunches: SearchProps[];
}

interface StoreFunctions {
  setSearch: (data: SearchProps) => void;
  setSearchLaunches: (data: SearchProps) => void;
  removeSearch: (field: string) => void;
  removeSearchLaunches: (field: string) => void;
  resetSearchStore: () => void;
  resetSearchLaunchesStore: () => void;
}

type Store = StoreState & StoreFunctions;

const initialState: StoreState = {
  search: [],
  searchLaunches: [],
};

export const useSearchStore = create<Store>()((set) => ({
  search: initialState.search,
  searchLaunches: initialState.searchLaunches,
  setSearch: (data: SearchProps) =>
    set((state) => ({
      search: data.query_string === "" ? state.search : [...state.search, data],
    })),
  setSearchLaunches: (data: SearchProps) =>
    set((state) => ({
      searchLaunches:
        data.query_string === ""
          ? state.searchLaunches
          : [...state.searchLaunches, data],
    })),

  removeSearch: (field: string) =>
    set((state) => ({
      search: state.search.filter(
        (item) => item.fields?.includes(field) === false,
      ),
    })),
  removeSearchLaunches: (field: string) =>
    set((state) => ({
      searchLaunches: state.searchLaunches.filter(
        (item) => item.fields?.includes(field) === false,
      ),
    })),
  resetSearchStore: () => set({ ...initialState }),
  resetSearchLaunchesStore: () => set({ ...initialState }),
}));
