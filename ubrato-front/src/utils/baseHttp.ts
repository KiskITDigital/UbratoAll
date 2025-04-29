import axios from "axios";

export const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_SERVER_URI
})

export const axiosInstanceStore = axios.create({
  withCredentials: true,
  baseURL: 'https://cdn.ubrato.ru',
  headers: {
    "Content-Type": 'multipart/form-data'
  }
})


