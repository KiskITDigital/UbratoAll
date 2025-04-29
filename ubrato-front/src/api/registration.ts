import { axiosInstance } from '@/utils';

type parameters = {
  email: string;
  phone: string;
  password: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  inn: string;
  is_contractor: boolean;
  avatar: string;
};

export const registerUser = async (parameters: parameters) => {
  const res = await axiosInstance.post(`/v1/auth/signup`, parameters);
  localStorage.setItem('token', res.data.access_token);
  // console.log(res);
};
