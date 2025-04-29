import { AxiosResponse } from "axios";
import { api } from "../axiosConfig";
import { BaseResponse, BaseTableResponse } from "../types/base";
import {
  CreateTenderRequest,
  CreateTenderResponse,
  GetTenderRequest,
  GetTenderResponse,
  GetTendersRequest,
  GetTendersResponse,
  UpdateTenderRequest,
  UpdateTenderResponse,
  SendCommentRequest,
  GetCommentsRequest,
  GetCommentsResponse,
  RespondRequest,
} from "../types/tenders";
import {
  GetVerificationsRequest,
  GetVerificationsResponse,
} from "../types/verifications";

export const apiTenders = {
  getTenders: async function (
    props: GetTendersRequest
  ): Promise<AxiosResponse<BaseTableResponse<GetTendersResponse>>> {
    return api.get("/tenders", { params: props.params });
  },

  createTender: async function (
    props: CreateTenderRequest
  ): Promise<AxiosResponse<BaseResponse<CreateTenderResponse>>> {
    return api.post("/tenders", props.body);
  },

  getTender: async function (
    props: GetTenderRequest
  ): Promise<AxiosResponse<BaseResponse<GetTenderResponse>>> {
    return api.get(`/tenders/${props.query.tenderID}`);
  },

  getVerifications: async function (
    props: GetVerificationsRequest
  ): Promise<AxiosResponse<BaseResponse<GetVerificationsResponse>>> {
    return api.get("/tenders/verifications", { params: props.params });
  },

  updateTender: async function (
    props: UpdateTenderRequest
  ): Promise<AxiosResponse<BaseResponse<UpdateTenderResponse>>> {
    return api.put(`/tenders/${props.query.tenderID}`, props.body);
  },

  sendComment: async function (
    props: SendCommentRequest
  ): Promise<AxiosResponse> {
    return api.post(`/tenders/${props.query.tenderID}/comments`, props.body);
  },

  getComments: async function (
    props: GetCommentsRequest
  ): Promise<AxiosResponse<BaseResponse<GetCommentsResponse>>> {
    return api.get(`/tenders/${props.query.tenderID}/comments`, props.body);
  },

  respond: async function (props: RespondRequest): Promise<AxiosResponse> {
    return api.post(`/tenders/${props.query.tenderID}/respond`, props.body);
  },
};
