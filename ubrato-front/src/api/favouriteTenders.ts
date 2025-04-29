import { axiosInstance } from "@/utils"

export const isFavoriteTender = async (id: string, token: string) => {
    const res = await axiosInstance.get(`/v1/tenders/tender/${id}/is_favorite`, {
        headers: {
            authorization: `Bearer ${token}`,
        },
    })
    return res
}


export const addFavouriteTender = async (id: string, token: string) => {
    const res = await axiosInstance.post(`/v1/tenders/tender/${id}/favorite`,
        {},
        {
            headers: {
                authorization: `Bearer ${token}`,
            },
        })
    return res
}


export const removeFavoriteTender = async (id: string, token: string) => {
    const res = await axiosInstance.delete(`/v1/tenders/tender/${id}/favorite`,
        {
            headers: {
                authorization: `Bearer ${token}`,
            },
        })
    return res
}


export const getAllFavoriteTenders = async (token: string | null) => {
    const res = await axiosInstance.get("/v1/users/me/favorite_tenders", {
        headers: {
            authorization: `Bearer ${token}`,
        }
    })
    return res
}