import { AxiosResponse } from "axios";
import { api } from "@/axiosConfig";
import {
  ApproveVerificationRequest,
  DeclineVerificationRequest,
  GetOrganizationVerificationsRequest,
  GetOrganizationVerificationsResponse,
  GetVerificationResponse,
  GetVerificationsRequest,
  GetVerificationsResponse,
  SendOrganizationVerificationRequest,
  VerificationRequest,
} from "../types/verifications";
import { BaseResponse, BaseTableResponse } from "../types/base";

export const apiVerifications = {
  approveVerification: async function (
    props: ApproveVerificationRequest,
  ): Promise<AxiosResponse> {
    return api.post(`/verifications/${props.query.requestID}/aprove`);
  },

  declineVerification: async function (
    props: DeclineVerificationRequest,
  ): Promise<AxiosResponse> {
    return api.post(`/verifications/${props.query.requestID}/deny`);
  },

  getVerification: async function (
    props: VerificationRequest,
  ): Promise<AxiosResponse<BaseResponse<GetVerificationResponse>>> {
    return api.get(`/verifications/${props.query.requestID}`);
  },

  // Organization Verifications

  getOrganizationVerifications: async function (
    props: GetVerificationsRequest,
  ): Promise<AxiosResponse<BaseTableResponse<GetVerificationsResponse>>> {
    return api.get("/verifications/organizations", { params: props.params });
  },

  getOrganizationVerification: async function (
    props: GetOrganizationVerificationsRequest,
  ): Promise<
    AxiosResponse<BaseResponse<GetOrganizationVerificationsResponse>>
  > {
    return api.get(
      `/verifications/organizations/${props.query.organizationID}`,
    );
  },

  sendOrganizationVerification: async function (
    props: SendOrganizationVerificationRequest,
  ): Promise<
    AxiosResponse<BaseResponse<GetOrganizationVerificationsResponse>>
  > {
    return api.post(
      `/verifications/organizations/${props.query.organizationID}`,
      props.body,
    );
  },

  // Tenders Verifications

  getTendersVerifications: async function (
    props: GetVerificationsRequest,
  ): Promise<AxiosResponse<BaseTableResponse<GetVerificationsResponse>>> {
    return api.get("/verifications/tenders", { params: props.params });
  },

  // Additions Verifications

  getAdditionsVerifications: async function (
    props: GetVerificationsRequest,
  ): Promise<AxiosResponse<BaseTableResponse<GetVerificationsResponse>>> {
    return api.get("/verifications/additions", { params: props.params });
  },

  // QA Verifications

  getQAVerifications: async function (
    props: GetVerificationsRequest,
  ): Promise<AxiosResponse<BaseTableResponse<GetVerificationsResponse>>> {
    return api.get("/verifications/question-answer", { params: props.params });
  },
};
