import { AxiosResponse } from "axios";
import { BaseResponse } from "../types/base";
import { api } from "../axiosConfig";
import { GetVerificationsRequest, Verification } from "../types/verifications";

export const apiSuggest = {
  getCompany: async function (
    props: GetVerificationsRequest
  ): Promise<AxiosResponse<BaseResponse<Verification[]>>> {
    return api.get(`/suggest/company`, { params: props.params });
  },
};
