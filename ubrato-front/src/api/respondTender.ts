import { axiosInstance } from '@/utils';

export const sendResponse: (token: string, id: string, price: number) => Promise<number> = async (
  token,
  id,
  price
) => {
  const res = await axiosInstance.post(
    `/v1/tenders/tender/${id}/respond`,
    {
        "price": price
    },
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  return res.status;
};
