import { BaseRequest } from "./base";

export type SendResultsRequest = BaseRequest<
  { organizationID: number },
  undefined,
  {
    answers: {
      answer: string[];
      comment: string;
    }[];
    is_completed: boolean;
  }
>;

export type GetQustianareStatusRequest = BaseRequest<
  { organizationID: number },
  undefined,
  undefined
>;

export type GetQustianareStatusResponse = {
  is_completed: boolean;
};
