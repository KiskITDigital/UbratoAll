import { axiosInstance } from './baseHttp';

export const refreshToken = async () => {
  try {
    const resp = await axiosInstance.get(`/v1/auth/refresh`);
    // console.log(resp)
    if (resp.status === 200) {
      localStorage.setItem('token', resp.data.access_token);
    } else {
      throw resp
    }
  } catch (e) {
    // console.log(e);
    localStorage.removeItem('token');
  }
};
