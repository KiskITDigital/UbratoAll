import { BaseRequest, BaseTableRequest } from "./base";
import { City, ObjectItem, Service } from "./catalog";
import { CommentProps, Comment } from "./comments";
import { Organization } from "./organizations";
import { VerificationStatuses } from "./verifications";

export type TenderProps = {
  name: string;
  city: City;
  price: number;
  is_contract_price: boolean;
  is_nds_price: boolean;
  floor_space: number;
  description: string;
  wishes: string;
  specification?: string;
  attachments?: string[];
  services: Service[];
  objects: ObjectItem[];
  is_draft: boolean;
  verification_status: VerificationStatuses
  reception_start: string;
  reception_end: string;
  work_start: string;
  work_end: string;
};

export type Tender = {
  id: number;
  organization: Organization;
  winner_organization: Organization;
  created_at: string;
  updated_at: string;
} & TenderProps;

export type GetTendersRequest = BaseRequest<
  undefined,
  {
    verified?: boolean;
  } & BaseTableRequest,
  undefined
>;
export type GetTendersResponse = Tender[];

export type GetTenderRequest = BaseRequest<
  { tenderID: number },
  undefined,
  undefined
>;
export type GetTenderResponse = Tender;

export type CreateTenderRequest = BaseRequest<
  undefined,
  undefined,
  TenderProps
>;
export type CreateTenderResponse = Tender;

export type UpdateTenderRequest = BaseRequest<
  { tenderID: number },
  undefined,
  TenderProps
>;
export type UpdateTenderResponse = Tender;

export type SendCommentRequest = BaseRequest<
  { tenderID: number },
  undefined,
  CommentProps
>;

export type GetCommentsRequest = BaseRequest<
  { tenderID: number },
  undefined,
  undefined
>;
export type GetCommentsResponse = Comment[];

export type RespondRequest = BaseRequest<
  { tenderID: number },
  undefined,
  {
    price: number;
    is_nds: boolean;
  }
>;
