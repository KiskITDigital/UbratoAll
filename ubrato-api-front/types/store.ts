import { BaseRequest } from "./base";

export type UploadFileRequest = BaseRequest<
  undefined,
  { is_private: boolean },
  { file: File }
>;

export type UploadFileResponse = {
  key: string;
};

export type FileInfoRequest = BaseRequest<{ id: string }, undefined, undefined>;
