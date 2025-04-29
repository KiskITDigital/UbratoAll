import { axiosInstance } from '@/utils';

export const isResponded = async (token: string | null, id: string | undefined) => {
  const res = await axiosInstance.get(
    `/v1/tenders/tender/${id}/is_respond`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};
      