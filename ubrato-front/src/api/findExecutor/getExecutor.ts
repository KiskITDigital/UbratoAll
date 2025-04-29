import { axiosInstance } from "@/utils"

export const getExecutor = async (id: string) => {
    const contractorInfo = await axiosInstance.get(`v1/organizations/profile/${id}/contractor`)
    const organizationInfo = await axiosInstance.get(`v1/organizations/profile/${id}`)
    return { contractorInfo: contractorInfo.data, organizationInfo: organizationInfo.data }
}