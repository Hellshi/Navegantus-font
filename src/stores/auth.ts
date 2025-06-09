
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createElectronStorage } from "./electronStorage";
import { UserRole } from "../services/interfaces/users";
import { AuthResponse } from "../services/interfaces/auth";

interface User {
  id: string;
  email: string;
  name: string;
  roles: UserRole[];
}
export interface UserPermission {
  id: string;
  createdAt: string;
  state: IState;
}
interface IState {
  id: string;
  name: string;
  createdAt: string;
}

interface StoreState {
  token: string | null;
  refreshToken: string | null;
  user: User | null;
}

interface StoreFunctions {
  authenticate: (value: AuthResponse) => void;
  updateUserInfo: (param: User) => void;
  resetAuthStore: () => void;
}

type Store = StoreState & StoreFunctions;

const initialState: StoreState = {
  token: null,
  refreshToken: null,
  user: null,
};

const electronStorage = createElectronStorage<StoreState>();

export const useAuthStore = create<Store>()(
  persist(
    (set) => ({
      ...initialState,
      authenticate: (params: AuthResponse) =>
        set({
          token: params.token,
          refreshToken: params.refreshToken,
          user: {
            id: params.user.id,
            email: params.user.email,
            name: params.user.name,
            roles: params.user.roles,
          },
        }),
      updateUserInfo: (params) =>
        set((prev) => ({ user: { ...prev.user, ...params } })),
      resetAuthStore: () => set({ ...initialState }),
    }),
    {
      name: "auth-store",
      storage: electronStorage,
    },
  ),
);