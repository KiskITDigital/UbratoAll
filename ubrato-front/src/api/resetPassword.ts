import { axiosInstance } from "@/utils"

export const askResetPassword = async (email: string) => {
    const res = await axiosInstance.get(`v1/auth/reset-password?email=${email}`)
    return res.data
}

export const resetPassword = async (email: string, code: string, password: string) => {
    const res = await axiosInstance.post("v1/auth/reset-password", {
        email,
        code,
        password
    });
    return res
}