import { BaseRequest } from "./base";

export type RespondToSurveyRequest = BaseRequest<
  undefined,
  undefined,
  {
    name: string;
    type:
      | "SURVEY_TYPE_REGISTRATION"
      | "SURVEY_TYPE_VERIFICATION"
      | "SURVEY_TYPE_FEEDBACK";
    phone: string;
    question: string;
  }
>;
