import { useAuthStore } from "../stores/auth";

export const getAccessToken = () => useAuthStore.getState().token;
