import { AxiosResponse } from "axios";
import { api } from "../axiosConfig";
import { GetVerificationResponse, VerificationRequest } from "../types/verifications";
import { BaseResponse } from "../types/base";

export const apiVerifications = {
  approveVerification: async function (
    props: VerificationRequest
  ): Promise<AxiosResponse> {
    return api.post(`/verifications/${props.query.requestID}/aprove`);
  },

  declineVerification: async function (
    props: VerificationRequest
  ): Promise<AxiosResponse> {
    return api.post(`/verifications/${props.query.requestID}/deny`);
  },

  getVerification: async function (
    props: VerificationRequest
  ): Promise<AxiosResponse<BaseResponse<GetVerificationResponse>>> {
    return api.get(`/verifications/${props.query.requestID}`);
  },
};
