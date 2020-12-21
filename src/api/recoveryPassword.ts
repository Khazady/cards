import axios from 'axios'

const settings = {
    withCredentials: true
}
const instance = axios.create({
    baseURL: 'https://neko-back.herokuapp.com/2.0',
    ...settings
})

export const recoveryPassword = {
    recoveryPassword(data: RecoveryPasswordRequestType) {
        return instance.post<RecoveryPasswordResponseType>('/auth/forgot', data)
    }
}

export type RecoveryPasswordRequestType = {
    email: string
    from: string
    message: string
}

type RecoveryPasswordResponseType = {
    info: string
    error: string
}