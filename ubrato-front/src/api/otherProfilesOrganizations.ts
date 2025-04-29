import { ErrorInfo, ExecutorProfileInfo, OrdererProfileInfo } from "@/types/app";
import { axiosInstance } from "@/utils";

export const getOtherProfilesOrganizations = async (orgId: string): Promise<OrdererProfileInfo | ExecutorProfileInfo | ErrorInfo> => {
    let org;
    try {
        org = await axiosInstance.get(`/v1/organizations/profile/${orgId}`);
    } catch (e) {
        return { msg: "Произошла ошибка, возможно такого пользователя не существует" } as ErrorInfo;
    }

    let orgAddition;
    let status: 'contractor' | 'customer';
    try {
        orgAddition = await axiosInstance.get(`/v1/organizations/profile/${orgId}/contractor`);
        status = 'contractor';
    } catch (e) {
        try {
            orgAddition = await axiosInstance.get(`/v1/organizations/profile/${orgId}/customer`);
            status = 'customer';
        } catch (e) {
            return { msg: "Произошла ошибка, возможно такого пользователя не существует" } as ErrorInfo;
        }
    }

    return { org: org.data, [status === 'contractor' ? 'executor' : 'orderer']: orgAddition.data } as ExecutorProfileInfo | OrdererProfileInfo;
}
