import { axiosInstance } from '@/utils';

export const surveyCheck: (token: string) => Promise<boolean> = async (token: string) => {
  const res = await axiosInstance.get('/v1/users/me/pass-questionnaire', {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  if (res.status !== 200) throw res;
  return res.data.status as boolean;
};
