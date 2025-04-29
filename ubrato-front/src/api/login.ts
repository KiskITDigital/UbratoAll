import { axiosInstance } from '@/utils';

type parameters = {
  email: string;
  password: string;
};

export const login = async (parameters: parameters) => {
  return await axiosInstance.post(`/v1/auth/signin`, parameters);
};
