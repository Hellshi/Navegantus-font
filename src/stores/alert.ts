import { MouseEventHandler } from "react";
import { create } from "zustand";

interface OpenAlertParams {
  alertTitle?: string;
  alertDescription?: string;
  onConfirm?: MouseEventHandler<HTMLButtonElement>;
}

interface StoreState {
  isOpen: boolean;
  isLoading: boolean;
  alertTitle: string;
  alertDescription: string;
  onConfirm: MouseEventHandler<HTMLButtonElement>;
}

interface StoreFunctions {
  setIsLoading: (param: boolean) => void;
  openAlert: ({
    alertTitle,
    alertDescription,
    onConfirm,
  }: OpenAlertParams) => void;
  closeAlert: () => void;
}

type Store = StoreState & StoreFunctions;

const initialState: StoreState = {
  isOpen: false,
  isLoading: false,
  alertTitle: "Atenção!",
  alertDescription: "Tem certeza de que quer realizar esta ação?",
  onConfirm: () => null,
};

export const useAlertStore = create<Store>()((set) => ({
  isOpen: initialState.isOpen,
  isLoading: initialState.isLoading,
  alertTitle: initialState.alertTitle,
  alertDescription: initialState.alertDescription,
  onConfirm: initialState.onConfirm,
  setIsLoading: (isLoading) => set({ isLoading }),
  openAlert: ({
    alertTitle = initialState.alertTitle,
    alertDescription = initialState.alertDescription,
    onConfirm = initialState.onConfirm,
  }) => set({ isOpen: true, alertTitle, alertDescription, onConfirm }),
  closeAlert: () => set({ ...initialState }),
}));
