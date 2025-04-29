import { AxiosResponse } from "axios";
import { api } from "@/axiosConfig";
import { BaseResponse } from "../types/base";
import {
  AddCityRequest,
  AddCityResponse,
  AddRegionRequest,
  AddRegionResponse,
  CreateObjectRequest,
  CreateObjectResponse,
  CreateServiceRequest,
  CreateServiceResponse,
  GetMeasurementsResponse,
  GetObjectsRequest,
  GetObjectsResponse,
  GetServicesRequest,
  GetServicesResponse,
} from "../types/catalog";

export const apiCatalog = {
  getServices: async function (
    props: GetServicesRequest
  ): Promise<AxiosResponse<BaseResponse<GetServicesResponse>>> {
    return api.get("/catalog/services", { params: props.params });
  },

  getObjects: async function (
    props: GetObjectsRequest
  ): Promise<AxiosResponse<BaseResponse<GetObjectsResponse>>> {
    return api.get("/catalog/objects", { params: props.params });
  },

  createService: async function (
    props: CreateServiceRequest
  ): Promise<AxiosResponse<BaseResponse<CreateServiceResponse>>> {
    return api.post("/catalog/services", props.body);
  },

  createObject: async function (
    props: CreateObjectRequest
  ): Promise<AxiosResponse<BaseResponse<CreateObjectResponse>>> {
    return api.post("/catalog/objects", props.body);
  },

  addCity: async function (
    props: AddCityRequest
  ): Promise<AxiosResponse<BaseResponse<AddCityResponse>>> {
    return api.post("/catalog/services", props.body);
  },

  addRegion: async function (
    props: AddRegionRequest
  ): Promise<AxiosResponse<BaseResponse<AddRegionResponse>>> {
    return api.post("/catalog/objects", props.body);
  },

  getMeasurements: async function (): Promise<
    AxiosResponse<BaseResponse<GetMeasurementsResponse>>
  > {
    return api.get("/catalog/measurements");
  },
};
