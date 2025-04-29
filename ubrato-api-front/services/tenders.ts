import { AxiosResponse } from "axios";
import { api } from "@/axiosConfig";
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
  GetQAResponse,
  GetQARequest,
  SendQARequest,
  GetRespondsResponse,
  RespondsRequest,
  GetAdditionsResponse,
  GetAdditionsRequest,
  SendAdditionsRequest,
  SendWinnersRequest,
  SendWinnersResponse,
  GetWInnersReqest,
  GetWinnersResponse,
} from "../types/tenders";

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

  updateTender: async function (
    props: UpdateTenderRequest
  ): Promise<AxiosResponse<BaseResponse<UpdateTenderResponse>>> {
    return api.put(`/tenders/${props.query.tenderID}`, props.body);
  },

  sendComment: async function (props: SendCommentRequest): Promise<AxiosResponse> {
    return api.post(`/tenders/${props.query.tenderID}/comments`, props.body);
  },

  getComments: async function (
    props: GetCommentsRequest
  ): Promise<AxiosResponse<BaseResponse<GetCommentsResponse>>> {
    return api.get(`/tenders/${props.query.tenderID}/comments`, props.body);
  },

  sendRespond: async function (props: RespondRequest): Promise<AxiosResponse> {
    return api.post(`/tenders/${props.query.tenderID}/respond`, props.body);
  },

  getResponds: async function (
    props: RespondsRequest
  ): Promise<AxiosResponse<BaseTableResponse<GetRespondsResponse>>> {
    return api.get(`/tenders/${props.query.tenderID}/respond`, props.body);
  },

  sendAdditions: async function (props: SendAdditionsRequest): Promise<AxiosResponse> {
    return api.post(`/tenders/${props.query.tenderID}/additions`, props.body);
  },

  getAdditions: async function (
    props: GetAdditionsRequest
  ): Promise<AxiosResponse<BaseResponse<GetAdditionsResponse>>> {
    return api.get(`/tenders/${props.query.tenderID}/additions`);
  },

  postQA: async function (props: SendQARequest): Promise<AxiosResponse> {
    return api.post(`/tenders/${props.query.tenderID}/question-answer`, props.body, {
      params: props.params,
    });
  },

  getQA: async function (props: GetQARequest): Promise<AxiosResponse<BaseResponse<GetQAResponse>>> {
    return api.get(`/tenders/${props.query.tenderID}/question-answer`);
  },

  sendWinners: async function (
    props: SendWinnersRequest
  ): Promise<AxiosResponse<BaseResponse<SendWinnersResponse>>> {
    return api.post(`/tenders/${props.query.tenderID}/winners`, undefined, {
      params: props.params,
    });
  },

  getWinners: async function (
    props: GetWInnersReqest
  ): Promise<AxiosResponse<BaseResponse<GetWinnersResponse>>> {
    return api.get(`/tenders/${props.query.tenderID}/winners`);
  },
};
