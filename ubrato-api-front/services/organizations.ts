import { AxiosResponse } from "axios";
import { api } from "@/axiosConfig";
import { BaseResponse, BaseTableResponse } from "../types/base";
import {
  AddToFavouritesRequest,
  AddToFavouritesResponse,
  DeletePortfolioRequest,
  GetContractorProfileRequest,
  GetContractorProfileResponse,
  GetContractorsReqest,
  GetContractorsResponse,
  GetCustomeProfileRequest,
  GetCustomeProfileResponse,
  GetFavouritesRequest,
  GetFavouritesResponse,
  GetMyTendersRequest,
  GetMyTendersResponse,
  GetOrganizationRequest,
  GetOrganizationResponse,
  GetOrganizationsRequest,
  GetOrganizationsResponse,
  GetOrganizationTendersRequest,
  GetOrganizationTendersResponse,
  GetPortfolioRequest,
  GetPortfolioResponse,
  RemoveFromFavouritesRequest,
  SendPortfolioRequest,
  SendPortfolioResponse,
  UpdateBrandRequest,
  UpdateContactsRequest,
  UpdateContractorProfileRequest,
  UpdateContractorProfileResponse,
  UpdateCustomeProfileRequest,
  UpdateCustomerProfileResponse,
  UpdatePortfolioRequest,
  UpdatePortfolioResponse,
} from "../types/organizations";
import {
  GetVerificationsRequest,
  GetVerificationsResponse,
} from "../types/verifications";

export const apiOrganizations = {
  getOrganizations: async function (
    props: GetOrganizationsRequest,
  ): Promise<AxiosResponse<BaseTableResponse<GetOrganizationsResponse>>> {
    return api.get("/organizations", { params: props.params });
  },

  getOrganization: async function (
    props: GetOrganizationRequest,
  ): Promise<AxiosResponse<BaseResponse<GetOrganizationResponse>>> {
    return api.get(`/organizations/${props.query.organizationID}`, {
      params: props.params,
    });
  },

  getOrganizationTenders: async function (
    props: GetOrganizationTendersRequest,
  ): Promise<AxiosResponse<BaseResponse<GetOrganizationTendersResponse>>> {
    return api.get(`/organizations/${props.query.organizationID}/tenders`);
  },

  getVerifications: async function (
    props: GetVerificationsRequest,
  ): Promise<AxiosResponse<BaseResponse<GetVerificationsResponse>>> {
    return api.get("/organizations/verifications", {
      params: props.params,
      paramsSerializer: { indexes: null },
    });
  },

  getContractors: async function (
    props: GetContractorsReqest,
  ): Promise<AxiosResponse<BaseTableResponse<GetContractorsResponse>>> {
    return api.get("/organizations/contractors", { params: props.params });
  },

  updateBrand: async function (
    props: UpdateBrandRequest,
  ): Promise<AxiosResponse> {
    return api.put(
      `/organizations/${props.query.organizationID}/profile/brand`,
      props.body,
    );
  },

  updateContacts: async function (
    props: UpdateContactsRequest,
  ): Promise<AxiosResponse> {
    return api.put(
      `/organizations/${props.query.organizationID}/profile/contacts`,
      props.body,
    );
  },

  updateCustomerProfile: async function (
    props: UpdateCustomeProfileRequest,
  ): Promise<AxiosResponse<BaseResponse<UpdateCustomerProfileResponse>>> {
    return api.put(
      `/organizations/${props.query.organizationID}/profile/customer`,
      props.body,
    );
  },

  updateContractorProfile: async function (
    props: UpdateContractorProfileRequest,
  ): Promise<AxiosResponse<BaseResponse<UpdateContractorProfileResponse>>> {
    return api.put(
      `/organizations/${props.query.organizationID}/profile/contractor`,
      props.body,
    );
  },

  getCustomeProfile: async function (
    props: GetCustomeProfileRequest,
  ): Promise<AxiosResponse<BaseResponse<GetCustomeProfileResponse>>> {
    return api.get(
      `/organizations/${props.query.organizationID}/profile/customer`,
    );
  },

  getContractorProfile: async function (
    props: GetContractorProfileRequest,
  ): Promise<AxiosResponse<BaseResponse<GetContractorProfileResponse>>> {
    return api.get(
      `/organizations/${props.query.organizationID}/profile/contractor`,
    );
  },

  getMyTenders: async function (
    props: GetMyTendersRequest,
  ): Promise<AxiosResponse<BaseTableResponse<GetMyTendersResponse>>> {
    return api.get(`/organizations/${props.query.organizationID}/tenders`, {
      params: props.params,
    });
  },

  sendPortfolio: async function (
    props: SendPortfolioRequest,
  ): Promise<AxiosResponse<BaseResponse<SendPortfolioResponse>>> {
    return api.post(
      `/organizations/${props.query.organizationID}/portfolio`,
      props.body,
    );
  },

  getPortfolio: async function (
    props: GetPortfolioRequest,
  ): Promise<AxiosResponse<BaseResponse<GetPortfolioResponse>>> {
    return api.get(`/organizations/${props.query.organizationID}/portfolio`);
  },

  updatePortfolio: async function (
    props: UpdatePortfolioRequest,
  ): Promise<AxiosResponse<BaseResponse<UpdatePortfolioResponse>>> {
    return api.put(
      `/organizations/portfolio/${props.query.portfolioID}`,
      props.body,
    );
  },

  deletePortfolio: async function (
    props: DeletePortfolioRequest,
  ): Promise<AxiosResponse> {
    return api.delete(`/organizations/portfolio/${props.query.portfolioID}`);
  },

  addToFavourites: async function (
    props: AddToFavouritesRequest,
  ): Promise<AxiosResponse<AddToFavouritesResponse>> {
    return api.post(
      `/organizations/${props.query.organizationID}/favourites`,
      props.body,
      {
        params: props.params,
      },
    );
  },

  removeFromFavourites: async function (
    props: RemoveFromFavouritesRequest,
  ): Promise<AxiosResponse> {
    return api.delete(`/organizations/favourites/${props.query.favouriteID}`);
  },

  getFavourites: async function (
    props: GetFavouritesRequest,
  ): Promise<AxiosResponse<BaseTableResponse<GetFavouritesResponse>>> {
    return api.get(`/organizations/${props.query.organizationID}/favourites`, {
      params: props.params,
    });
  },
};
