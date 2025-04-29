import axios, { AxiosResponse } from "axios";
import { api } from "../axiosConfig";
import { BaseResponse } from "../types/base";

import {
  GetUserResponse,
  RefreshResponse,
  SigninRequest,
  SigninResponse,
  SignupRequest,
  SignupResponse,
} from "../types/auth";

export const apiAuth = {
  signup: async function (
    props: SignupRequest,
  ): Promise<AxiosResponse<BaseResponse<SignupResponse>>> {
    return api.post("/auth/signup", props.body);
  },

  signin: async function (
    props: SigninRequest,
  ): Promise<AxiosResponse<BaseResponse<SigninResponse>>> {
    return api.post("/auth/signin", props.body);
  },

  getUser: async function (): Promise<
    AxiosResponse<BaseResponse<GetUserResponse>>
  > {
    return api.get("/auth/user");
  },

  refresh: async function (): Promise<
    AxiosResponse<BaseResponse<RefreshResponse>>
  > {
    return axios.post(`${api.getUri()}/auth/refresh`, undefined, {
      withCredentials: true,
    });
  },
};
