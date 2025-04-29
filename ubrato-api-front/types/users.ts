import { BaseRequest, BaseTableRequest } from "./base";
import { Employee } from "./employee";
import { Organization } from "./organizations";

export type User = {
  id: number;
  organization: Organization;
  email: string;
  phone: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  avatar_url?: string;
  email_verified: boolean;
  role: string;
  is_banned: boolean;
  created_at: string;
  updated_at: string;
};

export type GetUsersRequest = BaseRequest<
  undefined,
  {
    role?: "user" | "employee" | "admin" | "super_admin";
  } & BaseTableRequest,
  undefined
>;
export type GetUsersResponse = (User | Employee)[];
export type GetUserRequest = BaseRequest<
  { userID: number },
  undefined,
  undefined
>;
export type GetUserResponse = User;
export type VerifyEmailRequest = BaseRequest<
  undefined,
  undefined,
  { email: string }
>;
export type ResetPasswordRequest = BaseRequest<
  undefined,
  undefined,
  { email: string }
>;
export type ConfirmEmailRequest = BaseRequest<
  undefined,
  undefined,
  {
    user_id?: number;
    code: string;
  }
>;
export type ConfirmResetPasswordRequest = BaseRequest<
  undefined,
  undefined,
  {
    user_id?: number;
    code: string;
    password: string;
  }
>;

export type UpdateUserRequest = BaseRequest<
  { userID: number },
  undefined,
  {
    first_name?: string;
    last_name?: string;
    middle_name?: string;
    phone?: string;
    avatar_url?: string;
  }
>;
