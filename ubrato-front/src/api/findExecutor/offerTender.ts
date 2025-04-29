import { axiosInstance } from "@/utils"

export const offerTender = async (token: string, executorId: string, id: number) => {
    const res = await axiosInstance.post(`v1/users/${executorId}/offer`, {
        tender_id: id,
    }, {
        headers: {
            authorization: `Bearer ${token}`,
        },
    })
    return res
}