import axios from 'axios'

const settings = {
    withCredentials: true
}
const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    ...settings
})

export const loginAPI = {
    login(data: LoginRequestType) {
        // debugger
        return instance.post<LoginResponseType>('auth/login', data)
    },
    logOut() {
        return instance.delete<LogOutResponseType>('auth/me')
    },
    me() {
        return instance.post<MeResponseType>('auth/me')
    }
}

export type  LoginRequestType = {
    email: string
    password: string
    rememberMe?: boolean
}

export type LoginResponseType = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number
    created: Date
    updated: Date
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean
    error: string
}

type LogOutResponseType = {
    info: string
    error: string
}

type MeResponseType = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number // количество колод
    created: Date
    updated: Date
    isAdmin: boolean
    verified: boolean // подтвердил ли почту
    rememberMe: boolean
    error: string
}