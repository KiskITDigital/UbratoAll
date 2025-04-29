import { AxiosResponse } from "axios";
import { api } from "../axiosConfig";
import { RespondToSurveyRequest } from "../types/survey";

export const apiSurvey = {
  respondToSurvey: async function (
    props: RespondToSurveyRequest
  ): Promise<AxiosResponse> {
    return api.get(`/survey`, { params: props.params });
  },
};
