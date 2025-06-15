import { Navigate, useLocation } from "react-router-dom";
import { RoleName } from "../../../services/interfaces/users";
import { useAuthStore } from "../../../stores/auth";

export function ProtectedRoute(
  {
    children,
    requiredPermission,
  }: {
    children: React.ReactNode;
    requiredPermission?: RoleName;
  }) {
  const location = useLocation();
  const token = useAuthStore((state) => state.token);
  const userRoles = useAuthStore((state) => state.user?.role);

  if (!token)
    return <Navigate to="/signin" state={{ from: location }} replace />;

  if (
    requiredPermission &&
    (!userRoles || userRoles.name !== requiredPermission)
  )
    return <Navigate to="/perfil" state={{ from: location }} replace />;

  return children;
}
