import { api } from "../axiosConfig";
import { AxiosResponse } from "axios";
import { BaseResponse } from "../types/base";
import {
  CreateEmployeeRequest,
  CreateEmployeeResponse,
} from "../types/employee";

export const apiEmployee = {
  createEmployee: async function (
    props: CreateEmployeeRequest,
  ): Promise<AxiosResponse<BaseResponse<CreateEmployeeResponse>>> {
    return api.post("/employee", props.body);
  },
};
