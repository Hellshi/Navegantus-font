export enum RoleName {
  MASTER = "master",
  COORDINATOR = "coordinator",
  CONCILIATOR = "conciliator",
  SUPPORT = "support",
}

export enum RoleLabels {
  master = "Master",
  coordinator = "Coordenador",
  conciliator = "Conciliador",
  support = "Suporte",
}

export interface UserRole {
  id: string;
  createdAt: string;
  name: RoleName;
  displayName: string;
  description: string;
}

export interface CreateUserResponse {
  id: string;
  createdAt: string;
  email: string;
  name: string;
  status: UserStatus;
  lastLogin?: string;
  roles: Array<string>;
}

export type FindAllUsersResponse = CreateUserResponse;

export enum UserStatusLabels {
  active = "Ativo",
  inactive = "Inativo",
}

export type UserStatus = "active" | "inactive";


export interface UserResponse {
  id: string;
  createdAt: string;
  email: string;
  name: string;
  phone: string;
  position: string;
  status: UserStatus;
  roles: UserRole[];
}

export interface CreateUserRequest {
  name: string;
  email: string;
  stateId: string;
  position: string;
  phone: string;
  pdvRoleId: string[];
}

export interface EditUserRequest {
  userId: string;
  data: Omit<CreateUserRequest, "email">;
}

export interface EditUserPhoneRequest {
  data: { phone: string };
}

export interface ResetPasswordRequest {
  code: string;
  password: string;
}

export interface VerifyCodeRequest {
  code: string;
}

export type ResetPasswordResponse = object;

export interface UpdatePasswordInitialValues {
  currentPassword: string;
  password: string;
  confirmedPassword: string;
}

export interface UpdatePasswordRequest {
  oldPassword: string;
  password: string;
}

export type UpdatePasswordResponse = object;

export interface UpdateUserStatusRequest {
  id: string;
  status: UserStatus;
}
