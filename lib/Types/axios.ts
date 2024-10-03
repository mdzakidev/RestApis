import axios, { AxiosRequestConfig } from "axios";


const config: AxiosRequestConfig = {
    baseURL: process.env.BASE_URL,
    timeout: 10000,
    headers: {
        Authorization: process.env.ADMIN_APIKEY
    }
}

const apiClient = axios.create(config);

export default apiClient
