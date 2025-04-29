import { notificationsT } from '@/types/app';
import { axiosInstance } from '@/utils';

export const getNotifications: (token: string) => Promise<notificationsT> = async (token) => {
  const res = await axiosInstance.get<notificationsT>('/v1/users/me/notice', {
    headers: { authorization: `Bearer ${token}` },
  });
  // console.log(res);
  return res.data;
};

export const setNotificationRead: (token: string, id: number) => Promise<void> = async (
  token,
  id
) => {
  await axiosInstance.put<notificationsT>(
    `/v1/users/me/notice/read?ids_str=${id}`,
    {},
    {
      headers: { authorization: `Bearer ${token}` },
    }
  );
  // console.log(res);
};
