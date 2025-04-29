import { AxiosResponse } from "axios";
import { api } from "@/axiosConfig";
import { BaseResponse, BaseTableResponse } from "../types/base";
import {
  GetUsersRequest,
  GetUsersResponse,
  GetUserRequest,
  GetUserResponse,
  VerifyEmailRequest,
  ResetPasswordRequest,
  ConfirmEmailRequest,
  ConfirmResetPasswordRequest,
  UpdateUserRequest,
} from "../types/users";

export const apiUsers = {
  getUsers: async function (
    props: GetUsersRequest,
  ): Promise<AxiosResponse<BaseTableResponse<GetUsersResponse>>> {
    return api.get("/users", { params: props.params });
  },

  getUser: async function (
    props: GetUserRequest,
  ): Promise<AxiosResponse<BaseResponse<GetUserResponse>>> {
    return api.get(`/users/${props.query.userID}`);
  },

  verifyEmail: async function (
    props: VerifyEmailRequest,
  ): Promise<AxiosResponse> {
    return api.post("/users/request/email-verification", props.body);
  },

  resetPassword: async function (
    props: ResetPasswordRequest,
  ): Promise<AxiosResponse> {
    return api.post("/users/request/reset-password", props.body);
  },

  confirmEmail: async function (
    props: ConfirmEmailRequest,
  ): Promise<AxiosResponse> {
    return api.post("/users/confirm/email", props.body);
  },

  confirmResetPassword: async function (
    props: ConfirmResetPasswordRequest,
  ): Promise<AxiosResponse> {
    return api.post("/users/confirm/password", props.body);
  },

  updateUser: async function (
    props: UpdateUserRequest,
  ): Promise<AxiosResponse> {
    return api.put(`/users/${props.query.userID}`, props.body);
  },
};
