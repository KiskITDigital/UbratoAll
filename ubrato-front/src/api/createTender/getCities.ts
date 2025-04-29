import { axiosInstance } from "@/utils"

export const getCities = async (query: string) => {
  const res = await axiosInstance.get(`/v1/suggest/city`, {
    params: {
      query: query
    }
  })
  return res
}