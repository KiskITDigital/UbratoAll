import { BaseRequest, BaseTableRequest } from "./base";
import { Organization } from "./organizations";
import { Addition, QA, Tender } from "./tenders";
import { User } from "./users";

export type VerificationStatuses = "unverified" | "in_review" | "declined" | "approved";

export type TenderVetification = {
  object_type: "tender";
  object: Tender;
};
export type OrganizationVetification = {
  object_type: "organization";
  object: Organization;
};
export type AdditionVetification = {
  object_type: "addition";
  object: Addition;
};
export type QAVetification = {
  object_type: "question-answer";
  object: QA;
};

type VerificationType =
  | OrganizationVetification
  | TenderVetification
  | AdditionVetification
  | QAVetification;

export type Verification = {
  id: number;
  reviewer?: User;
  content: string;
  attachments: {
    name: string;
    url: string;
  }[];
  status: VerificationStatuses;
  review_comment?: string;
  created_at: string;
  reviewed_at?: string;
} & VerificationType;

export type VerificationRequest = BaseRequest<{ requestID: number }, undefined, undefined>;

export type ApproveVerificationRequest = BaseRequest<{ requestID: number }, undefined, undefined>;

export type DeclineVerificationRequest = BaseRequest<
  { requestID: number },
  undefined,
  { review_comment: string }
>;

export type GetVerificationsRequest = BaseRequest<
  undefined,
  {
    /**
     * Фильтрует результат по статусам.
     */
    status?: VerificationStatuses;
  } & BaseTableRequest,
  undefined
>;
export type GetVerificationsResponse = Verification[];
export type GetVerificationResponse = Verification;

export type GetOrganizationVerificationsRequest = BaseRequest<
  { organizationID: number },
  undefined,
  undefined
>;
export type GetOrganizationVerificationsResponse = Verification[];

export type SendOrganizationVerificationRequest = BaseRequest<
  { organizationID: number },
  undefined,
  {
    name: string;
    url: string;
  }[]
>;
