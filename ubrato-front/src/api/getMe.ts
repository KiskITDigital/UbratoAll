import { axiosInstance } from "@/utils";


export const getMe:(token: string | null ) => Promise<object>= async (token) => {
const res = await axiosInstance.get(
  `/v1/users/me`,
  {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }
)
    return res.data
};
  
// Promise<number>