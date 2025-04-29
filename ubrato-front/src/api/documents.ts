import { axiosInstance } from '@/utils';
import { axiosInstanceStore } from '@/utils/baseHttp';

export const fetchDocumentsTypes = async (): Promise<[{ id: number; name: string }]> => {
  const res = await axiosInstance.get<[{ id: number; name: string }]>(
    '/v1/verification/docs/types'
  );
  return res.data;
};

export const sendDoc = async (
  token: string,
  parameters: { link: string; type: number }
): Promise<string> => {
  const res = await axiosInstance.post<{ id: string }>('/v1/verification/docs', parameters, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  // console.log(res);
  return res.data.id;
};

export const fetchUserDocs = async (token: string) => {
  const res = await axiosInstance.get<{ id: string; link: string; type: string }[]>(
    '/v1/verification/docs',
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  // console.log(res.data)
  return res.data;

};

export const fetchPrivateFile = async (token: string, link: string) => {
  await axiosInstanceStore.get(`/s3${link}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  // console.log(res);
};

export const fetchPrivateFileInfo = async (token: string, link: string) => {
  const res = await axiosInstanceStore.get<{
    name: string;
    format: string;
    size: number;
    ctime: string;
  }>(`/s3${link}/info`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const fetchFileInfo = async (link: string) => {
  const res = await axiosInstanceStore.get<{
    name: string;
    format: string;
    size: number;
    ctime: string;
  }>(`/s3${link}/info`, {});
  return res.data;
};

export const handleFileDelete = async (token: string, id: string) => {
  // console.log(id);
  const res = await axiosInstance.delete<{ status: boolean }>(`/v1/verification/docs/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  // console.log(res);
  return res
};
