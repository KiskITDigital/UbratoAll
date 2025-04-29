import { User } from "./users";
import { BaseRequest } from "./base";

export type SignupRequest = BaseRequest<
  undefined,
  undefined,
  {
    email: string;
    phone: string;
    password: string;
    first_name: string;
    last_name: string;
    middle_name: string;
    avatar_url?: string;
    inn: string;
    is_contractor: boolean;
  }
>;

type AuthResponse = {
  user: User;
  access_token: string;
};

export type SignupResponse = AuthResponse;

export type SigninRequest = BaseRequest<
  undefined,
  undefined,
  {
    email: string;
    password: string;
  }
>;

export type SigninResponse = AuthResponse;

export type GetUserResponse = User;

export type RefreshResponse = AuthResponse;
