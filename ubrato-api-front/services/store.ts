import { AxiosResponse } from "axios";
import { apiStore } from "@/axiosConfig";
import { BaseResponse } from "../types/base";
import {
  UploadFileRequest,
  UploadFileResponse,
  FileInfoRequest,
} from "../types/store";

export const apiFiles = {
  uploadFile: async function (
    props: UploadFileRequest,
  ): Promise<AxiosResponse<BaseResponse<UploadFileResponse>>> {
    return apiStore.post("/upload", props.body, {
      params: props.params,
    });
  },

  fileInfo: async function (props: FileInfoRequest): Promise<AxiosResponse> {
    return apiStore.head(`/file/${props.query.id}`);
  },
};
