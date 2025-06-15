import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../../stores/auth";

export function AnonymousRoute({ children }: { children: React.ReactNode }) {
  const token = useAuthStore((state) => state.token);

  if (token) return <Navigate to="/" />;

  return children;
}
