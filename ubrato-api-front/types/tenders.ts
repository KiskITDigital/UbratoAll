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
  verification_status: VerificationStatuses;
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

export type GetTenderRequest = BaseRequest<{ tenderID: number }, undefined, undefined>;
export type GetTenderResponse = Tender;

export type CreateTenderProps = {
  name: string;
  city: number;
  price: number;
  is_contract_price: boolean;
  is_nds_price: boolean;
  floor_space: number;
  description?: string;
  wishes?: string;
  specification?: string;
  attachments?: string[];
  services: number[];
  objects: number[];
  is_draft?: boolean;
  reception_start: string;
  reception_end: string;
  work_start: string;
  work_end: string;
};

export type CreateTenderRequest = BaseRequest<undefined, undefined, CreateTenderProps>;
export type CreateTenderResponse = Tender;

export type UpdateTenderRequest = BaseRequest<{ tenderID: number }, undefined, TenderProps>;
export type UpdateTenderResponse = Tender;

export type SendCommentRequest = BaseRequest<{ tenderID: number }, undefined, CommentProps>;

export type GetCommentsRequest = BaseRequest<{ tenderID: number }, undefined, undefined>;

export type GetCommentsResponse = Comment[];

export type RespondRequest = BaseRequest<
  { tenderID: number },
  undefined,
  {
    price: number;
    is_nds: boolean;
  }
>;

export type RespondsRequest = BaseRequest<{ tenderID: number }, BaseTableRequest, undefined>;

export type Respond = {
  tender_id: number;
  organization_id: number;
  price: number;
  is_nds_price: boolean;
  created_at: string;
};

export type GetRespondsResponse = Respond[];

export type SendAdditionsRequest = BaseRequest<
  { tenderID: number },
  undefined,
  {
    title: string;
    content: string;
    attachments: string[];
  }
>;

export type GetAdditionsRequest = BaseRequest<{ tenderID: number }, undefined, undefined>;

export type Addition = {
  id: number;
  tender_id: number;
  title: string;
  content: string;
  attachments: string[];
  verification_status: string;
  created_at: string;
};

export type GetAdditionsResponse = Addition[];

export type QAObject = {
  id: number;
  parent_id: number;
  type: string;
  content: string;
};

export type QA = {
  question: QAObject;
  answer?: QAObject;
};

export type SendQARequest = BaseRequest<
  { tenderID: number },
  { type: "invalid" | "question" | "answer" },
  {
    parent_id?: number;
    content: string;
  }
>;

export type GetQARequest = BaseRequest<{ tenderID: number }, undefined, undefined>;

export type GetQAResponse = QA[];

export type SendWinnersRequest = BaseRequest<
  { tenderID: number },
  { organizationID: number },
  undefined
>;

export type SendWinnersResponse = {
  id: number;
  organization: Organization;
  tender_id: number;
  accepted: string;
};

export type GetWInnersReqest = BaseRequest<{ tenderID: number }, undefined, undefined>;

export type GetWinnersResponse = SendWinnersResponse[];
