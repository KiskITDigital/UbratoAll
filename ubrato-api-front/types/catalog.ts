import { BaseRequest, BaseTableRequest } from "./base";

export type Service = {
  id: number;
  parent_id?: number;
  name: string;
};

export type GetServicesRequest = BaseRequest<
  undefined,
  BaseTableRequest,
  undefined
>;

export type GetServicesResponse = Service[];

export type ObjectItem = Service;

export type GetObjectsRequest = BaseRequest<
  undefined,
  BaseTableRequest,
  undefined
>;

export type GetObjectsResponse = ObjectItem[];

export type CreateServiceRequest = BaseRequest<
  undefined,
  undefined,
  {
    name: string;
    parent_id?: number;
  }
>;
export type CreateServiceResponse = Service[];
export type CreateObjectRequest = BaseRequest<
  undefined,
  undefined,
  {
    name: string;
    parent_id?: number;
  }
>;
export type CreateObjectResponse = ObjectItem[];

type Region = {
  id: number;
  name: string;
};

export type AddCityRequest = BaseRequest<
  undefined,
  undefined,
  {
    name: string;
    region_id: number;
  }
>;

export type City = {
  id: number;
  name: string;
  region?: Region;
};

export type AddCityResponse = {
  city: City;
};
export type AddRegionRequest = BaseRequest;
export type AddRegionResponse = Region;

export type GetMeasurementsResponse = { id: number; name: string }[];
