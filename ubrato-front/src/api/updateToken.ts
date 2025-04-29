import { refreshToken } from '@/utils';

export const updateToken: <T, C>(
  callback: (token: string, args: C) => Promise<T>,
  callbackArgs: C
) => Promise<T> = async (callback, callbackArgs) => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      const res = await callback(token, callbackArgs);
      return res;
    } else {
      throw 'no token';
    }
  } catch (e) {
    // console.log();
    await refreshToken();
    const newToken = localStorage.getItem('token');
    const res = await callback(newToken!, callbackArgs);
    return res;
  }
};
