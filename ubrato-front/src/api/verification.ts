import { axiosInstance } from "@/utils"

export const askForVerification = async (token: string) => {
  const res = await axiosInstance.get("v1/auth/confirm-email", {
    headers: { authorization: `Bearer ${token}` }
  })
  // console.log(res);
  return res
}

export const verify = async (token: string) => {
  const res = await axiosInstance.post(`v1/auth/confirm-email?token=${token}`)
  return res.data
}

export const verifyUser = async (token?: string) => {
  return await axiosInstance.get("v1/users/me/verify", {
    headers: { authorization: `Bearer ${token ? token : localStorage.getItem("token")}` }
  })
}