import { axiosInstance } from "@/utils"

export const isResponded = async (token: string, tenderId: string, userId: string) => {
    const res = await axiosInstance.get(`v1/tenders/tender/${tenderId}/has_offer/${userId}`, {
        headers: {
            authorization: `Bearer ${token}`,
        }
    })
    return res
}