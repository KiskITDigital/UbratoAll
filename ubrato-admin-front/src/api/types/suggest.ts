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
