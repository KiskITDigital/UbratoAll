import { BaseRequest } from "./base";

export type Company = {
  name: string;
};

export type CompanyRequest = BaseRequest<
  undefined,
  {
    inn: string;
  },
  undefined
>;
export type CompanyResponse = Company;

export type city = {
  id: number;
  name: string;
  region: {
    id: number;
    name: string;
  };
};

export type CityResponse = city[];

export type CityRequest = BaseRequest<
  undefined,
  {
    name: string;
  },
  undefined
>;
