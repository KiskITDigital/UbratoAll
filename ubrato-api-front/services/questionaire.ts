import { AxiosResponse } from "axios";
import { api } from "@/axiosConfig";
import { BaseResponse } from "../types/base";
import {
  SendResultsRequest,
  GetQustianareStatusRequest,
  GetQustianareStatusResponse,
} from "../types/questionaire";

export const apiQestionnaire = {
  sendResults: async function (
    props: SendResultsRequest,
  ): Promise<AxiosResponse> {
    return api.post(`/questionnaire/${props.query.organizationID}`, props.body);
  },

  getQustianareStatus: async function (
    props: GetQustianareStatusRequest,
  ): Promise<AxiosResponse<BaseResponse<GetQustianareStatusResponse>>> {
    return api.get(`/questionnaire/${props.query.organizationID}/status`);
  },
};
