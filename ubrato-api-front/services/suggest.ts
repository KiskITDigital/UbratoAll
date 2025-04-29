import { AxiosResponse } from "axios";
import { BaseResponse } from "../types/base";
import { CityRequest, CityResponse, CompanyRequest, CompanyResponse } from "../types/suggest";
import { api } from "@/axiosConfig";

export const apiSuggest = {
  getCompany: async function (
    props: CompanyRequest,
  ): Promise<AxiosResponse<BaseResponse<CompanyResponse>>> {
    return api.get(`/suggest/company`, { params: props.params });
  },
  
  getCity: async function (
    props: CityRequest,
  ): Promise<AxiosResponse<BaseResponse<CityResponse>>> {
    return api.get(`/suggest/city`, { params: props.params });
  },
};
