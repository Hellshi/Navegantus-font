import { ResetPasswordRequest, UserRole } from "./users";

export interface RefreshTokenResponse {
  token: string;
  refreshToken: string;
}

export interface AuthResponse {
  user: UserLogin;
  refreshToken: string;
  token: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface AuthRequest {
  email: string;
  password: string;
}

export interface UserLogin {
  id: string;
  email: string;
  name: string;
  roles: UserRole;
}

export interface FirstLoginRequest extends ResetPasswordRequest {}

export interface FirstLoginResponse {
  id: string;
  email: string;
  name: string;
  role: string;
  accessToken: string;
  refreshToken: string;
}
