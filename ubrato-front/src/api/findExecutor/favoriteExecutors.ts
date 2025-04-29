import { axiosInstance } from "@/utils"

export const isFavoriteExecutor = async (id: string, token: string) => {
    try {
        const res = await axiosInstance.get(`/v1/users/${id}/is_favorite`, {
            headers: {
                authorization: `Bearer ${token}`,
            },
        })
        return res
    } catch (e) {
        console.error(e);
    }
}

export const addFavoriteExecutor = async (id: string, token: string) => {
    const res = await axiosInstance.post(`/v1/users/${id}/add_favorite`,
        {},
        {
            headers: {
                authorization: `Bearer ${token}`,
            },
        })
    return res
}

export const removeFavoriteExecutor = async (id: string, token: string) => {
    const res = await axiosInstance.post(`/v1/users/${id}/remove_favorite`,
        {},
        {
            headers: {
                authorization: `Bearer ${token}`,
            },
        })
    return res
}

export const getAllFavoriteExecutors = async (token: string) => {
    const res = await axiosInstance.get("/v1/users/me/favorite_contractors", {
        headers: {
            authorization: `Bearer ${token}`,
        }
    })
    return res
}