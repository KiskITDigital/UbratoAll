import { BaseRequest, BaseTableRequest } from "./base";
import { City, ObjectItem, Service } from "./catalog";
import { Tender } from "./tenders";
import { Verification } from "./verifications";

export type Organization = {
  id: number;
  brand_name: string;
  full_name: string;
  short_name: string;
  inn: string;
  okpo: string;
  ogrn: string;
  kpp: string;
  tax_code: string;
  address: string;
  avatar_url: string;
  emails: {
    contact: string;
    info: string;
  }[];
  phones: {
    contact: string;
    info: string;
  }[];
  messengers: {
    contact: string;
    info: string;
  }[];
  verification_status: string;
  is_contractor: boolean;
  is_banned: boolean;
  customer_info: {
    description: string;
    cities: City[];
  };
  contractor_info: {
    description: string;
    cities: City[];
    services: Service[];
    objects: ObjectItem[];
  };
  created_at: string;
  updated_at: string;
};

export type GetOrganizationsRequest = BaseRequest<
  undefined,
  { verified?: boolean } & BaseTableRequest,
  undefined
>;
export type GetOrganizationsResponse = {
  organizations: Organization[];
};

export type GetOrganizationRequest = BaseRequest<
  { organizationID: number },
  undefined,
  undefined
>;
export type GetOrganizationResponse = Organization;

export type GetOrganizationTendersRequest = BaseRequest<
  { organizationID: number },
  undefined,
  undefined
>;
export type GetOrganizationTendersResponse = Tender[];

export type GetOrganizationVerificationsRequest = BaseRequest<
  { organizationID: number },
  undefined,
  undefined
>;
export type GetOrganizationVerificationsResponse = Verification[];

export type SendVerificationRequest = BaseRequest<
  { organizationID: number },
  {
    egrul: string;
    company_card: string;
    authority_proof: string;
    company_constitution: string;
  },
  undefined
>;
