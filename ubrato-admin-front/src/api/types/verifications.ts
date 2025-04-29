import { BaseRequest, BaseTableRequest } from "./base";
import { Organization } from "./organizations";
import { Tender } from "./tenders";
import { User } from "./users";
import { Comment } from "./comments";

export type VerificationStatuses =
  | "unverified"
  | "in_review"
  | "declined"
  | "approved";

export type TenderVetification = {
  object_type: "tender";
  object: Tender;
};
export type OrganizationVetification = {
  object_type: "organization";
  object: Organization;
};
export type CommentVetification = {
  object_type: "comment";
  object: Comment;
};

type VerificationType =
  | OrganizationVetification
  | TenderVetification
  | CommentVetification;

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

export type VerificationRequest = BaseRequest<
  { requestID: number },
  undefined,
  undefined
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
