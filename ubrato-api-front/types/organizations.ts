import { BaseRequest, BaseTableRequest } from "./base";
import { Tender } from "./tenders";

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
  created_at: string;
  updated_at: string;
};

export type GetOrganizationsRequest = BaseRequest<
  undefined,
  { verified?: boolean } & BaseTableRequest,
  undefined
>;
export type GetOrganizationsResponse = Organization[];

export type GetOrganizationRequest = BaseRequest<{ organizationID: number }, undefined, undefined>;
export type GetOrganizationResponse = Organization;

export type GetOrganizationTendersRequest = BaseRequest<
  { organizationID: number },
  undefined,
  undefined
>;
export type GetOrganizationTendersResponse = Tender[];
export type GetContractorsReqest = BaseRequest<undefined, BaseTableRequest, undefined>;

export type GetContractorsResponse = GetContractorProfileResponse[];

export type UpdateBrandRequest = BaseRequest<
  { organizationID: number },
  undefined,
  {
    brand: string;
    avatar_url: string;
  }
>;

export type UpdateContactsRequest = BaseRequest<
  { organizationID: number },
  undefined,
  {
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
  }
>;

export type UpdateCustomeProfileRequest = BaseRequest<
  { organizationID: number },
  undefined,
  { description: string; city_ids: number[] }
>;

export type GetCustomeProfileRequest = BaseRequest<
  { organizationID: number },
  undefined,
  undefined
>;

export type CustomerProfile = {
  description: string;
  cities: {
    id: number;
    name: string;
    region: {
      id: number;
      name: string;
    };
  }[];
};

export type GetCustomeProfileResponse = {
  organization: Organization;
  profile: CustomerProfile;
};

export type UpdateCustomerProfileResponse = GetCustomeProfileResponse;

export type UpdateContractorProfileRequest = BaseRequest<
  {
    organizationID: number;
  },
  undefined,
  {
    description: string;
    city_ids: number[];
    services: {
      service_id: number;
      measure_id: number;
      price: number;
    }[];
    objects_ids: number[];
  }
>;

export type UpdateContractorProfileResponse = GetContractorProfileResponse;

export type GetContractorProfileRequest = BaseRequest<
  { organizationID: number },
  undefined,
  undefined
>;

export type ContractorProfile = {
  description?: string;
  cities?: {
    id: number;
    name: string;
    region: {
      id: number;
      name: string;
    };
  }[];
  services?: {
    service: { id: number; parent_id: number; name: string };
    measure: {
      id: number;
      name: string;
    };
    price: number;
  }[];
  objects?: {
    id: number;
    parent_id: number;
    name: string;
  }[];
};

export type GetContractorProfileResponse = {
  organization: Organization;
  profile: ContractorProfile;
};

export type GetMyTendersRequest = BaseRequest<
  { organizationID: number },
  BaseTableRequest,
  undefined
>;

export type GetMyTendersResponse = Tender[];

export type SendPortfolioRequest = BaseRequest<
  {
    organizationID: number;
  },
  undefined,
  {
    title: string;
    description: string;
    attachments: string[];
  }
>;

export type Portfolio = {
  id: number;
  title: string;
  description: string;
  attachments: string[];
  created_at: string;
  updated_at: string;
};

export type GetPortfolioResponse = Portfolio[];

export type SendPortfolioResponse = Portfolio;

export type GetPortfolioRequest = BaseRequest<{ organizationID: number }, undefined, undefined>;

export type UpdatePortfolioRequest = BaseRequest<
  { portfolioID: number },
  undefined,
  { title: string; description: string; attachments: string[] }
>;

export type UpdatePortfolioResponse = Portfolio;

export type DeletePortfolioRequest = BaseRequest<{ portfolioID: number }, undefined, undefined>;

export type AddToFavouritesRequest = BaseRequest<
  { organizationID: number },
  { object_type: "organization" | "tender" },
  {
    object_id: number;
  }
>;

export type RemoveFromFavouritesRequest = BaseRequest<
  { favouriteID: number },
  undefined,
  undefined
>;

export type GetFavouritesRequest = BaseRequest<
  { organizationID: number },
  { object_type: "organization" | "tender" } & BaseTableRequest,
  undefined
>;

export type GetFavouritesResponse = {
  id: number;
  object_type: "organization" | "tender";
  object: { organization: Organization; profile: ContractorProfile } | Tender;
}[];

export type AddToFavouritesResponse = {
  id: number;
};
