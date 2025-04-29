import { axiosInstance } from '@/utils';

export const sendAnswers: (token: string, answers: string[]) => Promise<number> = async (
  token,
  answers
) => {
  const res = await axiosInstance.post(
    '/v1/questionnaire/save',
    { answers: answers },
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
  return res.status;
};
