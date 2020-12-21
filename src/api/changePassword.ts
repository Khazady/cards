import axios from 'axios'

const settings = {
    withCredentials: true
}
const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    ...settings
})

export const changePassword = {
    changePassword(data: ChangePasswordRequestType) {
        return instance.post<ChangePasswordResponseType>('/auth/set-new-password', data)
    }
}

export type ChangePasswordRequestType = {
    password: string
    resetPasswordToken: string
}

type ChangePasswordResponseType = {
    info: string
    error: string
}