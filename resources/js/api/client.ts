import axios, { AxiosRequestConfig } from 'axios'

export const STORAGE_API_KEY = 'graphQlApiKey'
export const STORAGE_USER_ID = '_user_id__'

export default class Client {
    public static async request(query: string): Promise<any> {
        axios.interceptors.request.use(function (config: AxiosRequestConfig) {
            const TOKEN = localStorage.getItem(STORAGE_API_KEY)

            config.headers = {
                Authorization: TOKEN ? `Bearer ${ TOKEN  }` : ''
            }
            return config
        })
        return (await axios.post(`http://localhost:4444`, { query }).catch((error) => {
            console.log(error)
            if (error.response.status === 400) {
                throw new Error(error.response.data.message)
            }
            throw error
        })).data
    }
}
