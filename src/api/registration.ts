import axios from 'axios'

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:7542/2.0/'
})

export const registerAPI = {
    register(formsData: RegistrationDataType) {
        return instance.post<ResponseType>(`auth/register`, formsData).then(res => res.data)
    }
}

// types
type ResponseType = {
    addedUser: object
    error: string
}
export type RegistrationDataType = {
    email: string
    password: string
}