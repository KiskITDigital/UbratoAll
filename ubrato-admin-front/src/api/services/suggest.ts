import { AxiosResponse } from "axios";
import { BaseResponse } from "../types/base";
import { CompanyRequest, CompanyResponse } from "../types/suggest";
import { api } from "../axiosConfig";

export const apiSuggest = {
  getCompany: async function (
    props: CompanyRequest
  ): Promise<AxiosResponse<BaseResponse<CompanyResponse>>> {
    return api.get(`/suggest/company`, { params: props.params });
  },
};
