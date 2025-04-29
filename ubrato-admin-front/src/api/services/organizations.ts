import { AxiosResponse } from "axios";
import { api } from "../axiosConfig";
import { BaseResponse, BaseTableResponse } from "../types/base";
import {
  GetOrganizationRequest,
  GetOrganizationResponse,
  GetOrganizationsRequest,
  GetOrganizationsResponse,
  GetOrganizationTendersRequest,
  GetOrganizationTendersResponse,
  GetOrganizationVerificationsRequest,
  GetOrganizationVerificationsResponse,
  SendVerificationRequest,
} from "../types/organizations";
import {
  GetVerificationsRequest,
  GetVerificationsResponse,
} from "../types/verifications";

export const apiOrganizations = {
  getOrganizations: async function (
    props: GetOrganizationsRequest,
  ): Promise<AxiosResponse<BaseTableResponse<GetOrganizationsResponse>>> {
    return api.get("/organizations", { params: props.params });
  },

  getOrganization: async function (
    props: GetOrganizationRequest,
  ): Promise<AxiosResponse<BaseResponse<GetOrganizationResponse>>> {
    return api.get(`/organizations/${props.query.organizationID}`, {
      params: props.params,
    });
  },

  getOrganizationTenders: async function (
    props: GetOrganizationTendersRequest,
  ): Promise<AxiosResponse<BaseResponse<GetOrganizationTendersResponse>>> {
    return api.get(`/organizations/${props.query.organizationID}/tenders`);
  },

  getVerifications: async function (
    props: GetVerificationsRequest,
  ): Promise<AxiosResponse<BaseResponse<GetVerificationsResponse>>> {
    return api.get("/organizations/verifications", { params: props.params });
  },

  getOrganizationVerifications: async function (
    props: GetOrganizationVerificationsRequest,
  ): Promise<
    AxiosResponse<BaseResponse<GetOrganizationVerificationsResponse>>
  > {
    return api.get(
      `/organizations/${props.query.organizationID}/verifications`,
    );
  },

  sendVerification: async function (
    props: SendVerificationRequest,
  ): Promise<
    AxiosResponse<BaseResponse<GetOrganizationVerificationsResponse>>
  > {
    return api.post(
      `/organizations/${props.query.organizationID}/verifications`,
      props.body,
    );
  },
};
